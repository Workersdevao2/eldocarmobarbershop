# Eldo Carmo Barber Shop — eldocarmobarbershop.com

Static single-page (plus Mini-Bar page) for Eldo Carmo Barber Shop, Luanda / Lubango.  
No build step — pure HTML / CSS / JS for Cloudflare Pages.

---

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Main site: hero, services, experience, Mini-Bar teaser, gallery, Lubango CTA, booking |
| `minibar.html` | **Eldo Carmo Mini-Bar** — full product catalog (snacks, cocktails & beverages) |

---

## Key features

- **Hero sequence** — still photo (5s) → video 1 (full) → video 2 (full) → loop  
  Dots at bottom indicate 3 slides; clickable to jump
- **Client-side cart** (`localStorage`) shared across `index.html` and `minibar.html`
  - Quantity **+ / −**
  - **Limpar carrinho**
  - **Encomendar via WhatsApp** (pre-filled message → +244 923 929 074)
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
├── css/style.css
├── js/main.js          # hamburger, hero sequence, cart, forms
├── assets/
│   ├── images/         # logo, hero, gallery, services, lubango, minibar-card
│   ├── products/       # Scookiie ×3, Água, Coca-Cola, Cuca
│   └── videos/         # hero.mp4, hero-2.mp4, experience clips + posters
└── README.md
```

---

## Deploy

Push this folder to its own GitHub repo → Cloudflare Pages  
**Framework:** None · **Output directory:** `/`

---

## Changelog (important)

### 2026-09-29 — Hero media
- Added `hero.webp` (Johnny + mural) as opening still
- Added `hero.mp4` and `hero-2.mp4` (muted, portrait)
- Sequence: still 5s → video 1 full → video 2 full → loop
- Hero dots (3) for slide count / navigation
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
- Desktop: horizontal nav in header (like Kylie); mobile: hamburger → left drawer
- Logo: **Eldo Carmo Barbershop** + subtitle **Johnny Berry**
- Discovery section: music logos + links
- Hero: removed “Barber Shop · Luanda”; fixed ghost “Ver Serviços” button (transparent outline)

### 2026-09-30 — Agendar layout
- Booking form first; all contact info (WhatsApp, localização, horário, redes) placed under the form

### Earlier
- Services grid, experience video cards, booking form, footer / portal link
- Contact & WhatsApp numbers wired for Luanda and Lubango
