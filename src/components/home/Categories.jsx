import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import AnimatedSection from '../ui/AnimatedSection'
import CurvedLoop from '../curved-loop/Curved-loop'
import BorderGlow from '../glowing-border/GlowingBorder'
import SpotlightCard from '../spotlight-card/SpotLightCard'

const categories = [
  { label: 'Rings', slug: 'rings', emoji: '💍', desc: 'Resin & steel bands' },
  { label: 'Necklaces', slug: 'necklaces', emoji: '📿', desc: 'Pendants & chains' },
  { label: 'Earrings', slug: 'earrings', emoji: '✨', desc: 'Studs & drops' },
  { label: 'Bracelets', slug: 'bracelets', emoji: '🪬', desc: 'Cuffs & bangles' },
]

export default function Categories() {
  const details = [
    {
      title: 'Handmade to order',
      text: 'Every piece is carefully finished by hand for a one-of-a-kind result.',
    },
    {
      title: 'Premium materials',
      text: 'Durable stainless steel and premium resin selected for comfort and shine.',
    },
    {
      title: 'Custom-friendly',
      text: 'Want a personal touch? We can adapt many designs to your style.',
    },
  ]

  return (
    <AnimatedSection className="w-full bg-cream py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="text-center mb-3 pt-12">
        <p className="label-tag mb-3">Browse by Category</p>
        <h2 className="section-heading">Find your style</h2>
      </div>

      {/* curveAmount must stay ~within viewBox height (120); large values paint the text far below the layout box */}
      <div
        className="-mx-4 mb-8 mt-1 text-gold sm:-mx-6 md:mx-0 md:mb-10 [&_.curved-loop-jacket]:text-gold"
        aria-hidden
      >
        <CurvedLoop
          marqueeText="Aurea ✦ Jewelry ✦ Handmade ✦ Resin & steel ✦ "
          speed={2}
          curveAmount={68}
          direction="right"
          interactive
          className="font-display tracking-wide"
        />
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
            <BorderGlow
              edgeSensitivity={30}
              glowColor="40 70 70"
              backgroundColor="transparent"
              borderRadius={20}
              glowRadius={80}
              glowIntensity={3}
              coneSpread={25}
              animated
              colors={['#C9922B', '#E8B86D', '#F5EDD8']}
              fillOpacity={0.1}
              className="rounded-2xl"
            >
              <Link
                to={`/shop?category=${slug}`}
                className="block rounded-2xl bg-white/60 backdrop-blur-glass border border-gold-border shadow-glass hover:bg-white/75 hover:shadow-glass-hover transition-all duration-300 p-6 text-center group"
              >
                <div className="text-4xl mb-3">{emoji}</div>
                <h3 className="font-display text-xl text-espresso mb-1 group-hover:text-gold transition-colors">{label}</h3>
                <p className="font-body text-xs text-espresso-soft">{desc}</p>
              </Link>
            </BorderGlow>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {details.map((item) => (
          <SpotlightCard
            key={item.title}
            className="custom-spotlight-card rounded-2xl border border-gold-border bg-white/60 p-5 backdrop-blur-glass shadow-glass"
            spotlightColor="rgba(201, 146, 43, 0.22)"
          >
            <p className="font-display text-lg text-espresso">{item.title}</p>
            <p className="mt-2 font-body text-sm text-espresso-soft">{item.text}</p>
          </SpotlightCard>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-espresso-soft">
        <span className="rounded-full border border-gold-border bg-white/70 px-4 py-2">Free polishing cloth included</span>
        <span className="rounded-full border border-gold-border bg-white/70 px-4 py-2">Secure checkout</span>
        <span className="rounded-full border border-gold-border bg-white/70 px-4 py-2">Worldwide shipping available</span>
      </div>
      </div>
    </AnimatedSection>
  )
}
