import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import AnimatedSection from '../ui/AnimatedSection'
import GlassCard from '../ui/GlassCard'
import GoldButton from '../ui/GoldButton'
import products from '../../data/products.json'

const featured = products.filter(p => p.featured)

export default function FeaturedCollection() {
  return (
    <AnimatedSection className="py-20 bg-cream-mid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="label-tag mb-3">Curated for You</p>
          <h2 className="section-heading">Featured Collection</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
            >
              <GlassCard hoverable className="overflow-hidden">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p className="label-tag mb-1">{product.category}</p>
                  <h3 className="font-display text-xl text-espresso mb-1">{product.name}</h3>
                  <p className="font-body text-sm text-espresso-soft mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xl text-gold">${product.price}</span>
                    <Link to={`/shop/${product.id}`}>
                      <GoldButton className="!text-sm !px-4 !py-2">View</GoldButton>
                    </Link>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/shop">
            <GoldButton variant="outline" className="!px-10">View All Products</GoldButton>
          </Link>
        </div>
      </div>
    </AnimatedSection>
  )
}
