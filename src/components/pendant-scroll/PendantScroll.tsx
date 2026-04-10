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

  const k0 = Math.max(0, fadeStart - FADE)
  const k1 = fadeStart
  const k2 = center
  const k3 = fadeEnd
  const k4 = Math.min(1, fadeEnd + FADE)

  // Build deduplicated input array (Framer Motion requires strictly increasing inputs)
  const inputKeys = [k0, k1, k2, k3, k4]
  const outputVals = [0, 0.8, 1, 0.8, 0]
  const dedupedInputs: number[] = []
  const dedupedOutputs: number[] = []
  inputKeys.forEach((k, i) => {
    if (dedupedInputs.length === 0 || k > dedupedInputs[dedupedInputs.length - 1]) {
      dedupedInputs.push(k)
      dedupedOutputs.push(outputVals[i])
    }
  })

  const opacity = useTransform(scrollYProgress, dedupedInputs, dedupedOutputs)

  const blurK0 = Math.max(0, fadeStart - FADE)
  const blurK1 = fadeStart
  const blurK2 = fadeEnd
  const blurK3 = Math.min(1, fadeEnd + FADE)

  const blurInputs = [blurK0, blurK1, blurK2, blurK3]
  const blurOutputs = [4, 0, 0, 4]
  // Deduplicate
  const dedupedBlurInputs: number[] = []
  const dedupedBlurOutputs: number[] = []
  blurInputs.forEach((k, i) => {
    if (dedupedBlurInputs.length === 0 || k > dedupedBlurInputs[dedupedBlurInputs.length - 1]) {
      dedupedBlurInputs.push(k)
      dedupedBlurOutputs.push(blurOutputs[i])
    }
  })

  const blurPx = useTransform(scrollYProgress, dedupedBlurInputs, dedupedBlurOutputs)
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
