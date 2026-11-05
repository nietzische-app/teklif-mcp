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
  formatPrice,
  normalizeText,
  type Offer,
  type OfferCategory,
} from "./data.js";
import { withOfferUtm, type AiPlatform } from "./utm.js";
import { OFFER_WIDGET_URI, buildOfferWidgetHtml } from "./widgetHtml.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = [join(__dirname, "..", "public"), join(process.cwd(), "public")].find((d) => existsSync(d)) ?? join(__dirname, "..", "public");
const PORT = Number(process.env.PORT ?? 8787);
const MOTTO = "Tekliflerinizi her yapay zeka sunsun";
const UI_MIME = "text/html;profile=mcp-app";
/** Public connector URL; Claude validates ui.domain = sha256(url)[:32] + ".claudemcpcontent.com" */
const PUBLIC_MCP_URL = process.env.PUBLIC_MCP_URL ?? "https://teklif-mcp.vercel.app/mcp";
const CLAUDE_UI_DOMAIN =
  createHash("sha256").update(PUBLIC_MCP_URL).digest("hex").slice(0, 32) + ".claudemcpcontent.com";
const TOOL_UI_META = {
  ui: { resourceUri: OFFER_WIDGET_URI, visibility: ["model", "app"] },
  // legacy flat key (deprecated in spec, still read by some hosts)
  "ui/resourceUri": OFFER_WIDGET_URI,
  // ChatGPT Apps SDK compatibility alias
  "openai/outputTemplate": OFFER_WIDGET_URI,
  "openai/widgetAccessible": true,
  "openai/toolInvocation/invoking": "Teklifler aranıyor…",
  "openai/toolInvocation/invoked": "Teklifler hazır",
};

const categorySchema = z.enum(["arac_kiralama", "e_ticaret", "kasko", "trafik_sigortasi", "hepsi"]).default("hepsi");
const platformSchema = z.enum(["chatgpt", "claude", "gemini"]);

function filterOffers(category: z.infer<typeof categorySchema>, budget?: number, city?: string): Offer[] {
  const c = city ? normalizeText(city) : "";
  return OFFERS.filter((o) => {
    const catOk = category === "hepsi" || o.category === (category as OfferCategory);
    const budgetOk = budget == null || o.priceTry <= budget;
    const cityOk = !c || normalizeText(o.city) === c;
    return catOk && budgetOk && cityOk;
  }).sort((a, b) => a.priceTry - b.priceTry);
}

function serializeOffers(offers: Offer[], platform: AiPlatform = "chatgpt") {
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
    isDemo: true as const,
    baseUrl: o.baseUrl,
    trackedUrl: withOfferUtm(o.baseUrl, platform, o.id),
  }));
}

function textSummary(offers: Offer[]): string {
  if (!offers.length) {
    return `${DEMO_DISCLAIMER}\nEşleşen teklif bulunamadı.`;
  }
  const lines = offers.map(
    (o, i) =>
      `${i + 1}. [${o.badge ?? "Teklif"}] ${o.brand} — ${o.title} [${o.city}]: ${formatPrice(o.priceTry)} (${o.id})`
  );
  return `${DEMO_DISCLAIMER}\n${MOTTO}\n\n${lines.join("\n")}`;
}

