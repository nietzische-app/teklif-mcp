/** Inline MCP Apps UI — Figma Widget v3 (Product Card UI Kit style), max-height 500px */
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
      --bg: #07080D;
      --surface: #12141C;
      --border: rgba(255,255,255,0.09);
      --text: #F9FAFB;
      --muted: #9CA3AF;
      --brand: #A78BFA;
      --save-bg: rgba(6,78,59,0.4);
      --save-fg: #6EE7B7;
      --save-bd: rgba(52,211,153,0.27);
      --hero-badge: #F43F5E;
      --star-empty: #374151;
      --segment-track: rgba(0,0,0,0.35);
      --segment-active-bg: #A78BFA;
      --segment-active-fg: #1E1B4B;
      --segment-idle: #E9D5FF;
      --cta-bar: rgba(12,14,22,0.9);
      --shadow: 0 6px 16px rgba(0,0,0,0.4);
      --radius: 16px;
      --font: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
      --header-g1: #312E81;
      --header-g2: #4C1D95;
      --header-g3: #831843;
      --kicker: #C4B5FD;
      --live-fg: #E9D5FF;
      --compare-label-best: #34D399;
      --compare-label-rate: #FBBF24;
      --compare-label-save: #A78BFA;
    }
    @media (prefers-color-scheme: light) {
      :root {
        --bg: #EEF0F7;
        --surface: #FFFFFF;
        --border: #E5E7EB;
        --text: #111827;
        --muted: #6B7280;
        --brand: #6366F1;
        --save-bg: #ECFDF5;
        --save-fg: #059669;
        --save-bd: transparent;
        --star-empty: #E5E7EB;
        --segment-track: rgba(255,255,255,0.16);
        --segment-active-bg: #FFFFFF;
        --segment-active-fg: #4F46E5;
        --segment-idle: rgba(255,255,255,0.93);
        --cta-bar: rgba(255,255,255,0.92);
        --shadow: 0 4px 12px rgba(15,23,42,0.08);
        --header-g1: #6366F1;
        --header-g2: #8B5CF6;
        --header-g3: #EC4899;
        --kicker: rgba(255,255,255,0.6);
        --live-fg: #FFFFFF;
        --compare-label-best: #059669;
        --compare-label-rate: #D97706;
        --compare-label-save: #6366F1;
      }
    }
    * { box-sizing: border-box; }
    html, body {
      margin: 0; padding: 0;
      font-family: var(--font);
      background: transparent;
      color: var(--text);
    }
    .shell {
      width: 100%;
      max-width: 720px;
      max-height: 500px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      background: var(--bg);
      border-radius: 24px;
      border: 1px solid var(--border);
    }
    .glass-header {
      flex: 0 0 auto;
      padding: 14px 18px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      background: linear-gradient(90deg, var(--header-g1), var(--header-g2), var(--header-g3));
    }
    .title-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }
    .brand-block { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
    .kicker {
      font-size: 10px; font-weight: 600; letter-spacing: 0.08em;
      color: var(--kicker); text-transform: uppercase;
    }
    .title {
      font-size: 18px; font-weight: 700; color: #fff; letter-spacing: -0.02em;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .live-pill {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 5px 10px; border-radius: 999px;
      background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.2);
      color: var(--live-fg); font-size: 11px; font-weight: 500;
      white-space: nowrap;
    }
    .live-dot {
      width: 6px; height: 6px; border-radius: 999px; background: #4ADE80;
    }
    .segment {
      display: flex; gap: 4px; padding: 4px;
      border-radius: 12px; background: var(--segment-track);
      border: 1px solid rgba(255,255,255,0.1);
    }
    .seg {
      flex: 1; text-align: center;
      padding: 7px 10px; border-radius: 9px;
      font-size: 12px; font-weight: 500;
      color: var(--segment-idle); cursor: default;
      border: 0; background: transparent;
    }
    .seg.active {
      background: var(--segment-active-bg);
      color: var(--segment-active-fg);
      font-weight: 600;
    }
    .rail {
      flex: 1 1 auto;
      display: flex; gap: 12px;
      padding: 14px 16px 10px;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
    }
    .rail::-webkit-scrollbar { height: 4px; }
    .rail::-webkit-scrollbar-thumb {
      background: rgba(148,163,184,0.35); border-radius: 999px;
    }
    .card {
      flex: 0 0 214px;
      scroll-snap-align: start;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      overflow: hidden;
      display: flex; flex-direction: column;
    }
    .hero {
      height: 88px;
      position: relative;
      display: flex; align-items: flex-start; justify-content: flex-end;
      padding: 8px;
    }
    .hero-emoji {
      position: absolute; inset: 0;
      display: grid; place-items: center;
      font-size: 36px; opacity: 0.9;
      pointer-events: none;
    }
    .badge {
      position: relative; z-index: 1;
      font-size: 10px; font-weight: 700;
      padding: 4px 8px; border-radius: 999px;
      background: var(--hero-badge); color: #fff;
    }
    .body {
      padding: 10px 12px 12px;
      display: flex; flex-direction: column; gap: 6px;
    }
    .brand-label {
      font-size: 10px; font-weight: 600; letter-spacing: 0.06em;
      text-transform: uppercase; color: var(--brand);
    }
    .card-title {
      font-size: 13px; font-weight: 600; line-height: 1.3;
      letter-spacing: -0.01em;
      display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
      overflow: hidden; min-height: 2.6em;
    }
    .stars { display: flex; align-items: center; gap: 2px; }
    .stars svg { width: 12px; height: 12px; display: block; }
    .rating-num {
      font-size: 11px; font-weight: 600; color: var(--muted); margin-left: 4px;
    }
    .price-row { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
    .was {
      font-size: 11px; color: var(--muted); text-decoration: line-through;
    }
    .now { font-size: 16px; font-weight: 700; letter-spacing: -0.02em; }
    .savings {
      align-self: flex-start;
      font-size: 10px; font-weight: 600;
      padding: 3px 7px; border-radius: 6px;
      background: var(--save-bg); color: var(--save-fg);
      border: 1px solid var(--save-bd);
    }
    .compare-wrap { flex: 0 0 auto; padding: 0 16px 8px; }
    .compare {
      display: flex; align-items: center; gap: 14px;
      padding: 10px 14px; border-radius: 14px;
      background: var(--surface); border: 1px solid var(--border);
    }
    .compare-col { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
    .compare-col .l {
      font-size: 9px; font-weight: 700; letter-spacing: 0.05em;
      text-transform: uppercase;
    }
    .compare-col .l.best { color: var(--compare-label-best); }
    .compare-col .l.rate { color: var(--compare-label-rate); }
    .compare-col .l.save { color: var(--compare-label-save); }
    .compare-col .v {
      font-size: 13px; font-weight: 600;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .compare-div {
      width: 1px; height: 28px; background: var(--border); flex: 0 0 auto;
    }
    .sticky-cta {
      flex: 0 0 auto;
      display: flex; align-items: center; justify-content: space-between; gap: 12px;
      padding: 12px 16px 14px;
      background: var(--cta-bar);
      border-top: 1px solid var(--border);
      box-shadow: 0 -4px 16px rgba(0,0,0,0.12);
    }
    .cta-copy { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
    .cta-copy strong { font-size: 13px; font-weight: 600; }
    .cta-copy span { font-size: 11px; color: var(--muted); }
    .cta-btn {
      appearance: none; border: 0; cursor: pointer;
      padding: 10px 18px; border-radius: 12px;
      font-size: 13px; font-weight: 700; color: #fff;
      background: linear-gradient(90deg, #6366F1, #EC4899);
      white-space: nowrap; text-decoration: none;
      display: inline-flex; align-items: center;
    }
    .cta-btn:hover { filter: brightness(1.06); }
    .empty {
      padding: 32px 24px; text-align: center; color: var(--muted); font-size: 13px;
    }
  </style>
</head>
<body>
  <div class="shell" id="app">
    <div class="empty">Teklifler yükleniyor…</div>
  </div>
  <script>
    const PLATFORMS = ["Tümü", "ChatGPT", "Claude", "Gemini"];
    const STAR = (filled) =>
      '<svg viewBox="0 0 24 24" fill="' + (filled ? "#FBBF24" : "var(--star-empty)") + '"><path d="M12 2l2.9 6.3L22 9.3l-5 4.9 1.2 7-6.2-3.3L5.8 21.2 7 14.2 2 9.3l7.1-1z"/></svg>';

    function formatPrice(n) {
      try {
        return new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(n);
      } catch {
        return n + " TRY";
      }
    }

    function starsHtml(rating) {
      const r = Number(rating) || 0;
      let html = '<div class="stars">';
      for (let i = 1; i <= 5; i++) html += STAR(i <= Math.round(r));
      html += '<span class="rating-num">' + (r ? r.toFixed(1) : "—") + "</span></div>";
      return html;
    }

    function savingsLabel(o) {
      if (o.saveLabel) return o.saveLabel;
      if (o.wasPriceTry != null && o.priceTry != null && o.wasPriceTry > o.priceTry) {
        const diff = o.wasPriceTry - o.priceTry;
        const pct = Math.round((diff / o.wasPriceTry) * 100);
        return "Save " + formatPrice(diff) + " · %" + pct;
      }
      const h = (o.highlights || [])[0];
      return h || "Özel teklif";
    }

    function heroStyle(o) {
      const from = o.heroFrom || "#1E3A8A";
      const to = o.heroTo || "#3B82F6";
      return "background:linear-gradient(135deg," + from + "," + to + ")";
    }

    function render(payload) {
      const app = document.getElementById("app");
      const offers = Array.isArray(payload?.offers) ? payload.offers : [];
      const motto = payload?.motto || "En iyi teklifler, tek MCP";
      const activePlatform = payload?.platform || "Tümü";
      const compare = Array.isArray(payload?.compare) ? payload.compare : offers.slice(0, 3);

      if (!offers.length) {
        app.innerHTML = '<div class="empty">Gösterilecek teklif yok. search_offers veya compare_offers çağırın.</div>';
        return;
      }

      const segs = PLATFORMS.map((p) => {
        const active = p.toLowerCase() === String(activePlatform).toLowerCase() ||
          (p === "Tümü" && !["chatgpt","claude","gemini"].includes(String(activePlatform).toLowerCase()));
        return '<button type="button" class="seg' + (active ? " active" : "") + '">' + p + "</button>";
      }).join("");

      const cards = offers.slice(0, 6).map((o) => {
        const badge = o.badge
          ? '<span class="badge">' + escapeHtml(o.badge) + "</span>"
          : "";
        const was = o.wasPriceTry != null
          ? '<span class="was">' + formatPrice(o.wasPriceTry) + "</span>"
          : "";
        const href = o.trackedUrl || o.baseUrl || "#";
        return (
          '<article class="card">' +
            '<div class="hero" style="' + heroStyle(o) + '">' +
              '<div class="hero-emoji">' + (o.imageEmoji || "🎁") + "</div>" +
              badge +
            "</div>" +
            '<div class="body">' +
              '<div class="brand-label">' + escapeHtml(o.brand) + "</div>" +
              '<div class="card-title">' + escapeHtml(o.title) + "</div>" +
              starsHtml(o.rating) +
              '<div class="price-row">' + was +
                '<span class="now">' + formatPrice(o.priceTry) + "</span>" +
              "</div>" +
              '<div class="savings">' + escapeHtml(savingsLabel(o)) + "</div>" +
            "</div>" +
          "</article>"
        );
      }).join("");

      const byPrice = [...compare].sort((a, b) => (a.priceTry || 0) - (b.priceTry || 0));
      const byRating = [...compare].sort((a, b) => (b.rating || 0) - (a.rating || 0));
      const bestPrice = byPrice[0];
      const bestRate = byRating[0];
      let totalSave = 0;
      for (const o of compare) {
        if (o.wasPriceTry != null && o.priceTry != null && o.wasPriceTry > o.priceTry) {
          totalSave += o.wasPriceTry - o.priceTry;
        }
      }

      app.innerHTML =
        '<div class="glass-header">' +
          '<div class="title-row">' +
            '<div class="brand-block">' +
              '<div class="kicker">TEKLİF · MCP OFFERS</div>' +
              '<div class="title">' + escapeHtml(motto) + "</div>" +
            "</div>" +
            '<div class="live-pill"><span class="live-dot"></span>Live · ' + offers.length + " offers</div>" +
          "</div>" +
          '<div class="segment">' + segs + "</div>" +
        "</div>" +
        '<div class="rail">' + cards + "</div>" +
        '<div class="compare-wrap"><div class="compare">' +
          '<div class="compare-col"><span class="l best">EN İYİ FİYAT</span><span class="v">' +
            escapeHtml(bestPrice ? bestPrice.brand.split(" ")[0] + " · " + formatPrice(bestPrice.priceTry) : "—") +
          "</span></div>" +
          '<div class="compare-div"></div>' +
          '<div class="compare-col"><span class="l rate">EN YÜKSEK PUAN</span><span class="v">' +
            escapeHtml(bestRate ? bestRate.brand.split(" ")[0] + " · " + (bestRate.rating || "—") + "★" : "—") +
          "</span></div>" +
          '<div class="compare-div"></div>' +
          '<div class="compare-col"><span class="l save">TOPLAM TASARRUF</span><span class="v">' +
            (totalSave > 0 ? formatPrice(totalSave) + "+" : "—") +
          "</span></div>" +
        "</div></div>" +
        '<div class="sticky-cta">' +
          '<div class="cta-copy"><strong>Teklifini AI’ya bağla</strong><span>ChatGPT · Claude · Gemini — tek MCP</span></div>' +
          '<a class="cta-btn" href="https://example.com/demo/teklif-mcp/connect" target="_blank" rel="noopener noreferrer">MCP’yi bağla →</a>' +
        "</div>";
    }

    function escapeHtml(s) {
      return String(s ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
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
        motto: "En iyi teklifler, tek MCP",
        platform: "Tümü",
        offers: [
          { id: "rent-eco-i20", brand: "AnadoluDrive (örnek)", title: "Hyundai i20 — Günlük kiralama", priceTry: 1290, wasPriceTry: 1790, badge: "-28%", rating: 4.8, highlights: ["Tam kasko", "Sınırsız km"], imageEmoji: "🚗", heroFrom: "#1E3A8A", heroTo: "#3B82F6", trackedUrl: "https://example.com/demo/anadoludrive/i20" },
          { id: "rent-suv-tucson", brand: "AnadoluDrive (örnek)", title: "Hyundai Tucson — SUV günlük", priceTry: 2490, wasPriceTry: 2990, badge: "HOT", rating: 4.6, highlights: ["7 koltuk opsiyonu"], imageEmoji: "🚙", heroFrom: "#065F46", heroTo: "#34D399", trackedUrl: "https://example.com/demo/anadoludrive/tucson" },
          { id: "shop-robot-vacuum", brand: "Nodify Market (örnek)", title: "Robot süpürge X200 — Demo", priceTry: 6499, wasPriceTry: 7999, badge: "-19%", rating: 4.5, highlights: ["LiDAR"], imageEmoji: "🤖", heroFrom: "#9A3412", heroTo: "#FB923C", trackedUrl: "https://example.com/demo/nodify/robot-x200" },
          { id: "shop-espresso", brand: "KahveKöşk (örnek)", title: "Espresso makinesi Barista Mini", priceTry: 4290, wasPriceTry: 5050, badge: "%15 indirim", rating: 4.7, highlights: ["15 bar"], imageEmoji: "☕", heroFrom: "#78350F", heroTo: "#D97706", trackedUrl: "https://example.com/demo/kahvekosk/barista-mini" }
        ]
      });
    }
  </script>
</body>
</html>`;
}
