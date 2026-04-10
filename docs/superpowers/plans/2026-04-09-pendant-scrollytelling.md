# Pendant Scrollytelling Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a scroll-linked image-sequence page (`/design`) showing a pendant assembling across 151 frames, with text overlays that fade in/out at key scroll positions.

**Architecture:** A sticky HTML5 canvas renders each frame of the pendant assembly as the user scrolls. Framer Motion's `useScroll` drives frame selection and text overlay opacity from the same scroll value. All 151 images preload on mount; a loading overlay hides the canvas until ready.

**Tech Stack:** React, TypeScript, Framer Motion (`useScroll`, `useTransform`, `useMotionValueEvent`, `useMotionTemplate`), HTML5 Canvas, Tailwind CSS, Vitest + React Testing Library.

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Modify | `src/App.jsx` | Register `/design` route |
| Modify | `src/components/layout/Navbar.jsx` | Add "Design" nav link |
| Create | `src/pages/DesignPage.tsx` | Page shell — background gradient, renders `<PendantScroll />` |
| Create | `src/components/pendant-scroll/PendantScroll.tsx` | Canvas, scroll logic, image preload, text overlays, loading state |
| Create | `tests/PendantScroll.test.jsx` | Component smoke tests |

---

## Task 1: Register route and navbar link

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/components/layout/Navbar.jsx`

- [ ] **Step 1: Add "Design" to navLinks in Navbar.jsx**

In `src/components/layout/Navbar.jsx`, change the `navLinks` array from:
```js
const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/custom', label: 'Custom Order' },
  { to: '/about', label: 'About' },
]
```
to:
```js
const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/custom', label: 'Custom Order' },
  { to: '/design', label: 'Design' },
  { to: '/about', label: 'About' },
]
```

- [ ] **Step 2: Register the route in App.jsx**

In `src/App.jsx`, add the import after existing page imports:
```js
import DesignPage from './pages/DesignPage'
```

Add the route inside `<Routes>` after the `/custom` route:
```jsx
<Route path="/design" element={<PageWrapper><DesignPage /></PageWrapper>} />
```

- [ ] **Step 3: Verify in dev server**

Run: `npm run dev`
Open `http://localhost:5173` — "Design" appears in the navbar between "Custom Order" and "About". Clicking it routes to `/design` (will 404 until Task 2).

- [ ] **Step 4: Commit**

```bash
git add src/App.jsx src/components/layout/Navbar.jsx
git commit -m "feat: add /design route and navbar link"
```

---

## Task 2: Create DesignPage shell and PendantScroll stub

**Files:**
- Create: `src/pages/DesignPage.tsx`
- Create: `src/components/pendant-scroll/PendantScroll.tsx`

- [ ] **Step 1: Create PendantScroll.tsx stub**

```tsx
// src/components/pendant-scroll/PendantScroll.tsx
export default function PendantScroll() {
  return <div data-testid="pendant-scroll" />
}
```

- [ ] **Step 2: Create DesignPage.tsx**

```tsx
// src/pages/DesignPage.tsx
import PendantScroll from '../components/pendant-scroll/PendantScroll'

export default function DesignPage() {
  return (
    <main style={{ background: 'linear-gradient(135deg, #FAF8F0 0%, #F5EDD8 50%, #EDE0C4 100%)', minHeight: '100vh' }}>
      <PendantScroll />
    </main>
  )
}
```

- [ ] **Step 3: Verify `/design` loads**

Run: `npm run dev`
Navigate to `http://localhost:5173/design` — page renders without console errors.

- [ ] **Step 4: Commit**

```bash
git add src/pages/DesignPage.tsx src/components/pendant-scroll/PendantScroll.tsx
git commit -m "feat: DesignPage shell and PendantScroll stub"
```

---

## Task 3: Write tests for PendantScroll (red phase)

**Files:**
- Create: `tests/PendantScroll.test.jsx`

- [ ] **Step 1: Write the tests**

