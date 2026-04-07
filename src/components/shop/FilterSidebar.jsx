import GlassCard from '../ui/GlassCard'

const MATERIALS = ['resin', 'steel', 'combo']
const MAX_PRICES = [50, 75, 100, 150]

export default function FilterSidebar({ filters, onChange }) {
  function set(key, value) {
    onChange({ ...filters, [key]: value === filters[key] ? undefined : value })
  }

  return (
    <GlassCard className="p-5 space-y-6 h-fit sticky top-28">
      <h3 className="font-body text-sm font-medium text-espresso tracking-wide">Filters</h3>

      {/* Material */}
      <div>
        <p className="label-tag mb-3">Material</p>
        <div className="space-y-2">
          {MATERIALS.map(m => (
            <button
              key={m}
              onClick={() => set('material', m)}
              className={`block w-full text-left font-body text-sm px-3 py-2 rounded-lg transition-colors capitalize ${
                filters.material === m
                  ? 'bg-gold text-white'
                  : 'text-espresso-soft hover:bg-gold-tint'
              }`}
            >
              {m === 'combo' ? 'Resin + Steel' : m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Max price */}
      <div>
        <p className="label-tag mb-3">Max Price</p>
        <div className="space-y-2">
          {MAX_PRICES.map(p => (
            <button
              key={p}
              onClick={() => set('maxPrice', p)}
              className={`block w-full text-left font-body text-sm px-3 py-2 rounded-lg transition-colors ${
                filters.maxPrice === p
                  ? 'bg-gold text-white'
                  : 'text-espresso-soft hover:bg-gold-tint'
              }`}
            >
              Up to ${p}
            </button>
          ))}
        </div>
      </div>

      {/* In stock */}
      <div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={!!filters.inStock}
            onChange={e => onChange({ ...filters, inStock: e.target.checked || undefined })}
            className="w-4 h-4 accent-gold rounded"
          />
          <span className="font-body text-sm text-espresso-soft">In stock only</span>
        </label>
      </div>

      {/* Clear */}
      <button
        onClick={() => onChange({})}
        className="font-body text-xs text-gold hover:underline"
      >
        Clear all filters
      </button>
    </GlassCard>
  )
}
