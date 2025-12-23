import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock scrollIntoView since it's not available in jsdom
Element.prototype.scrollIntoView = vi.fn()

// Mock ResizeObserver since it's not available in jsdom
global.ResizeObserver = vi.fn().mockImplementation(() => ({
	observe: vi.fn(),
	unobserve: vi.fn(),
	disconnect: vi.fn(),
}))

// Mock Image constructor to simulate successful image loading
const mockImage = {
	addEventListener: vi.fn((event, callback) => {
		if (event === 'load') {
			// Simulate successful image load
			setTimeout(callback, 0)
		}
	}),
	removeEventListener: vi.fn(),
	src: '',
}

global.Image = vi.fn(() => mockImage) as any

// Mock hasPointerCapture for Radix UI Select compatibility
Element.prototype.hasPointerCapture = vi.fn(() => false)
Element.prototype.setPointerCapture = vi.fn()
Element.prototype.releasePointerCapture = vi.fn()
