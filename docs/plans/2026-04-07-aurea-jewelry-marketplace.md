# Aurea Jewelry Marketplace — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete 5-page premium jewelry marketplace React SPA for Aurea, featuring glassmorphism design, GSAP + Framer Motion animations, a UI-only cart, and an EmailJS-powered custom order form.

**Architecture:** Single-page application using React Router v6 for client-side routing across 5 pages (Landing, Shop, Product Detail, Custom Order, About). Shared UI components form the design system. Cart state lives in React context with useReducer. GSAP handles scroll/hero animations via ScrollTrigger; Framer Motion handles page transitions and hover micro-interactions.

**Tech Stack:** Vite 6 · React 18 · React Router v6 · GSAP 3 + @gsap/react · Framer Motion 11 · Tailwind CSS v3 · @emailjs/browser · Vitest + React Testing Library + jsdom

---

## Task 1: Scaffold Vite project and install all dependencies

**Files:**
- Create: `aurea/` (project root, initialized via Vite)
- Modify: `package.json`
- Create: `vite.config.js`

- [ ] **Step 1: Scaffold the Vite project**

Run from `/mnt/c/Users/Usuario/Desktop/Trabajo/aurea_2`:

```bash
npm create vite@latest aurea -- --template react
cd aurea
```

- [ ] **Step 2: Install all production dependencies**

```bash
npm install react-router-dom gsap @gsap/react framer-motion @emailjs/browser
```

- [ ] **Step 3: Install all dev dependencies**

```bash
npm install -D tailwindcss@3 postcss autoprefixer vitest @vitest/ui @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

- [ ] **Step 4: Initialize Tailwind**

```bash
npx tailwindcss init -p
```

- [ ] **Step 5: Configure Vitest in vite.config.js**

Replace the contents of `aurea/vite.config.js` with:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.js'],
  },
})
```

- [ ] **Step 6: Create test setup file**

Create `aurea/tests/setup.js`:

```js
import '@testing-library/jest-dom'
```

- [ ] **Step 7: Copy the brand logo to public**

```bash
cp /mnt/c/Users/Usuario/Desktop/Trabajo/aurea_2/logo.png /mnt/c/Users/Usuario/Desktop/Trabajo/aurea_2/aurea/public/logo.png
```

- [ ] **Step 8: Add test script to package.json**

Open `aurea/package.json` and add to the `"scripts"` section:

```json
"test": "vitest",
"test:ui": "vitest --ui"
```

- [ ] **Step 9: Verify dev server starts**

```bash
npm run dev
```

Expected: server starts at `http://localhost:5173` with default Vite React page. Stop with Ctrl+C.

- [ ] **Step 10: Commit**

```bash
git init
git add .
git commit -m "feat: scaffold Vite React project with all dependencies"
```

---

## Task 2: Tailwind configuration and global CSS

**Files:**
- Modify: `aurea/tailwind.config.js`
- Modify: `aurea/src/index.css`
- Delete: `aurea/src/App.css` (not needed)

- [ ] **Step 1: Write Tailwind config with Aurea design tokens**

Replace `aurea/tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9922B',
          light: '#E8B86D',
          tint: 'rgba(201,146,43,0.12)',
          border: 'rgba(201,146,43,0.2)',
        },
        cream: {
          DEFAULT: '#FAF8F0',
          mid: '#F5EDD8',
          dark: '#EDE0C4',
        },
        espresso: {
          DEFAULT: '#2C2416',
          soft: '#6B5C3E',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        glass: '16px',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(201,146,43,0.08)',
        'glass-hover': '0 16px 48px rgba(201,146,43,0.15)',
        card: '0 2px 16px rgba(44,36,22,0.08)',
      },
      backgroundImage: {
        'aurea-gradient': 'linear-gradient(135deg, #FAF8F0 0%, #F5EDD8 50%, #ede0c4 100%)',
        'gold-shimmer': 'linear-gradient(90deg, transparent, rgba(201,146,43,0.3), transparent)',
      },
      animation: {
        shimmer: 'shimmer 1.5s ease-in-out',
        float: 'float 6s ease-in-out infinite',
        'gradient-shift': 'gradientShift 12s ease infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 2: Write global CSS**

Replace `aurea/src/index.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }
  body {
    @apply font-body text-espresso bg-cream;
    -webkit-font-smoothing: antialiased;
  }
}

