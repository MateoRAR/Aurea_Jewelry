import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import products from '../data/products.json'
import { useCart } from '../context/CartContext'
import ImageGallery from '../components/product/ImageGallery'
import RelatedProducts from '../components/product/RelatedProducts'
import GlassCard from '../components/ui/GlassCard'
import GoldButton from '../components/ui/GoldButton'
import Footer from '../components/layout/Footer'

const MATERIAL_LABELS = { resin: 'Premium Resin', steel: 'Stainless Steel', combo: 'Resin + Steel' }

export default function ProductDetail() {
  const { id } = useParams()
  const product = products.find(p => p.id === id)
  const { addItem } = useCart()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [accordionOpen, setAccordionOpen] = useState(false)

  if (!product) return <Navigate to="/shop" replace />

  function handleAddToCart() {
    for (let i = 0; i < qty; i++) addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 font-body text-sm text-espresso-soft mb-8">
          <Link to="/shop" className="hover:text-gold transition-colors">Shop</Link>
          <span>/</span>
          <span className="capitalize">{product.category}</span>
          <span>/</span>
          <span className="text-espresso">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Gallery */}
          <ImageGallery images={product.images} name={product.name} />

          {/* Details */}
          <GlassCard className="p-8 h-fit">
            <p className="label-tag mb-2 capitalize">{product.category}</p>
            <h1 className="font-display text-4xl text-espresso mb-2">{product.name}</h1>

            {/* Material badge */}
            <div className="inline-flex items-center gap-2 bg-gold-tint border border-gold-border rounded-full px-4 py-1 mb-6">
              <span className="w-2 h-2 rounded-full bg-gold" />
              <span className="font-body text-sm text-espresso">{MATERIAL_LABELS[product.material]}</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display text-4xl text-gold">${product.price}</span>
              <span className="font-body text-sm text-espresso-soft">Free shipping over $80</span>
            </div>

            {/* Colors */}
            <div className="mb-6">
              <p className="font-body text-sm font-medium text-espresso mb-3">Available colors</p>
              <div className="flex gap-2">
                {product.colors.map(color => (
                  <div
                    key={color}
                    className="w-7 h-7 rounded-full border-2 border-white shadow-card cursor-pointer hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <p className="font-body text-sm font-medium text-espresso">Quantity</p>
              <div className="flex items-center gap-3 bg-white/60 backdrop-blur-glass border border-gold-border rounded-xl shadow-glass px-4 py-2">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="text-espresso-soft hover:text-gold text-lg font-light w-6 text-center">−</button>
                <span className="font-body text-sm w-4 text-center">{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="text-espresso-soft hover:text-gold text-lg font-light w-6 text-center">+</button>
              </div>
            </div>

            {/* CTA */}
            <motion.div animate={added ? { scale: [1, 1.03, 1] } : {}}>
              <GoldButton
                className="w-full !py-4 !text-base"
                disabled={!product.inStock}
                onClick={handleAddToCart}
              >
                {added ? '✓ Added to Cart' : product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </GoldButton>
            </motion.div>

            {/* Description accordion */}
            <div className="mt-6 border-t border-gold-border pt-4">
              <button
                onClick={() => setAccordionOpen(v => !v)}
                className="flex justify-between w-full font-body text-sm font-medium text-espresso py-2"
              >
                Product Details
                <span>{accordionOpen ? '−' : '+'}</span>
              </button>
              {accordionOpen && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="font-body text-sm text-espresso-soft leading-relaxed mt-2"
                >
                  {product.description}
                </motion.p>
              )}
            </div>
          </GlassCard>
        </div>
      </div>

      <RelatedProducts currentId={id} category={product.category} />
      <Footer />
    </main>
  )
}
