import { filterProducts } from '../src/components/shop/filterProducts'
import products from '../src/data/products.json'

describe('filterProducts', () => {
  test('returns all products when no filters applied', () => {
    const result = filterProducts(products, {})
    expect(result).toHaveLength(products.length)
  })

  test('filters by category', () => {
    const result = filterProducts(products, { category: 'rings' })
    expect(result.every(p => p.category === 'rings')).toBe(true)
    expect(result.length).toBe(3)
  })

  test('filters by material', () => {
    const result = filterProducts(products, { material: 'resin' })
    expect(result.every(p => p.material === 'resin')).toBe(true)
  })

  test('filters by maxPrice', () => {
    const result = filterProducts(products, { maxPrice: 70 })
    expect(result.every(p => p.price <= 70)).toBe(true)
  })

  test('filters by inStock', () => {
    const result = filterProducts(products, { inStock: true })
    expect(result.every(p => p.inStock)).toBe(true)
  })

  test('combines multiple filters', () => {
    const result = filterProducts(products, { category: 'earrings', material: 'steel' })
    expect(result.every(p => p.category === 'earrings' && p.material === 'steel')).toBe(true)
  })

  test('returns empty array when no products match', () => {
    const result = filterProducts(products, { category: 'rings', maxPrice: 1 })
    expect(result).toHaveLength(0)
  })
})
