# Aurea — Custom Jewelry E-Commerce

Aurea is the online storefront for a local jewelry brand specializing in **handcrafted pieces made from stainless steel and resin**. Every item is made to order, allowing customers to personalize their jewelry through a custom order flow.

---

## What the App Does

| Page | Description |
|------|-------------|
| **Landing** | Hero section, featured collections, categories, custom order banner, and testimonials |
| **Shop** | Full product catalog with filtering and browsing |
| **Product Detail** | Individual product view with images, details, and add-to-cart |
| **Custom Order** | Form for clients to request a fully personalized piece |
| **About** | Brand story and craftsmanship values |
| **Cart** | Cart management and checkout flow |

---

## The Business

Aurea is a local jewelry business that handcrafts custom pieces using **stainless steel** and **resin**. Each piece is unique — clients can choose shapes, colors, and finishes to create something that is entirely their own. The brand sits at the intersection of durability and artistry: stainless steel for long-lasting structure, resin for vibrant, one-of-a-kind color and form.

Key offerings:
- Ready-to-ship catalog pieces
- Fully custom orders (customer-specified design)
- Small-batch collections

---

## Color Palette

The visual identity uses warm, luxurious tones that evoke gold, cream parchment, and rich espresso — reflecting the handcrafted, artisan nature of the brand.

| Token | Hex | Usage |
|-------|-----|-------|
| `gold` | `#C9922B` | Primary accent — CTAs, highlights, borders |
| `gold-light` | `#E8B86D` | Hover states, soft accents |
| `cream` | `#FAF8F0` | Page backgrounds |
| `cream-mid` | `#F5EDD8` | Card and section backgrounds |
| `cream-dark` | `#EDE0C4` | Dividers, subtle contrast |
| `espresso` | `#2C2416` | Primary text, deep backgrounds |
| `espresso-soft` | `#6B5C3E` | Secondary text, muted labels |

Background gradient: `135deg → #FAF8F0 → #F5EDD8 → #EDE0C4`

---

## Typography

| Role | Font | Fallback |
|------|------|---------|
| Display / headings | Britney | Georgia, serif |
| Body / UI | Quicksand | system-ui, sans-serif |

---

## Tech Stack

- **React** + **Vite** — fast development and build
- **Tailwind CSS** — utility-first styling with a custom design token layer
- **React Router** — client-side navigation between pages
- **Context API** — cart and global state management

---

## Getting Started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```
