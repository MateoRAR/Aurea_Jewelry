import Hero from '../components/home/Hero'
import Categories from '../components/home/Categories'
import FeaturedCollection from '../components/home/FeaturedCollection'
import CustomOrderBanner from '../components/home/CustomOrderBanner'
import Testimonials from '../components/home/Testimonials'
import Footer from '../components/layout/Footer'
import ParallaxCards from '../components/ui/paralaxcards'

export default function Landing() {
  const cards = [
    { content: <Categories />, className: 'bg-cream'},
    { content: <FeaturedCollection />, className: 'bg-cream-mid' },
  ]

  return (
    <main>
      <Hero />
      <ParallaxCards cards={cards} />
      <CustomOrderBanner />
      <div className="relative z-30">
        <Testimonials />
      </div>
      <div className="relative z-30">
        <Footer />
      </div>
    </main>
  )
}
