import AnimatedSection from '../ui/AnimatedSection'
import { AnimatedTestimonials } from '../ui/animated-testimonials'
import testimonials from '../../data/testimonials.json'

const testimonialData = testimonials.map((t) => ({
  id: t.id,
  name: t.name,
  image: t.avatar,
  description: t.text,
  handle: t.handle,
}))

export default function Testimonials() {
  return (
    <section className="bg-cream-mid py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <p className="label-tag mb-3">What they say</p>
          <h2 className="section-heading">Loved by customers</h2>
        </div>
        <AnimatedTestimonials data={testimonialData} />
      </div>
    </section>
  )
}
