import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import AnimatedSection from '../ui/AnimatedSection'
import GoldButton from '../ui/GoldButton'
import Silk from '../silk-background'

const easeOut = [0.16, 1, 0.3, 1]

export default function CustomOrderBanner() {
  return (
    <section className="relative overflow-hidden bg-[#ede0c4]/35 py-28 px-4 sm:px-6">
      {/* Blend into Featured (cream-mid) above and Testimonials below */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-36 bg-gradient-to-b from-cream-mid via-cream-mid/55 to-transparent sm:h-44"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-36 bg-gradient-to-t from-cream-mid via-cream-mid/55 to-transparent sm:h-44"
        aria-hidden
      />

      <div className="pointer-events-none absolute inset-0 z-0">
        <Silk
          speed={5}
          scale={1}
          color="#ede0c4"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>

      <motion.div
        className="relative z-10 mx-auto max-w-4xl text-center"
        initial={{ opacity: 0, y: 28, scale: 0.985 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, delay: 0.12, ease: easeOut }}
      >
        <div className="rounded-2xl border border-gold-border bg-white/70 p-12 shadow-glass backdrop-blur-glass md:p-16">
          <p className="label-tag mb-4">One of a kind</p>
          <h2 className="section-heading mb-6">Design your unique piece</h2>
          <p className="font-body text-lg text-espresso-soft max-w-xl mx-auto mb-10 leading-relaxed">
            Can't find what you're looking for? Work directly with us to create a piece
            that's entirely yours — your colors, your story, your shape.
          </p>
          <Link to="/custom">
            <GoldButton className="!px-10 !py-4 !text-base">Start My Custom Order</GoldButton>
          </Link>
          <div className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-espresso-soft">
            <span>✓ 7–14 days turnaround</span>
            <span>✓ Free revision</span>
            <span>✓ Satisfaction guaranteed</span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
