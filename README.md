# Eldo Carmo Empreendimentos — Official Websites

Premium multi-site project for **Eldo Carmo Empreendimentos** (Johnny Berry).

Three independent static websites built with pure HTML5 / CSS3 / Vanilla JS.  
No frameworks. No build step. Ready for Cloudflare Pages + GitHub.

---

## Architecture

| Site | Folder | Final domain | Preview (current) | Description |
|------|--------|--------------|-------------------|-------------|
| **Portal** | `/portal` | eldocarmo.com | [eldocarmo.workersdevao.workers.dev](https://eldocarmo.workersdevao.workers.dev/) | Split-image gateway. Left → Glamorize · Right → Barber Shop |
| **Barbershop** | `/barbershop` | eldocarmobarbershop.com | [eldocarmobarbershop.workersdevao.workers.dev](https://eldocarmobarbershop.workersdevao.workers.dev) | Full men's site: services, mini-bar + cart → WhatsApp, gallery, Lubango recruitment |
| **Glamorize** | `/glamorize` | eldocarmoglamorize.com | [eldocarmoglamorize.workersdevao.workers.dev](https://eldocarmoglamorize.workersdevao.workers.dev) | Full women's beauty site: services, gallery, contact |

Each folder is a complete, self-contained site intended for its own GitHub repository.

> Cross-site links currently point to the **preview** URLs above. When final domains are live, replace them in the HTML files.

---

## Design System

- Quiet luxury aesthetic
- Very thin lines (1px / 1.5px) on borders, cards, buttons, forms, hamburger
- Generous whitespace
- Light typography (font-weight 300–500) + subtle letter-spacing
- Soft / nearly square corners
- Mobile-first, fully responsive
- Elegant hamburger that animates into an X
- No heavy shadows, no cheap effects

### Colour Palette

**Portal & Barbershop**
- Black `#0A0A0A`
- Gold `#C9A227` / `#D4AF37`
- Cream `#F8F6F2`
- Soft gray `#E8E6E1`

**Glamorize**
- Lilac `#B8A0C8` / `#C9B1D0`
- Deep purple `#6B4C7A`
- White & soft off-white

---

## Features

### Portal
- Full-viewport split layout using the official split-hero image
- Hover parallax effect on desktop
- Clean mobile fallback navigation
- Direct links to both brand sites

### Barbershop
- Hero + services grid (placeholder prices — replace with real ones)
- Mini-bar products (Chocolate Scookiie Menta / Ginguba / Ao Leite + drinks & snacks)
- Fully functional client-side cart (localStorage)
- Checkout generates a pre-filled WhatsApp message
- Gallery teaser + Instagram link
- Lubango recruitment section with dedicated WhatsApp
- Contact form → WhatsApp
- Sticky header + elegant mobile menu

### Glamorize
- Hero + services grid
- Gallery teaser + Instagram link
- Contact form → WhatsApp
- Sticky header + elegant mobile menu
- Lilac / purple palette adapted from the official logo

---

## Contact Numbers (Official)

| Brand / Purpose | WhatsApp |
|-----------------|----------|
| Barbershop | +244 923 929 074 |
| Glamorize | +244 935 627 443 |
| Recruitment (Lubango) | +244 924 071 971 |

Also listed: 930 095 886 / 925 184 386 (barbershop secondary)

**Locations**
- Luanda — Centralidade do Kilamba (V17 Barber Shop · R3 Glamorize)
- Lubango — Bairro Lucrécia, Rua da Alma (antigo Emolube/Impolube)

**Opening Hours**
- Barber Shop: 07:00 – 22:00
- Glamorize (Salão): 07:00 – 21:00

---

## Current Status

- [x] Project structure & design system
- [x] Portal complete (split-hero gateway)
- [x] Barbershop complete (cart + Scookiie products + Lubango + contact + hours)
- [x] Glamorize complete (services + gallery + contact + hours)
- [x] WhatsApp deep links with pre-filled messages
- [x] Client-side cart with localStorage
- [x] Hours added to both brand sites
- [ ] Real service prices (placeholders currently used — awaiting client confirmation)
- [x] Gallery enriched with real exterior + interior frames (facade, murals, chairs, lounge, owner)
- [x] Barbershop gallery expanded with real client cuts (kids, braids, curly, fades, beards)
- [x] Glamorize gallery expanded with real braiding work + team photo
- [x] All images converted to WebP, resized & compressed (total ~288 KB across 3 sites)
- [ ] Final domain confirmation with client

---

## Changelog / Files Changed

> **Convention:** Every important update lists the exact files changed so you can download only those and push to GitHub.

### 2026-09-29 — Preview URLs wired up

Cross-site links updated to current Cloudflare Workers preview domains.

**Portal**
- `portal/index.html` (Glamorize + Barbershop hrefs → workers.dev)

**Barbershop**
- `barbershop/index.html` (footer → portal workers.dev)

**Glamorize**
- `glamorize/index.html` (footer → portal workers.dev)

**Root**
- `README.md` (architecture table + preview links)

### 2026-09-29 — Portal mobile fix (faces in frame)

Mobile was cropping out the people from the split-hero. Fixed with dedicated left/right crops + better positioning.

**Portal**
- `portal/css/style.css` (mobile media query — dedicated hero images + position/opacity)
- `portal/assets/images/hero-glamorize.webp` *(new)*
- `portal/assets/images/hero-barbershop.webp` *(new)*

### 2026-09-29 — Image optimization (WebP)

All images converted to WebP, resized, compressed. Original JPG/PNG removed.

**Portal**
- `portal/index.html` (image refs + preload + favicon)
- `portal/css/style.css` (background-image → .webp)
- `portal/assets/images/split-hero.webp` *(new)*
- `portal/assets/images/eldocarmologo.webp` *(new)*
- `portal/assets/images/eldocarmoglamorizelogo.webp` *(new)*
- ~~portal/assets/images/*.jpg / *.png~~ *(deleted)*

**Barbershop**
- `barbershop/index.html` (all image src → .webp)
- `barbershop/assets/images/*.webp` *(new — 14 files)*
- `barbershop/assets/products/*.webp` *(new — 3 files)*
- ~~barbershop/assets/images/*.jpg~~ *(deleted)*
- ~~barbershop/assets/products/*.jpg~~ *(deleted)*

**Glamorize**
- `glamorize/index.html` (all image src → .webp)
- `glamorize/assets/images/*.webp` *(new — 10 files)*
- ~~glamorize/assets/images/*.jpg~~ *(deleted)*

**Root**
- `README.md` (this file)

### 2026-09-29 — Gallery expansion

Real client work photos added to galleries.

**Barbershop**
- `barbershop/index.html` (gallery grid updated)
- `barbershop/assets/images/cuts-beard.webp`
- `barbershop/assets/images/cuts-braids.webp`
- `barbershop/assets/images/cuts-curly.webp`
- `barbershop/assets/images/cuts-kids.webp`
- `barbershop/assets/images/cuts-styles.webp`

**Glamorize**
- `glamorize/index.html` (gallery grid updated)
- `glamorize/assets/images/braids-1.webp` … `braids-6.webp`
- `glamorize/assets/images/team.webp`

---

## How to Deploy (Cloudflare Pages)

1. Create a new GitHub repository for each site
2. Push the contents of the corresponding folder (`portal`, `barbershop` or `glamorize`)
3. Cloudflare Pages → Create project → Connect the repo
4. Build settings:
   - Framework preset: **None**
   - Build command: *(leave empty)*
   - Output directory: `/`
5. Deploy

Repeat for the other two sites.

---

## Folder Structure

```
artifacts/
├── README.md                 ← this file
├── portal/
│   ├── index.html
│   ├── css/style.css
│   ├── js/main.js
│   ├── assets/images/
│   └── README.md
├── barbershop/
│   ├── index.html
│   ├── css/style.css
│   ├── js/main.js
│   ├── assets/
│   │   ├── images/
│   │   └── products/
│   └── README.md
└── glamorize/
    ├── index.html
    ├── css/style.css
    ├── js/main.js
    ├── assets/images/
    └── README.md
```

---

## Notes

- Language: Portuguese only
- Products currently live: Chocolate Scookiie (3 flavours) + placeholder drinks/snacks
- Service prices are placeholders — replace with real values when available
- All external links open in a new tab with `rel="noopener"`

---

Built with precision and premium attention to detail.
