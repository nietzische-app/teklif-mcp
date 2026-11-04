# Teklif MCP

> **Motto:** Tekliflerinizi her yapay zeka sunsun

Markaların tekliflerini **tek bir MCP sunucusu** üzerinden ChatGPT Apps SDK, Claude connectors ve Gemini gibi yapay zeka asistanlarına taşıyan demo MVP.

Bu depo **örnek / kurgusal veri** içerir; gerçek rezervasyon veya ödeme yapılmaz.

## Özet

- TypeScript **remote MCP** sunucusu (`@modelcontextprotocol/sdk`, Streamable HTTP)
- Araçlar: `search_offers`, `compare_offers`, `get_offer_link` (platform UTM: `utm_source=chatgpt|claude|gemini`)
- MCP Apps UI: `ui://teklif-mcp/offers.html` (`text/html;profile=mcp-app`) — teklif kartı carousel + karşılaştırma tablosu (max-height 500px)
- Türkçe araç kiralama + e-ticaret **örnek markalar** (AnadoluDrive, Boğaziçi Rent, Nodify Market, KahveKöşk)

## Problem

Markalar tekliflerini her asistan için ayrı entegrasyon yazmak zorunda kalıyor. ChatGPT eklentileri / Apps, Claude connectors ve Gemini yan yana büyürken **tek bir teklif dağıtım katmanı** eksik.

## Hedef kitle

- Dijital ajanslar ve growth ekipleri
- Sigorta / araç kiralama / e-ticaret / fintech teklif ekipleri
- ChatGPT Apps / Claude connector / MCP Apps geliştiricileri

## Kaynak linkleri

- [Insurify, ChatGPT içinde gerçek zamanlı teklif ve in-chat alışveriş](https://www.prnewswire.com/news-releases/insurify-expands-chatgpt-plugin-with-real-time-personalized-quotes-and-in-chat-shopping-302854708.html)
- [OpenAI: Developers can now submit apps to ChatGPT](https://openai.com/index/developers-can-now-submit-apps-to-chatgpt/)
- [Claude: Building connectors — submission](https://claude.com/docs/connectors/building/submission)
- [MCP Apps duyurusu (2026-01-26)](https://blog.modelcontextprotocol.io/posts/2026-01-26-mcp-apps/)

## Mobbin ilham listesi

> **Not (2026-11-05):** `user-Mobbin` MCP bağlandı ancak arama çağrıları *“Mobbin MCP requires a paid plan”* hatası döndü. Bu yüzden aşağıdaki desenler **genel modern teklif / pricing UI kalıplarına** dayanır; Mobbin ekran URL’leri bu turda toplanamadı. Ücretli plan açıldığında `search_screens` / `search_flows` / `search_sections` ile liste yenilenebilir.

Hedeflenen desenler (UI’da uygulandı):

| Desen | Uygulama |
| --- | --- |
| Yuvarlatılmış kartlar + yumuşak gölge | `.card` `border-radius: 16px` |
| “En uygun” / rozetler | yeşil / amber / mavi badge |
| Yatay carousel (snap) | `.carousel` + `scroll-snap` |
| Fiyat karşılaştırması tablosu | sticky-header’sız sade tablo |
| Dark / light `color-scheme` | `prefers-color-scheme` |
| Sıkı tipografi + 12px meta | Inter / system-ui |
| Claude uyumu | `max-height: 500px` + iç scroll |

İstenen referans sorguları (Mobbin açılınca tekrarlanacak): *car rental price comparison offer cards*, *insurance quote comparison list*, *ecommerce checkout with product offers*, *pricing comparison cards for fintech*.

## Kurulum

```bash
npm install
npm run build
npm start
# Sunucu: http://127.0.0.1:8787
# MCP:    POST http://127.0.0.1:8787/mcp
# Preview: http://127.0.0.1:8787/preview
```

Geliştirme:

```bash
npm run dev
npx tsx scripts/emit-widget.ts   # public/widget*.html üret
```

## ChatGPT’ye bağlama

1. Sunucuyu HTTPS ile yayınlayın (ngrok / Cloudflare Tunnel / hosting).
2. ChatGPT → Settings → Apps / Connectors → geliştirici MCP URL: `https://<host>/mcp`
3. Streamable HTTP transport kullanın.
4. `search_offers` çağrıldığında UI resource `ui://teklif-mcp/offers.html` render edilir (`_meta.ui.resourceUri` + `openai/outputTemplate` alias).
5. Apps gönderimi için: [OpenAI apps submission](https://openai.com/index/developers-can-now-submit-apps-to-chatgpt/)

## Claude’a bağlama

1. Claude connectors dokümantasyonundaki remote MCP adımlarını izleyin: [submission](https://claude.com/docs/connectors/building/submission)
2. MCP Apps UI için: [Claude MCP Apps quickstart](https://claude.com/docs/connectors/building/mcp-apps/quickstart)
3. Widget yüksekliği Claude için **500px** ile sınırlandı.

## Gemini / diğer hosts

Aynı Streamable HTTP uç noktası (`POST /mcp`) MCP konuşan istemcilerde kullanılabilir. `get_offer_link` ile `platform=gemini` seçildiğinde `utm_source=gemini` eklenir.

## Araçlar

| Araç | Girdi | Çıktı |
| --- | --- | --- |
| `search_offers` | `category`, `budget?`, `platform?` | Teklif listesi + UI |
| `compare_offers` | `offer_ids?`, `category?`, `platform?` | Karşılaştırma + UI |
| `get_offer_link` | `offer_id`, `platform` | UTM’li demo link |

## İlk adımlar

1. `npm install && npm run build && npm start`
2. Tarayıcıda `/preview` ile widget’ı görün
3. MCP istemcisi ile `tools/list` → üç aracı doğrulayın
4. `search_offers` `{ "category": "arac_kiralama", "budget": 3000 }`
5. `get_offer_link` `{ "offer_id": "rent-eco-i20", "platform": "chatgpt" }`
6. Gerçek marka API’nizi `src/data.ts` yerine bağlayın; UTM şemasını koruyun

## Lisans

MIT
