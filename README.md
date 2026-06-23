# 赤羽軍團 官方周邊 · Akahane Legion Merch Store

A premium black/gold esports merch store for the Akahane Legion / Crimson Wings (赤羽) brand.
Single-page parallax landing page + product detail pages + cart + mock checkout.

Built with **Next.js 14 (App Router) · React 18 · Tailwind CSS 3 · Framer Motion**.

---

## Run locally

Requires **Node.js 18.17+** (Node 20 LTS recommended) and an internet connection on
the first build (Next.js downloads the Google Fonts at build time).

```bash
npm install
npm run dev
```

Open http://localhost:3000

Production build:

```bash
npm run build
npm run start
```

---

## Project structure

```
akahane-merch/
├─ public/images/                 # SVG placeholders — replace with real photos
├─ src/
│  ├─ app/
│  │  ├─ layout.jsx               # fonts, navbar, footer, providers
│  │  ├─ page.jsx                 # homepage (Hero + Showcase + Highlight + Story)
│  │  ├─ globals.css              # theme tokens + utility classes
│  │  ├─ providers.jsx            # CartProvider + CartDrawer (client)
│  │  ├─ products/tshirt/page.jsx # /products/tshirt
│  │  ├─ products/jacket/page.jsx # /products/jacket
│  │  ├─ cart/page.jsx            # /cart
│  │  └─ checkout/
│  │     ├─ page.jsx              # mock checkout
│  │     └─ success/page.jsx      # order confirmation
│  ├─ components/                 # Navbar, Hero, ModelShowcase, ProductHighlight,
│  │                              # BrandStory, Footer, CartDrawer, ProductDetailView,
│  │                              # SizeGuideTable, SectionEyebrow, Emblem
│  ├─ context/CartContext.jsx     # cart state + localStorage persistence
│  ├─ data/
│  │  ├─ products.js              # ← single source of truth for products
│  │  └─ site.js                  # ← brand strings, social + contact links
│  └─ lib/format.js               # price formatting helpers
├─ tailwind.config.js             # black/gold palette + font families
└─ next.config.mjs
```

---

## How to edit common things

- **Links / email / social:** `src/data/site.js`
- **Product info, prices, sizes, copy, size guides:** `src/data/products.js`
- **Colors & fonts:** `tailwind.config.js`
- **Global styles & button styles:** `src/app/globals.css`

### Add a new product
1. Add a block in `src/data/products.js` with a unique `slug`.
2. Create `src/app/products/<slug>/page.jsx`:
   ```jsx
   import ProductDetailView from "@/components/ProductDetailView";
   import { products } from "@/data/products";
   export default function Page() {
     return <ProductDetailView product={products.<slug>} />;
   }
   ```

---

## Replacing the placeholder images

All images live in `public/images/` as on-brand SVG placeholders. Swap them for real
photos (recommended dark background + gold rim lighting):

| Placeholder file        | Used for                          | Suggested ratio |
|-------------------------|-----------------------------------|-----------------|
| `tshirt-1/2/3.svg`      | T-shirt gallery                   | square (1:1)    |
| `jacket-1/2/3.svg`      | Jacket gallery                    | square (1:1)    |
| `model-male.svg`        | Male model — T-shirt (homepage)   | portrait (4:5)  |
| `model-female.svg`      | Female model — jacket (homepage)  | portrait (4:5)  |

Two ways to replace:
1. **Keep filenames:** drop a real image in and keep the same path (e.g. save as
   `model-male.jpg` and change the path in the relevant file).
2. **Update the paths:** edit the `images` arrays in `src/data/products.js` and the
   `models` array in `src/components/ModelShowcase.jsx`.

If you host photos on an external CDN, add its hostname to `images.remotePatterns`
in `next.config.mjs`.

> The model image paths are noted with a comment in `src/components/ModelShowcase.jsx`.

---

## Cart & checkout

- Cart state is global (`CartContext`) and persists in `localStorage`.
- Add to cart requires a selected size (validated).
- Checkout is a **mock** flow: it collects shipping details, writes a confirmation to
  `localStorage`, clears the cart, and shows `/checkout/success`. **No real payment is
  processed.**

### Adding Stripe later
The checkout is structured so Stripe Checkout can be dropped in via environment
variables. See the comment block at the top of `src/app/checkout/page.jsx` and
`.env.local.example`. In short:
1. `npm install stripe @stripe/stripe-js`
2. Copy `.env.local.example` → `.env.local` and add your keys.
3. Add a server route `src/app/api/checkout/route.js` that builds a Stripe Checkout
   Session and returns its URL.
4. POST the cart to it from `handlePlaceOrder()` and redirect to the session URL.

**Never commit real keys or paste secret keys into shared chats.** Keep
`STRIPE_SECRET_KEY` server-side only.

---

## Design notes

- Palette and type are defined in `tailwind.config.js` (gold `#D4AF37`, near-black inks,
  Orbitron / Rajdhani / Inter / Noto Sans TC).
- The recurring **HUD corner-bracket** frame (`.hud` in `globals.css`) is the signature
  element tying the tactical/alliance identity together.
- Motion (parallax hero, scroll reveals) respects `prefers-reduced-motion`.