```jsx
// tests/PendantScroll.test.jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { vi, describe, it, expect, beforeAll } from 'vitest'

vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion')
  const mockMV = { get: () => 0, on: vi.fn(), destroy: vi.fn() }
  return {
    ...actual,
    useScroll: () => ({ scrollYProgress: mockMV }),
    useTransform: () => mockMV,
    useMotionValueEvent: vi.fn(),
    useMotionTemplate: () => mockMV,
  }
})

beforeAll(() => {
  HTMLCanvasElement.prototype.getContext = vi.fn(() => ({
    clearRect: vi.fn(),
    drawImage: vi.fn(),
    fillRect: vi.fn(),
    fillStyle: '',
  }))
})

import PendantScroll from '../src/components/pendant-scroll/PendantScroll'

function Wrapper({ children }) {
  return <MemoryRouter>{children}</MemoryRouter>
}

describe('PendantScroll', () => {
  it('renders without crashing', () => {
    render(<PendantScroll />, { wrapper: Wrapper })
  })

  it('renders the canvas element', () => {
    render(<PendantScroll />, { wrapper: Wrapper })
    expect(document.querySelector('canvas')).toBeInTheDocument()
  })

  it('renders the loading overlay', () => {
    render(<PendantScroll />, { wrapper: Wrapper })
    expect(document.querySelector('[data-testid="loading-overlay"]')).toBeInTheDocument()
  })

  it('renders the intro text panel', () => {
    render(<PendantScroll />, { wrapper: Wrapper })
    expect(screen.getByText('Personalize it as you imagine')).toBeInTheDocument()
  })

  it('renders the CTA link pointing to /custom', () => {
    render(<PendantScroll />, { wrapper: Wrapper })
    const link = screen.getByRole('link', { name: /make it yours/i })
    expect(link).toHaveAttribute('href', '/custom')
  })
})
```

- [ ] **Step 2: Run tests — confirm they fail**

Run: `npm test -- PendantScroll`

Expected: tests fail (stub renders nothing).

- [ ] **Step 3: Commit failing tests**

```bash
git add tests/PendantScroll.test.jsx
git commit -m "test: PendantScroll smoke tests (red)"
```

---

## Task 4: Implement PendantScroll

**Files:**
- Modify: `src/components/pendant-scroll/PendantScroll.tsx`

- [ ] **Step 1: Replace stub with full implementation**

Overwrite `src/components/pendant-scroll/PendantScroll.tsx` with:

