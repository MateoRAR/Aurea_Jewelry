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
            <div className="absolute -top-4 -right-4 bg-gold border border-gold-light text-white px-4 py-2 rounded-xl shadow-glass">
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
