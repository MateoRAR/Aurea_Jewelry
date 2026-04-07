import { Link } from 'react-router-dom'
import AnimatedSection from '../ui/AnimatedSection'
import GoldButton from '../ui/GoldButton'

export default function CustomOrderBanner() {
  return (
    <AnimatedSection className="py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-white/60 backdrop-blur-glass border border-gold-border rounded-2xl shadow-glass bg-gold-tint p-12 md:p-16">
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
      </div>
    </AnimatedSection>
  )
}
