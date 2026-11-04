/**
 * ÖRNEK VERİ / SAMPLE DEMO DATA
 * Bu dosyadaki tüm teklifler kurgusal demo markaları içindir.
 * Gerçek stok, fiyat veya rezervasyon bağlantısı değildir.
 */

export type OfferCategory = "arac_kiralama" | "e_ticaret";

export type Offer = {
  id: string;
  brand: string;
  title: string;
  category: OfferCategory;
  priceTry: number;
  currency: "TRY";
  badge?: string;
  highlights: string[];
  /** Demo landing — gerçek checkout değil */
  baseUrl: string;
  imageEmoji: string;
  isDemo: true;
};

export const DEMO_DISCLAIMER =
  "Örnek veri: Fiyatlar ve markalar kurgusal demo veridir. Gerçek rezervasyon/satın alma yapılmaz.";

export const OFFERS: Offer[] = [
  {
    id: "rent-eco-i20",
    brand: "AnadoluDrive (örnek)",
    title: "Hyundai i20 — Günlük kiralama",
    category: "arac_kiralama",
    priceTry: 1290,
    currency: "TRY",
    badge: "En uygun",
    highlights: ["Tam kasko", "Sınırsız km", "İstanbul havalimanı teslim"],
    baseUrl: "https://example.com/demo/anadoludrive/i20",
    imageEmoji: "🚗",
    isDemo: true,
  },
  {
    id: "rent-suv-tucson",
    brand: "AnadoluDrive (örnek)",
    title: "Hyundai Tucson — SUV günlük",
    category: "arac_kiralama",
    priceTry: 2490,
    currency: "TRY",
    badge: "Popüler",
    highlights: ["7 koltuk opsiyonu", "Ücretsiz ikinci sürücü", "İptal esnek"],
    baseUrl: "https://example.com/demo/anadoludrive/tucson",
    imageEmoji: "🚙",
    isDemo: true,
  },
  {
    id: "rent-premium-eclass",
    brand: "Boğaziçi Rent (örnek)",
    title: "Mercedes E-Class — Premium",
    category: "arac_kiralama",
    priceTry: 4890,
    currency: "TRY",
    badge: "Premium",
    highlights: ["Şoförlü seçenek", "VIP lounge", "Yakıt dahil paket"],
    baseUrl: "https://example.com/demo/bogazici/eclass",
    imageEmoji: "✨",
    isDemo: true,
  },
  {
    id: "rent-van-transporter",
    brand: "Boğaziçi Rent (örnek)",
    title: "VW Transporter — Grup transfer",
    category: "arac_kiralama",
    priceTry: 3190,
    currency: "TRY",
    highlights: ["9 kişilik", "Bagaj geniş", "Şehirler arası uygun"],
    baseUrl: "https://example.com/demo/bogazici/transporter",
    imageEmoji: "🚐",
    isDemo: true,
  },
  {
    id: "shop-airpods",
    brand: "Nodify Market (örnek)",
    title: "AirPods Pro (2. nesil) — Demo SKU",
    category: "e_ticaret",
    priceTry: 8999,
    currency: "TRY",
    badge: "Hızlı kargo",
    highlights: ["Aynı gün kargo (İstanbul)", "2 yıl garanti", "Kutu hasarsız"],
    baseUrl: "https://example.com/demo/nodify/airpods-pro",
    imageEmoji: "🎧",
    isDemo: true,
  },
  {
    id: "shop-robot-vacuum",
    brand: "Nodify Market (örnek)",
    title: "Robot süpürge X200 — Demo",
    category: "e_ticaret",
    priceTry: 6499,
    currency: "TRY",
    badge: "En uygun",
    highlights: ["LiDAR haritalama", "Otomatik boşaltma", "Taksit seçenekleri"],
    baseUrl: "https://example.com/demo/nodify/robot-x200",
    imageEmoji: "🤖",
    isDemo: true,
  },
  {
    id: "shop-espresso",
    brand: "KahveKöşk (örnek)",
    title: "Espresso makinesi Barista Mini",
    category: "e_ticaret",
    priceTry: 4290,
    currency: "TRY",
    badge: "%15 indirim",
    highlights: ["15 bar basınç", "Süt köpürtücü", "Demo kargo ücretsiz"],
    baseUrl: "https://example.com/demo/kahvekosk/barista-mini",
    imageEmoji: "☕",
    isDemo: true,
  },
  {
    id: "shop-running-shoes",
    brand: "KahveKöşk Sport (örnek)",
    title: "Koşu ayakkabısı TrailRun 5",
    category: "e_ticaret",
    priceTry: 2790,
    currency: "TRY",
    highlights: ["Su itici", "Hafif taban", "30 gün iade"],
    baseUrl: "https://example.com/demo/kahvekosk/trailrun-5",
    imageEmoji: "👟",
    isDemo: true,
  },
];

export function formatPrice(priceTry: number): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(priceTry);
}