@layer components {
  .glass {
    @apply bg-white/60 backdrop-blur-glass border border-gold-border rounded-2xl shadow-glass;
  }
  .glass-hover {
    @apply hover:bg-white/75 hover:shadow-glass-hover transition-all duration-300;
  }
  .section-heading {
    @apply font-display text-4xl md:text-5xl font-light text-espresso tracking-wide;
  }
  .label-tag {
    @apply text-xs font-body font-medium tracking-[0.2em] uppercase text-gold;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
}
```

- [ ] **Step 3: Delete unused file**

```bash
rm aurea/src/App.css
```

- [ ] **Step 4: Verify Tailwind is working**

```bash
npm run dev
```

Expected: no CSS errors in console, dev server starts. Stop with Ctrl+C.

- [ ] **Step 5: Commit**

```bash
git add tailwind.config.js src/index.css
git commit -m "feat: configure Tailwind with Aurea design tokens and global CSS"
```

---

## Task 3: Mock data

**Files:**
- Create: `aurea/src/data/products.json`
- Create: `aurea/src/data/testimonials.json`

- [ ] **Step 1: Create products.json with 12 products across 4 categories**

Create `aurea/src/data/products.json`:

```json
[
  {
    "id": "ring-001",
    "name": "Aurora Resin Ring",
    "category": "rings",
    "price": 65,
    "material": "resin",
    "colors": ["#E8D5B0", "#C9922B", "#8B6914"],
    "images": [
      "https://picsum.photos/seed/ring001a/600/700",
      "https://picsum.photos/seed/ring001b/600/700",
      "https://picsum.photos/seed/ring001c/600/700"
    ],
    "description": "Handcrafted resin ring with golden flower inclusions. Each piece is unique, made to order with premium UV resin and finished with a high-gloss coat.",
    "featured": true,
    "inStock": true
  },
  {
    "id": "ring-002",
    "name": "Stellar Band",
    "category": "rings",
    "price": 89,
    "material": "steel",
    "colors": ["#C0C0C0", "#C9922B"],
    "images": [
      "https://picsum.photos/seed/ring002a/600/700",
      "https://picsum.photos/seed/ring002b/600/700"
    ],
    "description": "Minimalist stainless steel band with engraved geometric pattern. Hypoallergenic, tarnish-resistant, and waterproof.",
    "featured": false,
    "inStock": true
  },
  {
    "id": "ring-003",
    "name": "Bloom Duo Ring",
    "category": "rings",
    "price": 78,
    "material": "combo",
    "colors": ["#FAF8F0", "#C9922B", "#E8B86D"],
    "images": [
      "https://picsum.photos/seed/ring003a/600/700",
      "https://picsum.photos/seed/ring003b/600/700"
    ],
    "description": "Resin and stainless steel combined ring. Floral resin insert in a slim steel frame. Available in multiple color stories.",
    "featured": false,
    "inStock": true
  },
  {
    "id": "necklace-001",
    "name": "Lily Pendant",
    "category": "necklaces",
    "price": 95,
    "material": "combo",
    "colors": ["#FAF8F0", "#C9922B"],
    "images": [
      "https://picsum.photos/seed/neck001a/600/700",
      "https://picsum.photos/seed/neck001b/600/700",
      "https://picsum.photos/seed/neck001c/600/700"
    ],
    "description": "Our signature lily pendant — the embodiment of the Aurea brand. Resin lily encased in a stainless steel frame on a 45cm adjustable chain.",
    "featured": true,
    "inStock": true
  },
  {
    "id": "necklace-002",
    "name": "Golden Drop",
    "category": "necklaces",
    "price": 72,
    "material": "resin",
    "colors": ["#C9922B", "#E8B86D", "#2C2416"],
    "images": [
      "https://picsum.photos/seed/neck002a/600/700",
      "https://picsum.photos/seed/neck002b/600/700"
    ],
    "description": "Teardrop resin pendant with suspended gold leaf inclusions. Delicate 40cm steel chain included.",
    "featured": false,
    "inStock": true
  },
  {
    "id": "necklace-003",
    "name": "Celestial Chain",
    "category": "necklaces",
    "price": 110,
    "material": "steel",
    "colors": ["#C0C0C0", "#C9922B"],
    "images": [
      "https://picsum.photos/seed/neck003a/600/700",
      "https://picsum.photos/seed/neck003b/600/700"
    ],
    "description": "Premium stainless steel chain necklace with star-shaped connector links. PVD gold plating for lasting shine.",
    "featured": false,
    "inStock": false
  },
  {
    "id": "earring-001",
    "name": "Petal Studs",
    "category": "earrings",
    "price": 48,
    "material": "resin",
    "colors": ["#FAF8F0", "#C9922B", "#E8B86D"],
    "images": [
      "https://picsum.photos/seed/ear001a/600/700",
      "https://picsum.photos/seed/ear001b/600/700"
    ],
    "description": "Dainty resin petal stud earrings with embedded dried flowers. Hypoallergenic steel posts. Sold as a pair.",
    "featured": true,
    "inStock": true
  },
  {
    "id": "earring-002",
    "name": "Halo Hoops",
    "category": "earrings",
    "price": 62,
    "material": "steel",
    "colors": ["#C9922B"],
    "images": [
      "https://picsum.photos/seed/ear002a/600/700",
      "https://picsum.photos/seed/ear002b/600/700"
    ],
    "description": "Slim stainless steel hoop earrings with a brushed gold finish. Lightweight and comfortable for all-day wear.",
    "featured": false,
    "inStock": true
  },
  {
    "id": "earring-003",
    "name": "Cascade Drops",
    "category": "earrings",
    "price": 75,
    "material": "combo",
    "colors": ["#FAF8F0", "#C9922B", "#6B5C3E"],
    "images": [
      "https://picsum.photos/seed/ear003a/600/700",
      "https://picsum.photos/seed/ear003b/600/700"
    ],
    "description": "Elongated drop earrings featuring hand-poured resin ovals in a steel wire frame. Each piece has a unique color distribution.",
    "featured": false,
    "inStock": true
  },
  {
    "id": "bracelet-001",
    "name": "Serenity Cuff",
    "category": "bracelets",
    "price": 85,
    "material": "combo",
    "colors": ["#FAF8F0", "#C9922B", "#E8B86D"],
    "images": [
      "https://picsum.photos/seed/brac001a/600/700",
      "https://picsum.photos/seed/brac001b/600/700"
    ],
    "description": "Wide stainless steel cuff bracelet with a resin inlay panel. Available in three color stories. Fits most wrist sizes.",
    "featured": false,
    "inStock": true
  },
  {
    "id": "bracelet-002",
    "name": "Ember Wrap",
    "category": "bracelets",
    "price": 55,
    "material": "resin",
    "colors": ["#C9922B", "#8B6914", "#2C2416"],
    "images": [
      "https://picsum.photos/seed/brac002a/600/700",
      "https://picsum.photos/seed/brac002b/600/700"
    ],
    "description": "Resin bangle with warm amber tones and gold flake inclusions. Lightweight, durable, and water-resistant.",
    "featured": false,
    "inStock": true
  },
  {
    "id": "bracelet-003",
    "name": "Link Chain Bracelet",
    "category": "bracelets",
    "price": 68,
    "material": "steel",
    "colors": ["#C0C0C0", "#C9922B"],
    "images": [
      "https://picsum.photos/seed/brac003a/600/700",
      "https://picsum.photos/seed/brac003b/600/700"
    ],
    "description": "Chunky stainless steel link bracelet with a toggle clasp. Available in silver-tone and gold-tone PVD finish.",
    "featured": false,
    "inStock": true
  }
]
```

- [ ] **Step 2: Create testimonials.json**

Create `aurea/src/data/testimonials.json`:

```json
[
  {
    "id": 1,
    "name": "Valentina R.",
    "rating": 5,
    "text": "The Lily Pendant is absolutely stunning. I ordered it as a gift and everyone keeps asking where it's from. The quality is incredible for the price.",
    "avatar": "https://picsum.photos/seed/avatar1/80/80"
  },
  {
    "id": 2,
    "name": "María José L.",
    "rating": 5,
    "text": "My custom resin ring arrived beautifully packaged. The colors are exactly what I described and it fits perfectly. Will definitely order again!",
    "avatar": "https://picsum.photos/seed/avatar2/80/80"
  },
  {
    "id": 3,
    "name": "Camila F.",
    "rating": 5,
    "text": "Aurea's craftsmanship is on another level. The Aurora Resin Ring is my everyday piece now. Unique, elegant, and so personal.",
    "avatar": "https://picsum.photos/seed/avatar3/80/80"
  }
]
```

- [ ] **Step 3: Commit**

```bash
git add src/data/
git commit -m "feat: add mock product and testimonial data"
```

---

## Task 4: Cart context with tests

**Files:**
- Create: `aurea/src/context/CartContext.jsx`
- Create: `aurea/tests/CartContext.test.jsx`

- [ ] **Step 1: Write failing tests for CartContext**

Create `aurea/tests/CartContext.test.jsx`:

```jsx
import { renderHook, act } from '@testing-library/react'
import { CartProvider, useCart } from '../src/context/CartContext'

const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>

const mockProduct = {
  id: 'ring-001',
  name: 'Aurora Resin Ring',
  price: 65,
  images: ['https://picsum.photos/seed/ring001a/600/700'],
  category: 'rings',
}

describe('CartContext', () => {
  test('starts with empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    expect(result.current.items).toEqual([])
    expect(result.current.count).toBe(0)
  })

  test('addItem adds product to cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addItem(mockProduct))
    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].id).toBe('ring-001')
    expect(result.current.items[0].quantity).toBe(1)
  })

  test('addItem increments quantity if product already in cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addItem(mockProduct))
    act(() => result.current.addItem(mockProduct))
    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].quantity).toBe(2)
    expect(result.current.count).toBe(2)
  })

  test('removeItem removes product from cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addItem(mockProduct))
    act(() => result.current.removeItem('ring-001'))
    expect(result.current.items).toHaveLength(0)
  })

  test('clearCart empties the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addItem(mockProduct))
    act(() => result.current.clearCart())
    expect(result.current.items).toHaveLength(0)
    expect(result.current.count).toBe(0)
  })

  test('count reflects total quantity across all items', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    const second = { ...mockProduct, id: 'ring-002' }
    act(() => result.current.addItem(mockProduct))
    act(() => result.current.addItem(mockProduct))
    act(() => result.current.addItem(second))
    expect(result.current.count).toBe(3)
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd aurea && npx vitest run tests/CartContext.test.jsx
```

Expected: FAIL — `Cannot find module '../src/context/CartContext'`

- [ ] **Step 3: Implement CartContext**

Create `aurea/src/context/CartContext.jsx`:

```jsx
import { createContext, useContext, useReducer } from 'react'

const CartContext = createContext(null)

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.find(item => item.id === action.product.id)
      if (existing) {
        return state.map(item =>
          item.id === action.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...state, { ...action.product, quantity: 1 }]
    }
    case 'REMOVE_ITEM':
      return state.filter(item => item.id !== action.id)
    case 'CLEAR_CART':
      return []
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, [])
  const count = items.reduce((sum, item) => sum + item.quantity, 0)

  function addItem(product) {
    dispatch({ type: 'ADD_ITEM', product })
  }

  function removeItem(id) {
    dispatch({ type: 'REMOVE_ITEM', id })
  }

  function clearCart() {
    dispatch({ type: 'CLEAR_CART' })
  }

  return (
    <CartContext.Provider value={{ items, count, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run tests/CartContext.test.jsx
```

Expected: 6 tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/context/CartContext.jsx tests/CartContext.test.jsx
git commit -m "feat: add CartContext with useReducer, add passing tests"
```

---

## Task 5: Shared UI components

**Files:**
- Create: `aurea/src/components/ui/GlassCard.jsx`
- Create: `aurea/src/components/ui/GoldButton.jsx`
- Create: `aurea/src/components/ui/AnimatedSection.jsx`

- [ ] **Step 1: Create GlassCard**

Create `aurea/src/components/ui/GlassCard.jsx`:

```jsx
export default function GlassCard({ children, className = '', onClick, hoverable = false }) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white/60 backdrop-blur-glass border border-gold-border rounded-2xl shadow-glass
        ${hoverable ? 'hover:bg-white/75 hover:shadow-glass-hover transition-all duration-300 cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
```

- [ ] **Step 2: Create GoldButton**

Create `aurea/src/components/ui/GoldButton.jsx`:

```jsx
import { motion } from 'framer-motion'

export default function GoldButton({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  disabled = false,
}) {
  const base = 'relative overflow-hidden font-body font-medium tracking-wide px-6 py-3 rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
  const variants = {
    primary: 'bg-gold text-white hover:bg-gold-light',
    outline: 'border border-gold text-gold hover:bg-gold-tint bg-transparent',
    ghost: 'text-gold hover:bg-gold-tint bg-transparent',
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      className={`${base} ${variants[variant]} ${className}`}
    >
      <motion.span
        className="absolute inset-0 bg-gold-shimmer bg-[length:200%_100%]"
        initial={{ backgroundPosition: '-200% 0' }}
        whileHover={{ backgroundPosition: '200% 0' }}
        transition={{ duration: 0.6 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}
```

- [ ] **Step 3: Create AnimatedSection**

Create `aurea/src/components/ui/AnimatedSection.jsx`:

```jsx
import { motion } from 'framer-motion'

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function AnimatedSection({ children, className = '', delay = 0 }) {
  return (
    <motion.section
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: sectionVariants.hidden,
        visible: {
          ...sectionVariants.visible,
          transition: {
            ...sectionVariants.visible.transition,
            delay,
          },
        },
      }}
    >
      {children}
    </motion.section>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/
git commit -m "feat: add GlassCard, GoldButton, AnimatedSection UI components"
```

---

## Task 6: Navbar component

**Files:**
- Create: `aurea/src/components/layout/Navbar.jsx`

- [ ] **Step 1: Create Navbar**

Create `aurea/src/components/layout/Navbar.jsx`:

```jsx
import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../../context/CartContext'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/custom', label: 'Custom Order' },
  { to: '/about', label: 'About' },
]

export default function Navbar({ onCartOpen }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { count } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/70 backdrop-blur-glass border-b border-gold-border shadow-glass py-3'
          : 'bg-transparent py-5'
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="Aurea" className="h-10 w-10 object-contain" />
          <span className="font-display text-2xl text-espresso tracking-widest">AUREA</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-8">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `font-body text-sm tracking-wide transition-colors duration-200 ${
                    isActive ? 'text-gold font-medium' : 'text-espresso-soft hover:text-gold'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right: Cart + CTA */}
        <div className="flex items-center gap-4">
          <button
            onClick={onCartOpen}
            className="relative p-2 text-espresso-soft hover:text-gold transition-colors"
            aria-label="Open cart"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {count > 0 && (
              <motion.span
                key={count}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-gold text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium"
              >
                {count}
              </motion.span>
            )}
          </button>

          <Link
            to="/shop"
            className="hidden md:inline-flex bg-gold text-white font-body text-sm font-medium px-5 py-2 rounded-xl hover:bg-gold-light transition-colors"
          >
            Shop Now
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-espresso"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/90 backdrop-blur-glass border-t border-gold-border"
          >
            <ul className="flex flex-col py-4 px-6 gap-4">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === '/'}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `font-body text-sm tracking-wide ${isActive ? 'text-gold font-medium' : 'text-espresso-soft'}`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Navbar.jsx
git commit -m "feat: add responsive Navbar with glass scroll effect and cart badge"
```

---

## Task 7: Footer component

**Files:**
- Create: `aurea/src/components/layout/Footer.jsx`

- [ ] **Step 1: Create Footer**

Create `aurea/src/components/layout/Footer.jsx`:

```jsx
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  function handleSubscribe(e) {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer className="bg-espresso text-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="Aurea" className="h-10 w-10 object-contain brightness-0 invert" />
              <span className="font-display text-2xl text-white tracking-widest">AUREA</span>
            </div>
            <p className="font-body text-sm text-white/60 leading-relaxed">
              Handcrafted resin & stainless steel jewelry. Each piece tells your story.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-body text-xs font-medium tracking-[0.2em] uppercase text-gold mb-4">Navigate</h4>
            <ul className="space-y-3">
              {[['/', 'Home'], ['/shop', 'Shop'], ['/custom', 'Custom Order'], ['/about', 'About']].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="font-body text-sm text-white/60 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-body text-xs font-medium tracking-[0.2em] uppercase text-gold mb-4">Categories</h4>
            <ul className="space-y-3">
              {['Rings', 'Necklaces', 'Earrings', 'Bracelets'].map(cat => (
                <li key={cat}>
                  <Link
                    to={`/shop?category=${cat.toLowerCase()}`}
                    className="font-body text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-body text-xs font-medium tracking-[0.2em] uppercase text-gold mb-4">Newsletter</h4>
            <p className="font-body text-sm text-white/60 mb-4">New collections and exclusive offers, delivered to you.</p>
            {subscribed ? (
              <p className="font-body text-sm text-gold">Thank you for subscribing!</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 font-body text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold"
                />
                <button
                  type="submit"
                  className="bg-gold text-white font-body text-sm px-4 py-2 rounded-lg hover:bg-gold-light transition-colors"
                >
                  Join
                </button>
              </form>
            )}

            {/* Social */}
            <div className="flex gap-4 mt-6">
              {['Instagram', 'TikTok', 'Pinterest'].map(social => (
                <a key={social} href="#" className="font-body text-xs text-white/40 hover:text-white transition-colors">
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/40">© 2026 Aurea. All rights reserved.</p>
          <p className="font-body text-xs text-white/40">Handcrafted with love.</p>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Footer.jsx
git commit -m "feat: add Footer with newsletter signup and navigation links"
```

---

## Task 8: App routing skeleton with AnimatePresence

**Files:**
- Modify: `aurea/src/main.jsx`
- Create: `aurea/src/App.jsx`
- Create: `aurea/src/components/cart/CartDrawer.jsx` (placeholder)
- Create: `aurea/src/pages/Landing.jsx` (placeholder)
- Create: `aurea/src/pages/Shop.jsx` (placeholder)
- Create: `aurea/src/pages/ProductDetail.jsx` (placeholder)
- Create: `aurea/src/pages/CustomOrder.jsx` (placeholder)
- Create: `aurea/src/pages/About.jsx` (placeholder)

- [ ] **Step 1: Update main.jsx**

Replace `aurea/src/main.jsx`:

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
)
```

- [ ] **Step 2: Create App.jsx with routes and page transitions**

Create `aurea/src/App.jsx`:

```jsx
import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import CartDrawer from './components/cart/CartDrawer'
import Landing from './pages/Landing'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import CustomOrder from './pages/CustomOrder'
import About from './pages/About'

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.25 } },
}

function PageWrapper({ children }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  )
}

export default function App() {
  const location = useLocation()
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <>
      <Navbar onCartOpen={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><Landing /></PageWrapper>} />
          <Route path="/shop" element={<PageWrapper><Shop /></PageWrapper>} />
          <Route path="/shop/:id" element={<PageWrapper><ProductDetail /></PageWrapper>} />
          <Route path="/custom" element={<PageWrapper><CustomOrder /></PageWrapper>} />
          <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        </Routes>
      </AnimatePresence>
    </>
  )
}
```

- [ ] **Step 3: Create CartDrawer placeholder**

Create `aurea/src/components/cart/CartDrawer.jsx`:

```jsx
export default function CartDrawer({ open, onClose }) {
  return null // Implemented in Task 14
}
```

- [ ] **Step 4: Create page placeholders**

Create `aurea/src/pages/Landing.jsx`:
```jsx
export default function Landing() {
  return <div className="min-h-screen pt-20 flex items-center justify-center"><p className="font-display text-4xl text-gold">Landing — coming soon</p></div>
}
```

Create `aurea/src/pages/Shop.jsx`:
```jsx
export default function Shop() {
  return <div className="min-h-screen pt-20 flex items-center justify-center"><p className="font-display text-4xl text-gold">Shop — coming soon</p></div>
}
```

Create `aurea/src/pages/ProductDetail.jsx`:
```jsx
export default function ProductDetail() {
  return <div className="min-h-screen pt-20 flex items-center justify-center"><p className="font-display text-4xl text-gold">Product Detail — coming soon</p></div>
}
```

Create `aurea/src/pages/CustomOrder.jsx`:
```jsx
export default function CustomOrder() {
  return <div className="min-h-screen pt-20 flex items-center justify-center"><p className="font-display text-4xl text-gold">Custom Order — coming soon</p></div>
}
```

Create `aurea/src/pages/About.jsx`:
```jsx
export default function About() {
  return <div className="min-h-screen pt-20 flex items-center justify-center"><p className="font-display text-4xl text-gold">About — coming soon</p></div>
}
```

- [ ] **Step 5: Delete default Vite App files**

```bash
rm aurea/src/assets/react.svg aurea/public/vite.svg 2>/dev/null; true
```

- [ ] **Step 6: Verify app runs with routing**

```bash
npm run dev
```

Expected: opens at localhost:5173, Navbar visible, navigating between routes shows placeholder pages with gold text, page transitions animate. Stop with Ctrl+C.

- [ ] **Step 7: Commit**

```bash
git add src/
git commit -m "feat: set up routing skeleton with AnimatePresence page transitions"
```

---

## Task 9: Particle canvas background

**Files:**
- Create: `aurea/src/components/home/ParticleCanvas.jsx`

- [ ] **Step 1: Create ParticleCanvas**

Create `aurea/src/components/home/ParticleCanvas.jsx`:

```jsx
import { useEffect, useRef } from 'react'

export default function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let W = window.innerWidth
    let H = window.innerHeight

    canvas.width = W
    canvas.height = H

    const COUNT = 55
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.4 + 0.1,
    }))

    function draw() {
      ctx.clearRect(0, 0, W, H)
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201, 146, 43, ${p.alpha})`
        ctx.fill()

        p.x += p.dx
        p.y += p.dy

        if (p.x < 0 || p.x > W) p.dx *= -1
        if (p.y < 0 || p.y > H) p.dy *= -1
      }
      animId = requestAnimationFrame(draw)
    }

    draw()

    function onResize() {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = W
      canvas.height = H
    }

    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/home/ParticleCanvas.jsx
git commit -m "feat: add animated gold particle canvas background"
```

---

## Task 10: Hero section with GSAP

**Files:**
- Create: `aurea/src/components/home/Hero.jsx`

> **21stdev MCP note:** The hero section benefits greatly from an interactive 3D or parallax component. After implementing the base hero below, optionally use the `mcp__magic__21st_magic_component_builder` MCP tool (already available in Claude Code) to generate an enhanced interactive hero card or floating product showcase. Prompt it with: *"Glassmorphism floating product card with parallax mouse tracking, gold/cream color scheme, white translucent background with blur"*.

- [ ] **Step 1: Create Hero with GSAP entrance**

Create `aurea/src/components/home/Hero.jsx`:

```jsx
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Link } from 'react-router-dom'
import ParticleCanvas from './ParticleCanvas'
import GoldButton from '../ui/GoldButton'

export default function Hero() {
  const containerRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.from('.hero-tag',   { opacity: 0, y: 30, duration: 0.6 })
      .from('.hero-title', { opacity: 0, y: 50, duration: 0.8 }, '-=0.3')
      .from('.hero-sub',   { opacity: 0, y: 30, duration: 0.6 }, '-=0.4')
      .from('.hero-ctas',  { opacity: 0, y: 20, duration: 0.5 }, '-=0.3')
      .from('.hero-card',  { opacity: 0, x: 60, duration: 0.8, ease: 'power2.out' }, '-=0.6')
  }, { scope: containerRef })

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-aurea-gradient"
    >
      <ParticleCanvas />

      {/* Warm gradient blobs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-gold-light/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text content */}
        <div>
          <p className="hero-tag label-tag mb-4">Handcrafted for you</p>
          <h1 className="hero-title font-display text-5xl sm:text-6xl lg:text-7xl font-light text-espresso leading-tight mb-6">
            Jewelry that<br />
            <em className="text-gold not-italic">tells your story</em>
          </h1>
          <p className="hero-sub font-body text-lg text-espresso-soft leading-relaxed max-w-md mb-8">
            Premium resin and stainless steel pieces, handcrafted to order.
            Each design is unique — just like you.
          </p>
          <div className="hero-ctas flex flex-wrap gap-4">
            <Link to="/shop">
              <GoldButton>Explore Collection</GoldButton>
            </Link>
            <Link to="/custom">
              <GoldButton variant="outline">Design Yours</GoldButton>
            </Link>
          </div>

          {/* Social proof strip */}
          <div className="flex items-center gap-6 mt-10 text-sm text-espresso-soft">
            <div>
              <span className="font-display text-2xl text-espresso font-medium">500+</span>
              <span className="font-body ml-2">happy clients</span>
            </div>
            <div className="w-px h-8 bg-espresso/20" />
            <div>
              <span className="font-display text-2xl text-espresso font-medium">100%</span>
              <span className="font-body ml-2">handmade</span>
            </div>
            <div className="w-px h-8 bg-espresso/20" />
            <div>
              <span className="font-display text-2xl text-espresso font-medium">★ 4.9</span>
              <span className="font-body ml-2">rating</span>
            </div>
          </div>
        </div>

        {/* Glass card with featured product */}
        <div className="hero-card flex justify-center lg:justify-end">
          <div className="relative">
            {/* Main card */}
            <div className="glass p-6 max-w-sm w-full animate-float">
              <div className="rounded-xl overflow-hidden mb-4 aspect-[4/5] bg-cream-dark">
                <img
                  src="https://picsum.photos/seed/neck001a/400/500"
                  alt="Lily Pendant"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="label-tag mb-1">Bestseller</p>
              <h3 className="font-display text-2xl text-espresso mb-1">Lily Pendant</h3>
              <p className="font-body text-sm text-espresso-soft mb-3">Custom resin · Stainless steel</p>
              <div className="flex items-center justify-between">
                <span className="font-display text-2xl text-gold">$95</span>
                <Link to="/shop/necklace-001">
                  <GoldButton className="text-sm !px-4 !py-2">View</GoldButton>
                </Link>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 glass !bg-gold !border-gold-light text-white px-4 py-2 rounded-xl shadow-glass">
              <p className="font-body text-xs font-medium">New Collection</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-espresso-soft">
        <span className="font-body text-xs tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-espresso-soft to-transparent" />
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/home/Hero.jsx
git commit -m "feat: add Hero section with GSAP staggered entrance and particle background"
```

---

## Task 11: Landing page — remaining sections and assembly

**Files:**
- Create: `aurea/src/components/home/Categories.jsx`
- Create: `aurea/src/components/home/FeaturedCollection.jsx`
- Create: `aurea/src/components/home/CustomOrderBanner.jsx`
- Create: `aurea/src/components/home/Testimonials.jsx`
- Modify: `aurea/src/pages/Landing.jsx`

- [ ] **Step 1: Create Categories section**

Create `aurea/src/components/home/Categories.jsx`:

```jsx
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import AnimatedSection from '../ui/AnimatedSection'

const categories = [
  { label: 'Rings', slug: 'rings', emoji: '💍', desc: 'Resin & steel bands' },
  { label: 'Necklaces', slug: 'necklaces', emoji: '📿', desc: 'Pendants & chains' },
  { label: 'Earrings', slug: 'earrings', emoji: '✨', desc: 'Studs & drops' },
  { label: 'Bracelets', slug: 'bracelets', emoji: '🪬', desc: 'Cuffs & bangles' },
]

export default function Categories() {
  return (
    <AnimatedSection className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <p className="label-tag mb-3">Browse by Category</p>
        <h2 className="section-heading">Find your style</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map(({ label, slug, emoji, desc }, i) => (
          <motion.div
            key={slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <Link
              to={`/shop?category=${slug}`}
              className="block glass glass-hover p-6 text-center group"
            >
              <div className="text-4xl mb-3">{emoji}</div>
              <h3 className="font-display text-xl text-espresso mb-1 group-hover:text-gold transition-colors">{label}</h3>
              <p className="font-body text-xs text-espresso-soft">{desc}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  )
}
```

- [ ] **Step 2: Create FeaturedCollection section**

Create `aurea/src/components/home/FeaturedCollection.jsx`:

```jsx
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import AnimatedSection from '../ui/AnimatedSection'
import GlassCard from '../ui/GlassCard'
import GoldButton from '../ui/GoldButton'
import products from '../../data/products.json'

const featured = products.filter(p => p.featured)

export default function FeaturedCollection() {
  return (
    <AnimatedSection className="py-20 bg-cream-mid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="label-tag mb-3">Curated for You</p>
          <h2 className="section-heading">Featured Collection</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
            >
              <GlassCard hoverable className="overflow-hidden">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p className="label-tag mb-1">{product.category}</p>
                  <h3 className="font-display text-xl text-espresso mb-1">{product.name}</h3>
                  <p className="font-body text-sm text-espresso-soft mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xl text-gold">${product.price}</span>
                    <Link to={`/shop/${product.id}`}>
                      <GoldButton className="!text-sm !px-4 !py-2">View</GoldButton>
                    </Link>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/shop">
            <GoldButton variant="outline" className="!px-10">View All Products</GoldButton>
          </Link>
        </div>
      </div>
    </AnimatedSection>
  )
}
```

- [ ] **Step 3: Create CustomOrderBanner section**

Create `aurea/src/components/home/CustomOrderBanner.jsx`:

```jsx
import { Link } from 'react-router-dom'
import AnimatedSection from '../ui/AnimatedSection'
import GoldButton from '../ui/GoldButton'

export default function CustomOrderBanner() {
  return (
    <AnimatedSection className="py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="glass !bg-gold-tint p-12 md:p-16">
          <p className="label-tag mb-4">One of a kind</p>
          <h2 className="section-heading mb-6">Design your unique piece</h2>
          <p className="font-body text-lg text-espresso-soft max-w-xl mx-auto mb-10 leading-relaxed">
            Can't find what you're looking for? Work directly with us to create a piece
            that's entirely yours — your colors, your story, your shape.
          </p>
          <Link to="/custom">
            <GoldButton className="!px-10 !py-4 !text-base">Start My Custom Order</GoldButton>
          </Link>
          <div className="flex justify-center gap-8 mt-10 text-sm text-espresso-soft">
            <span>✓ 7-14 days turnaround</span>
            <span>✓ Free revision</span>
            <span>✓ Satisfaction guaranteed</span>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
```

- [ ] **Step 4: Create Testimonials section**

Create `aurea/src/components/home/Testimonials.jsx`:

```jsx
import { motion } from 'framer-motion'
import AnimatedSection from '../ui/AnimatedSection'
import GlassCard from '../ui/GlassCard'
import testimonials from '../../data/testimonials.json'

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-1 mb-3">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-gold text-sm">★</span>
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <AnimatedSection className="py-20 bg-cream-mid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="label-tag mb-3">What they say</p>
          <h2 className="section-heading">Loved by customers</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
            >
              <GlassCard className="p-6 h-full flex flex-col">
                <Stars count={t.rating} />
                <p className="font-body text-sm text-espresso-soft leading-relaxed flex-1 italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3 mt-5 pt-4 border-t border-gold-border">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="font-body text-sm font-medium text-espresso">{t.name}</span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
```

- [ ] **Step 5: Replace Landing page placeholder with full assembly**

Replace `aurea/src/pages/Landing.jsx`:

```jsx
import Hero from '../components/home/Hero'
import Categories from '../components/home/Categories'
import FeaturedCollection from '../components/home/FeaturedCollection'
import CustomOrderBanner from '../components/home/CustomOrderBanner'
import Testimonials from '../components/home/Testimonials'
import Footer from '../components/layout/Footer'

export default function Landing() {
  return (
    <main>
      <Hero />
      <Categories />
      <FeaturedCollection />
      <CustomOrderBanner />
      <Testimonials />
      <Footer />
    </main>
  )
}
```

- [ ] **Step 6: Verify Landing page renders fully**

```bash
npm run dev
```

Expected: open `http://localhost:5173` — full landing page with Hero (particles + GSAP animation), categories, featured collection, custom order banner, testimonials, footer. All sections visible. Stop with Ctrl+C.

- [ ] **Step 7: Commit**

```bash
git add src/components/home/ src/pages/Landing.jsx
git commit -m "feat: complete Landing page with all sections assembled"
```

---

## Task 12: ProductCard component and Shop page with filter tests

**Files:**
- Create: `aurea/src/components/shop/ProductCard.jsx`
- Create: `aurea/src/components/shop/FilterSidebar.jsx`
- Create: `aurea/src/components/shop/filterProducts.js`
- Create: `aurea/tests/filterProducts.test.js`
- Modify: `aurea/src/pages/Shop.jsx`

- [ ] **Step 1: Write failing tests for filterProducts**

Create `aurea/tests/filterProducts.test.js`:

```js
import { filterProducts } from '../src/components/shop/filterProducts'
import products from '../src/data/products.json'

describe('filterProducts', () => {
  test('returns all products when no filters applied', () => {
    const result = filterProducts(products, {})
    expect(result).toHaveLength(products.length)
  })

  test('filters by category', () => {
    const result = filterProducts(products, { category: 'rings' })
    expect(result.every(p => p.category === 'rings')).toBe(true)
    expect(result.length).toBe(3)
  })

  test('filters by material', () => {
    const result = filterProducts(products, { material: 'resin' })
    expect(result.every(p => p.material === 'resin')).toBe(true)
  })

  test('filters by maxPrice', () => {
    const result = filterProducts(products, { maxPrice: 70 })
    expect(result.every(p => p.price <= 70)).toBe(true)
  })

  test('filters by inStock', () => {
    const result = filterProducts(products, { inStock: true })
    expect(result.every(p => p.inStock)).toBe(true)
  })

  test('combines multiple filters', () => {
    const result = filterProducts(products, { category: 'earrings', material: 'steel' })
    expect(result.every(p => p.category === 'earrings' && p.material === 'steel')).toBe(true)
  })

  test('returns empty array when no products match', () => {
    const result = filterProducts(products, { category: 'rings', maxPrice: 1 })
    expect(result).toHaveLength(0)
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npx vitest run tests/filterProducts.test.js
```

Expected: FAIL — `Cannot find module '../src/components/shop/filterProducts'`

- [ ] **Step 3: Implement filterProducts**

Create `aurea/src/components/shop/filterProducts.js`:

```js
export function filterProducts(products, filters) {
  const { category, material, maxPrice, inStock } = filters
  return products.filter(p => {
    if (category && p.category !== category) return false
    if (material && p.material !== material) return false
    if (maxPrice !== undefined && p.price > maxPrice) return false
    if (inStock && !p.inStock) return false
    return true
  })
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run tests/filterProducts.test.js
```

Expected: 7 tests PASS

- [ ] **Step 5: Create ProductCard**

Create `aurea/src/components/shop/ProductCard.jsx`:

```jsx
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../../context/CartContext'
import GlassCard from '../ui/GlassCard'
import GoldButton from '../ui/GoldButton'

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const { id, name, category, price, images, inStock, material } = product

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.25 }}>
      <GlassCard className="overflow-hidden flex flex-col h-full">
        {/* Image */}
        <Link to={`/shop/${id}`} className="block relative aspect-[3/4] overflow-hidden bg-cream-dark">
          <img
            src={images[0]}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          {!inStock && (
            <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
              <span className="glass px-4 py-1 font-body text-sm text-espresso-soft">Out of stock</span>
            </div>
          )}
          <div className="absolute top-3 left-3">
            <span className="glass !bg-white/80 px-3 py-1 font-body text-xs text-espresso-soft capitalize">
              {material}
            </span>
          </div>
        </Link>

        {/* Info */}
        <div className="p-4 flex flex-col flex-1">
          <p className="label-tag mb-1 capitalize">{category}</p>
          <Link to={`/shop/${id}`}>
            <h3 className="font-display text-lg text-espresso hover:text-gold transition-colors mb-1">{name}</h3>
          </Link>
          <div className="flex items-center justify-between mt-auto pt-3">
            <span className="font-display text-xl text-gold">${price}</span>
            <GoldButton
              className="!text-xs !px-3 !py-2"
              disabled={!inStock}
              onClick={() => addItem(product)}
            >
              Add to Cart
            </GoldButton>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}
```

- [ ] **Step 6: Create FilterSidebar**

Create `aurea/src/components/shop/FilterSidebar.jsx`:

```jsx
import GlassCard from '../ui/GlassCard'

const MATERIALS = ['resin', 'steel', 'combo']
const MAX_PRICES = [50, 75, 100, 150]

export default function FilterSidebar({ filters, onChange }) {
  function set(key, value) {
    onChange({ ...filters, [key]: value === filters[key] ? undefined : value })
  }

  return (
    <GlassCard className="p-5 space-y-6 h-fit sticky top-28">
      <h3 className="font-body text-sm font-medium text-espresso tracking-wide">Filters</h3>

      {/* Material */}
      <div>
        <p className="label-tag mb-3">Material</p>
        <div className="space-y-2">
          {MATERIALS.map(m => (
            <button
              key={m}
              onClick={() => set('material', m)}
              className={`block w-full text-left font-body text-sm px-3 py-2 rounded-lg transition-colors capitalize ${
                filters.material === m
                  ? 'bg-gold text-white'
                  : 'text-espresso-soft hover:bg-gold-tint'
              }`}
            >
              {m === 'combo' ? 'Resin + Steel' : m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Max price */}
      <div>
        <p className="label-tag mb-3">Max Price</p>
        <div className="space-y-2">
          {MAX_PRICES.map(p => (
            <button
              key={p}
              onClick={() => set('maxPrice', p)}
              className={`block w-full text-left font-body text-sm px-3 py-2 rounded-lg transition-colors ${
                filters.maxPrice === p
                  ? 'bg-gold text-white'
                  : 'text-espresso-soft hover:bg-gold-tint'
              }`}
            >
              Up to ${p}
            </button>
          ))}
        </div>
      </div>

      {/* In stock */}
      <div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={!!filters.inStock}
            onChange={e => onChange({ ...filters, inStock: e.target.checked || undefined })}
            className="w-4 h-4 accent-gold rounded"
          />
          <span className="font-body text-sm text-espresso-soft">In stock only</span>
        </label>
      </div>

      {/* Clear */}
      <button
        onClick={() => onChange({})}
        className="font-body text-xs text-gold hover:underline"
      >
        Clear all filters
      </button>
    </GlassCard>
  )
}
```

- [ ] **Step 7: Replace Shop page placeholder**

Replace `aurea/src/pages/Shop.jsx`:

```jsx
import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import products from '../data/products.json'
import { filterProducts } from '../components/shop/filterProducts'
import ProductCard from '../components/shop/ProductCard'
import FilterSidebar from '../components/shop/FilterSidebar'
import Footer from '../components/layout/Footer'

const CATEGORIES = ['all', 'rings', 'necklaces', 'earrings', 'bracelets']
const PER_PAGE = 6

export default function Shop() {
  const [searchParams] = useSearchParams()
  const initCategory = searchParams.get('category') || 'all'
  const [activeCategory, setActiveCategory] = useState(initCategory)
  const [filters, setFilters] = useState({})
  const [page, setPage] = useState(1)

  const categoryFilter = activeCategory !== 'all' ? { category: activeCategory } : {}
  const combined = { ...categoryFilter, ...filters }
  const filtered = useMemo(() => filterProducts(products, combined), [combined, activeCategory, filters])
  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  function handleCategoryChange(cat) {
    setActiveCategory(cat)
    setPage(1)
  }

  function handleFilterChange(f) {
    setFilters(f)
    setPage(1)
  }

  return (
    <main className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-aurea-gradient pt-28 pb-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <p className="label-tag mb-3">Browse</p>
          <h1 className="section-heading mb-8">Our Collection</h1>
          {/* Category pills */}
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`font-body text-sm px-5 py-2 rounded-full border transition-all capitalize ${
                  activeCategory === cat
                    ? 'bg-gold text-white border-gold'
                    : 'bg-white/60 border-gold-border text-espresso-soft hover:border-gold hover:text-gold'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-56 shrink-0">
            <FilterSidebar filters={filters} onChange={handleFilterChange} />
          </aside>

          {/* Grid */}
          <div className="flex-1">
            <p className="font-body text-sm text-espresso-soft mb-6">
              {filtered.length} product{filtered.length !== 1 ? 's' : ''}
            </p>
            {paged.length === 0 ? (
              <div className="text-center py-20">
                <p className="font-display text-2xl text-espresso-soft">No products match these filters.</p>
              </div>
            ) : (
              <motion.div
                key={`${activeCategory}-${page}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
              >
                {paged.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-3 mt-12">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="font-body text-sm px-5 py-2 rounded-lg border border-gold-border text-espresso-soft hover:border-gold disabled:opacity-40 transition-colors"
                >
                  Previous
                </button>
                <span className="font-body text-sm flex items-center px-4 text-espresso-soft">
                  {page} / {totalPages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="font-body text-sm px-5 py-2 rounded-lg border border-gold-border text-espresso-soft hover:border-gold disabled:opacity-40 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
```

- [ ] **Step 8: Verify Shop page works**

```bash
npm run dev
```

Expected: navigate to `/shop` — grid of products, filter sidebar visible on large screens, category pills working. Stop with Ctrl+C.

- [ ] **Step 9: Run all tests**

```bash
npx vitest run
```

Expected: all 13 tests (6 CartContext + 7 filterProducts) PASS.

- [ ] **Step 10: Commit**

```bash
git add src/components/shop/ tests/filterProducts.test.js src/pages/Shop.jsx
git commit -m "feat: add Shop page with ProductCard, FilterSidebar, filter logic and tests"
```

---

## Task 13: Product Detail page

**Files:**
- Create: `aurea/src/components/product/ImageGallery.jsx`
- Create: `aurea/src/components/product/RelatedProducts.jsx`
- Modify: `aurea/src/pages/ProductDetail.jsx`

- [ ] **Step 1: Create ImageGallery**

Create `aurea/src/components/product/ImageGallery.jsx`:

```jsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ImageGallery({ images, name }) {
  const [selected, setSelected] = useState(0)

  return (
    <div>
      {/* Main image */}
      <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-cream-dark mb-3">
        <AnimatePresence mode="wait">
          <motion.img
            key={selected}
            src={images[selected]}
            alt={name}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          />
        </AnimatePresence>
      </div>
      {/* Thumbnails */}
      <div className="flex gap-3">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
              selected === i ? 'border-gold' : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            <img src={src} alt={`${name} ${i + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create RelatedProducts**

Create `aurea/src/components/product/RelatedProducts.jsx`:

```jsx
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import GlassCard from '../ui/GlassCard'
import products from '../../data/products.json'

export default function RelatedProducts({ currentId, category }) {
  const related = products.filter(p => p.category === category && p.id !== currentId).slice(0, 4)
  if (related.length === 0) return null

  return (
    <div className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      <h2 className="section-heading mb-8">You might also like</h2>
      <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-2">
        {related.map((p, i) => (
          <motion.div
            key={p.id}
            className="min-w-[220px]"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Link to={`/shop/${p.id}`}>
              <GlassCard hoverable className="overflow-hidden">
                <div className="aspect-[3/4] overflow-hidden">
                  <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-3">
                  <h4 className="font-display text-base text-espresso truncate">{p.name}</h4>
                  <p className="font-body text-sm text-gold">${p.price}</p>
                </div>
              </GlassCard>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Replace ProductDetail placeholder**

Replace `aurea/src/pages/ProductDetail.jsx`:

```jsx
import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import products from '../data/products.json'
import { useCart } from '../context/CartContext'
import ImageGallery from '../components/product/ImageGallery'
import RelatedProducts from '../components/product/RelatedProducts'
import GlassCard from '../components/ui/GlassCard'
import GoldButton from '../components/ui/GoldButton'
import Footer from '../components/layout/Footer'

const MATERIAL_LABELS = { resin: 'Premium Resin', steel: 'Stainless Steel', combo: 'Resin + Steel' }

export default function ProductDetail() {
  const { id } = useParams()
  const product = products.find(p => p.id === id)
  const { addItem } = useCart()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [accordionOpen, setAccordionOpen] = useState(false)

  if (!product) return <Navigate to="/shop" replace />

  function handleAddToCart() {
    for (let i = 0; i < qty; i++) addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 font-body text-sm text-espresso-soft mb-8">
          <Link to="/shop" className="hover:text-gold transition-colors">Shop</Link>
          <span>/</span>
          <span className="capitalize">{product.category}</span>
          <span>/</span>
          <span className="text-espresso">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Gallery */}
          <ImageGallery images={product.images} name={product.name} />

          {/* Details */}
          <GlassCard className="p-8 h-fit">
            <p className="label-tag mb-2 capitalize">{product.category}</p>
            <h1 className="font-display text-4xl text-espresso mb-2">{product.name}</h1>

            {/* Material badge */}
            <div className="inline-flex items-center gap-2 bg-gold-tint border border-gold-border rounded-full px-4 py-1 mb-6">
              <span className="w-2 h-2 rounded-full bg-gold" />
              <span className="font-body text-sm text-espresso">{MATERIAL_LABELS[product.material]}</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display text-4xl text-gold">${product.price}</span>
              <span className="font-body text-sm text-espresso-soft">Free shipping over $80</span>
            </div>

            {/* Colors */}
            <div className="mb-6">
              <p className="font-body text-sm font-medium text-espresso mb-3">Available colors</p>
              <div className="flex gap-2">
                {product.colors.map(color => (
                  <div
                    key={color}
                    className="w-7 h-7 rounded-full border-2 border-white shadow-card cursor-pointer hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <p className="font-body text-sm font-medium text-espresso">Quantity</p>
              <div className="flex items-center gap-3 glass !bg-white/80 px-4 py-2 rounded-xl">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="text-espresso-soft hover:text-gold text-lg font-light w-6 text-center">−</button>
                <span className="font-body text-sm w-4 text-center">{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="text-espresso-soft hover:text-gold text-lg font-light w-6 text-center">+</button>
              </div>
            </div>

            {/* CTA */}
            <motion.div animate={added ? { scale: [1, 1.03, 1] } : {}}>
              <GoldButton
                className="w-full !py-4 !text-base"
                disabled={!product.inStock}
                onClick={handleAddToCart}
              >
                {added ? '✓ Added to Cart' : product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </GoldButton>
            </motion.div>

            {/* Description accordion */}
            <div className="mt-6 border-t border-gold-border pt-4">
              <button
                onClick={() => setAccordionOpen(v => !v)}
                className="flex justify-between w-full font-body text-sm font-medium text-espresso py-2"
              >
                Product Details
                <span>{accordionOpen ? '−' : '+'}</span>
              </button>
              {accordionOpen && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="font-body text-sm text-espresso-soft leading-relaxed mt-2"
                >
                  {product.description}
                </motion.p>
              )}
            </div>
          </GlassCard>
        </div>
      </div>

      <RelatedProducts currentId={id} category={product.category} />
      <Footer />
    </main>
  )
}
```

- [ ] **Step 4: Verify Product Detail works**

```bash
npm run dev
```

Expected: click any product card → product detail page with image gallery, add-to-cart (badge in navbar updates), accordion, related products. Stop with Ctrl+C.

- [ ] **Step 5: Commit**

```bash
git add src/components/product/ src/pages/ProductDetail.jsx
git commit -m "feat: add Product Detail page with image gallery, quantity, and add-to-cart"
```

---

## Task 14: Custom Order page with EmailJS and form validation tests

**Files:**
- Create: `aurea/src/lib/emailjs.js`
- Create: `aurea/tests/OrderForm.test.jsx`
- Modify: `aurea/src/pages/CustomOrder.jsx`

- [ ] **Step 1: Create EmailJS helper**

Create `aurea/src/lib/emailjs.js`:

```js
import emailjs from '@emailjs/browser'

// Replace these with your actual EmailJS credentials:
// 1. Sign up at https://emailjs.com
// 2. Create a service (e.g., Gmail) → note the Service ID
// 3. Create an email template → note the Template ID
// 4. Copy your Public Key from Account > API Keys
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID'
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID'
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'

/**
 * Send a custom order form via EmailJS.
 * @param {Object} data - Form fields matching the EmailJS template variables.
 * @returns {Promise}
 */
export function sendOrderEmail(data) {
  return emailjs.send(SERVICE_ID, TEMPLATE_ID, data, PUBLIC_KEY)
}
```

- [ ] **Step 2: Write failing validation tests**

Create `aurea/tests/OrderForm.test.jsx`:

```jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'

// Mock emailjs lib so tests don't make real network calls
vi.mock('../src/lib/emailjs', () => ({
  sendOrderEmail: vi.fn().mockResolvedValue({ status: 200 }),
}))

import CustomOrder from '../src/pages/CustomOrder'

function renderPage() {
  return render(
    <BrowserRouter>
      <CustomOrder />
    </BrowserRouter>
  )
}

describe('Custom Order form validation', () => {
  test('shows error when name is empty on submit', async () => {
    renderPage()
    fireEvent.click(screen.getByRole('button', { name: /submit/i }))
    expect(await screen.findByText(/name is required/i)).toBeInTheDocument()
  })

  test('shows error when email is invalid', async () => {
    renderPage()
    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: 'Ana' } })
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'notanemail' } })
    fireEvent.click(screen.getByRole('button', { name: /submit/i }))
    expect(await screen.findByText(/valid email/i)).toBeInTheDocument()
  })

  test('shows error when description is too short', async () => {
    renderPage()
    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: 'Ana' } })
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'ana@test.com' } })
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'short' } })
    fireEvent.click(screen.getByRole('button', { name: /submit/i }))
    expect(await screen.findByText(/at least 20 characters/i)).toBeInTheDocument()
  })

  test('submits successfully when all fields are valid', async () => {
    const { sendOrderEmail } = await import('../src/lib/emailjs')
    renderPage()
    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: 'Ana' } })
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'ana@test.com' } })
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'I want a lily resin ring in gold and cream colors.' } })
    fireEvent.click(screen.getByRole('button', { name: /submit/i }))
    await waitFor(() => expect(sendOrderEmail).toHaveBeenCalled())
    expect(await screen.findByText(/thank you/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 3: Run tests to verify they fail**

```bash
npx vitest run tests/OrderForm.test.jsx
```

Expected: FAIL — page doesn't exist yet / missing validation

- [ ] **Step 4: Replace CustomOrder placeholder with full implementation**

Replace `aurea/src/pages/CustomOrder.jsx`:

```jsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { sendOrderEmail } from '../lib/emailjs'
import GlassCard from '../components/ui/GlassCard'
import GoldButton from '../components/ui/GoldButton'
import AnimatedSection from '../components/ui/AnimatedSection'
import Footer from '../components/layout/Footer'

const PIECE_TYPES = ['Ring', 'Necklace', 'Earrings', 'Bracelet', 'Other']
const MATERIALS = ['Resin only', 'Steel only', 'Resin + Steel combo']

const STEPS = [
  { num: '01', title: 'Share your vision', desc: 'Fill in the form with your idea, colors, and inspiration.' },
  { num: '02', title: 'We design it', desc: 'Our artisans sketch your piece and share a preview within 48h.' },
  { num: '03', title: 'We craft & ship', desc: 'Handcrafted to perfection and shipped in premium packaging.' },
]

const FAQ = [
  { q: 'How long does it take?', a: 'Custom orders take 7–14 business days from design approval to delivery.' },
  { q: 'Can I see a preview first?', a: 'Yes! We send a digital sketch for your approval before crafting begins. One free revision included.' },
  { q: 'What if I\'m not happy?', a: 'We offer a satisfaction guarantee. If the final piece doesn\'t match the approved design, we\'ll redo it.' },
  { q: 'How much does a custom order cost?', a: 'Pricing starts at $80 and depends on complexity and materials. We\'ll confirm the price before charging.' },
]

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Name is required'
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = 'Please enter a valid email address'
  if (form.description.trim().length < 20)
    errors.description = 'Please enter at least 20 characters describing your piece'
  return errors
}

export default function CustomOrder() {
  const [form, setForm] = useState({
    name: '', email: '', pieceType: PIECE_TYPES[0], material: MATERIALS[0],
    colorInspiration: '', description: '',
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [openFaq, setOpenFaq] = useState(null)

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }))
    if (errors[field]) setErrors(e => ({ ...e, [field]: undefined }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setStatus('loading')
    try {
      await sendOrderEmail({ ...form, to_name: 'Aurea Studio' })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <main className="min-h-screen bg-cream">
      {/* Hero */}
      <div className="bg-aurea-gradient pt-28 pb-16 px-4 sm:px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="label-tag mb-3">One of a kind</p>
          <h1 className="section-heading mb-4">Design your unique piece</h1>
          <p className="font-body text-lg text-espresso-soft">
            Tell us your vision and we'll bring it to life in resin and steel.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <AnimatedSection>
            <GlassCard className="p-8">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center"
                  >
                    <div className="text-5xl mb-4">✨</div>
                    <h2 className="font-display text-3xl text-espresso mb-3">Thank you, {form.name}!</h2>
                    <p className="font-body text-espresso-soft">
                      We received your custom order request. Our team will reach out within 48 hours with your design preview.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <h2 className="font-display text-2xl text-espresso mb-1">Your details</h2>

                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="label-tag block mb-2">Your name</label>
                      <input
                        id="name"
                        type="text"
                        value={form.name}
                        onChange={e => set('name', e.target.value)}
                        placeholder="Ana García"
                        className={`w-full bg-white/60 border rounded-xl px-4 py-3 font-body text-sm text-espresso placeholder-espresso-soft/40 focus:outline-none transition-colors ${errors.name ? 'border-red-400' : 'border-gold-border focus:border-gold'}`}
                      />
                      {errors.name && <p className="font-body text-xs text-red-500 mt-1">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="label-tag block mb-2">Email</label>
                      <input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={e => set('email', e.target.value)}
                        placeholder="ana@example.com"
                        className={`w-full bg-white/60 border rounded-xl px-4 py-3 font-body text-sm text-espresso placeholder-espresso-soft/40 focus:outline-none transition-colors ${errors.email ? 'border-red-400' : 'border-gold-border focus:border-gold'}`}
                      />
                      {errors.email && <p className="font-body text-xs text-red-500 mt-1">{errors.email}</p>}
                    </div>

                    {/* Piece type */}
                    <div>
                      <label htmlFor="pieceType" className="label-tag block mb-2">Type of piece</label>
                      <select
                        id="pieceType"
                        value={form.pieceType}
                        onChange={e => set('pieceType', e.target.value)}
                        className="w-full bg-white/60 border border-gold-border rounded-xl px-4 py-3 font-body text-sm text-espresso focus:outline-none focus:border-gold"
                      >
                        {PIECE_TYPES.map(t => <option key={t}>{t}</option>)}
                      </select>
                    </div>

                    {/* Material */}
                    <div>
                      <label htmlFor="material" className="label-tag block mb-2">Material preference</label>
                      <select
                        id="material"
                        value={form.material}
                        onChange={e => set('material', e.target.value)}
                        className="w-full bg-white/60 border border-gold-border rounded-xl px-4 py-3 font-body text-sm text-espresso focus:outline-none focus:border-gold"
                      >
                        {MATERIALS.map(m => <option key={m}>{m}</option>)}
                      </select>
                    </div>

                    {/* Color inspiration */}
                    <div>
                      <label htmlFor="colorInspiration" className="label-tag block mb-2">Color palette / inspiration</label>
                      <input
                        id="colorInspiration"
                        type="text"
                        value={form.colorInspiration}
                        onChange={e => set('colorInspiration', e.target.value)}
                        placeholder="e.g. warm gold and cream, sunset tones, ocean blues…"
                        className="w-full bg-white/60 border border-gold-border rounded-xl px-4 py-3 font-body text-sm text-espresso placeholder-espresso-soft/40 focus:outline-none focus:border-gold"
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label htmlFor="description" className="label-tag block mb-2">Describe your piece</label>
                      <textarea
                        id="description"
                        rows={4}
                        value={form.description}
                        onChange={e => set('description', e.target.value)}
                        placeholder="Tell us about your piece — style, occasion, who it's for, any details that inspire you…"
                        className={`w-full bg-white/60 border rounded-xl px-4 py-3 font-body text-sm text-espresso placeholder-espresso-soft/40 focus:outline-none transition-colors resize-none ${errors.description ? 'border-red-400' : 'border-gold-border focus:border-gold'}`}
                      />
                      {errors.description && <p className="font-body text-xs text-red-500 mt-1">{errors.description}</p>}
                    </div>

                    {status === 'error' && (
                      <p className="font-body text-sm text-red-500">Something went wrong. Please try again or email us directly.</p>
                    )}

                    <GoldButton
                      type="submit"
                      className="w-full !py-4 !text-base"
                      disabled={status === 'loading'}
                    >
                      {status === 'loading' ? 'Sending…' : 'Submit My Order'}
                    </GoldButton>
                  </motion.form>
                )}
              </AnimatePresence>
            </GlassCard>
          </AnimatedSection>

          {/* Right column: How it works + FAQ */}
          <AnimatedSection delay={0.2} className="space-y-8">
            {/* Steps */}
            <div>
              <p className="label-tag mb-6">How it works</p>
              <div className="space-y-5">
                {STEPS.map(step => (
                  <GlassCard key={step.num} className="p-5 flex gap-5 items-start">
                    <span className="font-display text-3xl text-gold/40 shrink-0">{step.num}</span>
                    <div>
                      <h3 className="font-display text-lg text-espresso mb-1">{step.title}</h3>
                      <p className="font-body text-sm text-espresso-soft">{step.desc}</p>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div>
              <p className="label-tag mb-4">FAQ</p>
              <div className="space-y-3">
                {FAQ.map((item, i) => (
                  <GlassCard key={i} className="overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full text-left px-5 py-4 flex justify-between items-center"
                    >
                      <span className="font-body text-sm font-medium text-espresso">{item.q}</span>
                      <span className="text-gold text-lg font-light">{openFaq === i ? '−' : '+'}</span>
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="px-5 pb-4"
                        >
                          <p className="font-body text-sm text-espresso-soft">{item.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </GlassCard>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
      <Footer />
    </main>
  )
}
```

- [ ] **Step 5: Run form validation tests**

```bash
npx vitest run tests/OrderForm.test.jsx
```

Expected: 4 tests PASS

- [ ] **Step 6: Verify page renders in browser**

```bash
npm run dev
```

Expected: navigate to `/custom` — form with validation, FAQ accordion, how-it-works steps. Stop with Ctrl+C.

- [ ] **Step 7: Commit**

```bash
git add src/lib/emailjs.js src/pages/CustomOrder.jsx tests/OrderForm.test.jsx
git commit -m "feat: add Custom Order page with EmailJS, form validation and tests"
```

---

## Task 15: About page

**Files:**
- Modify: `aurea/src/pages/About.jsx`

- [ ] **Step 1: Replace About placeholder**

Replace `aurea/src/pages/About.jsx`:

```jsx
import { motion } from 'framer-motion'
import AnimatedSection from '../components/ui/AnimatedSection'
import GlassCard from '../components/ui/GlassCard'
import Footer from '../components/layout/Footer'

const VALUES = [
  { icon: '🌿', title: 'Sustainable', desc: 'We use eco-conscious resins and source materials responsibly.' },
  { icon: '✋', title: 'Handcrafted', desc: 'Every piece is made by hand, one at a time, with full attention to detail.' },
  { icon: '💛', title: 'Personal', desc: 'We believe jewelry should carry meaning — that\'s why we offer full customization.' },
]

const GALLERY = [
  'https://picsum.photos/seed/gal1/400/400',
  'https://picsum.photos/seed/gal2/400/400',
  'https://picsum.photos/seed/gal3/400/400',
  'https://picsum.photos/seed/gal4/400/400',
  'https://picsum.photos/seed/gal5/400/400',
  'https://picsum.photos/seed/gal6/400/400',
]

export default function About() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Parallax hero */}
      <section className="relative h-[60vh] overflow-hidden flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://picsum.photos/seed/abouthero/1600/900)', transform: 'scale(1.1)' }}
        />
        <div className="absolute inset-0 bg-espresso/40" />
        <div className="relative z-10 text-center px-4">
          <p className="label-tag text-white/80 mb-4">Our story</p>
          <motion.h1
            className="font-display text-5xl md:text-7xl font-light text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            "Crafted for you,<br />
            <em className="text-gold-light">forever."</em>
          </motion.h1>
        </div>
      </section>

      {/* Story */}
      <AnimatedSection className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="label-tag mb-4">The founder</p>
            <h2 className="font-display text-4xl text-espresso mb-6">Born from a passion for detail</h2>
            <p className="font-body text-espresso-soft leading-relaxed mb-4">
              Aurea was founded in 2021 with a simple belief: jewelry should be as unique as the person wearing it.
              What started as a small studio experiment with resin and flowers became a full creative practice.
            </p>
            <p className="font-body text-espresso-soft leading-relaxed mb-4">
              Every piece in our collection is designed and made by hand in our studio. We work with premium UV-grade
              resin and high-quality stainless steel to ensure your pieces last a lifetime.
            </p>
            <p className="font-body text-espresso-soft leading-relaxed">
              Our mission is simple: bring your story to life in a piece you'll wear every day.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden aspect-[4/5]">
            <img
              src="https://picsum.photos/seed/founder/600/750"
              alt="Aurea studio"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </AnimatedSection>

      {/* Values */}
      <AnimatedSection className="py-20 bg-cream-mid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="label-tag mb-3">What we stand for</p>
            <h2 className="section-heading">Our values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
              >
                <GlassCard className="p-8 text-center">
                  <div className="text-5xl mb-4">{v.icon}</div>
                  <h3 className="font-display text-2xl text-espresso mb-3">{v.title}</h3>
                  <p className="font-body text-sm text-espresso-soft leading-relaxed">{v.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Gallery */}
      <AnimatedSection className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <p className="label-tag mb-3">@aurea.studio</p>
          <h2 className="section-heading">From our studio</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {GALLERY.map((src, i) => (
            <motion.div
              key={src}
              className="aspect-square rounded-2xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <img src={src} alt={`Studio ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      <Footer />
    </main>
  )
}
```

- [ ] **Step 2: Verify About page**

```bash
npm run dev
```

Expected: navigate to `/about` — parallax hero with quote overlay, founder story, 3 value cards, gallery grid. Stop with Ctrl+C.

- [ ] **Step 3: Commit**

```bash
git add src/pages/About.jsx
git commit -m "feat: add About page with parallax hero, brand story, values, gallery"
```

---

## Task 16: Cart Drawer

**Files:**
- Modify: `aurea/src/components/cart/CartDrawer.jsx`

- [ ] **Step 1: Replace CartDrawer placeholder with full implementation**

Replace `aurea/src/components/cart/CartDrawer.jsx`:

```jsx
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import GoldButton from '../ui/GoldButton'

