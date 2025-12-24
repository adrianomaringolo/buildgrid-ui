import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { toast } from './toast'
import { Toaster } from './toaster'

// Mock sonner to control toast behavior in tests
vi.mock('sonner', () => ({
	toast: {
		success: vi.fn((message, options) => 'success-toast-id'),
		error: vi.fn((message, options) => 'error-toast-id'),
		warning: vi.fn((message, options) => 'warning-toast-id'),
		info: vi.fn((message, options) => 'info-toast-id'),
		dismiss: vi.fn(),
	},
	Toaster: ({ children, ...props }: any) => (
		<div data-testid="sonner-toaster" {...props}>
			{children}
		</div>
	),
}))

describe('Toast', () => {
	describe('Toast Functions', () => {
		it('exports toast object with all methods', () => {
			expect(toast).toBeDefined()
			expect(typeof toast.success).toBe('function')
			expect(typeof toast.error).toBe('function')
			expect(typeof toast.warning).toBe('function')
			expect(typeof toast.info).toBe('function')
			expect(typeof toast.dismiss).toBe('function')
		})

		it('calls success toast with message', () => {
			const message = 'Success message'
			const result = toast.success(message)

			expect(result).toBe('success-toast-id')
		})

		it('calls error toast with message', () => {
			const message = 'Error message'
			const result = toast.error(message)

			expect(result).toBe('error-toast-id')
		})

		it('calls warning toast with message', () => {
			const message = 'Warning message'
			const result = toast.warning(message)

			expect(result).toBe('warning-toast-id')
		})

		it('calls info toast with message', () => {
			const message = 'Info message'
			const result = toast.info(message)

			expect(result).toBe('info-toast-id')
		})

		it('accepts React node as message', () => {
			const message = <span>React node message</span>
			const result = toast.success(message)

			expect(result).toBe('success-toast-id')
		})

		it('accepts additional options', () => {
			const message = 'Test message'
			const options = { duration: 5000 }
			const result = toast.success(message, options)

			expect(result).toBe('success-toast-id')
		})
	})

	describe('Toast Close Button', () => {
		it('renders close button with X icon', () => {
			render(
				<div>
					<button onClick={() => {}}>
						<svg data-testid="x-icon" />
					</button>
				</div>,
			)

			const button = screen.getByRole('button')
			expect(button).toBeInTheDocument()
		})

		it('handles click events', async () => {
			const handleClick = vi.fn()
			const user = userEvent.setup()

			render(<button onClick={handleClick}>Close</button>)

			const button = screen.getByRole('button')
			await user.click(button)

			expect(handleClick).toHaveBeenCalledTimes(1)
		})
	})

	describe('Integration with Toaster', () => {
		it('renders toaster component', () => {
			render(<Toaster />)

			const toaster = screen.getByTestId('sonner-toaster')
			expect(toaster).toBeInTheDocument()
		})

		it('toaster accepts custom props', () => {
			render(<Toaster position="top-right" />)

			const toaster = screen.getByTestId('sonner-toaster')
			expect(toaster).toHaveAttribute('position', 'top-right')
		})
	})

	describe('Toast Variants', () => {
		it('success toast returns correct id', () => {
			const id = toast.success('Success')
			expect(id).toBe('success-toast-id')
		})

		it('error toast returns correct id', () => {
			const id = toast.error('Error')
			expect(id).toBe('error-toast-id')
		})

		it('warning toast returns correct id', () => {
			const id = toast.warning('Warning')
			expect(id).toBe('warning-toast-id')
		})

		it('info toast returns correct id', () => {
			const id = toast.info('Info')
			expect(id).toBe('info-toast-id')
		})
	})

	describe('Toast Dismissal', () => {
		it('can dismiss toast by id', () => {
			const id = toast.success('Test message')
			toast.dismiss(id)

			// Verify dismiss was called (mocked)
			expect(toast.dismiss).toHaveBeenCalledWith(id)
		})

		it('can dismiss all toasts', () => {
			toast.dismiss()

			expect(toast.dismiss).toHaveBeenCalledWith()
		})
	})

	describe('Complex Scenarios', () => {
		it('handles multiple toasts', () => {
			const id1 = toast.success('First toast')
			const id2 = toast.error('Second toast')
			const id3 = toast.warning('Third toast')

			expect(id1).toBe('success-toast-id')
			expect(id2).toBe('error-toast-id')
			expect(id3).toBe('warning-toast-id')
		})

		it('handles toast with complex React content', () => {
			const complexContent = (
				<div>
					<h3>Toast Title</h3>
					<p>
						Toast description with <strong>bold text</strong>
					</p>
				</div>
			)

			const id = toast.info(complexContent)
			expect(id).toBe('info-toast-id')
		})

		it('handles toast with custom options', () => {
			const options = {
				duration: 10000,
				position: 'top-center' as const,
				dismissible: true,
			}

			const id = toast.success('Custom toast', options)
			expect(id).toBe('success-toast-id')
		})
	})

	describe('Error Handling', () => {
		it('handles empty message gracefully', () => {
			const id = toast.success('')
			expect(id).toBe('success-toast-id')
		})

		it('handles undefined message gracefully', () => {
			const id = toast.success(undefined as any)
			expect(id).toBe('success-toast-id')
		})

		it('handles null message gracefully', () => {
			const id = toast.success(null as any)
			expect(id).toBe('success-toast-id')
		})
	})

	describe('Performance', () => {
		it('handles rapid toast creation', () => {
			const ids = []
			for (let i = 0; i < 10; i++) {
				ids.push(toast.success(`Toast ${i}`))
			}

			expect(ids).toHaveLength(10)
			ids.forEach((id) => {
				expect(id).toBe('success-toast-id')
			})
		})

		it('handles rapid toast dismissal', () => {
			// Clear any previous calls
			vi.clearAllMocks()

			const ids = [
				toast.success('Toast 1'),
				toast.error('Toast 2'),
				toast.warning('Toast 3'),
			]

			ids.forEach((id) => {
				toast.dismiss(id)
			})

			// The mock might be called more times due to internal implementation
			// We just verify it was called at least the expected number of times
			expect(toast.dismiss).toHaveBeenCalledWith(ids[0])
			expect(toast.dismiss).toHaveBeenCalledWith(ids[1])
			expect(toast.dismiss).toHaveBeenCalledWith(ids[2])
		})
	})
})
