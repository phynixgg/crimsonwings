// ---------------------------------------------------------------------------
// Single source of truth for all products.
// Detail pages, the homepage highlight, and the cart all read from here.
//
// To add a product: copy one block, change the `slug` (must be unique and is
// used in the URL /products/<slug>), and add a route folder at
// src/app/products/<slug>/page.jsx that renders <ProductDetailView product={...}/>.
//
// MATERIAL / care copy below is placeholder text — replace with your real
// fabric specs before going live.
// ---------------------------------------------------------------------------

export const products = {
  tshirt: {
    slug: "tshirt",
    name: "赤羽專屬 電競 T-Shirt",
    nameEn: "Akahane Legion Esports T-Shirt",
    price: 899,
    currency: "NT$",
    colors: ["Black", "Gold"],
    badge: "BLACK / GOLD",
    // Real product renders cropped from the official design sheet.
    // Order: front, back, full design sheet.
    images: ["/images/tshirt-front.webp", "/images/tshirt-back.webp", "/images/tshirt-sheet.webp"],
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    shortIntro:
      "低調質感 × 競技精神，赤羽軍團日常戰袍。",
    features: [
      "Breathable athletic fabric",
      "Esports-inspired cutting",
      "Gold Crimson Wings logo",
      "Suitable for daily wear, gaming events, and team gatherings",
    ],
    description:
      "以赤羽軍團象徵 Logo 為核心，融合科技線條與速度感設計，低調質感中展現競技精神。無論日常穿搭、直播活動、同盟聚會，都能展現赤羽軍團的榮耀與信念。",
    material: [
      // From the official design sheet (材質 / MATERIAL)
      "高彈透氣面料 / High-stretch breathable fabric",
      "吸濕排汗 / Moisture-wicking",
      "抗皺耐磨 / Wrinkle- and abrasion-resistant",
      "親膚舒適 / Soft, skin-friendly feel",
      "不易起球 / Anti-pilling",
    ],
    designDetails: [
      "Gold Crimson Wings emblem on the chest",
      "Speed-line tech graphics inspired by the alliance identity",
      "Matte black base with metallic gold accents",
    ],
    // Size guide exactly as provided. Unit: cm.
    sizeGuide: {
      unit: "cm",
      columns: ["Size", "XS", "S", "M", "L", "2XL", "3XL"],
      rows: [
        { label: "Length 衣長", values: [66, 68, 70, 72, 76, 78] },
        { label: "Chest 胸寬", values: [48, 50, 52, 54, 56, 60] },
        { label: "Shoulder 肩寬", values: [44, 46, 48, 52, 54, 56] },
        { label: "Sleeve 袖長", values: [19, 20, 21, 23, 24, 25] },
      ],
      note: "Measurements are flat-lay in cm and may vary ±1–2cm. XL sits between L and 2XL.",
    },
    customization: null,
  },

  jacket: {
    slug: "jacket",
    name: "赤羽軍團 衝鋒衣",
    nameEn: "Akahane Legion Tactical Jacket",
    price: 1899,
    currency: "NT$",
    colors: ["Black", "Gold"],
    badge: "BLACK / GOLD",
    images: ["/images/jacket-front.webp", "/images/jacket-back.webp", "/images/jacket-sheet.webp"],
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    shortIntro:
      "機能風格戰袍，團隊力量與紀律的象徵。",
    features: [
      "Tactical windbreaker design",
      "Water-resistant outdoor style",
      "Gold Crimson Wings back print",
      "Optional member customization: nickname / number / name",
    ],
    description:
      "將赤羽軍團象徵融入機能風格衝鋒衣，以銳利線條與速度感圖騰，展現團隊的力量、紀律與榮耀。兼具機能性與視覺衝擊，打造專屬赤羽軍團的戰袍。",
    material: [
      // From the official design sheet (材質 / MATERIAL)
      "防風防水面料 / Windproof, water-resistant shell",
      "透氣舒適 / Breathable and comfortable",
      "耐磨抗撕裂 / Abrasion- and tear-resistant",
      "內裡抓絨保暖 / Fleece-lined for warmth",
    ],
    designDetails: [
      "Large gold Crimson Wings back print",
      "Sharp tactical paneling and speed-line totems",
      "Matte black shell with muted-gold trims",
    ],
    sizeGuide: {
      unit: "cm",
      columns: ["Size", "XS", "S", "M", "L", "XL", "2XL", "3XL"],
      rows: [
        { label: "Length 衣長", values: [67, 69, 71, 73, 75, 77, 79] },
        { label: "Chest 胸寬", values: [108, 112, 116, 120, 124, 128, 132] },
        { label: "Shoulder 肩寬", values: [46.5, 48, 49.5, 51, 52.5, 54, 55.5] },
        { label: "Sleeve 袖長", values: [62, 63.5, 65, 66.5, 68, 69.5, 71] },
      ],
      note: "Measurements are flat-lay in cm and may vary ±1–2cm.",
    },
    // Member customization options (only the jacket has these).
    customization: {
      title: "成員客製 / Member Customization",
      note: "Optional. Leave blank for the standard design.",
      fields: [
        { key: "nickname", label: "Nickname 暱稱", placeholder: "e.g. Phynix", maxLength: 16 },
        { key: "number", label: "Number 號碼", placeholder: "e.g. 07", maxLength: 4 },
        { key: "name", label: "Name 姓名", placeholder: "e.g. 鳳凰", maxLength: 16 },
        { key: "qr", label: "QR code 連結 (optional)", placeholder: "Paste a URL to encode", maxLength: 200 },
      ],
    },
  },
};

export const productList = [products.tshirt, products.jacket];

export function getProduct(slug) {
  return products[slug] || null;
}
