/**
 * Operator-owned offers from https://aegisscanner.com/landing#pricing
 * Fetched 2026-11-05 (Europe/Istanbul). Do not invent prices or features.
 * Dimmed / excluded plan features on that page are omitted.
 */

export type OfferCategory = "one_time" | "monthly" | "addon";

export type Offer = {
  id: string;
  brand: string;
  title: string;
  category: OfferCategory;
  /** Service geography (operator based in Türkiye) */
  city: string;
  priceTry: number;
  /** Billing unit as shown on the pricing page */
  priceUnit: "one_time" | "per_month" | "per_apk" | "from_one_time";
  currency: "TRY";
  /** Objective label only — no promotional wording */
  badge?: string;
  rating?: number;
  highlights: string[];
  /** Provider page on aegisscanner.com (operator-owned) */
  baseUrl: string;
  imageEmoji: string;
  heroFrom?: string;
  heroTo?: string;
  /** Data provenance shown in text and card outputs */
  source: string;
  isDemo: false;
};

export const OFFER_SOURCE = "aegisscanner.com pricing (operator-owned)";

export const DATA_DISCLAIMER =
  "Offers from operator-owned Aegis Scanner pricing (aegisscanner.com/landing#pricing). Teklif is read-only and does not take payment; checkout or booking happens on the provider site. No paid ranking.";

/** @deprecated alias kept for older call sites */
export const DEMO_DISCLAIMER = DATA_DISCLAIMER;

const PRICING_URL = "https://aegisscanner.com/landing#pricing";

export const OFFERS: Offer[] = [
  {
    id: "aegis-starter",
    city: "Türkiye",
    brand: "Aegis Scanner",
    title: "Starter — KOBİ tek-seferlik denetim (< 5 subdomain)",
    category: "one_time",
    priceTry: 7990,
    priceUnit: "one_time",
    currency: "TRY",
    badge: "one-time",
    highlights: [
      "1 ana domain + alt-domain keşfi (max 5)",
      "Pasif tarama: TLS, DNS, e-posta auth, CVE, KVKK şeffaflık",
      "KVKK madde haritası + ISO 27001 Annex A eşleştirmesi",
      "AI ile hazırlanmış Türkçe yönetici PDF raporu",
      "Bulgu başına çözüm önerisi rehberi",
      "30 dakikalık önceliklendirme görüşmesi",
    ],
    baseUrl: PRICING_URL,
    imageEmoji: "🛡️",
    heroFrom: "#1E3A8A",
    heroTo: "#3B82F6",
    source: OFFER_SOURCE,
    isDemo: false,
  },
  {
    id: "aegis-growth",
    city: "Türkiye",
    brand: "Aegis Scanner",
    title: "Growth — Aylık İzleme",
    category: "monthly",
    priceTry: 2990,
    priceUnit: "per_month",
    currency: "TRY",
    badge: "/mo",
    highlights: [
      "3 hedef domain + sınırsız subdomain",
      "Haftalık otomatik tarama + diff raporu",
      "Yeni CVE / DNS / TLS anomalisi → uyarı",
      "KVKK ve ISO 27001 ön denetim raporu (aylık)",
      "Subdomain takeover izleme",
      "Karanlık ağ sızıntı taraması (HIBP)",
      "Slack / Teams / WhatsApp bildirim",
      "Mobil APK statik analiz (ayda 2 uygulama)",
      "Aylık 15 dk danışma görüşmesi",
    ],
    baseUrl: PRICING_URL,
    imageEmoji: "📡",
    heroFrom: "#065F46",
    heroTo: "#34D399",
    source: OFFER_SOURCE,
    isDemo: false,
  },
  {
    id: "aegis-enterprise",
    city: "Türkiye",
    brand: "Aegis Scanner",
    title: "Enterprise — Banka, e-ticaret, scale-up, holding (özel teklif)",
    category: "one_time",
    priceTry: 19990,
    priceUnit: "from_one_time",
    currency: "TRY",
    badge: "from",
    highlights: [
      "Sınırsız domain + 5-15+ subdomain",
      "Aktif pentest (Mod 2) — yazılı yetki kapsamında",
      "Sektör-özel KVKK + ISO uyum raporu",
      "Mobil APK + iOS IPA tarama (sınırsız)",
      "Tüm OWASP Top 10 + custom testler",
      "Webhook + SIEM (Splunk/QRadar/Elastic) entegrasyonu",
      "Beyaz etiket (özel logo, alan adı)",
      "Retest doğrulaması + denetim kanıt dosyası",
      "7/24 SLA · ayrılmış güvenlik mühendisi",
    ],
    baseUrl: PRICING_URL,
    imageEmoji: "🏢",
    heroFrom: "#4C1D95",
    heroTo: "#A78BFA",
    source: OFFER_SOURCE,
    isDemo: false,
  },
  {
    id: "aegis-monthly-pro",
    city: "Türkiye",
    brand: "Aegis Scanner",
    title: "Aylık Pro",
    category: "monthly",
    priceTry: 6990,
    priceUnit: "per_month",
    currency: "TRY",
    badge: "/mo",
    highlights: [
      "5 domain",
      "Günlük tarama",
      "Slack/Teams entegre",
      "Mobil APK aylık 5 uygulama",
    ],
    baseUrl: PRICING_URL,
    imageEmoji: "⚙️",
    heroFrom: "#0F766E",
    heroTo: "#5EEAD4",
    source: OFFER_SOURCE,
    isDemo: false,
  },
  {
    id: "aegis-monthly-business",
    city: "Türkiye",
    brand: "Aegis Scanner",
    title: "Aylık Business",
    category: "monthly",
    priceTry: 14990,
    priceUnit: "per_month",
    currency: "TRY",
    badge: "/mo",
    highlights: [
      "15 domain",
      "Gerçek zamanlı drift",
      "WhatsApp + retainer",
      "Whitelabel rapor",
    ],
    baseUrl: PRICING_URL,
    imageEmoji: "📈",
    heroFrom: "#9A3412",
    heroTo: "#FB923C",
    source: OFFER_SOURCE,
    isDemo: false,
  },
  {
    id: "aegis-mobile-addon",
    city: "Türkiye",
    brand: "Aegis Scanner",
    title: "Mobil Eklenti (per APK)",
    category: "addon",
    priceTry: 7990,
    priceUnit: "per_apk",
    currency: "TRY",
    badge: "/APK",
    highlights: [
      "Android APK statik + canlı backend tarama",
      "MASVS uyumlu",
      "Derin AI çözüm rehberi",
    ],
    baseUrl: PRICING_URL,
    imageEmoji: "📱",
    heroFrom: "#BE123C",
    heroTo: "#FB7185",
    source: OFFER_SOURCE,
    isDemo: false,
  },
];

export function formatPrice(priceTry: number, unit?: Offer["priceUnit"]): string {
  const base = new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(priceTry);
  if (unit === "per_month") return `${base}/ay`;
  if (unit === "per_apk") return `${base}/APK`;
  if (unit === "from_one_time") return `${base}'dan`;
  if (unit === "one_time") return `${base} (bir kerelik)`;
  return base;
}

/** Case- and Turkish-diacritic-insensitive normalization. */
export function normalizeText(s: string): string {
  return s
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}
