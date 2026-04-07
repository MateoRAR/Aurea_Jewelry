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
