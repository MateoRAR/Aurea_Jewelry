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
