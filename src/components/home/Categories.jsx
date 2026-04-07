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
