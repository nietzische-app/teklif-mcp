import { createHash } from "node:crypto";
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import express, { type Request, type Response } from "express";
import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import {
  DEMO_DISCLAIMER,
  OFFERS,
  OFFER_SOURCE,
  formatPrice,
  normalizeText,
  type Offer,
  type OfferCategory,
} from "./data.js";
import { offerPageUrl } from "./utm.js";
import { OFFER_WIDGET_URI, buildOfferWidgetHtml } from "./widgetHtml.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = [join(__dirname, "..", "public"), join(process.cwd(), "public")].find((d) => existsSync(d)) ?? join(__dirname, "..", "public");
const PORT = Number(process.env.PORT ?? 8787);
/** Website-only motto — never appended to tool outputs. */
const SITE_MOTTO = "Tekliflerinizi her yapay zeka sunsun";
const UI_MIME = "text/html;profile=mcp-app";
/** Public connector URL; Claude validates ui.domain = sha256(url)[:32] + ".claudemcpcontent.com" */
const PUBLIC_MCP_URL = process.env.PUBLIC_MCP_URL ?? "https://teklif.niyazi.site/mcp";
const CLAUDE_UI_DOMAIN =
  createHash("sha256").update(PUBLIC_MCP_URL).digest("hex").slice(0, 32) + ".claudemcpcontent.com";
const TOOL_UI_META_BASE = {
  ui: { resourceUri: OFFER_WIDGET_URI, visibility: ["model", "app"] },
  // legacy flat key (deprecated in spec, still read by some hosts)
  "ui/resourceUri": OFFER_WIDGET_URI,
  // ChatGPT Apps SDK compatibility alias
  "openai/outputTemplate": OFFER_WIDGET_URI,
  "openai/widgetAccessible": true,
} as const;

const SEARCH_TOOL_UI_META = {
  ...TOOL_UI_META_BASE,
  "openai/toolInvocation/invoking": "Searching offers…",
  "openai/toolInvocation/invoked": "Offers ready",
};

const COMPARE_TOOL_UI_META = {
  ...TOOL_UI_META_BASE,
  "openai/toolInvocation/invoking": "Comparing offers…",
  "openai/toolInvocation/invoked": "Comparison ready",
};

/** Registry / client hints: read-only demo tools over embedded sample data. */
const TOOL_ANNOTATIONS = {
  readOnlyHint: true,
  destructiveHint: false,
  openWorldHint: false,
} as const;

/** Attach widget template on the tool *result* as well — some hosts (ChatGPT) only re-render UI when result _meta carries outputTemplate. */
function resultUiMeta() {
  return {
    ui: { resourceUri: OFFER_WIDGET_URI },
    "ui/resourceUri": OFFER_WIDGET_URI,
    "openai/outputTemplate": OFFER_WIDGET_URI,
  };
}

const categorySchema = z
  .enum(["arac_kiralama", "e_ticaret", "kasko", "trafik_sigortasi", "hepsi"])
  .default("hepsi");

const sortBySchema = z.enum(["price", "rating", "relevance"]).default("price");

type SortBy = z.infer<typeof sortBySchema>;

/** ChatGPT's MCP client identifies as openai-mcp and sends openai/* request _meta. */
function isChatGptClient(extra: any): boolean {
  if (process.env.FORCE_CLIENT === "chatgpt") return true;
  if (process.env.FORCE_CLIENT === "claude") return false;
  const h = extra?.requestInfo?.headers ?? {};
  const ua = String(h["user-agent"] ?? "");
  if (/openai|chatgpt/i.test(ua)) return true;
  const m = extra?._meta ?? {};
  return Object.keys(m).some((k) => k.startsWith("openai/"));
}

function sortOffers(offers: Offer[], sortBy: SortBy): Offer[] {
  const copy = [...offers];
  if (sortBy === "rating") {
    return copy.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0) || a.priceTry - b.priceTry);
  }
  if (sortBy === "relevance") {
    // No paid placement: relevance = rating then price (transparent, deterministic).
    return copy.sort(
      (a, b) => (b.rating ?? 0) - (a.rating ?? 0) || a.priceTry - b.priceTry || a.id.localeCompare(b.id)
    );
  }
  // price (default): lowest first
  return copy.sort((a, b) => a.priceTry - b.priceTry || a.id.localeCompare(b.id));
}

function filterOffers(
  category: z.infer<typeof categorySchema>,
  budget?: number,
  city?: string,
  sortBy: SortBy = "price"
): Offer[] {
  const c = city ? normalizeText(city) : "";
  const filtered = OFFERS.filter((o) => {
    const catOk = category === "hepsi" || o.category === (category as OfferCategory);
    const budgetOk = budget == null || o.priceTry <= budget;
    const cityOk = !c || normalizeText(o.city) === c;
    return catOk && budgetOk && cityOk;
  });
  return sortOffers(filtered, sortBy);
}

