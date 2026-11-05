/** Inline MCP Apps UI — Widget v5 inspired by Dribbble Pricing Card Dark Mode (bebykurniawan); grows to content height (v8) */
export const OFFER_WIDGET_URI = "ui://teklif-mcp/offers-v8.html";

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
      --bg: #060607;
      --bg-elev: #0E0E10;
      --card: #141416;
      --card-border: rgba(239, 240, 246, 0.08);
      --text: #EFF0F6;
      --muted: #BCBEDA;
      --faint: #7A7C96;
      --accent-a: #6462F3;
      --accent-b: #C95CE1;
      --accent-c: #7AA1E2;
      --cta: #FFFFFF;
      --cta-ink: #0A0A0C;
      --ok: #8BE0A0;
      --danger: #FF6B7A;
      --radius-shell: 20px;
      --radius-card: 18px;
      --radius-pill: 999px;
      --font: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
      --mesh-1: radial-gradient(120% 90% at 10% 20%, #6462F3 0%, transparent 55%),
                radial-gradient(100% 80% at 90% 10%, #C95CE1 0%, transparent 50%),
                radial-gradient(90% 100% at 50% 100%, #7AA1E2 0%, transparent 55%),
                linear-gradient(160deg, #1a1630 0%, #0c0c14 100%);
      --mesh-2: radial-gradient(110% 90% at 85% 15%, #C95CE1 0%, transparent 50%),
                radial-gradient(100% 80% at 15% 30%, #6462F3 0%, transparent 55%),
                radial-gradient(80% 90% at 40% 100%, #7AA1E2 0%, transparent 50%),
                linear-gradient(150deg, #201028 0%, #0c0c14 100%);
      --mesh-3: radial-gradient(110% 90% at 20% 10%, #7AA1E2 0%, transparent 50%),
                radial-gradient(100% 80% at 80% 40%, #6462F3 0%, transparent 55%),
                radial-gradient(90% 100% at 60% 100%, #C95CE1 0%, transparent 50%),
                linear-gradient(170deg, #101828 0%, #0c0c14 100%);
      --spot: radial-gradient(ellipse 70% 45% at 50% -10%, rgba(239,240,246,0.14), transparent 60%);
      --glow: 0 0 0 1px rgba(239,240,246,0.12), 0 8px 28px rgba(100,98,243,0.18), 0 2px 10px rgba(255,255,255,0.18);
    }
    @media (prefers-color-scheme: light) {
      :root {
        --bg: #F3F4F8;
        --bg-elev: #FFFFFF;
        --card: #FFFFFF;
        --card-border: rgba(20, 20, 30, 0.08);
        --text: #12121A;
        --muted: #5C5E78;
        --faint: #8A8CA8;
        --cta: #12121A;
        --cta-ink: #FFFFFF;
        --spot: radial-gradient(ellipse 70% 45% at 50% -10%, rgba(100,98,243,0.12), transparent 60%);
        --glow: 0 0 0 1px rgba(20,20,30,0.06), 0 10px 28px rgba(100,98,243,0.16), 0 2px 8px rgba(0,0,0,0.08);
        --mesh-1: radial-gradient(120% 90% at 10% 20%, #6462F3 0%, transparent 55%),
                  radial-gradient(100% 80% at 90% 10%, #C95CE1 0%, transparent 50%),
                  radial-gradient(90% 100% at 50% 100%, #7AA1E2 0%, transparent 55%),
                  linear-gradient(160deg, #c8c6f5 0%, #e8e9f4 100%);
        --mesh-2: radial-gradient(110% 90% at 85% 15%, #C95CE1 0%, transparent 50%),
                  radial-gradient(100% 80% at 15% 30%, #6462F3 0%, transparent 55%),
                  radial-gradient(80% 90% at 40% 100%, #7AA1E2 0%, transparent 50%),
                  linear-gradient(150deg, #e6c4f0 0%, #e8e9f4 100%);
        --mesh-3: radial-gradient(110% 90% at 20% 10%, #7AA1E2 0%, transparent 50%),
                  radial-gradient(100% 80% at 80% 40%, #6462F3 0%, transparent 55%),
                  radial-gradient(90% 100% at 60% 100%, #C95CE1 0%, transparent 50%),
                  linear-gradient(170deg, #c5d6f5 0%, #e8e9f4 100%);
      }
    }
    * { box-sizing: border-box; }
    html, body {
      margin: 0; padding: 0;
      height: auto;
      font-family: var(--font);
      background: transparent;
      color: var(--text);
      -webkit-font-smoothing: antialiased;
    }
    .shell {
      width: 100%;
      max-width: 720px;
      overflow: visible;
      display: flex;
      flex-direction: column;
      background:
        var(--spot),
        radial-gradient(circle at 1px 1px, rgba(188,190,218,0.12) 1px, transparent 0) 0 0 / 14px 14px,
        var(--bg);
      border: 1px solid var(--card-border);
      border-radius: var(--radius-shell);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);
    }
    /* —— HEADER —— */
    .hdr {
      flex: 0 0 auto;
      display: flex; align-items: center; justify-content: space-between;
      gap: 12px; padding: 12px 14px 8px;
    }
    .brand-block { min-width: 0; }
    .eyebrow {
      font-size: 10px; font-weight: 600; letter-spacing: 0.14em;
      text-transform: uppercase; color: var(--muted); margin-bottom: 2px;
    }
    .title {
      font-size: 15px; font-weight: 650; letter-spacing: -0.02em;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .title span { color: var(--faint); font-weight: 500; }
    .seg {
      display: inline-flex; gap: 4px; padding: 3px;
      background: rgba(62,62,65,0.45);
      border: 1px solid var(--card-border);
      border-radius: var(--radius-pill);
      flex: 0 0 auto;
    }
    @media (prefers-color-scheme: light) {
      .seg { background: rgba(188,190,218,0.35); }
    }
    .seg button {
      appearance: none; border: 0; cursor: default;
      background: transparent; color: var(--muted);
      font-family: var(--font); font-size: 10px; font-weight: 600;
      letter-spacing: 0.02em; padding: 5px 10px;
      border-radius: var(--radius-pill);
    }
    .seg button.active {
      background: linear-gradient(135deg, var(--accent-a), var(--accent-b));
      color: #fff;
      box-shadow: 0 4px 14px rgba(100,98,243,0.35);
    }
    /* —— CARDS —— */
    .rail {
      flex: 0 0 auto;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      padding: 4px 12px 8px;
    }
    .card {
      display: flex; flex-direction: column;
      background: var(--card);
      border: 1px solid var(--card-border);
      border-radius: var(--radius-card);
      overflow: hidden;
      min-width: 0;
      box-shadow: 0 10px 30px rgba(0,0,0,0.28);
    }
    @media (prefers-color-scheme: light) {
      .card { box-shadow: 0 10px 28px rgba(20,20,40,0.08); }
    }
    .hero {
      position: relative;
      height: 88px;
      padding: 10px 12px;
      display: flex; flex-direction: column; justify-content: space-between;
      color: #fff;
      isolation: isolate;
    }
    .hero::before {
      content: ""; position: absolute; inset: 0; z-index: -1;
      background: var(--mesh-1);
      filter: saturate(1.15) contrast(1.05);
    }
    .card:nth-child(2) .hero::before { background: var(--mesh-2); }
    .card:nth-child(3) .hero::before { background: var(--mesh-3); }
    .hero::after {
      content: ""; position: absolute; inset: 0; z-index: -1;
      background: linear-gradient(180deg, rgba(255,255,255,0.12), transparent 40%, rgba(0,0,0,0.25));
      backdrop-filter: blur(0.5px);
    }
    .pill {
      align-self: flex-start;
      font-size: 9px; font-weight: 700; letter-spacing: 0.06em;
      text-transform: uppercase;
      padding: 3px 8px; border-radius: var(--radius-pill);
      background: rgba(255,255,255,0.18);
      border: 1px solid rgba(255,255,255,0.28);
      backdrop-filter: blur(8px);
      color: #fff;
    }
    .pill.hot {
      background: rgba(255,107,122,0.85);
      border-color: transparent;
    }
    .price-row {
      display: flex; align-items: baseline; justify-content: space-between; gap: 6px;
    }
    .price {
      font-size: 20px; font-weight: 700; letter-spacing: -0.03em;
      font-variant-numeric: tabular-nums;
      text-shadow: 0 2px 12px rgba(0,0,0,0.35);
    }
    .price small {
      font-size: 10px; font-weight: 500; opacity: 0.8; margin-left: 2px;
    }
    .was {
      font-size: 10px; opacity: 0.75;
      text-decoration: line-through;
      font-variant-numeric: tabular-nums;
    }
    .body {
      padding: 10px 12px 12px;
      display: flex; flex-direction: column; gap: 8px; flex: 1;
    }
    .subtitle {
      font-size: 11px; color: var(--muted); line-height: 1.35;
      min-height: 2.6em;
      display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
    }
    .card-cta {
      display: flex; align-items: center; justify-content: center;
      width: 100%; padding: 8px 12px;
      border-radius: var(--radius-pill);
      background: var(--cta); color: var(--cta-ink);
      font-size: 11px; font-weight: 700; letter-spacing: 0.01em;
      text-decoration: none;
      box-shadow: var(--glow);
      border: 0;
    }
    .card-cta:hover { filter: brightness(1.05); }
    .feats {
      list-style: none; margin: 0; padding: 0;
      display: flex; flex-direction: column; gap: 5px;
    }
    .feats li {
      display: flex; align-items: flex-start; gap: 7px;
      font-size: 10px; color: var(--muted); line-height: 1.3;
    }
    .feats li::before {
      content: ""; flex: 0 0 auto; margin-top: 2px;
      width: 12px; height: 12px; border-radius: 50%;
      background:
        radial-gradient(circle at 50% 45%, #fff 0 28%, transparent 30%),
        linear-gradient(135deg, var(--accent-a), var(--accent-b));
      box-shadow: 0 0 0 1px rgba(100,98,243,0.25);
    }
    .brand {
      font-size: 9px; font-weight: 600; letter-spacing: 0.08em;
      text-transform: uppercase; color: var(--faint);
    }
    /* —— COMPARE —— */
    .compare-wrap {
      flex: 0 0 auto; overflow: visible;
      margin: 0 12px; padding: 0;
      background: var(--bg-elev);
      border: 1px solid var(--card-border);
      border-radius: 14px;
    }
    .section-label {
      display: flex; align-items: center; justify-content: space-between;
      padding: 7px 12px;
      font-size: 9px; font-weight: 700; letter-spacing: 0.12em;
      text-transform: uppercase; color: var(--faint);
      border-bottom: 1px solid var(--card-border);
    }
    table { width: 100%; border-collapse: collapse; font-size: 11px; font-variant-numeric: tabular-nums; }
    th, td { padding: 6px 10px; text-align: left; border-bottom: 1px solid var(--card-border); }
    th {
      font-size: 9px; font-weight: 700; letter-spacing: 0.08em;
      text-transform: uppercase; color: var(--faint);
    }
    td { color: var(--text); }
    td.num { text-align: right; }
    td.num.best {
      color: #fff;
      font-weight: 700;
    }
    @media (prefers-color-scheme: light) {
      td.num.best { color: var(--accent-a); }
    }
    tr:last-child td { border-bottom: 0; }
    .chip {
      display: inline-flex; align-items: center; gap: 5px;
      padding: 2px 8px; border-radius: var(--radius-pill);
      background: rgba(100,98,243,0.18); color: var(--muted); font-size: 10px;
    }
    .chip .dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: linear-gradient(135deg, var(--accent-a), var(--accent-b));
    }
    /* —— FOOTER CTA —— */
    .cta-bar {
      flex: 0 0 auto;
      display: flex; align-items: center; justify-content: space-between; gap: 12px;
      padding: 10px 14px 12px;
    }
    .cta-copy { min-width: 0; }
    .cta-copy strong {
      display: block; font-size: 12px; font-weight: 650; letter-spacing: -0.01em;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .cta-copy span { font-size: 10px; color: var(--muted); }
    .cta-btn {
      appearance: none; border: 0; cursor: pointer; text-decoration: none;
      display: inline-flex; align-items: center; gap: 8px;
      padding: 9px 16px; border-radius: var(--radius-pill);
      background: var(--cta); color: var(--cta-ink);
      font-family: var(--font); font-size: 11px; font-weight: 700;
      box-shadow: var(--glow);
      white-space: nowrap;
    }
    .cta-btn:hover { filter: brightness(1.05); }
    .empty {
      padding: 36px 16px; text-align: center;
      font-size: 12px; color: var(--muted);
    }
  </style>
</head>
<body>
  <div class="shell" id="app">
    <div class="empty">teklifler yükleniyor…</div>
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

    function savePct(o) {
      if (o.wasPriceTry != null && o.priceTry != null && o.wasPriceTry > o.priceTry) {
        return Math.round(((o.wasPriceTry - o.priceTry) / o.wasPriceTry) * 100);
      }
      return null;
    }

    function featLines(o) {
      const pct = savePct(o);
      const lines = [];
      lines.push(o.brand + " · örnek veri");
      if (o.rating != null) lines.push("Puan " + Number(o.rating).toFixed(1) + " / 5");
      if (pct != null) lines.push("%" + pct + " anlık indirim");
      else lines.push("Canlı MCP teklifi");
      lines.push("ChatGPT · Claude · Gemini");
      return lines.slice(0, 4);
    }

    const CAT_LABEL = { arac_kiralama: "Araç kiralama", e_ticaret: "E-ticaret", kasko: "Kasko", trafik_sigortasi: "Trafik sigortası" };
    function render(payload) {
      const app = document.getElementById("app");
      const offers = Array.isArray(payload?.offers) ? payload.offers : [];
      const motto = payload?.motto || "Tekliflerinizi her yapay zeka sunsun";
      const activePlatform = payload?.platform || "ALL";
      const compare = Array.isArray(payload?.compare) ? payload.compare : offers.slice(0, 4);

      if (!offers.length) {
        app.innerHTML = '<div class="empty">teklif yok — search_offers | compare_offers</div>';
        return;
      }

      const segs = PLATFORMS.map((p) => {
        const ap = String(activePlatform).toLowerCase();
        const active =
          p.toLowerCase() === ap ||
          (p === "ALL" && !["chatgpt", "claude", "gemini"].includes(ap));
        return '<button type="button" class="' + (active ? "active" : "") + '">' + p + "</button>";
      }).join("");

      const cards = offers.slice(0, 3).map((o) => {
        const pct = savePct(o);
        const hot = o.badge && /hot|popüler|premium/i.test(String(o.badge));
        const pillText = hot ? (o.badge || "HOT") : (pct != null ? "-" + pct + "%" : (o.badge || "TEKLİF"));
        const href = o.trackedUrl || o.baseUrl || "#";
        const feats = featLines(o).map((f) => "<li>" + escapeHtml(f) + "</li>").join("");
        return (
          '<article class="card">' +
            '<div class="hero">' +
              '<span class="pill' + (hot ? " hot" : "") + '">' + escapeHtml(pillText) + "</span>" +
              '<div class="price-row">' +
                '<div class="price">' + formatPrice(o.priceTry) + "<small>/teklif</small></div>" +
                (o.wasPriceTry != null ? '<div class="was">' + formatPrice(o.wasPriceTry) + "</div>" : "") +
              "</div>" +
            "</div>" +
            '<div class="body">' +
              '<div class="brand">' + escapeHtml(o.brand) + "</div>" +
              '<div class="subtitle">' + escapeHtml(o.title) + "</div>" +
              '<div class="subtitle">📍 ' + escapeHtml(o.city || "—") + " · " + escapeHtml(CAT_LABEL[o.category] || o.category || "") + "</div>" +
              '<a class="card-cta" href="' + escapeAttr(href) + '" target="_blank" rel="noopener noreferrer">Teklifi aç</a>' +
              '<ul class="feats">' + feats + '</ul>' +
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
            '<td><span class="chip"><span class="dot"></span>' + escapeHtml(o.brand.split(" ")[0]) + "</span></td>" +
            "<td>" + escapeHtml(o.title) + (o.city ? " · " + escapeHtml(o.city) : "") + "</td>" +
            '<td class="num' + (best ? " best" : "") + '">' + formatPrice(o.priceTry) + "</td>" +
            '<td class="num">' + (pct != null ? "-" + pct + "%" : "—") + "</td>" +
          "</tr>"
        );
      }).join("");

      app.innerHTML =
        '<div class="hdr">' +
          '<div class="brand-block"><div class="eyebrow">Teklif MCP · v8</div>' +
          '<div class="title">' + escapeHtml(motto) + ' <span>/ örnek</span></div></div>' +
          '<div class="seg">' + segs + "</div>" +
        "</div>" +
        '<div class="rail">' + cards + "</div>" +
        '<div class="compare-wrap">' +
          '<div class="section-label"><span>Karşılaştır</span><span>fiyat ↑</span></div>' +
          "<table><thead><tr><th>Marka</th><th>Teklif</th><th style='text-align:right'>Şimdi</th><th style='text-align:right'>Δ</th></tr></thead>" +
          "<tbody>" + rows + "</tbody></table>" +
        "</div>" +
        '<div class="cta-bar">' +
          '<div class="cta-copy"><strong>Her yapay zekada aynı teklifler</strong><span>ChatGPT · Claude · Gemini — tek MCP</span></div>' +
          '<a class="cta-btn" href="https://example.com/demo/teklif-mcp/connect" target="_blank" rel="noopener noreferrer">MCP bağla</a>' +
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

    // ---- MCP Apps bridge (SEP-1865, protocol 2026-01-26) ----
    // Preview = served from our own /widget page (top-level or iframed by /preview).
    // Hosts (Claude: nested *.claudemcpcontent.com iframes, ChatGPT) load the ui:// resource
    // via srcdoc/blob/sandbox URL, so pathname never matches. Do NOT use same-origin checks:
    // Claude's outer and inner sandbox iframes share an origin.
    const pn = String(location.pathname || "");
    const isPreview = pn === "/widget" || pn.endsWith("/widget.html") || pn.endsWith("/widget-standalone.html") || !!window.__TEKLIF_PREVIEW__;
    const inHost = !isPreview && window.parent && window.parent !== window;
    let rpcId = 1;
    const pending = {};
    function post(msg) { try { window.parent.postMessage(msg, "*"); } catch (_) {} }
    function request(method, params) {
      const id = rpcId++;
      post({ jsonrpc: "2.0", id, method, params });
      return new Promise((resolve) => { pending[id] = resolve; setTimeout(() => { if (pending[id]) { delete pending[id]; resolve(null); } }, 8000); });
    }
    function notify(method, params) { post({ jsonrpc: "2.0", method, params }); }
    let rendered = false;
    function show(sc) { if (sc) { rendered = true; render(sc); lastH = 0; reportSize(); } }

    window.addEventListener("message", (event) => {
      const data = event.data;
      if (!data) return;
      if (data.jsonrpc === "2.0" && data.id != null && pending[data.id] && !data.method) {
        const r = pending[data.id]; delete pending[data.id]; r(data.result ?? null); return;
      }
      if (data.jsonrpc === "2.0" && data.method === "ui/notifications/tool-input") {
        if (!rendered) document.getElementById("app").innerHTML = '<div class="empty">teklifler aranıyor…</div>';
        reportSize(); return;
      }
      if (data.jsonrpc === "2.0" && data.method === "ui/notifications/host-context-changed") return;
      if (data.jsonrpc === "2.0" && data.method === "ui/notifications/tool-result") {
        show(pickStructured(data.params) || pickStructured(data)); return;
      }
      if (data.jsonrpc === "2.0" && data.method === "ui/resource-teardown" && data.id != null) {
        post({ jsonrpc: "2.0", id: data.id, result: {} }); return;
      }
      if (data.type === "teklif-mcp/preview" && data.payload) show(data.payload);
    });

    let lastH = 0;
    function reportSize() {
      if (!inHost && !window.openai) return;
      requestAnimationFrame(() => {
        const app = document.getElementById("app");
        // Measure content, not the viewport (scrollHeight never shrinks below iframe height)
        const r = app ? app.getBoundingClientRect() : { bottom: 0 };
        const h = Math.max(120, Math.ceil(r.bottom + window.scrollY));
        const w = Math.ceil(document.documentElement.scrollWidth);
        if (h === lastH) return;
        lastH = h;
        try { window.openai?.notifyIntrinsicHeight?.(h); } catch (_) {}
        notify("ui/notifications/size-changed", { width: w, height: h });
      });
    }
    try { const ro = new ResizeObserver(reportSize); ro.observe(document.body); ro.observe(document.getElementById("app")); } catch (_) {}

    // Links: ask host to open (sandboxed iframes may block target=_blank)
    document.addEventListener("click", (e) => {
      const a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
      if (!a || !inHost) return;
      e.preventDefault();
      const url = a.getAttribute("href");
      if (window.openai?.openExternal) { try { window.openai.openExternal({ href: url }); return; } catch (_) {} }
      request("ui/open-link", { url });
    });

    // ChatGPT compatibility: window.openai.toolOutput
    try { if (window.openai?.toolOutput) show(pickStructured(window.openai.toolOutput) || window.openai.toolOutput); } catch (_) {}
    window.addEventListener("openai:set_globals", () => {
      try { if (window.openai?.toolOutput) show(pickStructured(window.openai.toolOutput) || window.openai.toolOutput); } catch (_) {}
    });

    if (window.__TEKLIF_PREVIEW__) {
      show(window.__TEKLIF_PREVIEW__);
    } else if (inHost) {
      if (!rendered) document.getElementById("app").innerHTML = '<div class="empty">teklifler yükleniyor…</div>';
      request("ui/initialize", {
        appInfo: { name: "teklif-mcp-widget", version: "8.0.0" },
        clientInfo: { name: "teklif-mcp-widget", version: "8.0.0" },
        appCapabilities: { availableDisplayModes: ["inline"] },
        protocolVersion: "2026-01-26"
      }).then((res) => {
        notify("ui/notifications/initialized", {});
        lastH = 0; reportSize();
        // Some hosts include the latest tool result in context; tool-result notification is canonical.
        const sc = res && res.hostContext && pickStructured(res.hostContext.toolResult);
        if (sc && !rendered) show(sc);
      });
    } else {
      show({
        motto: "Tekliflerinizi her yapay zeka sunsun",
        platform: "ALL",
        offers: [
          { id: "kasko-ist-genis", city: "İstanbul", category: "kasko", brand: "Kalkan Sigorta (örnek)", title: "Genişletilmiş Kasko — Yıllık", priceTry: 18900, wasPriceTry: 22400, badge: "-16%", trackedUrl: "https://example.com/demo/kasko-ist-genis" },
          { id: "rent-eco-i20", city: "İstanbul", category: "arac_kiralama", brand: "AnadoluDrive (örnek)", title: "Hyundai i20 — Günlük kiralama", priceTry: 1290, wasPriceTry: 1790, badge: "-28%", trackedUrl: "https://example.com/demo/anadoludrive/i20" },
          { id: "shop-espresso", city: "İzmir", category: "e_ticaret", brand: "KahveKöşk (örnek)", title: "Espresso makinesi Barista Mini", priceTry: 4290, wasPriceTry: 5050, badge: "%15", trackedUrl: "https://example.com/demo/kahvekosk/barista-mini" }
        ]
      });
    }
  </script>
</body>
</html>`;
}
