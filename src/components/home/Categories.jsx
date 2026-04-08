import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import AnimatedSection from '../ui/AnimatedSection'
import CurvedLoop from '../curved-loop/Curved-loop'

const categories = [
  { label: 'Rings', slug: 'rings', emoji: '💍', desc: 'Resin & steel bands' },
  { label: 'Necklaces', slug: 'necklaces', emoji: '📿', desc: 'Pendants & chains' },
  { label: 'Earrings', slug: 'earrings', emoji: '✨', desc: 'Studs & drops' },
  { label: 'Bracelets', slug: 'bracelets', emoji: '🪬', desc: 'Cuffs & bangles' },
]

export default function Categories() {
  return (
    <AnimatedSection className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center mb-3">
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
            <Link
              to={`/shop?category=${slug}`}
              className="block bg-white/60 backdrop-blur-glass border border-gold-border rounded-2xl shadow-glass hover:bg-white/75 hover:shadow-glass-hover transition-all duration-300 p-6 text-center group"
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