function createServer(): McpServer {
  const server = new McpServer(
    {
      name: "teklif-mcp",
      version: "0.1.0",
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
      description: "Teklif kartı carousel + karşılaştırma tablosu (MCP Apps UI)",
      mimeType: UI_MIME,
    },
    async () => ({
      contents: [
        {
          uri: OFFER_WIDGET_URI,
          mimeType: UI_MIME,
          text: buildOfferWidgetHtml(),
          _meta: {
            ui: {
              prefersBorder: true,
              csp: { connectDomains: [], resourceDomains: [] },
              ...(process.env.UI_DOMAIN_OFF ? {} : { domain: CLAUDE_UI_DOMAIN }),
            },
            "openai/widgetPrefersBorder": true,
            "openai/widgetDescription": "Örnek teklif kartları ve karşılaştırma tablosu",
          },
        },
      ],
    })
  );

  server.registerTool(
    "search_offers",
    {
      title: "Teklif ara",
      description:
        "Örnek (demo) marka tekliflerini kategori, şehir ve bütçeye göre arar. Kategoriler: araç kiralama, e-ticaret, kasko, trafik sigortası. Tüm veriler kurgusaldır (örnek). Sonuçlar UI widget ile gösterilir.",
      inputSchema: {
        category: categorySchema.describe(
          "arac_kiralama | e_ticaret | kasko | trafik_sigortasi | hepsi"
        ),
        budget: z
          .number()
          .int()
          .positive()
          .optional()
          .describe("Maksimum fiyat (TRY). Örn. 3000"),
        city: z
          .string()
          .optional()
          .describe("Şehir filtresi (büyük/küçük harf ve Türkçe karakter duyarsız). Örn. İstanbul, Ankara, İzmir, Bursa"),
        platform: platformSchema
          .optional()
          .default("chatgpt")
          .describe("UTM için hedef asistan: chatgpt | claude | gemini"),
      },
      _meta: TOOL_UI_META,
    },
    async ({ category, budget, city, platform }) => {
      const offers = filterOffers(category ?? "hepsi", budget, city);
      const serialized = serializeOffers(offers, platform ?? "chatgpt");
      const structuredContent = {
        motto: MOTTO,
        disclaimer: DEMO_DISCLAIMER,
        isDemo: true,
        category: category ?? "hepsi",
        budget: budget ?? null,
        city: city ?? null,
        platform: platform ?? "chatgpt",
        offers: serialized,
        compare: serialized.slice(0, 4),
      };
      return {
        content: [{ type: "text" as const, text: textSummary(offers) }],
        structuredContent,
      };
    }
  );

  server.registerTool(
    "compare_offers",
    {
      title: "Teklifleri karşılaştır",
      description:
        "Verilen teklif id listesini veya kategori filtresini fiyat/özellik tablosu olarak karşılaştırır (örnek veri).",
      inputSchema: {
        offer_ids: z
          .array(z.string())
          .optional()
          .describe("Karşılaştırılacak teklif id'leri. Boşsa kategoriye göre en ucuzlar."),
        category: categorySchema.optional().default("hepsi"),
        city: z.string().optional().describe("Şehir filtresi (örn. İstanbul)"),
        platform: platformSchema.optional().default("chatgpt"),
      },
      _meta: TOOL_UI_META,
    },
    async ({ offer_ids, category, city, platform }) => {
      let offers: Offer[];
      if (offer_ids?.length) {
        const set = new Set(offer_ids);
        offers = OFFERS.filter((o) => set.has(o.id)).sort(
          (a, b) => a.priceTry - b.priceTry
        );
      } else {
        offers = filterOffers(category ?? "hepsi", undefined, city).slice(0, 5);
      }
      const serialized = serializeOffers(offers, platform ?? "chatgpt");
      const structuredContent = {
        motto: MOTTO,
        disclaimer: DEMO_DISCLAIMER,
        isDemo: true,
        platform: platform ?? "chatgpt",
        offers: serialized,
        compare: serialized,
      };
      return {
        content: [
          {
            type: "text" as const,
            text: `Karşılaştırma (${offers.length} teklif):\n${textSummary(offers)}`,
          },
        ],
        structuredContent,
      };
    }
  );

  server.registerTool(
    "get_offer_link",
    {
      title: "Teklif linki al (UTM)",
      description:
        "Bir teklif için platforma özel takip linki üretir. utm_source=chatgpt|claude|gemini, utm_medium=mcp.",
      inputSchema: {
        offer_id: z.string().describe("Teklif id, örn. rent-eco-i20 veya kasko-ist-genis"),
        platform: platformSchema.describe("chatgpt | claude | gemini"),
      },
    },
    async ({ offer_id, platform }) => {
      const offer = OFFERS.find((o) => o.id === offer_id);
      if (!offer) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Teklif bulunamadı: ${offer_id}. search_offers ile id listesine bakın.`,
            },
          ],
          isError: true,
        };
      }
      const url = withOfferUtm(offer.baseUrl, platform, offer.id);
      const structuredContent = {
        disclaimer: DEMO_DISCLAIMER,
        isDemo: true,
        offer_id: offer.id,
        category: offer.category,
        city: offer.city,
        platform,
        url,
        utm_source: platform,
        utm_medium: "mcp",
        utm_campaign: "teklif-mcp-demo",
      };
      return {
        content: [
          {
            type: "text" as const,
            text: `${DEMO_DISCLAIMER}\n${offer.brand} — ${offer.title} (${offer.city})\nLink (${platform}): ${url}`,
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
    motto: MOTTO,
    demo: true,
  });
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
        error: { code: -32603, message: "Internal server error" },
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
