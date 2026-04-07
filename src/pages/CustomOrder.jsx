import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { sendOrderEmail } from '../lib/emailjs'
import GlassCard from '../components/ui/GlassCard'
import GoldButton from '../components/ui/GoldButton'
import AnimatedSection from '../components/ui/AnimatedSection'
import Footer from '../components/layout/Footer'

const PIECE_TYPES = ['Ring', 'Necklace', 'Earrings', 'Bracelet', 'Other']
const MATERIALS = ['Resin only', 'Steel only', 'Resin + Steel combo']

const STEPS = [
  { num: '01', title: 'Share your vision', desc: 'Fill in the form with your idea, colors, and inspiration.' },
  { num: '02', title: 'We design it', desc: 'Our artisans sketch your piece and share a preview within 48h.' },
  { num: '03', title: 'We craft & ship', desc: 'Handcrafted to perfection and shipped in premium packaging.' },
]

const FAQ = [
  { q: 'How long does it take?', a: 'Custom orders take 7–14 business days from design approval to delivery.' },
  { q: 'Can I see a preview first?', a: 'Yes! We send a digital sketch for your approval before crafting begins. One free revision included.' },
  { q: "What if I'm not happy?", a: "We offer a satisfaction guarantee. If the final piece doesn't match the approved design, we'll redo it." },
  { q: 'How much does a custom order cost?', a: "Pricing starts at $80 and depends on complexity and materials. We'll confirm the price before charging." },
]

export function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Name is required'
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = 'Please enter a valid email address'
  if (form.description.trim().length < 20)
    errors.description = 'Please enter at least 20 characters describing your piece'
  return errors
}