```tsx
// src/components/pendant-scroll/PendantScroll.tsx
import { useEffect, useRef, useState, useCallback } from 'react'
import {
  useScroll,
  useTransform,
  useMotionValueEvent,
  useMotionTemplate,
  motion,
} from 'framer-motion'
import { Link } from 'react-router-dom'

// ─── Constants ────────────────────────────────────────────────────────────────

const FRAME_COUNT = 151
const BG = '#EDE0C4'

function frameSrc(i: number): string {
  return `/images/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`
}

// ─── Text panel config ────────────────────────────────────────────────────────

interface TextPanel {
  id: string
  center: number  // scroll progress (0–1) where panel is fully visible
  width: number   // half-width of visibility window around center
  text: string
  align: 'left' | 'center' | 'right'
  font: 'display' | 'body'
  showButton?: boolean
}

const PANELS: TextPanel[] = [
  { id: 'intro', center: 0.05, width: 0.06, text: 'Personalize it as you imagine',                         align: 'center', font: 'display' },
  { id: 'idea',  center: 0.30, width: 0.07, text: 'Every piece begins with your idea.',                    align: 'left',   font: 'body'    },
  { id: 'craft', center: 0.60, width: 0.07, text: 'Handcrafted in steel and resin, shaped to your story.', align: 'right',  font: 'body'    },
  { id: 'cta',   center: 0.90, width: 0.07, text: 'Wear something made only for you.',                     align: 'center', font: 'display', showButton: true },
]

// ─── Main component ───────────────────────────────────────────────────────────

export default function PendantScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const imagesRef    = useRef<HTMLImageElement[]>([])
  const [loaded, setLoaded]               = useState(false)
  const [overlayVisible, setOverlayVisible] = useState(true)

  const { scrollYProgress } = useScroll({ target: containerRef })
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1])

  // ── Preload ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    let done = 0
    const finish = () => { if (++done === FRAME_COUNT) setLoaded(true) }
    imagesRef.current = Array.from({ length: FRAME_COUNT }, (_, i) => {
      const img = new Image()
      img.src = frameSrc(i)
      img.onload  = finish
      img.onerror = finish   // skip broken frames rather than hanging
      return img
    })
  }, [])

  useEffect(() => {
    if (!loaded) return
    const t = setTimeout(() => setOverlayVisible(false), 300)
    return () => clearTimeout(t)
  }, [loaded])

  // ── Canvas draw ──────────────────────────────────────────────────────────────
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const img = imagesRef.current[Math.round(index)]
    if (!img?.complete || !img.naturalWidth) return

    ctx.fillStyle = BG
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const scale = Math.min(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight)
    const w = img.naturalWidth  * scale
    const h = img.naturalHeight * scale
    ctx.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h)
  }, [])

  useMotionValueEvent(frameIndex, 'change', drawFrame)

  useEffect(() => { if (loaded) drawFrame(0) }, [loaded, drawFrame])

  // ── Canvas sizing ────────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      drawFrame(Math.round(frameIndex.get()))
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    return () => ro.disconnect()
  }, [drawFrame, frameIndex])

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <div ref={containerRef} style={{ height: '400vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100%' }}>

        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            backgroundColor: BG,
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        />

        {PANELS.map(panel => (
          <TextOverlay key={panel.id} panel={panel} scrollYProgress={scrollYProgress} />
        ))}

        {/* Loading overlay */}
        <div
          data-testid="loading-overlay"
          style={{
            position: 'absolute', inset: 0,
            backgroundColor: BG,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: overlayVisible ? 1 : 0,
            pointerEvents: overlayVisible ? 'auto' : 'none',
            transition: 'opacity 0.5s ease',
            zIndex: 10,
          }}
        >
          <LoadingSpinner />
        </div>

      </div>
    </div>
  )
}

// ─── TextOverlay ──────────────────────────────────────────────────────────────

interface TextOverlayProps {
  panel: TextPanel
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
}

function TextOverlay({ panel, scrollYProgress }: TextOverlayProps) {
  const { center, width, text, align, font, showButton } = panel
  const FADE      = 0.04
  const fadeStart = Math.max(0, center - width)
  const fadeEnd   = Math.min(1, center + width)

  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, fadeStart - FADE), fadeStart, center, fadeEnd, Math.min(1, fadeEnd + FADE)],
    [0, 0.8, 1, 0.8, 0],
  )

  const blurPx = useTransform(
    scrollYProgress,
    [Math.max(0, fadeStart - FADE), fadeStart],
    [4, 0],
  )
  const filter = useMotionTemplate`blur(${blurPx}px)`

  const positionStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '12%',
    left:      align === 'left'   ? '6%'   : align === 'center' ? '50%' : 'auto',
    right:     align === 'right'  ? '6%'   : 'auto',
    transform: align === 'center' ? 'translateX(-50%)' : 'none',
    maxWidth:  align === 'center' ? '80%'  : '42%',
    textAlign: align,
    zIndex: 5,
    pointerEvents: 'none',
  }

  return (
    <motion.div style={{ ...positionStyle, opacity }}>
      <motion.p
        style={{
          fontFamily:    font === 'display' ? 'Britney, Georgia, serif' : 'Quicksand, system-ui, sans-serif',
          fontSize:      font === 'display' ? 'clamp(2rem, 5vw, 4.5rem)' : 'clamp(1rem, 2.5vw, 1.5rem)',
          fontWeight:    font === 'display' ? 400 : 500,
          color:         '#2C2416',
          textShadow:    '0 2px 16px rgba(44,36,22,0.18), 0 1px 4px rgba(44,36,22,0.12)',
          lineHeight:    1.2,
          letterSpacing: font === 'display' ? '0.02em' : '0.01em',
          filter,
        }}
      >
        {text}
      </motion.p>

      {showButton && (
        <div style={{ marginTop: '1.5rem', textAlign: 'center', pointerEvents: 'auto' }}>
          <Link
            to="/custom"
            style={{
              display: 'inline-block',
              padding: '0.75rem 2rem',
              backgroundColor: '#C9922B',
              color: '#FAF8F0',
              fontFamily: 'Quicksand, system-ui, sans-serif',
              fontWeight: 600,
              fontSize: '0.95rem',
              letterSpacing: '0.08em',
              textDecoration: 'none',
              borderRadius: '9999px',
              boxShadow: '0 4px 20px rgba(201,146,43,0.35)',
              transition: 'box-shadow 0.2s ease, transform 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 6px 28px rgba(201,146,43,0.5)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(201,146,43,0.35)'
              e.currentTarget.style.transform = 'none'
            }}
          >
            Make it yours
          </Link>
        </div>
      )}
    </motion.div>
  )
}

// ─── LoadingSpinner ───────────────────────────────────────────────────────────

function LoadingSpinner() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      <style>{`@keyframes _spin { to { transform: rotate(360deg); } }`}</style>
      <div style={{
        width: 48, height: 48,
        borderRadius: '50%',
        border: '3px solid rgba(201,146,43,0.2)',
        borderTopColor: '#C9922B',
        animation: '_spin 0.9s linear infinite',
      }} />
      <p style={{
        fontFamily: 'Quicksand, system-ui, sans-serif',
        fontSize: '0.8rem',
        letterSpacing: '0.15em',
        color: '#6B5C3E',
        textTransform: 'uppercase',
      }}>
        Loading
      </p>
    </div>
  )
}
```