function serializeOffers(offers: Offer[]) {
  return offers.map((o) => ({
    id: o.id,
    brand: o.brand,
    title: o.title,
    category: o.category,
    city: o.city,
    priceTry: o.priceTry,
    wasPriceTry: o.wasPriceTry ?? null,
    priceLabel: formatPrice(o.priceTry),
    badge: o.badge ?? null,
    rating: o.rating ?? null,
    highlights: o.highlights,
    imageEmoji: o.imageEmoji,
    heroFrom: o.heroFrom ?? null,
    heroTo: o.heroTo ?? null,
    source: o.source ?? OFFER_SOURCE,
    isDemo: true as const,
    baseUrl: o.baseUrl,
    offerUrl: offerPageUrl(o.baseUrl),
    // Widget compat alias (no tracking params)
    trackedUrl: offerPageUrl(o.baseUrl),
  }));
}

function sortLabel(sortBy: SortBy): string {
  if (sortBy === "rating") return "Sorted by rating (highest first). No paid placement.";
  if (sortBy === "relevance") return "Sorted by relevance (rating, then price). No paid placement.";
  return "Sorted by price (lowest first). No paid placement.";
}

function textSummary(offers: Offer[], sortBy: SortBy = "price"): string {
  if (!offers.length) {
    return `${DEMO_DISCLAIMER}\nNo matching offers.`;
  }
  const lines = offers.map(
    (o, i) =>
      `${i + 1}. ${o.brand} — ${o.title} [${o.city}]: ${formatPrice(o.priceTry)}` +
      (o.rating != null ? ` · ★${o.rating}` : "") +
      (o.badge ? ` · ${o.badge}` : "") +
      ` · source: ${o.source ?? OFFER_SOURCE} (${o.id})`
  );
  return `${DEMO_DISCLAIMER}\n${sortLabel(sortBy)}\n\n${lines.join("\n")}`;
}

