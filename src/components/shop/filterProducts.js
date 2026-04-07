export function filterProducts(products, filters) {
  const { category, material, maxPrice, inStock } = filters
  return products.filter(p => {
    if (category && p.category !== category) return false
    if (material && p.material !== material) return false
    if (maxPrice !== undefined && p.price > maxPrice) return false
    if (inStock && !p.inStock) return false
    return true
  })
}