export default function CustomOrder() {
  const [form, setForm] = useState({
    name: '', email: '', pieceType: PIECE_TYPES[0], material: MATERIALS[0],
    colorInspiration: '', description: '',
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [openFaq, setOpenFaq] = useState(null)

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }))
    if (errors[field]) setErrors(e => ({ ...e, [field]: undefined }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setStatus('loading')
    try {
      await sendOrderEmail({ ...form, to_name: 'Aurea Studio' })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <main className="min-h-screen bg-cream">
      {/* Hero */}
      <div className="bg-aurea-gradient pt-28 pb-16 px-4 sm:px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="label-tag mb-3">One of a kind</p>
          <h1 className="section-heading mb-4">Design your unique piece</h1>
          <p className="font-body text-lg text-espresso-soft">
            Tell us your vision and we'll bring it to life in resin and steel.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <AnimatedSection>
            <GlassCard className="p-8">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center"
                  >
                    <div className="text-5xl mb-4">✨</div>
                    <h2 className="font-display text-3xl text-espresso mb-3">Thank you, {form.name}!</h2>
                    <p className="font-body text-espresso-soft">
                      We received your custom order request. Our team will reach out within 48 hours with your design preview.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <h2 className="font-display text-2xl text-espresso mb-1">Your details</h2>

                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="label-tag block mb-2">Your name</label>
                      <input
                        id="name"
                        type="text"
                        value={form.name}
                        onChange={e => set('name', e.target.value)}
                        placeholder="Ana García"
                        className={`w-full bg-white/60 border rounded-xl px-4 py-3 font-body text-sm text-espresso placeholder-espresso-soft/40 focus:outline-none transition-colors ${errors.name ? 'border-red-400' : 'border-gold-border focus:border-gold'}`}
                      />
                      {errors.name && <p className="font-body text-xs text-red-500 mt-1">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="label-tag block mb-2">Email</label>
                      <input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={e => set('email', e.target.value)}
                        placeholder="ana@example.com"
                        className={`w-full bg-white/60 border rounded-xl px-4 py-3 font-body text-sm text-espresso placeholder-espresso-soft/40 focus:outline-none transition-colors ${errors.email ? 'border-red-400' : 'border-gold-border focus:border-gold'}`}
                      />
                      {errors.email && <p className="font-body text-xs text-red-500 mt-1">{errors.email}</p>}
                    </div>

                    {/* Piece type */}
                    <div>
                      <label htmlFor="pieceType" className="label-tag block mb-2">Type of piece</label>
                      <select
                        id="pieceType"
                        value={form.pieceType}
                        onChange={e => set('pieceType', e.target.value)}
                        className="w-full bg-white/60 border border-gold-border rounded-xl px-4 py-3 font-body text-sm text-espresso focus:outline-none focus:border-gold"
                      >
                        {PIECE_TYPES.map(t => <option key={t}>{t}</option>)}
                      </select>
                    </div>

                    {/* Material */}
                    <div>
                      <label htmlFor="material" className="label-tag block mb-2">Material preference</label>
                      <select
                        id="material"
                        value={form.material}
                        onChange={e => set('material', e.target.value)}
                        className="w-full bg-white/60 border border-gold-border rounded-xl px-4 py-3 font-body text-sm text-espresso focus:outline-none focus:border-gold"
                      >
                        {MATERIALS.map(m => <option key={m}>{m}</option>)}
                      </select>
                    </div>

                    {/* Color inspiration */}
                    <div>
                      <label htmlFor="colorInspiration" className="label-tag block mb-2">Color palette / inspiration</label>
                      <input
                        id="colorInspiration"
                        type="text"
                        value={form.colorInspiration}
                        onChange={e => set('colorInspiration', e.target.value)}
                        placeholder="e.g. warm gold and cream, sunset tones, ocean blues…"
                        className="w-full bg-white/60 border border-gold-border rounded-xl px-4 py-3 font-body text-sm text-espresso placeholder-espresso-soft/40 focus:outline-none focus:border-gold"
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label htmlFor="description" className="label-tag block mb-2">Describe your piece</label>
                      <textarea
                        id="description"
                        rows={4}
                        value={form.description}
                        onChange={e => set('description', e.target.value)}
                        placeholder="Tell us about your piece — style, occasion, who it's for, any details that inspire you…"
                        className={`w-full bg-white/60 border rounded-xl px-4 py-3 font-body text-sm text-espresso placeholder-espresso-soft/40 focus:outline-none transition-colors resize-none ${errors.description ? 'border-red-400' : 'border-gold-border focus:border-gold'}`}
                      />
                      {errors.description && <p className="font-body text-xs text-red-500 mt-1">{errors.description}</p>}
                    </div>

                    {status === 'error' && (
                      <p className="font-body text-sm text-red-500">Something went wrong. Please try again or email us directly.</p>
                    )}

                    <GoldButton
                      type="submit"
                      className="w-full !py-4 !text-base"
                      disabled={status === 'loading'}
                    >
                      {status === 'loading' ? 'Sending…' : 'Submit My Order'}
                    </GoldButton>
                  </motion.form>
                )}
              </AnimatePresence>
            </GlassCard>
          </AnimatedSection>

          {/* Right column */}
          <AnimatedSection delay={0.2} className="space-y-8">
            {/* Steps */}
            <div>
              <p className="label-tag mb-6">How it works</p>
              <div className="space-y-5">
                {STEPS.map(step => (
                  <GlassCard key={step.num} className="p-5 flex gap-5 items-start">
                    <span className="font-display text-3xl text-gold/40 shrink-0">{step.num}</span>
                    <div>
                      <h3 className="font-display text-lg text-espresso mb-1">{step.title}</h3>
                      <p className="font-body text-sm text-espresso-soft">{step.desc}</p>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div>
              <p className="label-tag mb-4">FAQ</p>
              <div className="space-y-3">
                {FAQ.map((item, i) => (
                  <GlassCard key={i} className="overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full text-left px-5 py-4 flex justify-between items-center"
                    >
                      <span className="font-body text-sm font-medium text-espresso">{item.q}</span>
                      <span className="text-gold text-lg font-light">{openFaq === i ? '−' : '+'}</span>
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="px-5 pb-4"
                        >
                          <p className="font-body text-sm text-espresso-soft">{item.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </GlassCard>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
      <Footer />
    </main>
  )
}
