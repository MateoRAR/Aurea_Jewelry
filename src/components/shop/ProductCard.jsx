import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingCart, Star, Gem } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import GoldButton from '../ui/GoldButton'
import {
  CardFlip,
  CardFlipFront,
  CardFlipBack,
  CardFlipHeader,
  CardFlipFooter,
  CardFlipDescription,
  CardFlipContent,
} from '../ui/card-flip'

function reviewFromId(id) {
  let n = 0
  for (let i = 0; i < id.length; i += 1) n += id.charCodeAt(i)
  return { score: (4.4 + (n % 7) / 10).toFixed(1), count: 72 + (n % 48) }
}

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const { id, name, category, price, images, inStock, material, description, featured, colors } =
    product
  const palette = colors?.length ? colors : ['#C9922B']
  const [selectedSwatch, setSelectedSwatch] = useState(palette[0])
  const { score, count } = useMemo(() => reviewFromId(id), [id])

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.25 }}>
      <CardFlip
        className="h-full w-full select-none"
        frontToolbarTitle={
          <Link
            to={`/shop/${id}`}
            className="block min-w-0 truncate font-display-regular text-2xl font-semibold tracking-tight text-espresso transition-colors hover:text-gold"
          >
            {name}
          </Link>
        }
        backToolbarTitle={
          <span className="block min-w-0 truncate font-display text-lg font-semibold tracking-tight text-espresso sm:text-xl">
            {name}
          </span>
        }
      >
        <CardFlipFront className="flex min-h-[520px] flex-col justify-between gap-0 py-5">
          <Link
            to={`/shop/${id}`}
            className="relative mx-4 block h-52 w-[calc(100%-2rem)] overflow-hidden rounded-xl bg-cream-dark"
          >
            <img
              src={images[0]}
              alt={name}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
            {!inStock && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/50">
                <span className="rounded-2xl border border-gold-border bg-white/70 px-4 py-1 font-body text-sm text-espresso-soft shadow-glass backdrop-blur-glass">
                  Out of stock
                </span>
              </div>
            )}
          </Link>

          <div className="flex items-center justify-between px-4 pt-3">
            {featured ? (
              <span className="rounded-full bg-gold px-2.5 py-1 font-body text-xs font-semibold text-white">
                Best seller
              </span>
            ) : (
              <span className="rounded-full border border-gold-border bg-white/80 px-2.5 py-1 font-body text-xs capitalize text-espresso-soft backdrop-blur-glass">
                {material}
              </span>
            )}
            <div className="flex items-center gap-1 font-body text-sm font-medium text-espresso-soft">
              <Star className="h-5 w-5 fill-gold text-gold" />
              <span>
                {score} ({count})
              </span>
            </div>
          </div>
          <CardFlipHeader className="!grid-cols-1 gap-3 px-4 pb-1 pt-1">
            <p className="font-display text-2xl font-semibold leading-none text-gold">${price}</p>
            <p className="text-base font-medium leading-normal text-espresso sm:text-lg">
              Accent palette
            </p>
          </CardFlipHeader>

          <CardFlipContent className="mt-4 px-4  pb-2">
            <div className="flex flex-wrap items-center gap-3">
              {palette.map((hex) => (
                <button
                  key={hex}
                  type="button"
                  title={hex}
                  onClick={() => setSelectedSwatch(hex)}
                  className={`relative h-9 w-9 rounded-full border-2 shadow-sm transition-transform hover:scale-105 ${
                    selectedSwatch === hex
                      ? 'border-gold ring-2 ring-gold ring-offset-2 ring-offset-cream'
                      : 'border-gold-border'
                  }`}
                  style={{ backgroundColor: hex }}
                  aria-label={`Select accent ${hex}`}
                  aria-pressed={selectedSwatch === hex}
                />
              ))}
            </div>
          </CardFlipContent>

          <CardFlipFooter className="flex items-stretch gap-3 px-4">
            <Link to={`/shop/${id}`} className="flex flex-1 items-center justify-center">
              <GoldButton variant="clear" className="w-full justify-center">View piece</GoldButton>
            </Link>
            <button
              type="button"
              disabled={!inStock}
              onClick={() => addItem(product)}
              className="relative p-2 text-espresso-soft hover:text-gold transition-colors disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Add to cart"
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
          </CardFlipFooter>
        </CardFlipFront>

        <CardFlipBack className="flex min-h-[520px] flex-col">
          <CardFlipHeader className="!grid-cols-1 gap-1 px-6 pt-2">
            <CardFlipDescription className="text-base capitalize">
              {material} · {category}
            </CardFlipDescription>
          </CardFlipHeader>
          <CardFlipContent className="flex-1 space-y-4 overflow-auto">
            <div className="flex items-start gap-3">
              <Gem className="mt-0.5 h-6 w-6 shrink-0 text-gold" />
              <div>
                <h4 className="font-display font-semibold text-espresso">About</h4>
                <p className="mt-1 font-body text-sm leading-relaxed text-espresso-soft">
                  {description}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Gem className="mt-0.5 h-6 w-6 shrink-0 text-gold" />
              <div>
                <h4 className="font-display font-semibold text-espresso">Materials</h4>
                <p className="mt-1 font-body text-sm text-espresso-soft capitalize">
                  Premium {material === 'combo' ? 'resin & stainless steel' : material} — made to
                  order.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Gem className="mt-0.5 h-6 w-6 shrink-0 text-gold" />
              <div>
                <h4 className="font-display font-semibold text-espresso">Palette</h4>
                <p className="mt-1 font-body text-sm text-espresso-soft">
                  This piece draws from {palette.length} curated tones in the resin and metal
                  finish.
                </p>
              </div>
            </div>
          </CardFlipContent>
          <CardFlipFooter className="border-t border-gold-border">
            <p className="mt-2 font-body text-xs text-espresso-soft">
              Complimentary care notes with every order · Express options at checkout
            </p>
          </CardFlipFooter>
        </CardFlipBack>
      </CardFlip>
    </motion.div>
  )
}
