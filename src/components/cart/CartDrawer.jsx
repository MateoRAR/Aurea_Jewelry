import { useRef, useLayoutEffect, useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { useCart } from '../../context/CartContext'
import GoldButton from '../ui/GoldButton'
import './CartDrawer.css'

export default function CartDrawer({ open, onClose }) {
  const { items, count, removeItem, clearCart } = useCart()
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const backdropRef    = useRef(null)
  const preLayersRef   = useRef(null)
  const panelRef       = useRef(null)
  const titleInnerRef  = useRef(null)
  const openTlRef      = useRef(null)
  const closeTweenRef  = useRef(null)
  const titleAnimRef   = useRef(null)
  const prevOpenRef    = useRef(false)

  const [titleLines, setTitleLines] = useState(['Your Cart'])

  // Set everything off-screen on mount
  useLayoutEffect(() => {
    const panel   = panelRef.current
    const layers  = preLayersRef.current ? Array.from(preLayersRef.current.children) : []
    const backdrop = backdropRef.current
    if (panel)   gsap.set([panel, ...layers], { xPercent: 100 })
    if (backdrop) gsap.set(backdrop, { opacity: 0, pointerEvents: 'none' })
  }, [])

  const playOpen = useCallback(() => {
    const panel   = panelRef.current
    const layers  = preLayersRef.current ? Array.from(preLayersRef.current.children) : []
    const backdrop = backdropRef.current
    if (!panel) return

    openTlRef.current?.kill()
    closeTweenRef.current?.kill()

    const itemLabels = Array.from(panel.querySelectorAll('.cd-item-label'))
    const footer     = panel.querySelector('.cd-footer')

    if (itemLabels.length) gsap.set(itemLabels, { yPercent: 140, rotate: 10 })
    if (footer)            gsap.set(footer, { opacity: 0, y: 20 })

    const tl = gsap.timeline()

    tl.to(backdrop, { opacity: 1, pointerEvents: 'auto', duration: 0.25, ease: 'power2.out' }, 0)

    layers.forEach((el, i) => {
      tl.fromTo(el, { xPercent: 100 }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07)
    })

    const panelAt = (layers.length - 1) * 0.07 + 0.08
    tl.fromTo(panel, { xPercent: 100 }, { xPercent: 0, duration: 0.65, ease: 'power4.out' }, panelAt)

    if (itemLabels.length) {
      tl.to(itemLabels, {
        yPercent: 0, rotate: 0, duration: 1, ease: 'power4.out',
        stagger: { each: 0.1 },
      }, panelAt + 0.1)
    }

    if (footer) {
      tl.to(footer, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, panelAt + 0.35)
    }

    openTlRef.current = tl
  }, [])

  const playClose = useCallback(() => {
    const panel   = panelRef.current
    const layers  = preLayersRef.current ? Array.from(preLayersRef.current.children) : []
    const backdrop = backdropRef.current
    if (!panel) return

    openTlRef.current?.kill()
    closeTweenRef.current = gsap.to([...layers, panel], {
      xPercent: 100, duration: 0.32, ease: 'power3.in', overwrite: 'auto',
    })
    gsap.to(backdrop, { opacity: 0, pointerEvents: 'none', duration: 0.25, ease: 'power2.in' })
  }, [])

  const animateTitle = useCallback(() => {
    const inner = titleInnerRef.current
    if (!inner) return
    titleAnimRef.current?.kill()

    const seq = ['Your Cart', 'Your Picks', 'My Bag', 'Your Cart']
    setTitleLines(seq)
    gsap.set(inner, { yPercent: 0 })
    const finalShift = ((seq.length - 1) / seq.length) * 100
    titleAnimRef.current = gsap.to(inner, {
      yPercent: -finalShift,
      duration: 0.5 + seq.length * 0.07,
      ease: 'power4.out',
    })
  }, [])

  useEffect(() => {
    if (open && !prevOpenRef.current) {
      prevOpenRef.current = true
      playOpen()
      animateTitle()
    } else if (!open && prevOpenRef.current) {
      prevOpenRef.current = false
      playClose()
    }
  }, [open, playOpen, playClose, animateTitle])

  // Click-away on backdrop
  useEffect(() => {
    if (!open) return
    const handler = (e) => { if (e.target === backdropRef.current) onClose() }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open, onClose])

  return (
    <div className="cd-wrapper">
      <div ref={backdropRef} className="cd-backdrop" />

      <div ref={preLayersRef} className="cd-prelayers" aria-hidden>
        <div className="cd-prelayer" style={{ background: '#C9922B' }} />
        <div className="cd-prelayer" style={{ background: '#F5DFA5' }} />
      </div>

      <div ref={panelRef} className="cd-panel" aria-hidden={!open}>
        {/* Header */}
        <div className="cd-header">
          <div className="cd-title-wrap">
            <span className="cd-title-inner" ref={titleInnerRef}>
              {titleLines.map((l, i) => (
                <span className="cd-title-line" key={i}>{l}</span>
              ))}
            </span>
          </div>
          <div className="cd-header-meta">
            <span className="cd-count">{count} {count === 1 ? 'item' : 'items'}</span>
            <button onClick={onClose} className="cd-close" aria-label="Close cart">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Items */}
        <div className="cd-items">
          {items.length === 0 ? (
            <div className="cd-empty">
              <p className="font-display text-xl text-espresso-soft mb-4">Your cart is empty</p>
              <Link to="/shop" onClick={onClose}>
                <GoldButton variant="outline">Browse Collection</GoldButton>
              </Link>
            </div>
          ) : (
            <ul className="cd-list">
              {items.map((item) => (
                <li key={item.id} className="cd-item">
                  <div className="cd-item-name-wrap">
                    <Link
                      to={`/product/${item.id}`}
                      className="cd-item-link"
                      onClick={onClose}
                    >
                      <span className="cd-item-label">{item.name}</span>
                    </Link>
                  </div>
                  <div className="cd-item-meta">
                    <img src={item.images[0]} alt={item.name} className="cd-item-img" />
                    <div className="cd-item-info">
                      <span className="cd-item-price">${item.price} × {item.quantity}</span>
                      <span className="cd-item-material">{item.material}</span>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="cd-item-remove"
                      aria-label={`Remove ${item.name}`}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="cd-footer">
            <div className="cd-total">
              <span>Subtotal</span>
              <span className="cd-total-amount">${total}</span>
            </div>
            <GoldButton className="w-full !py-4 !text-base">
              Pay · ${total}
            </GoldButton>
            <button onClick={clearCart} className="cd-clear">Clear cart</button>
          </div>
        )}
      </div>
    </div>
  )
}
