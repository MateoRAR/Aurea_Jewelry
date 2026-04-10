# Pendant Scrollytelling Page — Design Spec

**Date:** 2026-04-09  
**Status:** Approved

---

## Overview

A scroll-linked "scrollytelling" page for the Aurea pendant product. As the user scrolls, a 151-frame image sequence plays on a sticky HTML5 canvas showing the pendant assembling its three components (stainless steel base, round image inlay, curved glass top). Text panels fade in and out at key scroll positions to narrate the story.

---

## Architecture

### New Files
- `src/pages/DesignPage.tsx` — thin page shell applying background gradient, renders `<PendantScroll />`
- `src/components/pendant-scroll/PendantScroll.tsx` — self-contained component owning all canvas, scroll, preload, and text overlay logic

### Modified Files
- `src/components/layout/Navbar.jsx` — add "Design" nav link pointing to `/design`
- App router — register `/design` → `<DesignPage />`

---

## Visual Direction

| Property | Value |
|----------|-------|
| Image background | `#EDE0C4` |
| Page background gradient | `135deg → #FAF8F0 → #F5EDD8 → #EDE0C4` |
| Display font | Britney (variable, already configured) |
| Body font | Quicksand (variable, already configured) |

The page background gradient ends at `#EDE0C4` — exactly matching the image background — so the canvas edges are invisible.

---

## PendantScroll Component

### Scroll Container
- Outer div: `height: 400vh` — provides scroll duration for 151 frames
- Inner canvas: `position: sticky`, `top: 0`, `height: 100vh`, `width: 100%`

### Image Sequence
- 151 frames: `public/images/ezgif-frame-001.jpg` through `ezgif-frame-151.jpg`  
  (zero-padded 3-digit index, e.g. `001`, `010`, `151`)
- All 151 `Image` objects preloaded upfront on mount
- Canvas draw triggered by scroll, not a RAF loop

### Scroll → Frame Mapping
- `useScroll({ target: containerRef })` from Framer Motion gives `scrollYProgress` (0→1)
- `useTransform(scrollYProgress, [0, 1], [0, 150])` → floored integer = frame index
- `useMotionValueEvent` on the transformed value → `drawFrame(index)` on every scroll tick
- Canvas render: image centered and scaled with `object-contain` logic (preserves aspect ratio)

### Canvas Rendering
```
scaleX = canvasWidth / imageWidth
scaleY = canvasHeight / imageHeight
scale  = min(scaleX, scaleY)
drawX  = (canvasWidth  - imageWidth  * scale) / 2
drawY  = (canvasHeight - imageHeight * scale) / 2
ctx.drawImage(img, drawX, drawY, imageWidth * scale, imageHeight * scale)
```

---

## Text Overlays

All panels are `position: absolute` over the sticky canvas. Each uses `useTransform` on `scrollYProgress` to animate `opacity` and `filter: blur`.

Fade pattern per panel: fade in over 8% scroll, hold, fade out over 8% scroll.

| Scroll % | Copy | Alignment | Font |
|----------|------|-----------|------|
| 0% | "Personalize it as you imagine" | Center | Britney, 5xl–7xl |
| 30% | "Every piece begins with your idea." | Left | Quicksand, xl |
| 60% | "Handcrafted in steel and resin, shaped to your story." | Right | Quicksand, xl |
| 90% | "Wear something made only for you." + CTA button | Center | Britney + gold button |

CTA button links to `/custom-order`. Text has a soft `text-shadow` for legibility over image content. Fade-in includes `blur(4px) → blur(0px)` for premium feel.

---

## Loading State

- While preloading: full-screen `#EDE0C4` overlay with centered gold CSS pulse-ring spinner
- Track `loadedCount` — once all 151 images loaded, overlay fades out
- Canvas opacity held at 0 during load, animated to 1 on completion
- Edge case: if an image fails to load, it is skipped silently (loadedCount still increments)

---

## Responsiveness

- Canvas scales via the `object-contain` math above — works at any viewport size
- Text font sizes: `text-3xl md:text-5xl lg:text-7xl` for headings, `text-lg md:text-xl` for body panels
- Padding adjusted per breakpoint so text doesn't overlap canvas edges
- Tested range: 320px → 1440px

---

## Navbar Integration

Add "Design" link to `Navbar.jsx` in the same style as existing nav items (Quicksand, tracking, gold hover state). Route: `/design`.
