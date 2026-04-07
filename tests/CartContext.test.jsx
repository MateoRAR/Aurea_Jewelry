import { renderHook, act } from '@testing-library/react'
import { CartProvider, useCart } from '../src/context/CartContext'

const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>

const mockProduct = {
  id: 'ring-001',
  name: 'Aurora Resin Ring',
  price: 65,
  images: ['https://picsum.photos/seed/ring001a/600/700'],
  category: 'rings',
  material: 'resin',
}

describe('CartContext', () => {
  test('starts with empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    expect(result.current.items).toEqual([])
    expect(result.current.count).toBe(0)
  })

  test('addItem adds product to cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addItem(mockProduct))
    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].id).toBe('ring-001')
    expect(result.current.items[0].quantity).toBe(1)
  })

  test('addItem increments quantity if product already in cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addItem(mockProduct))
    act(() => result.current.addItem(mockProduct))
    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].quantity).toBe(2)
    expect(result.current.count).toBe(2)
  })

  test('removeItem removes product from cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addItem(mockProduct))
    act(() => result.current.removeItem('ring-001'))
    expect(result.current.items).toHaveLength(0)
  })

  test('clearCart empties the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addItem(mockProduct))
    act(() => result.current.clearCart())
    expect(result.current.items).toHaveLength(0)
    expect(result.current.count).toBe(0)
  })

  test('count reflects total quantity across all items', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    const second = { ...mockProduct, id: 'ring-002' }
    act(() => result.current.addItem(mockProduct))
    act(() => result.current.addItem(mockProduct))
    act(() => result.current.addItem(second))
    expect(result.current.count).toBe(3)
  })
})
