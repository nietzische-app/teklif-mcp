/** Inline MCP Apps UI — Figma 'Teklif MCP — Widget' (light/dark), max-height 500px */
export const OFFER_WIDGET_URI = "ui://teklif-mcp/offers.html";

export function buildOfferWidgetHtml(): string {
  return `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Teklif MCP — Teklifler</title>
  <style>
    :root {
      color-scheme: light dark;
      --bg: #0B0F14;
      --surface: #141A22;
      --surface-2: #1C2430;
      --border: #243041;
      --text: #F3F6FA;
      --muted: #9AA7B8;
      --accent: #3D8BFD;
      --accent-soft: #152238;
      --accent-border: #243552;
      --success: #34D399;
      --success-soft: #0F2A1C;
      --success-border: #1A3D2C;
      --warn: #FBBF24;
      --warn-soft: #2A1F0A;
      --warn-border: #3D2E10;
      --indigo: #A5B4FC;
      --indigo-soft: #1A1F3A;
      --indigo-border: #2A3158;
      --demo: #34D399;
      --demo-soft: #0F2A1C;
      --demo-border: #1A3D2C;
      --radius: 16px;
      --shadow: 0 8px 20px rgba(0,0,0,0.35);
      --font: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    }
    @media (prefers-color-scheme: light) {
      :root {
        --bg: #F4F6FB;
        --surface: #FFFFFF;
        --surface-2: #F0F3F8;
        --border: #E5E9F2;
        --text: #0F172A;
        --muted: #64748B;
        --accent: #2563EB;
        --accent-soft: #EEF4FF;
        --accent-border: #C7D7FE;
        --success: #047857;
        --success-soft: #ECFDF5;
        --success-border: #A7F3D0;
        --warn: #B45309;
        --warn-soft: #FFFBEB;
        --warn-border: #FDE68A;
        --indigo: #4338CA;
        --indigo-soft: #EEF2FF;
        --indigo-border: #C7D2FE;
        --demo: #059669;
        --demo-soft: #ECFDF5;
        --demo-border: #A7F3D0;
        --shadow: 0 8px 20px rgba(15,23,42,0.08);
      }
    }
    * { box-sizing: border-box; }
    html, body {
      margin: 0;
      padding: 0;
      font-family: var(--font);
      background: transparent;
      color: var(--text);
    }
    .shell {
      max-height: 500px;
      overflow: auto;
      padding: 12px 14px;
      background: var(--bg);
      border-radius: 20px;
      border: 1px solid var(--border);
    }
    .header {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 10px;
    }
    .brand-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .brand { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
    .brand strong {
      font-size: 16px;
      font-weight: 700;
      letter-spacing: -0.02em;
    }
    .brand span { font-size: 12px; font-weight: 500; color: var(--muted); }
    .pill {
      font-size: 11px;
      font-weight: 600;
      padding: 5px 10px;
      border-radius: 999px;
      background: var(--demo-soft);
      color: var(--demo);
      border: 1px solid var(--demo-border);
      white-space: nowrap;
    }
    .platforms {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .platform {
      font-size: 11px;
      font-weight: 600;
      padding: 5px 10px;
      border-radius: 999px;
      background: var(--accent-soft);
      color: var(--accent);
      border: 1px solid var(--accent-border);
    }
    .carousel {
      display: flex;
      gap: 12px;
      overflow-x: auto;
      padding-bottom: 4px;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
    }
    .carousel::-webkit-scrollbar { height: 5px; }
    .carousel::-webkit-scrollbar-thumb {
      background: rgba(148,163,184,0.35);
      border-radius: 999px;
    }
    .card {
      flex: 0 0 196px;
      scroll-snap-align: start;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      padding: 10px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      min-height: 0;
    }
    .card-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
    }
    .emoji {
      width: 40px;
      height: 40px;
      border-radius: 12px;
      background: var(--surface-2);
      display: grid;
      place-items: center;
      font-size: 20px;
    }
    .badge {
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      padding: 4px 8px;
      border-radius: 999px;
      background: var(--success-soft);
      color: var(--success);
      border: 1px solid var(--success-border);
    }
    .badge.warn {
      background: var(--warn-soft);
      color: var(--warn);
      border-color: var(--warn-border);
    }
    .badge.accent {
      background: var(--indigo-soft);
      color: var(--indigo);
      border-color: var(--indigo-border);
    }
    .meta { font-size: 10px; font-weight: 500; color: var(--muted); }
    .title {
      font-size: 13px;
      font-weight: 600;
      line-height: 1.3;
      letter-spacing: -0.01em;
    }
    .price {
      font-size: 18px;
      font-weight: 700;
      letter-spacing: -0.02em;
      display: flex;
      align-items: flex-end;
      gap: 4px;
    }
    .price small { font-size: 11px; font-weight: 500; color: var(--muted); }
    .chips { display: flex; flex-wrap: wrap; gap: 6px; }
    .chip {
      font-size: 10px;
      font-weight: 500;
      color: var(--muted);
      background: var(--surface-2);
      border-radius: 8px;
      padding: 4px 8px;
    }
    .cta {
      margin-top: auto;
      appearance: none;
      border: 0;
      border-radius: 12px;
      padding: 8px 12px;
      font-size: 12px;
      font-weight: 600;
      background: var(--accent);
      color: #fff;
      cursor: pointer;
      text-align: center;
      text-decoration: none;
      display: block;
    }
    .cta:hover { filter: brightness(1.06); }
    .section-title {
      margin: 10px 0 6px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--muted);
    }
    table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 14px;
      overflow: hidden;
      font-size: 11px;
    }
    th, td {
      padding: 6px 10px;
      text-align: left;
      border-bottom: 1px solid var(--border);
      vertical-align: middle;
    }
    th {
      background: var(--surface-2);
      color: var(--muted);
      font-weight: 600;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    tbody tr:nth-child(even) td { background: color-mix(in srgb, var(--surface-2) 55%, transparent); }
    tr:last-child td { border-bottom: 0; }
    .best { font-weight: 700; }
    .empty {
      padding: 24px;
      text-align: center;
      color: var(--muted);
      font-size: 13px;
      background: var(--surface);
      border: 1px dashed var(--border);
      border-radius: var(--radius);
    }
    .demo-flag {
      margin-top: 8px;
      font-size: 10px;
      color: var(--muted);
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="shell" id="app">
    <div class="empty">Teklifler yükleniyor…</div>
  </div>
  <script>
    const DEMO_FLAG = "Örnek veri — kurgusal demo teklifler";
    const PLATFORMS = ["ChatGPT", "Claude", "Gemini"];

    function badgeClass(badge) {
      if (!badge) return "";
      const b = String(badge).toLowerCase();
      if (b.includes("popüler") || b.includes("premium")) return "warn";
      if (b.includes("indirim") || b.includes("hızlı")) return "accent";
      if (b.includes("uygun")) return "";
      return "accent";
    }

    function formatPrice(n) {
      try {
        return new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(n);
      } catch {
        return n + " TRY";
      }
    }

    function render(payload) {
      const app = document.getElementById("app");
      const offers = Array.isArray(payload?.offers) ? payload.offers : [];
      const motto = payload?.motto || "Tekliflerinizi her yapay zeka sunsun";
      const compare = Array.isArray(payload?.compare) ? payload.compare : offers.slice(0, 3);
      const activePlatform = payload?.platform || "ChatGPT";

      if (!offers.length) {
        app.innerHTML = '<div class="empty">Gösterilecek teklif yok. search_offers veya compare_offers çağırın.</div>';
        return;
      }

      const cards = offers.map((o) => {
        const badge = o.badge
          ? '<span class="badge ' + badgeClass(o.badge) + '">' + escapeHtml(o.badge) + "</span>"
          : "";
        const chips = (o.highlights || []).slice(0, 2).map((h) => '<span class="chip">' + escapeHtml(h) + "</span>").join("");
        const href = o.trackedUrl || o.baseUrl || "#";
        return (
          '<article class="card">' +
            '<div class="card-top"><div class="emoji">' + (o.imageEmoji || "🎁") + "</div>" + badge + "</div>" +
            '<div class="meta">' + escapeHtml(o.brand) + "</div>" +
            '<div class="title">' + escapeHtml(o.title) + "</div>" +
            '<div class="price">' + formatPrice(o.priceTry) + "<small>/ birim</small></div>" +
            '<div class="chips">' + chips + "</div>" +
            '<a class="cta" href="' + escapeAttr(href) + '" target="_blank" rel="noopener noreferrer">İncele</a>' +
          "</article>"
        );
      }).join("");

      const rows = compare.map((o) => {
        const best = o.badge === "En uygun";
        return (
          "<tr>" +
            "<td>" + escapeHtml(o.brand) + "</td>" +
            "<td>" + escapeHtml(o.title) + "</td>" +
            '<td class="' + (best ? "best" : "") + '">' + formatPrice(o.priceTry) + (o.badge ? " · " + escapeHtml(o.badge) : "") + "</td>" +
            "<td>" + escapeHtml((o.highlights || []).slice(0, 2).join(" · ")) + "</td>" +
          "</tr>"
        );
      }).join("");

      const platformChips = PLATFORMS.map((p) =>
        '<span class="platform"' + (p.toLowerCase() === String(activePlatform).toLowerCase() ? ' style="outline:1px solid var(--accent)"' : "") + ">" + p + "</span>"
      ).join("");

      app.innerHTML =
        '<div class="header">' +
          '<div class="brand-row">' +
            '<div class="brand"><strong>Teklif MCP</strong><span>' + escapeHtml(motto) + "</span></div>" +
            '<div class="pill">Demo · örnek veri</div>' +
          "</div>" +
          '<div class="platforms">' + platformChips + "</div>" +
        "</div>" +
        '<div class="carousel">' + cards + "</div>" +
        '<div class="section-title">Karşılaştırma</div>' +
        "<table><thead><tr><th>Marka</th><th>Teklif</th><th>Fiyat</th><th>Öne çıkan</th></tr></thead><tbody>" +
        rows +
        "</tbody></table>" +
        '<div class="demo-flag">' + DEMO_FLAG + "</div>";
    }

    function escapeHtml(s) {
      return String(s ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }
    function escapeAttr(s) {
      return escapeHtml(s).replace(/'/g, "&#39;");
    }

    function pickStructured(msg) {
      if (!msg) return null;
      if (msg.structuredContent) return msg.structuredContent;
      if (msg.params?.structuredContent) return msg.params.structuredContent;
      if (msg.result?.structuredContent) return msg.result.structuredContent;
      if (msg.offers) return msg;
      return null;
    }

    window.addEventListener("message", (event) => {
      const data = event.data;
      if (!data) return;
      if (data.jsonrpc === "2.0" && data.method === "ui/notifications/tool-result") {
        const sc = pickStructured(data.params) || pickStructured(data);
        if (sc) render(sc);
        return;
      }
      if (data.type === "teklif-mcp/preview" && data.payload) {
        render(data.payload);
      }
    });

    try {
      if (window.openai?.toolOutput) {
        const sc = pickStructured(window.openai.toolOutput) || window.openai.toolOutput;
        if (sc) render(sc);
      }
    } catch (_) {}

    if (window.__TEKLIF_PREVIEW__) {
      render(window.__TEKLIF_PREVIEW__);
    } else {
      render({
        motto: "Tekliflerinizi her yapay zeka sunsun",
        platform: "ChatGPT",
        offers: [
          { id: "rent-eco-i20", brand: "AnadoluDrive (örnek)", title: "Hyundai i20 — Günlük kiralama", priceTry: 1290, badge: "En uygun", highlights: ["Tam kasko", "Sınırsız km"], imageEmoji: "🚗", trackedUrl: "https://example.com/demo/anadoludrive/i20?utm_source=chatgpt&utm_medium=mcp&utm_campaign=teklif-mcp-demo&utm_content=rent-eco-i20" },
          { id: "rent-suv-tucson", brand: "AnadoluDrive (örnek)", title: "Hyundai Tucson — SUV günlük", priceTry: 2490, badge: "Popüler", highlights: ["7 koltuk opsiyonu", "Ücretsiz ikinci sürücü"], imageEmoji: "🚙", trackedUrl: "https://example.com/demo/anadoludrive/tucson?utm_source=chatgpt&utm_medium=mcp&utm_campaign=teklif-mcp-demo&utm_content=rent-suv-tucson" },
          { id: "shop-robot-vacuum", brand: "Nodify Market (örnek)", title: "Robot süpürge X200 — Demo", priceTry: 6499, badge: "En uygun", highlights: ["LiDAR haritalama", "Otomatik boşaltma"], imageEmoji: "🤖", trackedUrl: "https://example.com/demo/nodify/robot-x200?utm_source=chatgpt&utm_medium=mcp&utm_campaign=teklif-mcp-demo&utm_content=shop-robot-vacuum" },
          { id: "shop-espresso", brand: "KahveKöşk (örnek)", title: "Espresso makinesi Barista Mini", priceTry: 4290, badge: "%15 indirim", highlights: ["15 bar basınç", "Süt köpürtücü"], imageEmoji: "☕", trackedUrl: "https://example.com/demo/kahvekosk/barista-mini?utm_source=chatgpt&utm_medium=mcp&utm_campaign=teklif-mcp-demo&utm_content=shop-espresso" }
        ]
      });
    }
  </script>
</body>
</html>`;
}
