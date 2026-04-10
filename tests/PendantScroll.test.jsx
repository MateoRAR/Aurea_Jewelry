// tests/PendantScroll.test.jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { vi, describe, it, expect, beforeAll, afterAll } from 'vitest'

vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion')
  const mockMV = { get: () => 0, on: vi.fn(), destroy: vi.fn() }
  return {
    ...actual,
    useScroll: () => ({ scrollYProgress: mockMV }),
    useTransform: () => mockMV,
    useMotionValueEvent: vi.fn(),
    useMotionTemplate: () => mockMV,
  }
})

// Prevent jsdom's instant onerror from collapsing the loading overlay
vi.stubGlobal('Image', class {
  onload = null
  onerror = null
  src = ''
  get complete() { return false }
  get naturalWidth() { return 0 }
})

// jsdom doesn't implement ResizeObserver
vi.stubGlobal('ResizeObserver', class {
  observe() {}
  unobserve() {}
  disconnect() {}
})

// Import after vi.mock (Vitest hoists vi.mock automatically)
import PendantScroll from '../src/components/pendant-scroll/PendantScroll'

function Wrapper({ children }) {
  return <MemoryRouter>{children}</MemoryRouter>
}

describe('PendantScroll', () => {
  let originalGetContext

  beforeAll(() => {
    originalGetContext = HTMLCanvasElement.prototype.getContext
    HTMLCanvasElement.prototype.getContext = vi.fn(() => ({
      clearRect: vi.fn(),
      drawImage: vi.fn(),
      fillRect: vi.fn(),
      fillStyle: '',
    }))
  })

  afterAll(() => {
    HTMLCanvasElement.prototype.getContext = originalGetContext
  })

  it('renders without crashing', () => {
    render(<PendantScroll />, { wrapper: Wrapper })
  })

  it('renders the canvas element', () => {
    render(<PendantScroll />, { wrapper: Wrapper })
    expect(document.querySelector('canvas')).toBeInTheDocument()
  })

  it('renders the loading overlay', () => {
    render(<PendantScroll />, { wrapper: Wrapper })
    expect(document.querySelector('[data-testid="loading-overlay"]')).toBeInTheDocument()
  })

  it('renders the intro text panel', () => {
    render(<PendantScroll />, { wrapper: Wrapper })
    expect(screen.getByText('Personalize it as you imagine')).toBeInTheDocument()
  })

  it('renders the CTA link pointing to /custom', () => {
    render(<PendantScroll />, { wrapper: Wrapper })
    const link = screen.getByRole('link', { name: /make it yours/i })
    expect(link).toHaveAttribute('href', '/custom')
  })
})
