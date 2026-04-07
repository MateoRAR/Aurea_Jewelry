import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ImageGallery({ images, name }) {
  const [selected, setSelected] = useState(0)

  return (
    <div>
      {/* Main image */}
      <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-cream-dark mb-3">
        <AnimatePresence mode="wait">
          <motion.img
            key={selected}
            src={images[selected]}
            alt={name}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          />
        </AnimatePresence>
      </div>
      {/* Thumbnails */}
      <div className="flex gap-3">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
              selected === i ? 'border-gold' : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            <img src={src} alt={`${name} ${i + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}
