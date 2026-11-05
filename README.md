# Teklif MCP

Neutral, user-initiated **offer search and comparison** for car rental, e-commerce, comprehensive car insurance (kasko) and compulsory traffic insurance in Turkey — exposed as a remote MCP server with an interactive card widget.

> Website motto (site only, not in tool outputs): *Tekliflerinizi her yapay zeka sunsun*

**All offers are clearly labeled fictional sample data.** No booking, purchase or payment is made through Teklif. There is no paid ranking, sponsored placement or affiliate tracking.

## What it does

- TypeScript **remote MCP** server (`@modelcontextprotocol/sdk`, Streamable HTTP)
- Tools: `search_offers`, `compare_offers`, `get_offer_link`
- MCP Apps UI: `ui://teklif-mcp/offers-v11.html` (`text/html;profile=mcp-app`) — offer card carousel
- Sort options: `price` (default, lowest first), `rating`, `relevance` — transparent, no paid placement
- Every offer includes a `source` field (currently `"Sample data"`)

Live: `https://teklif.niyazi.site` · MCP: `POST https://teklif.niyazi.site/mcp`

## Tools

| Tool | Input | Output |
| --- | --- | --- |
| `search_offers` | `category`, `budget?`, `city?`, `sort_by?` | Matching offers + card UI |
| `compare_offers` | `offer_ids?`, `category?`, `city?`, `sort_by?` | Side-by-side compare + card UI |
| `get_offer_link` | `offer_id` | Provider page URL on teklif.niyazi.site |

Categories: `arac_kiralama` (car rental), `e_ticaret` (e-commerce), `kasko`, `trafik_sigortasi`, `hepsi` (all).

Annotations: `readOnlyHint: true`, `destructiveHint: false`, `openWorldHint: false` (embedded sample data).

## Example prompts

1. Find car rental offers in İstanbul under 3000 TL.
2. Compare kasko (comprehensive car insurance) offers in Ankara.
3. Show me traffic insurance offers in İstanbul and compare the two cheapest.
4. Get the link for the offer rent-eco-i20.

## Setup

```bash
npm install
npm run build
npm start
# Server:  http://127.0.0.1:8787
# MCP:     POST http://127.0.0.1:8787/mcp
# Preview: http://127.0.0.1:8787/preview
```

Development:

```bash
npm run dev
npx tsx scripts/emit-widget.ts   # regenerate public/widget*.html
```

Env: `PUBLIC_MCP_URL` (production default `https://teklif.niyazi.site/mcp`) — used for Claude UI domain hashing.

## Connect in Claude / ChatGPT

1. Add `https://teklif.niyazi.site/mcp` as a custom connector (no auth).
2. Streamable HTTP transport.
3. Call `search_offers` — the card widget renders via `_meta.ui.resourceUri`.

Docs: [Claude connectors submission](https://claude.com/docs/connectors/building/submission) · [MCP Apps](https://blog.modelcontextprotocol.io/posts/2026-01-26-mcp-apps/) · [OpenAI apps](https://openai.com/index/developers-can-now-submit-apps-to-chatgpt/)

## Privacy & terms

- [Privacy](https://teklif.niyazi.site/privacy.html)
- [Terms](https://teklif.niyazi.site/terms.html)

## Troubleshooting

| Symptom | What to try |
| --- | --- |
| `tools/list` empty / 405 on GET `/mcp` | Use **POST** `/mcp` (Streamable HTTP). |
| Widget blank in Claude | Confirm `PUBLIC_MCP_URL=https://teklif.niyazi.site/mcp` on the deployment; Claude hashes this for `ui.domain`. |
| Offer not found | Call `search_offers` first and use an `id` from the result. |
| Unexpected order | Pass `sort_by`: `price` \| `rating` \| `relevance`. Response includes `sortedBy` and `sortNote`. |

## Support

GitHub: [nietzische-app/teklif-mcp](https://github.com/nietzische-app/teklif-mcp)

> Support email: **[PLACEHOLDER — unknown; add a verified contact before directory submission]**

## License

MIT
