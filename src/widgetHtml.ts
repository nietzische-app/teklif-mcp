/** Inline MCP Apps UI — Widget v4 mechanical/technical (Linear/Vercel/Raycast/TradingView refs), max-height 500px */
export const OFFER_WIDGET_URI = "ui://teklif-mcp/offers.html";

export function buildOfferWidgetHtml(): string {
  return `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Teklif MCP — Offers</title>
  <style>
    :root {
      color-scheme: light dark;
      --bg: #0A0A0A;
      --surface: #111111;
      --surface-2: #161616;
      --border: #2A2A2A;
      --border-strong: #3A3A3A;
      --text: #EDEDED;
      --muted: #8A8A8A;
      --faint: #5A5A5A;
      --accent: #C8FF00;
      --accent-ink: #0A0A0A;
      --danger: #FF3B30;
      --ok: #C8FF00;
      --warn: #FF9F0A;
      --radius: 4px;
      --font: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
      --mono: "SF Mono", "Geist Mono", ui-monospace, Menlo, Consolas, monospace;
      --hair: 1px solid var(--border);
    }
    @media (prefers-color-scheme: light) {
      :root {
        --bg: #F4F4F5;
        --surface: #FFFFFF;
        --surface-2: #F0F0F1;
        --border: #D4D4D8;
        --border-strong: #A1A1AA;
        --text: #18181B;
        --muted: #71717A;
        --faint: #A1A1AA;
        --accent: #65A30D;
        --accent-ink: #FFFFFF;
        --danger: #DC2626;
        --ok: #65A30D;
        --warn: #D97706;
      }
    }
    * { box-sizing: border-box; }
    html, body {
      margin: 0; padding: 0;
      font-family: var(--font);
      background: transparent;
      color: var(--text);
      -webkit-font-smoothing: antialiased;
    }
    .shell {
      width: 100%;
      max-width: 720px;
      max-height: 500px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      background: var(--bg);
      border: var(--hair);
      border-radius: 6px;
    }
    /* —— HEADER —— */
    .hdr {
      flex: 0 0 auto;
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 8px 12px;
      align-items: center;
      padding: 8px 10px;
      border-bottom: var(--hair);
      background: var(--surface);
    }
    .path {
      display: flex; align-items: center; gap: 8px; min-width: 0;
      font-family: var(--mono); font-size: 11px; letter-spacing: 0.02em;
    }
    .led {
      width: 7px; height: 7px; border-radius: 1px;
      background: var(--ok);
      box-shadow: 0 0 0 1px color-mix(in srgb, var(--ok) 40%, transparent);
      flex: 0 0 auto;
    }
    .led.warn { background: var(--warn); box-shadow: none; }
    .path .proto { color: var(--accent); font-weight: 600; }
    .path .rest { color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .meta-right {
      display: flex; align-items: center; gap: 6px;
      font-family: var(--mono); font-size: 10px; color: var(--muted);
    }
    .kbd {
      display: inline-flex; align-items: center; justify-content: center;
      min-width: 18px; height: 18px; padding: 0 5px;
      border: var(--hair); border-bottom-width: 2px; border-radius: 3px;
      background: var(--surface-2);
      font-family: var(--mono); font-size: 10px; color: var(--text);
      line-height: 1;
    }
    .title-row {
      grid-column: 1 / -1;
      display: flex; align-items: baseline; justify-content: space-between; gap: 10px;
    }
    .title {
      font-size: 13px; font-weight: 600; letter-spacing: -0.01em;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .title span { color: var(--muted); font-weight: 500; }
    .count {
      font-family: var(--mono); font-size: 10px; color: var(--muted);
      font-variant-numeric: tabular-nums;
    }
    /* —— PLATFORM SEGMENT —— */
    .seg {
      flex: 0 0 auto;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      border-bottom: var(--hair);
      background: var(--bg);
    }
    .seg button {
      appearance: none; margin: 0; cursor: default;
      border: 0; border-right: var(--hair);
      background: transparent;
      padding: 7px 6px;
      font-family: var(--mono); font-size: 10px; font-weight: 500;
      color: var(--muted); letter-spacing: 0.04em; text-transform: uppercase;
    }
    .seg button:last-child { border-right: 0; }
    .seg button.active {
      color: var(--accent-ink);
      background: var(--accent);
      font-weight: 700;
    }
    /* —— OFFER RAIL —— */
    .rail {
      flex: 0 0 auto;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0;
      border-bottom: var(--hair);
      max-height: 196px;
      overflow: hidden;
    }
    .card {
      display: flex; flex-direction: column; gap: 0;
      border-right: var(--hair);
      background: var(--surface);
      min-width: 0;
    }
    .card:last-child { border-right: 0; }
    .card-top {
      display: flex; align-items: center; justify-content: space-between;
      gap: 6px; padding: 7px 8px;
      border-bottom: var(--hair);
      background: var(--surface-2);
    }
    .id {
      font-family: var(--mono); font-size: 9px; color: var(--faint);
      letter-spacing: 0.06em; text-transform: uppercase;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .badge {
      font-family: var(--mono); font-size: 9px; font-weight: 700;
      padding: 2px 5px; border-radius: 2px;
      background: var(--accent); color: var(--accent-ink);
      letter-spacing: 0.04em; white-space: nowrap;
    }
    .badge.hot { background: var(--danger); color: #fff; }
    .badge.mute { background: transparent; color: var(--muted); border: var(--hair); }
    .card-body { padding: 8px; display: flex; flex-direction: column; gap: 6px; flex: 1; }
    .brand {
      font-family: var(--mono); font-size: 9px; color: var(--muted);
      letter-spacing: 0.08em; text-transform: uppercase;
    }
    .card-title {
      font-size: 12px; font-weight: 600; line-height: 1.25; letter-spacing: -0.01em;
      display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
      overflow: hidden; min-height: 2.5em;
    }
    .stats {
      display: grid; grid-template-columns: 1fr 1fr; gap: 4px 8px;
      font-family: var(--mono); font-size: 10px;
      font-variant-numeric: tabular-nums;
    }
    .stats .l { color: var(--faint); }
    .stats .v { color: var(--text); text-align: right; }
    .stats .v.was { color: var(--muted); text-decoration: line-through; }
    .stats .v.now { color: var(--accent); font-weight: 700; }
    .stats .v.ok { color: var(--ok); }
    .card-foot {
      margin-top: auto;
      display: flex; align-items: center; justify-content: space-between;
      padding-top: 6px; border-top: var(--hair);
      font-family: var(--mono); font-size: 9px; color: var(--muted);
    }
    .card-foot a {
      color: var(--text); text-decoration: none;
      border: var(--hair); padding: 3px 6px; border-radius: 2px;
      background: var(--bg);
    }
    .card-foot a:hover { border-color: var(--accent); color: var(--accent); }
    /* —— COMPARE TABLE —— */
    .compare-wrap {
      flex: 1 1 auto;
      overflow: auto;
      min-height: 0;
      border-bottom: var(--hair);
    }
    .section-label {
      display: flex; align-items: center; justify-content: space-between;
      padding: 5px 8px;
      border-bottom: var(--hair);
      background: var(--surface-2);
      font-family: var(--mono); font-size: 9px; letter-spacing: 0.1em;
      text-transform: uppercase; color: var(--muted);
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 11px;
      font-variant-numeric: tabular-nums;
    }
    th, td {
      padding: 5px 8px;
      text-align: left;
      border-bottom: var(--hair);
      vertical-align: middle;
    }
    th {
      font-family: var(--mono); font-size: 9px; font-weight: 600;
      letter-spacing: 0.08em; text-transform: uppercase;
      color: var(--faint); background: var(--bg);
    }
    td { color: var(--text); }
    td.mono { font-family: var(--mono); font-size: 10px; }
    td.num { font-family: var(--mono); text-align: right; font-size: 11px; }
    td.num.best { color: var(--accent); font-weight: 700; }
    tr:hover td { background: var(--surface-2); }
    .dot {
      display: inline-block; width: 6px; height: 6px; border-radius: 1px;
      background: var(--ok); margin-right: 6px; vertical-align: middle;
    }
    /* —— STICKY CTA —— */
    .cta-bar {
      flex: 0 0 auto;
      display: flex; align-items: center; justify-content: space-between; gap: 10px;
      padding: 8px 10px;
      background: var(--surface);
    }
    .cta-copy {
      display: flex; flex-direction: column; gap: 2px; min-width: 0;
      font-size: 11px;
    }
    .cta-copy strong {
      font-weight: 600; font-size: 12px;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .cta-copy span {
      font-family: var(--mono); font-size: 9px; color: var(--muted);
      letter-spacing: 0.04em;
    }
    .cta-btn {
      appearance: none; border: 0; cursor: pointer; text-decoration: none;
      display: inline-flex; align-items: center; gap: 8px;
      padding: 7px 12px; border-radius: 3px;
      background: var(--accent); color: var(--accent-ink);
      font-family: var(--mono); font-size: 11px; font-weight: 700;
      letter-spacing: 0.04em; text-transform: uppercase;
      white-space: nowrap;
    }
    .cta-btn .kbd {
      background: color-mix(in srgb, var(--accent-ink) 18%, transparent);
      border-color: color-mix(in srgb, var(--accent-ink) 35%, transparent);
      color: var(--accent-ink); border-bottom-width: 2px;
    }
    .cta-btn:hover { filter: brightness(1.08); }
    .empty {
      padding: 28px 16px; text-align: center;
      font-family: var(--mono); font-size: 11px; color: var(--muted);
    }
  </style>
</head>
<body>
  <div class="shell" id="app">
    <div class="empty">loading offers…</div>
  </div>
  <script>
    const PLATFORMS = ["ALL", "ChatGPT", "Claude", "Gemini"];

    function formatPrice(n) {
      try {
        return new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(n);
      } catch {
        return n + " TRY";
      }
    }

    function badgeClass(b) {
      if (!b) return "mute";
      const s = String(b).toLowerCase();
      if (s.includes("hot") || s.includes("popüler") || s.includes("premium")) return "hot";
      if (s.startsWith("-") || s.includes("%") || s.includes("indirim") || s.includes("uygun")) return "";
      return "mute";
    }

    function savePct(o) {
      if (o.wasPriceTry != null && o.priceTry != null && o.wasPriceTry > o.priceTry) {
        return Math.round(((o.wasPriceTry - o.priceTry) / o.wasPriceTry) * 100);
      }
      return null;
    }

    function render(payload) {
      const app = document.getElementById("app");
      const offers = Array.isArray(payload?.offers) ? payload.offers : [];
      const motto = payload?.motto || "offers over mcp — single endpoint";
      const activePlatform = payload?.platform || "ALL";
      const compare = Array.isArray(payload?.compare) ? payload.compare : offers.slice(0, 4);

      if (!offers.length) {
        app.innerHTML = '<div class="empty">no offers — call search_offers | compare_offers</div>';
        return;
      }

      const segs = PLATFORMS.map((p) => {
        const ap = String(activePlatform).toLowerCase();
        const active =
          p.toLowerCase() === ap ||
          (p === "ALL" && !["chatgpt", "claude", "gemini"].includes(ap));
        return '<button type="button" class="' + (active ? "active" : "") + '">' + p + "</button>";
      }).join("");

      const cards = offers.slice(0, 3).map((o, i) => {
        const pct = savePct(o);
        const badge = o.badge
          ? '<span class="badge ' + badgeClass(o.badge) + '">' + escapeHtml(o.badge) + "</span>"
          : (pct != null ? '<span class="badge">-' + pct + "%</span>" : '<span class="badge mute">LIVE</span>');
        const href = o.trackedUrl || o.baseUrl || "#";
        return (
          '<article class="card">' +
            '<div class="card-top"><span class="id">OFFER/' + String(i + 1).padStart(2, "0") + " · " + escapeHtml(o.id) + "</span>" + badge + "</div>" +
            '<div class="card-body">' +
              '<div class="brand">' + escapeHtml(o.brand) + "</div>" +
              '<div class="card-title">' + escapeHtml(o.title) + "</div>" +
              '<div class="stats">' +
                '<span class="l">WAS</span><span class="v was">' + (o.wasPriceTry != null ? formatPrice(o.wasPriceTry) : "—") + "</span>" +
                '<span class="l">NOW</span><span class="v now">' + formatPrice(o.priceTry) + "</span>" +
                '<span class="l">RATING</span><span class="v">' + (o.rating != null ? Number(o.rating).toFixed(1) : "—") + "</span>" +
                '<span class="l">SAVE</span><span class="v ok">' + (pct != null ? pct + "%" : "—") + "</span>" +
              "</div>" +
              '<div class="card-foot">' +
                '<span><span class="dot"></span>SYNCED</span>' +
                '<a href="' + escapeAttr(href) + '" target="_blank" rel="noopener noreferrer">OPEN ↗</a>' +
              "</div>" +
            "</div>" +
          "</article>"
        );
      }).join("");

      const byPrice = [...compare].sort((a, b) => (a.priceTry || 0) - (b.priceTry || 0));
      const bestId = byPrice[0]?.id;

      const rows = compare.map((o) => {
        const best = o.id === bestId;
        const pct = savePct(o);
        return (
          "<tr>" +
            '<td class="mono"><span class="dot"></span>' + escapeHtml(o.brand.split(" ")[0]) + "</td>" +
            "<td>" + escapeHtml(o.title) + "</td>" +
            '<td class="num' + (best ? " best" : "") + '">' + formatPrice(o.priceTry) + "</td>" +
            '<td class="num mono">' + (o.wasPriceTry != null ? formatPrice(o.wasPriceTry) : "—") + "</td>" +
            '<td class="num mono">' + (pct != null ? "-" + pct + "%" : "—") + "</td>" +
            '<td class="num mono">' + (o.rating != null ? Number(o.rating).toFixed(1) : "—") + "</td>" +
          "</tr>"
        );
      }).join("");

      app.innerHTML =
        '<div class="hdr">' +
          '<div class="path"><span class="led"></span><span class="proto">TEKLIF://</span><span class="rest">mcp/offers · streamable-http</span></div>' +
          '<div class="meta-right"><span class="kbd">⌘</span><span class="kbd">K</span><span>actions</span></div>' +
          '<div class="title-row"><div class="title">' + escapeHtml(motto) + ' <span>/ v4</span></div>' +
          '<div class="count">' + offers.length + " ROWS · LIVE</div></div>" +
        "</div>" +
        '<div class="seg">' + segs + "</div>" +
        '<div class="rail">' + cards + "</div>" +
        '<div class="compare-wrap">' +
          '<div class="section-label"><span>COMPARE_MATRIX</span><span>SORT=price ASC</span></div>' +
          "<table><thead><tr>" +
            "<th>BRAND</th><th>OFFER</th><th style='text-align:right'>NOW</th><th style='text-align:right'>WAS</th><th style='text-align:right'>Δ</th><th style='text-align:right'>RTG</th>" +
          "</tr></thead><tbody>" + rows + "</tbody></table>" +
        "</div>" +
        '<div class="cta-bar">' +
          '<div class="cta-copy"><strong>Bind offers to every AI runtime</strong><span>chatgpt · claude · gemini — one mcp</span></div>' +
          '<a class="cta-btn" href="https://example.com/demo/teklif-mcp/connect" target="_blank" rel="noopener noreferrer">Connect MCP <span class="kbd">↵</span></a>' +
        "</div>";
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
        motto: "offers over mcp — single endpoint",
        platform: "ALL",
        offers: [
          { id: "rent-eco-i20", brand: "AnadoluDrive (örnek)", title: "Hyundai i20 — Günlük kiralama", priceTry: 1290, wasPriceTry: 1790, badge: "-28%", rating: 4.8, trackedUrl: "https://example.com/demo/anadoludrive/i20" },
          { id: "rent-suv-tucson", brand: "AnadoluDrive (örnek)", title: "Hyundai Tucson — SUV günlük", priceTry: 2490, wasPriceTry: 2990, badge: "HOT", rating: 4.6, trackedUrl: "https://example.com/demo/anadoludrive/tucson" },
          { id: "shop-robot-vacuum", brand: "Nodify Market (örnek)", title: "Robot süpürge X200 — Demo", priceTry: 6499, wasPriceTry: 7999, badge: "-19%", rating: 4.5, trackedUrl: "https://example.com/demo/nodify/robot-x200" },
          { id: "shop-espresso", brand: "KahveKöşk (örnek)", title: "Espresso makinesi Barista Mini", priceTry: 4290, wasPriceTry: 5050, badge: "%15", rating: 4.7, trackedUrl: "https://example.com/demo/kahvekosk/barista-mini" }
        ]
      });
    }
  </script>
</body>
</html>`;
}
