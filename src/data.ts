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
  /** Optional strikethrough / was price for savings callout */
  wasPriceTry?: number;
  currency: "TRY";
  badge?: string;
  rating?: number;
  highlights: string[];
  /** Demo landing — gerçek checkout değil */
  baseUrl: string;
  imageEmoji: string;
  /** CSS gradient stops for image-led hero */
  heroFrom?: string;
  heroTo?: string;
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
    wasPriceTry: 1790,
    currency: "TRY",
    badge: "-28%",
    rating: 4.8,
    highlights: ["Tam kasko", "Sınırsız km", "İstanbul havalimanı teslim"],
    baseUrl: "https://example.com/demo/anadoludrive/i20",
    imageEmoji: "🚗",
    heroFrom: "#1E3A8A",
    heroTo: "#3B82F6",
    isDemo: true,
  },
  {
    id: "rent-suv-tucson",
    brand: "AnadoluDrive (örnek)",
    title: "Hyundai Tucson — SUV günlük",
    category: "arac_kiralama",
    priceTry: 2490,
    wasPriceTry: 2990,
    currency: "TRY",
    badge: "HOT",
    rating: 4.6,
    highlights: ["7 koltuk opsiyonu", "Ücretsiz ikinci sürücü", "İptal esnek"],
    baseUrl: "https://example.com/demo/anadoludrive/tucson",
    imageEmoji: "🚙",
    heroFrom: "#065F46",
    heroTo: "#34D399",
    isDemo: true,
  },
  {
    id: "rent-premium-eclass",
    brand: "Boğaziçi Rent (örnek)",
    title: "Mercedes E-Class — Premium",
    category: "arac_kiralama",
    priceTry: 4890,
    wasPriceTry: 5590,
    currency: "TRY",
    badge: "Premium",
    rating: 4.7,
    highlights: ["Şoförlü seçenek", "VIP lounge", "Yakıt dahil paket"],
    baseUrl: "https://example.com/demo/bogazici/eclass",
    imageEmoji: "✨",
    heroFrom: "#4C1D95",
    heroTo: "#A78BFA",
    isDemo: true,
  },
  {
    id: "rent-van-transporter",
    brand: "Boğaziçi Rent (örnek)",
    title: "VW Transporter — Grup transfer",
    category: "arac_kiralama",
    priceTry: 3190,
    wasPriceTry: 3690,
    currency: "TRY",
    rating: 4.4,
    highlights: ["9 kişilik", "Bagaj geniş", "Şehirler arası uygun"],
    baseUrl: "https://example.com/demo/bogazici/transporter",
    imageEmoji: "🚐",
    heroFrom: "#0F766E",
    heroTo: "#5EEAD4",
    isDemo: true,
  },
  {
    id: "shop-airpods",
    brand: "Nodify Market (örnek)",
    title: "AirPods Pro (2. nesil) — Demo SKU",
    category: "e_ticaret",
    priceTry: 8999,
    wasPriceTry: 10999,
    currency: "TRY",
    badge: "Hızlı kargo",
    rating: 4.9,
    highlights: ["Aynı gün kargo (İstanbul)", "2 yıl garanti", "Kutu hasarsız"],
    baseUrl: "https://example.com/demo/nodify/airpods-pro",
    imageEmoji: "🎧",
    heroFrom: "#1F2937",
    heroTo: "#9CA3AF",
    isDemo: true,
  },
  {
    id: "shop-robot-vacuum",
    brand: "Nodify Market (örnek)",
    title: "Robot süpürge X200 — Demo",
    category: "e_ticaret",
    priceTry: 6499,
    wasPriceTry: 7999,
    currency: "TRY",
    badge: "-19%",
    rating: 4.5,
    highlights: ["LiDAR haritalama", "Otomatik boşaltma", "Taksit seçenekleri"],
    baseUrl: "https://example.com/demo/nodify/robot-x200",
    imageEmoji: "🤖",
    heroFrom: "#9A3412",
    heroTo: "#FB923C",
    isDemo: true,
  },
  {
    id: "shop-espresso",
    brand: "KahveKöşk (örnek)",
    title: "Espresso makinesi Barista Mini",
    category: "e_ticaret",
    priceTry: 4290,
    wasPriceTry: 5050,
    currency: "TRY",
    badge: "%15 indirim",
    rating: 4.7,
    highlights: ["15 bar basınç", "Süt köpürtücü", "Demo kargo ücretsiz"],
    baseUrl: "https://example.com/demo/kahvekosk/barista-mini",
    imageEmoji: "☕",
    heroFrom: "#78350F",
    heroTo: "#D97706",
    isDemo: true,
  },
  {
    id: "shop-running-shoes",
    brand: "KahveKöşk Sport (örnek)",
    title: "Koşu ayakkabısı TrailRun 5",
    category: "e_ticaret",
    priceTry: 2790,
    wasPriceTry: 3490,
    currency: "TRY",
    rating: 4.3,
    highlights: ["Su itici", "Hafif taban", "30 gün iade"],
    baseUrl: "https://example.com/demo/kahvekosk/trailrun-5",
    imageEmoji: "👟",
    heroFrom: "#BE123C",
    heroTo: "#FB7185",
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