export default function CartDrawer({ open, onClose }) {
  const { items, count, removeItem, clearCart } = useCart()
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-espresso/30 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white/90 backdrop-blur-glass border-l border-gold-border shadow-glass-hover z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gold-border">
              <h2 className="font-display text-2xl text-espresso">Your Cart ({count})</h2>
              <button onClick={onClose} className="p-2 text-espresso-soft hover:text-espresso transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="py-16 text-center">
                  <p className="font-display text-xl text-espresso-soft mb-4">Your cart is empty</p>
                  <Link to="/shop" onClick={onClose}>
                    <GoldButton variant="outline">Browse Collection</GoldButton>
                  </Link>
                </div>
              ) : (
                items.map(item => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex gap-4 bg-cream/60 rounded-xl p-3"
                  >
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display text-base text-espresso truncate">{item.name}</h4>
                      <p className="font-body text-xs text-espresso-soft capitalize mb-1">{item.material}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-body text-sm text-gold font-medium">
                          ${item.price} × {item.quantity}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-espresso-soft hover:text-red-400 transition-colors"
                          aria-label={`Remove ${item.name}`}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gold-border px-6 py-5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-body text-sm text-espresso-soft">Subtotal</span>
                  <span className="font-display text-xl text-espresso">${total}</span>
                </div>
                <p className="font-body text-xs text-espresso-soft text-center">
                  Checkout coming soon — contact us to complete your order.
                </p>
                <Link to="/custom" onClick={onClose}>
                  <GoldButton className="w-full !py-3">Place Custom Order</GoldButton>
                </Link>
                <button
                  onClick={clearCart}
                  className="w-full font-body text-xs text-espresso-soft hover:text-red-400 transition-colors py-1"
                >
                  Clear cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

- [ ] **Step 2: Verify cart drawer works**

```bash
npm run dev
```

Expected: click cart icon in navbar → slide-in drawer from right, add products from shop → they appear in drawer with correct count, remove items → animate out, clear cart → returns to empty state. Stop with Ctrl+C.

- [ ] **Step 3: Run all tests**

```bash
npx vitest run
```

Expected: all 17 tests PASS (6 CartContext + 7 filterProducts + 4 OrderForm).

- [ ] **Step 4: Commit**

```bash
git add src/components/cart/CartDrawer.jsx
git commit -m "feat: add Cart Drawer with slide animation, item list, and remove/clear"
```

---

## Task 17: Final verification and build

**Files:** No new files — verification only.

- [ ] **Step 1: Run full test suite**

```bash
cd aurea && npx vitest run
```

Expected: 17 tests PASS. If any fail, read the error and fix the failing assertion before proceeding.

- [ ] **Step 2: Run production build**

```bash
npm run build
```

Expected: build completes with no errors. Warnings about bundle size are acceptable.

- [ ] **Step 3: Preview the production build**

```bash
npm run preview
```

Expected: open `http://localhost:4173` — all 5 pages work, routing works, cart works, form validates. Stop with Ctrl+C.

- [ ] **Step 4: Check all 5 routes manually**

Visit each route and confirm:
- `/` — Landing: particles visible, GSAP entrance plays on load, all sections visible, footer present
- `/shop` — Shop: all 12 products load, category pills filter correctly, filter sidebar works, pagination appears
- `/shop/necklace-001` — Product Detail: image gallery, thumbnail switch, add to cart (badge updates in navbar)
- `/custom` — Custom Order: form validates on submit, FAQ accordion opens, steps visible
- `/about` — About: parallax hero, story, values, gallery

- [ ] **Step 5: Create .env.example for EmailJS credentials**

Create `aurea/.env.example`:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

- [ ] **Step 6: Final commit**

```bash
git add .
git commit -m "feat: complete Aurea jewelry marketplace — all pages, tests passing, build clean"
```

---

## EmailJS Setup (post-build)

To enable the real form submission:
1. Sign up at [emailjs.com](https://emailjs.com)
2. Create a Gmail (or other) service → copy Service ID
3. Create a template with variables: `{{name}}`, `{{email}}`, `{{pieceType}}`, `{{material}}`, `{{colorInspiration}}`, `{{description}}` → copy Template ID
4. Go to Account > API Keys → copy Public Key
5. Create `aurea/.env` with your real values (use `.env.example` as reference)
6. Restart dev server

---

## Summary

| Task | Deliverable |
|---|---|
| 1 | Vite project scaffolded, all deps installed, Vitest configured |
| 2 | Tailwind config with Aurea tokens, global CSS with glassmorphism classes |
| 3 | 12 mock products + 3 testimonials JSON |
| 4 | CartContext with useReducer, 6 passing tests |
| 5 | GlassCard, GoldButton, AnimatedSection UI components |
| 6 | Sticky Navbar with glass scroll effect and cart badge |
| 7 | Footer with newsletter and navigation |
| 8 | React Router v6 + AnimatePresence page transitions |
| 9 | Animated gold particle canvas |
| 10 | Hero section with GSAP staggered entrance |
| 11 | Landing page fully assembled (all sections) |
| 12 | Shop page with ProductCard, FilterSidebar, filter logic, 7 tests |
| 13 | Product Detail with image gallery, add-to-cart, related products |
| 14 | Custom Order form with EmailJS, validation, 4 tests |
| 15 | About page with parallax hero, values, gallery |
| 16 | Cart Drawer with animation and item management |
| 17 | All 17 tests green, production build clean |
