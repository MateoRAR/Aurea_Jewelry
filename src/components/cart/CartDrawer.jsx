import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import GoldButton from '../ui/GoldButton'

export default function CartDrawer({ open, onClose }) {
  const { items, count, removeItem, clearCart } = useCart()
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-espresso/30 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white/90 backdrop-blur-glass border-l border-gold-border shadow-glass-hover z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gold-border">
              <h2 className="font-display text-2xl text-espresso">Your Cart ({count})</h2>
              <button onClick={onClose} className="p-2 text-espresso-soft hover:text-espresso transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="py-16 text-center">
                  <p className="font-display text-xl text-espresso-soft mb-4">Your cart is empty</p>
                  <Link to="/shop" onClick={onClose}>
                    <GoldButton variant="outline">Browse Collection</GoldButton>
                  </Link>
                </div>
              ) : (
                items.map(item => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex gap-4 bg-cream/60 rounded-xl p-3"
                  >
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display text-base text-espresso truncate">{item.name}</h4>
                      <p className="font-body text-xs text-espresso-soft capitalize mb-1">{item.material}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-body text-sm text-gold font-medium">
                          ${item.price} × {item.quantity}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-espresso-soft hover:text-red-400 transition-colors"
                          aria-label={`Remove ${item.name}`}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gold-border px-6 py-5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-body text-sm text-espresso-soft">Subtotal</span>
                  <span className="font-display text-xl text-espresso">${total}</span>
                </div>
                <p className="font-body text-xs text-espresso-soft text-center">
                  Checkout coming soon — contact us to complete your order.
                </p>
                <Link to="/custom" onClick={onClose}>
                  <GoldButton className="w-full !py-3">Place Custom Order</GoldButton>
                </Link>
                <button
                  onClick={clearCart}
                  className="w-full font-body text-xs text-espresso-soft hover:text-red-400 transition-colors py-1"
                >
                  Clear cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
