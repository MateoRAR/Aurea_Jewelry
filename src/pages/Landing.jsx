import Hero from '../components/home/Hero'
import Categories from '../components/home/Categories'
import FeaturedCollection from '../components/home/FeaturedCollection'
import CustomOrderBanner from '../components/home/CustomOrderBanner'
import Testimonials from '../components/home/Testimonials'
import Footer from '../components/layout/Footer'

export default function Landing() {
  return (
    <main>
      <Hero />
      <Categories />
      <FeaturedCollection />
      <CustomOrderBanner />
      <Testimonials />
      <Footer />
    </main>
  )
}
