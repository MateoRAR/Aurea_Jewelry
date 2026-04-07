import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import products from '../data/products.json'
import { filterProducts } from '../components/shop/filterProducts'
import ProductCard from '../components/shop/ProductCard'
import FilterSidebar from '../components/shop/FilterSidebar'
import Footer from '../components/layout/Footer'

const CATEGORIES = ['all', 'rings', 'necklaces', 'earrings', 'bracelets']
const PER_PAGE = 6

export default function Shop() {
  const [searchParams] = useSearchParams()
  const initCategory = searchParams.get('category') || 'all'
  const [activeCategory, setActiveCategory] = useState(initCategory)
  const [filters, setFilters] = useState({})
  const [page, setPage] = useState(1)

  const categoryFilter = activeCategory !== 'all' ? { category: activeCategory } : {}
  const combined = { ...categoryFilter, ...filters }
  const filtered = useMemo(() => filterProducts(products, combined), [activeCategory, filters])
  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  function handleCategoryChange(cat) {
    setActiveCategory(cat)
    setPage(1)
  }

  function handleFilterChange(f) {
    setFilters(f)
    setPage(1)
  }

  return (
    <main className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-aurea-gradient pt-28 pb-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <p className="label-tag mb-3">Browse</p>
          <h1 className="section-heading mb-8">Our Collection</h1>
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`font-body text-sm px-5 py-2 rounded-full border transition-all capitalize ${
                  activeCategory === cat
                    ? 'bg-gold text-white border-gold'
                    : 'bg-white/60 border-gold-border text-espresso-soft hover:border-gold hover:text-gold'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-56 shrink-0">
            <FilterSidebar filters={filters} onChange={handleFilterChange} />
          </aside>

          {/* Grid */}
          <div className="flex-1">
            <p className="font-body text-sm text-espresso-soft mb-6">
              {filtered.length} product{filtered.length !== 1 ? 's' : ''}
            </p>
            {paged.length === 0 ? (
              <div className="text-center py-20">
                <p className="font-display text-2xl text-espresso-soft">No products match these filters.</p>
              </div>
            ) : (
              <motion.div
                key={`${activeCategory}-${page}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
              >
                {paged.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-3 mt-12">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="font-body text-sm px-5 py-2 rounded-lg border border-gold-border text-espresso-soft hover:border-gold disabled:opacity-40 transition-colors"
                >
                  Previous
                </button>
                <span className="font-body text-sm flex items-center px-4 text-espresso-soft">
                  {page} / {totalPages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="font-body text-sm px-5 py-2 rounded-lg border border-gold-border text-espresso-soft hover:border-gold disabled:opacity-40 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
