import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../../context/CartContext'
import GlassCard from '../ui/GlassCard'
import GoldButton from '../ui/GoldButton'

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const { id, name, category, price, images, inStock, material } = product

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.25 }}>
      <GlassCard className="overflow-hidden flex flex-col h-full">
        {/* Image */}
        <Link to={`/shop/${id}`} className="block relative aspect-[3/4] overflow-hidden bg-cream-dark">
          <img
            src={images[0]}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          {!inStock && (
            <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
              <span className="bg-white/60 backdrop-blur-glass border border-gold-border rounded-2xl shadow-glass px-4 py-1 font-body text-sm text-espresso-soft">Out of stock</span>
            </div>
          )}
          <div className="absolute top-3 left-3">
            <span className="bg-white/80 backdrop-blur-glass border border-gold-border rounded-2xl shadow-glass px-3 py-1 font-body text-xs text-espresso-soft capitalize">
              {material}
            </span>
          </div>
        </Link>

        {/* Info */}
        <div className="p-4 flex flex-col flex-1">
          <p className="label-tag mb-1 capitalize">{category}</p>
          <Link to={`/shop/${id}`}>
            <h3 className="font-display text-lg text-espresso hover:text-gold transition-colors mb-1">{name}</h3>
          </Link>
          <div className="flex items-center justify-between mt-auto pt-3">
            <span className="font-display text-xl text-gold">${price}</span>
            <GoldButton
              className="!text-xs !px-3 !py-2"
              disabled={!inStock}
              onClick={() => addItem(product)}
            >
              Add to Cart
            </GoldButton>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}