function createServer(): McpServer {
  const server = new McpServer(
    {
      name: "teklif-mcp",
      version: "0.3.0",
    },
    {
      capabilities: {
        tools: {},
        resources: {},
      },
    }
  );

  server.registerResource(
    "offers-widget",
    OFFER_WIDGET_URI,
    {
      description: "Offer card carousel (MCP Apps UI, cards-only)",
      mimeType: UI_MIME,
    },
    async (_uri, extra) => {
      const chatgpt = isChatGptClient(extra);
      return {
      contents: [
        {
          uri: OFFER_WIDGET_URI,
          mimeType: UI_MIME,
          text: buildOfferWidgetHtml(),
          _meta: {
            ui: {
              prefersBorder: true,
              // Fully inline widget — declare empty allowlists so hosts don't show "CSP off" when enforcement is on.
              csp: { connectDomains: [], resourceDomains: [], frameDomains: [] },
              // Claude requires {hash}.claudemcpcontent.com; ChatGPT expects an https origin
              // (defaults to web-sandbox.oaiusercontent.com), so omit it for ChatGPT.
              ...(process.env.UI_DOMAIN_OFF || chatgpt ? {} : { domain: CLAUDE_UI_DOMAIN }),
            },
            "openai/widgetPrefersBorder": true,
            "openai/widgetDescription": "Sample offer cards (dark, cards-only)",
            "openai/ui": { availableDisplayModes: ["inline"] },
            "openai/widgetCSP": {
              connect_domains: [],
              resource_domains: [],
              frame_domains: [],
              redirect_domains: ["https://teklif.niyazi.site"],
            },
          },
        },
      ],
      };
    }
  );

  server.registerTool(
    "search_offers",
    {
      title: "Search offers",
      description:
        "Searches offers when the user asks for them, filtered by category (arac_kiralama = car rental, e_ticaret = e-commerce, kasko = comprehensive car insurance, trafik_sigortasi = compulsory traffic insurance, or hepsi = all), optional city and optional maximum price in TRY. Returns matching offers sorted by sort_by (price | rating | relevance; default price, lowest first) and shows them as cards. No paid or sponsored ranking. Currently returns fictional sample data labeled as such.",
      annotations: TOOL_ANNOTATIONS,
      inputSchema: {
        category: categorySchema.describe(
          "arac_kiralama (car rental) | e_ticaret (e-commerce) | kasko | trafik_sigortasi | hepsi (all)"
        ),
        budget: z
          .number()
          .int()
          .positive()
          .optional()
          .describe("Maximum price in TRY. Example: 3000"),
        city: z
          .string()
          .optional()
          .describe("City filter (case- and Turkish-diacritic-insensitive). Example: İstanbul, Ankara, İzmir, Bursa"),
        sort_by: sortBySchema
          .optional()
          .describe("Sort order: price (lowest first, default), rating (highest first), or relevance (rating then price). No paid placement."),
      },
      _meta: SEARCH_TOOL_UI_META,
    },
    async ({ category, budget, city, sort_by }) => {
      const sortBy = (sort_by ?? "price") as SortBy;
      const offers = filterOffers(category ?? "hepsi", budget, city, sortBy);
      const serialized = serializeOffers(offers);
      const structuredContent = {
        disclaimer: DEMO_DISCLAIMER,
        isDemo: true,
        view: "search" as const,
        category: category ?? "hepsi",
        budget: budget ?? null,
        city: city ?? null,
        sortedBy: sortBy,
        sortNote: sortLabel(sortBy),
        offers: serialized,
      };
      return {
        content: [{ type: "text" as const, text: textSummary(offers, sortBy) }],
        structuredContent,
        _meta: resultUiMeta(),
      };
    }
  );

  server.registerTool(
    "compare_offers",
    {
      title: "Compare offers",
      description:
        "Compares offers the user has explicitly asked to compare (by offer IDs from search_offers, or by category/city). If no IDs are given, returns up to 5 matching offers sorted by sort_by (default: the 5 lowest-priced). Returns offers with a card view. No paid or sponsored ranking. Sample data only.",
      annotations: TOOL_ANNOTATIONS,
      inputSchema: {
        offer_ids: z
          .array(z.string())
          .optional()
          .describe("Offer IDs to compare (from search_offers). If omitted, up to 5 matching offers by category/city are returned."),
        category: categorySchema.optional().default("hepsi"),
        city: z.string().optional().describe("City filter (example: İstanbul)"),
        sort_by: sortBySchema
          .optional()
          .describe("Sort order: price (default), rating, or relevance. No paid placement."),
      },
      _meta: COMPARE_TOOL_UI_META,
    },
    async ({ offer_ids, category, city, sort_by }) => {
      const sortBy = (sort_by ?? "price") as SortBy;
      let offers: Offer[];
      if (offer_ids?.length) {
        const set = new Set(offer_ids);
        offers = sortOffers(
          OFFERS.filter((o) => set.has(o.id)),
          sortBy
        );
      } else {
        offers = filterOffers(category ?? "hepsi", undefined, city, sortBy).slice(0, 5);
      }
      const serialized = serializeOffers(offers);
      const structuredContent = {
        disclaimer: DEMO_DISCLAIMER,
        isDemo: true,
        view: "compare" as const,
        category: category ?? "hepsi",
        city: city ?? null,
        sortedBy: sortBy,
        sortNote: sortLabel(sortBy),
        selectionNote: offer_ids?.length
          ? "Compared by explicit offer IDs."
          : "No IDs given: up to 5 matching offers after sort.",
        offers: serialized,
      };
      return {
        content: [
          {
            type: "text" as const,
            text: `Comparison (${offers.length} offers):\n${textSummary(offers, sortBy)}`,
          },
        ],
        structuredContent,
        _meta: resultUiMeta(),
      };
    }
  );

  server.registerTool(
    "get_offer_link",
    {
      title: "Get offer link",
      description:
        "Returns the provider page URL for a single offer ID from search_offers. Read-only; does not book or purchase. Currently sample links on teklif.niyazi.site.",
      annotations: TOOL_ANNOTATIONS,
      inputSchema: {
        offer_id: z.string().describe("Offer id, e.g. rent-eco-i20 or kasko-ist-genis"),
      },
    },
    async ({ offer_id }) => {
      const offer = OFFERS.find((o) => o.id === offer_id);
      if (!offer) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Offer not found: ${offer_id}. Use search_offers to list available IDs.`,
            },
          ],
          isError: true,
        };
      }
      const url = offerPageUrl(offer.baseUrl);
      const structuredContent = {
        disclaimer: DEMO_DISCLAIMER,
        isDemo: true,
        offer_id: offer.id,
        category: offer.category,
        city: offer.city,
        source: offer.source ?? OFFER_SOURCE,
        url,
      };
      return {
        content: [
          {
            type: "text" as const,
            text: `${DEMO_DISCLAIMER}\n${offer.brand} — ${offer.title} (${offer.city})\nSource: ${offer.source ?? OFFER_SOURCE}\nURL: ${url}`,
          },
        ],
        structuredContent,
      };
    }
  );

  return server;
}

const app = express();
app.use(express.json({ limit: "4mb" }));
app.use(express.static(PUBLIC_DIR));

app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    name: "teklif-mcp",
    demo: true,
    publicMcpUrl: PUBLIC_MCP_URL,
  });
});

/** Website root keeps the product motto; tool outputs do not. */
app.get("/", (_req, res) => {
  const indexPath = join(PUBLIC_DIR, "index.html");
  if (existsSync(indexPath)) {
    res.type("html").send(readFileSync(indexPath, "utf8"));
    return;
  }
  res.type("html").send(`<!DOCTYPE html>
<html lang="tr"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Teklif</title>
<style>body{font-family:system-ui,sans-serif;max-width:40rem;margin:2rem auto;padding:0 1.25rem;line-height:1.55}
.muted{opacity:.75;font-size:.9rem} code{font-size:.85em}</style></head>
<body>
<h1>Teklif</h1>
<p><em>${SITE_MOTTO}</em></p>
<p>Neutral, user-initiated offer search and comparison for car rental, e-commerce and car insurance in Turkey. Currently uses clearly labeled sample data.</p>
<p class="muted">MCP endpoint: <code>POST /mcp</code> · <a href="/preview">Widget preview</a> · <a href="/privacy.html">Privacy</a> · <a href="/terms.html">Terms</a></p>
</body></html>`);
});

/** Sample offer landing pages (owned domain; replaces example.com). */
app.get("/o/:id", (req, res) => {
  const offer = OFFERS.find((o) => o.id === req.params.id);
  if (!offer) {
    res.status(404).type("html").send(`<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><title>Not found</title></head>
<body><p>Sample offer not found: ${String(req.params.id)}</p><p><a href="/">Home</a></p></body></html>`);
    return;
  }
  res.type("html").send(`<!DOCTYPE html>
<html lang="tr"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${offer.brand} — ${offer.title} (sample)</title>
<style>body{font-family:system-ui,sans-serif;max-width:36rem;margin:2rem auto;padding:0 1.25rem;line-height:1.55}
.badge{display:inline-block;padding:.15rem .55rem;border-radius:999px;background:#eee;font-size:.85rem}
.muted{opacity:.75;font-size:.9rem}</style></head>
<body>
<p class="muted"><a href="/">Teklif</a> · sample offer page</p>
<h1>${offer.brand}</h1>
<p>${offer.title}</p>
<p><strong>${formatPrice(offer.priceTry)}</strong>${offer.badge ? ` <span class="badge">${offer.badge}</span>` : ""} · ${offer.city}</p>
<p>Source: <strong>${offer.source}</strong> (fictional demo — no booking or purchase).</p>
<ul>${offer.highlights.map((h) => `<li>${h}</li>`).join("")}</ul>
<p class="muted">Id: <code>${offer.id}</code></p>
</body></html>`);
});

app.get("/preview", (_req, res) => {
  const previewPath = join(PUBLIC_DIR, "preview.html");
  if (!existsSync(previewPath)) {
    res.redirect("/preview.html");
    return;
  }
  res.type("html").send(readFileSync(previewPath, "utf8"));
});

app.get("/widget", (_req, res) => {
  res.type("html").send(buildOfferWidgetHtml());
});

app.post("/mcp", async (req: Request, res: Response) => {
  const server = createServer();
  try {
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
    });
    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
    res.on("close", () => {
      void transport.close();
      void server.close();
    });
  } catch (error) {
    console.error("MCP error:", error);
    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: "2.0",
        error: {
          code: -32603,
          message:
            "MCP request failed on the Teklif demo server. Retry the same tool call, or open https://teklif.niyazi.site/health. If it keeps failing, file an issue on github.com/nietzische-app/teklif-mcp.",
        },
        id: null,
      });
    }
  }
});

app.get("/mcp", (_req, res) => {
  res.status(405).json({
    jsonrpc: "2.0",
    error: { code: -32000, message: "Method not allowed. Use POST." },
    id: null,
  });
});

app.delete("/mcp", (_req, res) => {
  res.status(405).json({
    jsonrpc: "2.0",
    error: { code: -32000, message: "Method not allowed on stateless server." },
    id: null,
  });
});

export default app;

if (!process.env.VERCEL) app.listen(PORT, () => {
  console.log(`teklif-mcp listening on http://127.0.0.1:${PORT}`);
  console.log(`  MCP endpoint: POST http://127.0.0.1:${PORT}/mcp`);
  console.log(`  Preview:      http://127.0.0.1:${PORT}/preview`);
});
