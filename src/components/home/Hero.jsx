import { useMemo, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Link } from 'react-router-dom'
import LiquidEther from './LiquidEther'
import GoldButton from '../ui/GoldButton'
import GradientText from '../gradient-text/GradientText'

export default function Hero() {
  const containerRef = useRef(null)

  const etherQuality = useMemo(() => {
    // Cheap heuristic: bias toward smoother UX on low-end devices.
    const mem = typeof navigator !== 'undefined' ? navigator.deviceMemory : undefined
    const cores = typeof navigator !== 'undefined' ? navigator.hardwareConcurrency : undefined
    const isLowEnd = (mem && mem <= 4) || (cores && cores <= 4)
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      return {
        resolution: 0.22,
        maxFps: 20,
        isViscous: false,
        iterationsPoisson: 8,
        iterationsViscous: 0,
        BFECC: false,
        cursorSize: 60,
        mouseForce: 12,
      }
    }

    if (isLowEnd) {
      return {
        resolution: 0.32,
        maxFps: 30,
        isViscous: false,
        iterationsPoisson: 12,
        iterationsViscous: 0,
        BFECC: false,
        cursorSize: 70,
        mouseForce: 16,
      }
    }

    // Default (still a bit cheaper than before)
    return {
      resolution: 0.42,
      maxFps: 45,
      isViscous: true,
      iterationsPoisson: 20,
      iterationsViscous: 12,
      BFECC: true,
      cursorSize: 80,
      mouseForce: 20,
    }
  }, [])

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.from('.hero-tag', { opacity: 0, y: 30, duration: 0.6 })
      .from('.hero-title', { opacity: 0, y: 50, duration: 0.8 }, '-=0.3')
      .from('.hero-sub', { opacity: 0, y: 30, duration: 0.6 }, '-=0.4')
      .from('.hero-ctas', { opacity: 0, y: 20, duration: 0.5 }, '-=0.3')
      .from('.hero-stats', { opacity: 0, y: 24, duration: 0.55 }, '-=0.25')
  }, { scope: containerRef })

  return (
    <section
      ref={containerRef}
      className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-transparent"
    >
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
        <LiquidEther
          mouseForce={etherQuality.mouseForce}
          cursorSize={etherQuality.cursorSize}
          isViscous={etherQuality.isViscous}
          viscous={30}
          iterationsPoisson={etherQuality.iterationsPoisson}
          iterationsViscous={etherQuality.iterationsViscous}
          BFECC={etherQuality.BFECC}
          colors={['#ffff80', '#ffffff']}
          autoDemo
          autoSpeed={1}
          autoIntensity={3.1}
          isBounce
          resolution={etherQuality.resolution}
          maxFps={etherQuality.maxFps}
          style={{ width: '100%', height: '100%', position: 'relative' }}
        />
      </div>

      <div className="pointer-events-none absolute right-1/4 top-1/4 z-[1] h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/4 left-1/4 z-[1] h-72 w-72 rounded-full bg-gold-light/10 blur-3xl" />

      <div className="fixed inset-0 z-10 mx-auto flex h-screen w-full max-w-4xl flex-col items-center justify-center px-4 text-center sm:px-6">
        <p className="hero-tag label-tag mb-5">Handcrafted for you</p>

        <h1 className="hero-title mb-8 max-w-4xl">
          <GradientText
            colors={['#2C2416', '#4A3D26', '#8B6914']}
            animationSpeed={2}
            showBorder={false}
            className="!cursor-default font-display font-display-bold text-5xl leading-[1.1] sm:text-6xl lg:text-7xl [filter:drop-shadow(0_2px_12px_rgba(44,36,22,0.35))]"
          >
            Jewelry that tells your story
          </GradientText>
        </h1>

        <p className="hero-sub font-body font-body-medium text-lg leading-relaxed text-espresso-soft mb-10 max-w-xl">
          Premium resin and stainless steel pieces, handcrafted to order.
          Each design is unique — just like you.
        </p>

        <div className="hero-ctas flex flex-wrap items-center justify-center gap-4">
          <Link to="/shop">
            <GoldButton variant="clear">Explore Collection</GoldButton>
          </Link>
          <Link to="/custom">
            <GoldButton variant="clear">Design Yours</GoldButton>
          </Link>
        </div>

        <div className="hero-stats mt-14 flex flex-wrap items-center justify-center gap-8 text-sm text-espresso-soft sm:gap-10">
          <div>
            <span className="font-display text-2xl font-medium text-espresso">500+</span>
            <span className="ml-2 font-body">happy clients</span>
          </div>
          <div className="hidden h-8 w-px bg-espresso/20 sm:block" />
          <div>
            <span className="font-display text-2xl font-medium text-espresso">100%</span>
            <span className="ml-2 font-body">handmade</span>
          </div>
          <div className="hidden h-8 w-px bg-espresso/20 sm:block" />
          <div>
            <span className="font-display text-2xl font-medium text-espresso">★ 4.9</span>
            <span className="ml-2 font-body">rating</span>
          </div>
        </div>
      </div>

      <div className="fixed bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-espresso-soft">
        <span className="font-body text-xs uppercase tracking-[0.2em]">Scroll</span>
        <div className="h-10 w-px bg-gradient-to-b from-espresso-soft to-transparent" />
      </div>
    </section>
  )
}
