import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import AnimatedSection from '../ui/AnimatedSection'
import GoldButton from '../ui/GoldButton'
import TiltedCard from '../tilted-card/TiltedCard'
import products from '../../data/products.json'

const featured = products.filter((p) => p.featured)

function ProductOverlay({ product }) {
  return (
    <div className="flex h-full w-full flex-col justify-end p-4 text-left">
      {/* Vidrio fuerte: blur alto + tinte translúcido (si el fondo es muy opaco, el blur no se nota) */}
      <div
        className="rounded-xl border border-white/35 bg-gradient-to-b from-espresso/45 to-espresso/65 p-3.5 shadow-[0_12px_40px_rgba(44,36,22,0.28)] ring-1 ring-white/25 [backdrop-filter:blur(44px)_saturate(1.55)] [box-shadow:inset_0_1px_0_rgba(255,255,255,0.18)]"
      >
        <p className="label-tag mb-1 !text-gold-light [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
          {product.category}
        </p>
        <h3 className="font-display text-lg leading-snug text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.65)]">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 font-body text-xs leading-relaxed text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.55)]">
          {product.description}
        </p>
        <div className="mt-3 flex items-center justify-between gap-2 border-t border-white/20 pt-3">
          <span className="font-display text-xl text-gold-light [text-shadow:0_2px_6px_rgba(0,0,0,0.5)]">
            ${product.price}
          </span>
          <span className="rounded-full border border-white/30 bg-white/15 px-3 py-1.5 font-body text-xs font-medium text-white [backdrop-filter:blur(12px)]">
            View piece →
          </span>
        </div>
      </div>
    </div>
  )
}

export default function FeaturedCollection() {
  return (
    <AnimatedSection className="bg-cream-mid py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <p className="label-tag mb-3">Curated for You</p>
          <h2 className="section-heading">Featured Collection</h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
          {featured.map((product, i) => (
            <motion.div
              key={product.id}
              className="flex w-full justify-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
            >
              <Link
                to={`/shop/${product.id}`}
                className="block w-full max-w-[360px] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cream-mid"
              >
                <TiltedCard
                  imageSrc={product.images[0]}
                  altText={product.name}
                  captionText={`${product.name} · $${product.price}`}
                  containerHeight="340px"
                  containerWidth="100%"
                  imageHeight="340px"
                  imageWidth="100%"
                  rotateAmplitude={25}
                  scaleOnHover={1.4}
                  showMobileWarning={false}
                  showTooltip
                  displayOverlayContent
                  overlayContent={<ProductOverlay product={product} />}
                />
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/shop">
            <GoldButton variant="outline" className="!px-10">
              View All Products
            </GoldButton>
          </Link>
        </div>
      </div>
    </AnimatedSection>
  )
}
