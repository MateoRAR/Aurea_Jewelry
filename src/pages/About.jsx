import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import AnimatedSection from '../components/ui/AnimatedSection'
import SpotlightCard from '../components/spotlight-card/SpotLightCard'
import ParallaxCards from '../components/ui/paralaxcards'
import DomeGallery from '../components/gallery/DomeGallery'
import GradientText from '../components/gradient-text/GradientText'
import Footer from '../components/layout/Footer'

const VALUES = [
  { icon: '🌿', title: 'Sustainable', desc: 'We use eco-conscious resins and source materials responsibly.' },
  { icon: '✋', title: 'Handcrafted', desc: 'Every piece is made by hand, one at a time, with full attention to detail.' },
  { icon: '💛', title: 'Personal', desc: "We believe jewelry should carry meaning — that's why we offer full customization." },
]

const GALLERY = [
  'https://picsum.photos/seed/gal1/400/400',
  'https://picsum.photos/seed/gal2/400/400',
  'https://picsum.photos/seed/gal3/400/400',
  'https://picsum.photos/seed/gal4/400/400',
  'https://picsum.photos/seed/gal5/400/400',
  'https://picsum.photos/seed/gal6/400/400',
]

const sections = [
  {
    className: 'bg-espresso',
    content: (
      <section className="relative h-screen overflow-hidden flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{ backgroundImage: 'url(https://picsum.photos/seed/abouthero/1600/900)' }}
        />
        <div className="absolute inset-0 bg-espresso/40" />
        <div className="relative z-10 text-center px-4">
          <p className="label-tag text-white/80 mb-4">Our story</p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="font-display font-display-bold text-6xl md:text-8xl text-white">
              "Crafted for you,<br />
              <GradientText
                colors={['#F5DFA5', '#C9922B', '#8B6914', '#E8C97A', '#F5DFA5']}
                animationSpeed={4}
                showBorder={false}
                className="font-display font-display-bold text-6xl md:text-8xl inline"
              >
                forever."
              </GradientText>
            </span>
          </motion.h1>
        </div>
      </section>
    ),
  },
  {
    className: 'bg-cream',
    content: (
      <AnimatedSection className="h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="label-tag mb-4">The founder</p>
              <h2 className="font-display text-4xl text-espresso mb-6">Born from a passion for detail</h2>
              <p className="font-body text-espresso-soft leading-relaxed mb-4">
                Aurea was founded in 2021 with a simple belief: jewelry should be as unique as the person wearing it.
                What started as a small studio experiment with resin and flowers became a full creative practice.
              </p>
              <p className="font-body text-espresso-soft leading-relaxed mb-4">
                Every piece in our collection is designed and made by hand in our studio. We work with premium UV-grade
                resin and high-quality stainless steel to ensure your pieces last a lifetime.
              </p>
              <p className="font-body text-espresso-soft leading-relaxed">
                Our mission is simple: bring your story to life in a piece you'll wear every day.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden aspect-[4/5]">
              <img
                src="https://picsum.photos/seed/founder/600/750"
                alt="Aurea studio"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </AnimatedSection>
    ),
  },
  {
    className: 'bg-cream-mid',
    content: (
      <AnimatedSection className="h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="text-center mb-10">
            <p className="label-tag mb-3">What we stand for</p>
            <h2 className="section-heading">Our values</h2>
            <p className="font-body text-espresso-soft max-w-xl mx-auto mt-4 text-sm leading-relaxed">
              These three principles guide every decision we make — from the materials we source to the way we package each piece. They're not just words; they're the foundation of everything Aurea is.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
              >
                <SpotlightCard
                  className="p-8 text-center rounded-2xl border border-gold-border bg-cream shadow-[0_12px_40px_rgba(44,36,22,0.12)]"
                  spotlightColor="rgba(201, 146, 43, 0.22)"
                >
                  <div className="text-5xl mb-4">{v.icon}</div>
                  <h3 className="font-display text-2xl text-espresso mb-3">{v.title}</h3>
                  <p className="font-body text-sm text-espresso-soft leading-relaxed">{v.desc}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>

          {/* Stats row */}
          <motion.div
            className="grid grid-cols-3 divide-x divide-gold-border border border-gold-border rounded-2xl bg-cream overflow-hidden mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {[
              { value: '500+', label: 'Pieces crafted' },
              { value: '3+', label: 'Years in studio' },
              { value: '100%', label: 'Handmade' },
            ].map(({ value, label }) => (
              <div key={label} className="py-5 text-center">
                <p className="font-display text-3xl text-gold">{value}</p>
                <p className="font-body text-xs text-espresso-soft mt-1 uppercase tracking-widest">{label}</p>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            <Link
              to="/custom-order"
              className="inline-block font-body text-sm tracking-widest uppercase border border-gold text-espresso px-8 py-3 rounded-full hover:bg-gold hover:text-white transition-all duration-300"
            >
              Start your custom piece
            </Link>
          </motion.div>
        </div>
      </AnimatedSection>
    ),
  },
  {
    className: 'bg-cream',
    content: (
      <div className="relative h-[120vh] flex flex-col">
        <div className="text-center pt-16 pb-12 shrink-0">
          <p className="label-tag mb-3">@aurea.studio</p>
          <h2 className="section-heading">From our studio</h2>
        </div>
        <div className="relative h-[65vh]">
          <DomeGallery
            images={GALLERY}
            fit={0.8}
            minRadius={600}
            maxVerticalRotationDeg={0}
            segments={34}
            dragDampening={2}
            grayscale={false}
            overlayBlurColor="#FAF8F0"
          />
        </div>
      </div>
    ),
  },
]

export default function About() {
  return (
    <main className="min-h-screen bg-cream">
      <ParallaxCards cards={sections} />
      <Footer />
    </main>
  )
}
