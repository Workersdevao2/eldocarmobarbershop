# Eldo Carmo Barber Shop — eldocarmobarbershop.com

### 2026-09-30 — Desktop Discovery nav (music apps on hover)
- Added **Discovery** item to desktop nav on ECB + ECG
- On hover / focus: dropdown with YouTube, Spotify, Apple Music, Deezer, YouTube Music (same links as mobile drawer)
- Files changed:
  - `barbershop/index.html`
  - `barbershop/minibar.html`
  - `barbershop/css/style.css`
  - `glamorize/index.html`
  - `glamorize/css/style.css`


Static single-page (plus Mini-Bar page) for Eldo Carmo Barber Shop, Luanda / Lubango.  
No build step — pure HTML / CSS / JS for Cloudflare Pages.

---

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Main site: hero, services, experience, Mini-Bar teaser, gallery, Lubango CTA, booking |
| `minibar.html` | **Eldo Carmo Mini-Bar** — full product catalog (snacks, cocktails & beverages) |
| `checkout.html` | **Checkout** — order summary + customer details → WhatsApp |

---

## Key features

- **Hero sequence** — still photo (5s) → video 1 (full) → video 2 (full) → loop  
  Dots at bottom indicate 3 slides; clickable to jump
- **Client-side cart** (`localStorage`) shared across `index.html`, `minibar.html`, `checkout.html`
  - Quantity **+ / −**
  - **Limpar carrinho**
  - **Finalizar pedido** → `checkout.html` → WhatsApp (pre-filled → +244 923 929 074)
- **Checkout** — product images, qty controls, name / phone / pickup / notes
- **Mini-Bar** — separate page; home shows one clickable lifestyle card (Scookiie)
- **Booking form** → WhatsApp
- **Lubango recruitment** CTA → +244 924 071 971
- Full product images (`object-fit: contain`, no crop)

---

## Structure

```
barbershop/
├── index.html
├── minibar.html
├── checkout.html
├── css/style.css
├── js/main.js          # hamburger, hero sequence, cart, checkout, forms
├── assets/
│   ├── icons/          # music platforms (YouTube, Spotify, Apple, Deezer, YT Music)
│   ├── images/         # logo, hero still, gallery-01…07, services, lubango, minibar
│   ├── products/       # Scookiie ×3, Água Pura, Coca-Cola, Cuca
│   └── videos/         # hero.mp4, experience clips + posters
└── README.md
```

---

## Deploy

Push this folder to its own GitHub repo → Cloudflare Pages  
**Framework:** None · **Output directory:** `/`

---

## Changelog (important)

### 2026-10-05 — Checkout page
- New `checkout.html` — order summary with product images + qty controls
- Customer form: name, phone, pickup/delivery, notes
- Cart drawer CTA **Finalizar pedido** → `checkout.html` (was direct WhatsApp)
- Submit opens WhatsApp with full order + customer data pre-filled
- Files: `checkout.html`, `css/style.css`, `js/main.js`, `index.html`, `minibar.html`

### 2026-10-05 — Checkout page
- New `checkout.html` — order summary with product images + qty controls
- Customer form: name, phone, pickup/delivery, notes
- Cart drawer CTA **Finalizar pedido** → `checkout.html` (was direct WhatsApp)
- Submit opens WhatsApp with full order + customer data pre-filled
- Files: `checkout.html`, `css/style.css`, `js/main.js`, `index.html`, `minibar.html`

### 2026-10-05 — Remove hero-2
- Removed second hero video (`hero-video-2` / `hero-2.mp4`) and its dot
- Hero sequence is now: still 5s → video 1 full → loop
- Files: `index.html`, `js/main.js`

### 2026-10-05 — Asset cleanup
- Removed unused images not referenced in HTML/CSS/JS:
  - cuts-*.webp (5), exterior-*.webp (2), interior-*.webp (5), owner-suit.webp
  - chocolate-closeup / chocolate-display / chocolate-ginguba.webp
- Gallery remains `gallery-01` … `gallery-07` only
- Products remain Scookiie ×3 + Água + Coca-Cola + Cuca

### 2026-09-29 — Hero media
- Added `hero.webp` (Johnny + mural) as opening still
- Added `hero.mp4` (muted, portrait)
- Sequence: still 5s → video 1 full → loop
- Hero dots (2) for slide count / navigation
- Dark gradient overlay for text legibility

### 2026-09-29 — Mini-Bar page
- New `minibar.html` — full product grid + cart
- Home: section header (No espaço / Mini-Bar / intro) + image card with transparent **Compre agora** button at bottom of image only
- Nav link: **Mini-Bar** → `minibar.html`
- Cart shared via `localStorage` between both pages

### 2026-09-29 — Products & cart
- Replaced Snack Sortido with **Cuca**; individual Scookiie (Menta, Ginguba, Ao Leite)
- Product images full / uncropped (`object-fit: contain`)
- Cart: **+ / −**, **Limpar carrinho**, **Encomendar via WhatsApp**

### 2026-09-29 — Gallery & Lubango
- Gallery replaced with 7 new cut photos (`gallery-01` … `gallery-07`)
- Lubango CTA: full-bleed night landmark image + dark gradient; all text overlaid
- Removed unused media (old gallery/product placeholders, unused Glamorize image)

### 2026-09-30 — Header & menu
- Top announcement bar: “Já disponível — Tá Queimar” → YouTube
- Header transparent on hero, solid when scrolled (Kylie-style)
- Desktop: logo centered **above** horizontal nav (Kylie-style)
- Mobile: logo centered; hamburger left → solid left drawer (not transparent)
- Text logo only (no image): **ELDO CARMO BARBERSHOP** / **JOHNNY BERRY** centered (Kylie-style)
- **Portal** link in desktop nav + mobile drawer
- Discovery: music logos + links; desktop Discovery label white on transparent header
- Experience: regenerated posters (reabertura/transformação); playback with sound on
- Hero: no “Barber Shop · Luanda”; fixed ghost CTA
- Hero media: mobile crop unchanged; desktop uses centered cover so portrait video/image fills the screen
- Mini-Bar: full-bleed hero under transparent header (same style as homepage)

### 2026-09-30 — Mini-Bar header match homepage
- Mini-Bar hero sits under fixed transparent header (white logo / hamburger / cart)
- On scroll → solid cream header (`.is-scrolled`), same as homepage
- Taller hero + overlay padding clears announce bar + nav

### 2026-09-30 — Agendar layout
- Booking form first; contact info stacked under form
- Instagram / Facebook as SVG icon buttons

### Earlier
- Services grid, experience video cards, booking form, footer / portal link
- Contact & WhatsApp numbers wired for Luanda and Lubango

### 2026-09-30 — Fix Discovery dropdown hover gap
- Dropdown no longer closes while moving the cursor onto a music link
- Files: `barbershop/css/style.css`, `glamorize/css/style.css`

