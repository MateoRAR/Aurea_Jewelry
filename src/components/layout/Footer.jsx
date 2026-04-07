import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  function handleSubscribe(e) {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer className="bg-espresso text-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="Aurea" className="h-10 w-10 object-contain brightness-0 invert" />
              <span className="font-display text-2xl text-white tracking-widest">AUREA</span>
            </div>
            <p className="font-body text-sm text-white/60 leading-relaxed">
              Handcrafted resin & stainless steel jewelry. Each piece tells your story.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-body text-xs font-medium tracking-[0.2em] uppercase text-gold mb-4">Navigate</h4>
            <ul className="space-y-3">
              {[['/', 'Home'], ['/shop', 'Shop'], ['/custom', 'Custom Order'], ['/about', 'About']].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="font-body text-sm text-white/60 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-body text-xs font-medium tracking-[0.2em] uppercase text-gold mb-4">Categories</h4>
            <ul className="space-y-3">
              {['Rings', 'Necklaces', 'Earrings', 'Bracelets'].map(cat => (
                <li key={cat}>
                  <Link
                    to={`/shop?category=${cat.toLowerCase()}`}
                    className="font-body text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-body text-xs font-medium tracking-[0.2em] uppercase text-gold mb-4">Newsletter</h4>
            <p className="font-body text-sm text-white/60 mb-4">New collections and exclusive offers, delivered to you.</p>
            {subscribed ? (
              <p className="font-body text-sm text-gold">Thank you for subscribing!</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 font-body text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold"
                />
                <button
                  type="submit"
                  className="bg-gold text-white font-body text-sm px-4 py-2 rounded-lg hover:bg-gold-light transition-colors"
                >
                  Join
                </button>
              </form>
            )}

            <div className="flex gap-4 mt-6">
              {['Instagram', 'TikTok', 'Pinterest'].map(social => (
                <a key={social} href="#" className="font-body text-xs text-white/40 hover:text-white transition-colors">
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/40">© 2026 Aurea. All rights reserved.</p>
          <p className="font-body text-xs text-white/40">Handcrafted with love.</p>
        </div>
      </div>
    </footer>
  )
}
