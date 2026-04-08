# Aurea — Jewelry Marketplace Design Spec

**Date:** 2026-04-07  
**Brand:** Aurea (Latin for golden)  
**Type:** React SPA — premium jewelry marketplace for custom resin & stainless steel pieces

---

## 1. Concept

A premium, light glassmorphism marketplace for Aurea — a custom jewelry brand specializing in resin and stainless steel pieces. The design is extracted from the brand logo (gold lily flowers on cream), conveying elegance, femininity, and craftsmanship. The site functions as both a product showcase and a custom order platform.

---

## 2. Color Palette

| Name | Hex | Usage |
|---|---|---|
| Aurea Gold | `#C9922B` | Primary brand, CTAs, accents |
| Soft Gold | `#E8B86D` | Hover states, secondary accents |
| Cream | `#FAF8F0` | Page background |
| White | `#FFFFFF` | Glass card surfaces |
| Gold Tint | `rgba(201,146,43,0.12)` | Glass background tint |
| Deep Espresso | `#2C2416` | Body text, headings |
| Warm Taupe | `#6B5C3E` | Secondary text |

---

## 3. Typography

| Role | Font | Style |
|---|---|---|
| Headings / Display | Cormorant Garamond | Serif, editorial, high-fashion |
| Body / UI | DM Sans | Geometric sans, clean & readable |

Both loaded from Google Fonts.

---

## 4. Visual Style

- **Glassmorphism (light):** `background: rgba(255,255,255,0.6)`, `backdrop-filter: blur(16px)`, `border: 1px solid rgba(201,146,43,0.2)`, soft shadow `0 8px 32px rgba(201,146,43,0.08)`
- **Background:** Animated warm gradient (`#FAF8F0` → `#F5EDD8` → `#EDE0C4`) with subtle floating particles
- **No dark mode** — light/clear design throughout
- **Responsive:** Mobile-first, breakpoints at 640px, 768px, 1024px, 1280px

---

## 5. Tech Stack

| Layer | Choice |
|---|---|
| Build | Vite + React 18 |
| Routing | React Router v6 |
| Scroll/Hero animations | GSAP 3 + @gsap/react + ScrollTrigger |
| Component transitions | Framer Motion 11 |
| Styling | Tailwind CSS v3 (custom Aurea design tokens) |
| Form submission | EmailJS |
| Fonts | Google Fonts (Cormorant Garamond, DM Sans) |
| Data | Static JSON mock data (12 products, 4 categories) |

---

## 6. Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Landing | Hero + categories + featured + custom banner + testimonials + footer |
| `/shop` | Shop / Catalog | Filter sidebar + product grid (12 cards) + pagination |
| `/shop/:id` | Product Detail | Image gallery + details panel + related products |
| `/custom` | Custom Order | Multi-field form → EmailJS + how-it-works + FAQ |
| `/about` | About | Brand story + values + studio gallery |

---

## 7. Page Layouts

### Landing (`/`)
1. **Navbar** — sticky glass, logo left, links center, Cart icon + "Shop Now" CTA right
2. **Hero** — full-viewport, animated particle background, centered Cormorant Garamond headline ("Jewelry that tells your story"), subtitle, two CTAs (Shop / Custom Order), GSAP staggered entrance
3. **Categories strip** — 4 glass cards (Rings, Necklaces, Earrings, Bracelets), scroll-triggered fade-up
4. **Featured Collection** — 3-column product card grid, "Featured" label, GSAP ScrollTrigger reveal
5. **Custom Order Banner** — full-width warm gradient section, headline + CTA to `/custom`
6. **Testimonials** — 3 glass cards, horizontal, star ratings, customer names
7. **Footer** — logo, nav links, social icons, newsletter email input

### Shop (`/shop`)
1. **Navbar**
2. **Page header** — "Our Collection" + category filter pills (All / Rings / Necklaces / Earrings / Bracelets)
3. **Layout** — sidebar (filters: material, price range, color) + 3-col product grid
4. **Pagination** — simple prev/next
5. **Footer**

### Product Detail (`/shop/:id`)
1. **Navbar**
2. **Split layout** — left: image gallery with thumbnail strip + zoom on hover; right: glass panel with name, price, material badge, variant/color selector, quantity, Add to Cart CTA, description accordion
3. **Related Products** — horizontal scroll strip
4. **Footer**

### Custom Order (`/custom`)
1. **Navbar**
2. **Hero banner** — "Design your unique piece"
3. **Split layout** — left: form (name, email, piece type, material, color picker, description, image upload, Submit → EmailJS); right: 3-step how-it-works illustration + FAQ accordion
4. **Footer**

### About (`/about`)
1. **Navbar**
2. **Parallax hero** — brand image + quote overlay
3. **Story section** — founder text left, studio photo right
4. **Values strip** — 3 glass cards (Handcrafted, Sustainable, Custom)
5. **Gallery strip** — Instagram-style photo grid
6. **Footer**

---

## 8. Shared Components

| Component | Description |
|---|---|
| `GlassCard` | Reusable backdrop-blur card, gold border, configurable padding |
| `ProductCard` | Image, category tag, name, price, hover zoom + "Add to Cart" button |
| `Navbar` | Sticky, transitions to glass on scroll, cart badge |
| `Footer` | Full footer with newsletter input |
| `GoldButton` | Primary CTA, hover shimmer animation |
| `AnimatedSection` | Framer Motion wrapper for scroll reveal (fade + slide-up) |
| `CategoryCard` | Glass card with icon/image and label |
| `TestimonialCard` | Glass card with stars, quote, customer name |

---

## 9. Animation Plan

### GSAP (scroll & hero sequences)
- Hero: staggered text entrance (timeline), floating particle canvas background
- ScrollTrigger: fade-up on all major sections as they enter viewport
- Product cards: subtle parallax depth on scroll
- Navbar: background transition on scroll (transparent → glass)

### Framer Motion (React component transitions)
- Page transitions: `AnimatePresence` with fade + slide between routes
- Card hover: scale + shadow lift
- Button hover: gold shimmer sweep
- Cart add: pulse/bounce micro-interaction
- Form submit: success state animation

---

## 10. Data Structure

### Product
```json
{
  "id": "string",
  "name": "string",
  "category": "rings | necklaces | earrings | bracelets",
  "price": "number",
  "material": "resin | steel | combo",
  "colors": ["string"],
  "images": ["string"],
  "description": "string",
  "featured": "boolean",
  "inStock": "boolean"
}
```

12 mock products total — 3 per category. 3 marked as `featured: true` for the landing section.

---

## 11. Form (Custom Order)

Fields: name, email, piece type (select), material (select), color inspiration (text), description (textarea), reference image (file input, optional).

Submission: `emailjs.send()` with a template. On success: animated success message. On error: inline error display. No page reload.

---

## 12. Cart Scope

The cart is a **UI-only** feature: users can add items and see the cart count badge + a slide-out drawer listing items. There is no checkout, payment, or order confirmation flow. The cart state lives in React context (no persistence). This is explicitly to showcase UX without requiring a payment integration.

---

## 13. Out of Scope

- Checkout / payment processing
- User authentication
- CMS / admin panel
- Real product inventory management
- Server-side rendering
- Cart state persistence (localStorage)