- [ ] **Step 2: Run the tests — all 5 should pass**

Run: `npm test -- PendantScroll`

Expected output: `5 passed`.

If `loading-overlay` fails because `overlayVisible` goes `false` before the assertion (jsdom fires `onerror` instantly on `new Image()`), mock `Image` in the test file to never fire callbacks:
```js
// Add inside the test file before the PendantScroll import:
vi.stubGlobal('Image', class {
  onload = null; onerror = null; src = ''
  get complete() { return false }
  get naturalWidth() { return 0 }
})
```

- [ ] **Step 3: Run full test suite**

Run: `npm test`

Expected: all tests pass (existing CartContext, OrderForm, filterProducts tests unchanged).

- [ ] **Step 4: Commit**

```bash
git add src/components/pendant-scroll/PendantScroll.tsx
git commit -m "feat: implement PendantScroll — canvas, scroll, text overlays, loading state"
```

---

## Task 5: Browser verification and final commit

**Files:** No code changes expected — observation + minor tweaks only.

- [ ] **Step 1: Full scroll walkthrough**

Run: `npm run dev`, navigate to `http://localhost:5173/design`.

Confirm:
- Gold spinner appears while images load
- Canvas fades in after load (background `#EDE0C4` matches images — edges invisible)
- Scrolling smoothly advances frames (no jitter)
- "Personalize it as you imagine" visible at top
- Left-aligned text fades in at ~30% scroll
- Right-aligned text fades in at ~60% scroll
- "Make it yours" gold button fades in at ~90% scroll
- Button navigates to `/custom`

- [ ] **Step 2: Mobile check**

In Chrome DevTools, set viewport to 375×667 (iPhone SE). Scroll through:
- Canvas fills viewport
- Text readable, not overflowing edges
- Button tappable

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "feat: pendant scrollytelling page complete"
```
