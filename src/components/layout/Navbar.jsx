import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../../context/CartContext'
import GoldButton from '../ui/GoldButton'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/custom', label: 'Custom Order' },
  { to: '/about', label: 'About' },
]

export default function Navbar({ onCartOpen }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { count } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-4 pt-4"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Inner wrapper morphs from full transparent bar → floating pill */}
        <div
          className={`mx-auto transition-all duration-500 ${
            scrolled
              ? 'max-w-3xl bg-white/75 backdrop-blur-xl border border-gold-border rounded-full shadow-[0_8px_32px_rgba(44,36,22,0.10)] px-5 py-2.5'
              : 'max-w-7xl bg-transparent px-2 py-2'
          }`}
        >
          <div className="flex items-center justify-between">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <motion.img
                src="/logo.png"
                alt="Aurea"
                className="h-8 w-8 object-contain"
                whileHover={{ rotate: 18, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 320, damping: 18 }}
              />
              <span className="font-display text-xl text-espresso tracking-[0.22em]">AUREA</span>
            </Link>

            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-1">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === '/'}
                    className="relative px-4 py-2 group block"
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <motion.span
                            layoutId="nav-pill"
                            className="absolute inset-0 bg-gold/10 rounded-full"
                            transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                          />
                        )}
                        <span
                          className={`relative font-body text-sm tracking-wide transition-colors duration-200 ${
                            isActive
                              ? 'text-gold font-medium'
                              : 'text-espresso-soft group-hover:text-espresso'
                          }`}
                        >
                          {label}
                        </span>
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Right actions */}
            <div className="flex items-center gap-1.5">

              {/* Cart */}
              <motion.button
                onClick={onCartOpen}
                className="relative p-2.5 text-espresso-soft hover:text-gold transition-colors rounded-full hover:bg-gold/8"
                aria-label="Open cart"
                whileTap={{ scale: 0.88 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <AnimatePresence mode="popLayout">
                  {count > 0 && (
                    <motion.span
                      key={count}
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 20 }}
                      transition={{ type: 'spring', stiffness: 520, damping: 18 }}
                      className="absolute -top-0.5 -right-0.5 bg-gold text-white text-[10px] w-[18px] h-[18px] rounded-full flex items-center justify-center font-semibold leading-none"
                    >
                      {count}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* CTA — desktop only */}
              <Link to="/shop" className="hidden md:inline-flex">
                <GoldButton variant="clear" className="!px-5 !py-2 !text-sm">Shop Now</GoldButton>
              </Link>

              {/* Hamburger — mobile */}
              <button
                className="md:hidden relative w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-full hover:bg-gold/8 transition-colors"
                onClick={() => setMenuOpen(v => !v)}
                aria-label="Toggle menu"
              >
                <motion.span
                  animate={menuOpen ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="block w-[18px] h-px bg-espresso origin-center"
                />
                <motion.span
                  animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.18 }}
                  className="block w-[18px] h-px bg-espresso"
                />
                <motion.span
                  animate={menuOpen ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="block w-[18px] h-px bg-espresso origin-center"
                />
              </button>
            </div>

          </div>
        </div>
      </motion.nav>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-cream flex flex-col px-8 pt-28 pb-12"
          >
            {/* Decorative blobs */}
            <div className="pointer-events-none absolute top-1/4 right-8 w-48 h-48 rounded-full bg-gold/8 blur-3xl" />
            <div className="pointer-events-none absolute bottom-1/3 left-4 w-32 h-32 rounded-full bg-gold-light/10 blur-2xl" />

            {/* Nav links */}
            <nav className="flex-1">
              <ul className="flex flex-col">
                {navLinks.map(({ to, label }, i) => (
                  <motion.li
                    key={to}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ delay: i * 0.07 + 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="border-b border-gold-border/40 overflow-hidden"
                  >
                    <NavLink
                      to={to}
                      end={to === '/'}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        `block py-5 font-display text-5xl tracking-tight transition-colors duration-200 ${
                          isActive ? 'text-gold' : 'text-espresso hover:text-espresso-soft'
                        }`
                      }
                    >
                      {label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.38, duration: 0.4 }}
            >
              <Link to="/shop" onClick={() => setMenuOpen(false)}>
                <GoldButton className="w-full !py-4 !text-base">Shop Now</GoldButton>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
