# Teklif MCP

Neutral, user-initiated **offer search and comparison** exposed as a remote MCP server with an interactive card widget.

> Website motto (site only, not in tool outputs): *Tekliflerinizi her yapay zeka sunsun*

**Current catalog:** operator-owned [Aegis Scanner](https://aegisscanner.com/landing#pricing) security plans (source field = `aegisscanner.com pricing (operator-owned)`). Teklif does **not** take payment or book anything; links open the provider site. There is **no paid ranking**, sponsored placement or affiliate tracking.

**Operator model:** Teklif is run by the operator (agency). Today it surfaces the operator’s own product plans. The same connector pattern is intended later as a service offered to other companies — still without paid ranking unless that is explicitly disclosed.

## What it does

- TypeScript **remote MCP** server (`@modelcontextprotocol/sdk`, Streamable HTTP)
- Tools: `search_offers`, `compare_offers`, `get_offer_link`
- MCP Apps UI: `ui://teklif-mcp/offers-v11.html` — offer card carousel
- Sort options: `price` (default), `rating`, `relevance` — transparent, no paid placement
- Every offer includes a `source` field

Live: `https://teklif.niyazi.site` · MCP: `POST https://teklif.niyazi.site/mcp`

## Tools

| Tool | Input | Output |
| --- | --- | --- |
| `search_offers` | `category`, `budget?`, `city?`, `sort_by?` | Matching offers + card UI |
| `compare_offers` | `offer_ids?`, `category?`, `city?`, `sort_by?` | Side-by-side compare + card UI |
| `get_offer_link` | `offer_id` | Provider page URL on aegisscanner.com |

Categories: `one_time`, `monthly`, `addon`, `hepsi` (all).

Annotations: `readOnlyHint: true`, `destructiveHint: false`, `openWorldHint: false` (embedded operator catalog).

## Example prompts

1. Show Aegis Scanner monthly plans under 10000 TL.
2. Compare one-time Aegis offers.
3. Get the link for aegis-starter.
4. List all Aegis Scanner offers sorted by price.

## Setup

```bash
npm install
npm run build
npm start
# Server:  http://127.0.0.1:8787
# MCP:     POST http://127.0.0.1:8787/mcp
# Preview: http://127.0.0.1:8787/preview
```

Env: `PUBLIC_MCP_URL` (production `https://teklif.niyazi.site/mcp`).

## Connect in Claude / ChatGPT

1. Add `https://teklif.niyazi.site/mcp` as a custom connector (no auth).
2. Streamable HTTP · call `search_offers`.

## Privacy & terms

- [Privacy](https://teklif.niyazi.site/privacy.html)
- [Terms](https://teklif.niyazi.site/terms.html)

## Troubleshooting

| Symptom | What to try |
| --- | --- |
| `tools/list` empty / 405 on GET `/mcp` | Use **POST** `/mcp`. |
| Widget blank in Claude | Confirm `PUBLIC_MCP_URL=https://teklif.niyazi.site/mcp`. |
| Offer not found | Call `search_offers` first; use an `id` like `aegis-growth`. |

## Support

GitHub: [nietzische-app/teklif-mcp](https://github.com/nietzische-app/teklif-mcp)

> Support email: **niyazionderr@gmail.com**

## License

MIT
