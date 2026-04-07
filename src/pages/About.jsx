import { motion } from 'framer-motion'
import AnimatedSection from '../components/ui/AnimatedSection'
import GlassCard from '../components/ui/GlassCard'
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

export default function About() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Parallax hero */}
      <section className="relative h-[60vh] overflow-hidden flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://picsum.photos/seed/abouthero/1600/900)', transform: 'scale(1.1)' }}
        />
        <div className="absolute inset-0 bg-espresso/40" />
        <div className="relative z-10 text-center px-4">
          <p className="label-tag text-white/80 mb-4">Our story</p>
          <motion.h1
            className="font-display text-5xl md:text-7xl font-light text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            "Crafted for you,<br />
            <em className="text-gold-light">forever."</em>
          </motion.h1>
        </div>
      </section>

      {/* Story */}
      <AnimatedSection className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
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
      </AnimatedSection>

      {/* Values */}
      <AnimatedSection className="py-20 bg-cream-mid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="label-tag mb-3">What we stand for</p>
            <h2 className="section-heading">Our values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
              >
                <GlassCard className="p-8 text-center">
                  <div className="text-5xl mb-4">{v.icon}</div>
                  <h3 className="font-display text-2xl text-espresso mb-3">{v.title}</h3>
                  <p className="font-body text-sm text-espresso-soft leading-relaxed">{v.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Gallery */}
      <AnimatedSection className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <p className="label-tag mb-3">@aurea.studio</p>
          <h2 className="section-heading">From our studio</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {GALLERY.map((src, i) => (
            <motion.div
              key={src}
              className="aspect-square rounded-2xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <img src={src} alt={`Studio ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      <Footer />
    </main>
  )
}
