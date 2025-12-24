import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Spinner, spinnerColors, spinnerSizes } from './spinner'

describe('Spinner', () => {
	describe('Rendering', () => {
		it('renders spinner with default props', () => {
			render(<Spinner />)

			const spinner = document.querySelector('svg')
			expect(spinner).toBeInTheDocument()
			expect(spinner).toHaveClass('animate-spin')
		})

		it('renders with custom className', () => {
			render(<Spinner className="custom-spinner" />)

			const container = document.querySelector('.custom-spinner')
			expect(container).toBeInTheDocument()
		})

		it('renders with label', () => {
			render(<Spinner label="Loading..." />)

			expect(screen.getByText('Loading...')).toBeInTheDocument()
		})

		it('renders without label by default', () => {
			render(<Spinner />)

			const text = document.querySelector('p')
			expect(text).not.toBeInTheDocument()
		})
	})

	describe('Sizes', () => {
		it.each(spinnerSizes)('renders with %s size', (size) => {
			render(<Spinner size={size} />)

			const spinner = document.querySelector('svg')
			expect(spinner).toBeInTheDocument()

			// Check if the size class is applied
			const sizeClasses = {
				xs: 'h-4 w-4',
				sm: 'h-6 w-6',
				md: 'h-8 w-8',
				lg: 'h-10 w-10',
				xl: 'h-14 w-14',
				'2xl': 'h-20 w-20',
			}

			expect(spinner).toHaveClass(sizeClasses[size])
		})

		it('uses medium size by default', () => {
			render(<Spinner />)

			const spinner = document.querySelector('svg')
			expect(spinner).toHaveClass('h-8', 'w-8')
		})
	})

	describe('Colors', () => {
		it.each(spinnerColors)('renders with %s color', (color) => {
			render(<Spinner color={color} />)

			const spinner = document.querySelector('svg')
			expect(spinner).toBeInTheDocument()

			// Check if the color class is applied
			const colorClasses = {
				primary: 'text-primary',
				secondary: 'text-secondary',
				success: 'text-green-700',
				error: 'text-red-700',
				warning: 'text-yellow-700',
				info: 'text-blue-700',
				white: 'text-white',
				neutral: 'text-gray-700',
			}

			expect(spinner).toHaveClass(colorClasses[color])
		})

		it('uses primary color by default', () => {
			render(<Spinner />)

			const spinner = document.querySelector('svg')
			expect(spinner).toHaveClass('text-primary')
		})

		it('applies color to label when present', () => {
			render(<Spinner color="error" label="Error loading" />)

			const label = screen.getByText('Error loading')
			expect(label).toHaveClass('text-red-700')
		})
	})

	describe('Label Styling', () => {
		it('applies italic styling to label', () => {
			render(<Spinner label="Loading data..." />)

			const label = screen.getByText('Loading data...')
			expect(label).toHaveClass('italic')
		})

		it('applies color styling to label', () => {
			render(<Spinner color="success" label="Success!" />)

			const label = screen.getByText('Success!')
			expect(label).toHaveClass('text-green-700')
		})

		it('renders label as paragraph element', () => {
			render(<Spinner label="Loading..." />)

			const label = screen.getByText('Loading...')
			expect(label.tagName).toBe('P')
		})
	})

	describe('Animation', () => {
		it('applies spin animation to spinner icon', () => {
			render(<Spinner />)

			const spinner = document.querySelector('svg')
			expect(spinner).toHaveClass('animate-spin')
		})

		it('maintains animation with different sizes', () => {
			render(<Spinner size="xl" />)

			const spinner = document.querySelector('svg')
			expect(spinner).toHaveClass('animate-spin')
		})

		it('maintains animation with different colors', () => {
			render(<Spinner color="warning" />)

			const spinner = document.querySelector('svg')
			expect(spinner).toHaveClass('animate-spin')
		})
	})

	describe('Container Layout', () => {
		it('applies flex column layout to container', () => {
			render(<Spinner />)

			const container = document.querySelector('.flex.flex-col')
			expect(container).toBeInTheDocument()
			expect(container).toHaveClass('justify-center', 'items-center')
		})

		it('centers content vertically and horizontally', () => {
			render(<Spinner label="Loading..." />)

			const container = document.querySelector('.flex.flex-col')
			expect(container).toHaveClass('justify-center', 'items-center')
		})
	})

	describe('Accessibility', () => {
		it('uses LoaderCircle icon which has proper accessibility', () => {
			render(<Spinner />)

			// The LoaderCircle from lucide-react should be present
			const spinner = document.querySelector('svg')
			expect(spinner).toBeInTheDocument()
			expect(spinner).toHaveAttribute('aria-hidden', 'true')
		})

		it('label provides additional context', () => {
			render(<Spinner label="Loading user data" />)

			const label = screen.getByText('Loading user data')
			expect(label).toBeInTheDocument()
		})
	})

	describe('Variant Combinations', () => {
		it('combines size and color variants correctly', () => {
			render(<Spinner size="lg" color="error" />)

			const spinner = document.querySelector('svg')
			expect(spinner).toHaveClass('h-10', 'w-10', 'text-red-700')
		})

		it('combines all props correctly', () => {
			render(
				<Spinner
					size="xl"
					color="success"
					label="Processing..."
					className="custom-class"
				/>,
			)

			const spinner = document.querySelector('svg')
			expect(spinner).toHaveClass('h-14', 'w-14', 'text-green-700')

			const label = screen.getByText('Processing...')
			expect(label).toHaveClass('text-green-700', 'italic')

			const container = document.querySelector('.custom-class')
			expect(container).toBeInTheDocument()
		})
	})

	describe('Edge Cases', () => {
		it('handles empty label gracefully', () => {
			render(<Spinner label="" />)

			// Empty string is falsy, so no paragraph should be rendered
			const label = document.querySelector('p')
			expect(label).not.toBeInTheDocument()
		})

		it('handles undefined className gracefully', () => {
			render(<Spinner className={undefined} />)

			const container = document.querySelector('.flex.flex-col')
			expect(container).toBeInTheDocument()
		})

		it('handles null label gracefully', () => {
			render(<Spinner label={null as any} />)

			const text = document.querySelector('p')
			expect(text).not.toBeInTheDocument()
		})
	})

	describe('Type Exports', () => {
		it('exports spinner colors array', () => {
			expect(spinnerColors).toEqual([
				'primary',
				'secondary',
				'success',
				'error',
				'warning',
				'info',
				'white',
				'neutral',
			])
		})

		it('exports spinner sizes array', () => {
			expect(spinnerSizes).toEqual(['xs', 'sm', 'md', 'lg', 'xl', '2xl'])
		})
	})

	describe('Complex Scenarios', () => {
		it('renders multiple spinners with different configurations', () => {
			render(
				<div>
					<Spinner size="sm" color="primary" label="Loading..." />
					<Spinner size="lg" color="error" label="Error occurred" />
					<Spinner size="xl" color="success" />
				</div>,
			)

			const spinners = document.querySelectorAll('svg')
			expect(spinners).toHaveLength(3)

			expect(screen.getByText('Loading...')).toBeInTheDocument()
			expect(screen.getByText('Error occurred')).toBeInTheDocument()
		})

		it('maintains styling consistency across different configurations', () => {
			const { rerender } = render(<Spinner size="sm" color="primary" />)

			let spinner = document.querySelector('svg')
			expect(spinner).toHaveClass('animate-spin', 'h-6', 'w-6', 'text-primary')

			rerender(<Spinner size="lg" color="warning" />)

			spinner = document.querySelector('svg')
			expect(spinner).toHaveClass('animate-spin', 'h-10', 'w-10', 'text-yellow-700')
		})
	})

	describe('Performance', () => {
		it('renders efficiently with minimal DOM nodes', () => {
			render(<Spinner />)

			const container = document.querySelector('.flex.flex-col')
			expect(container?.children).toHaveLength(1) // Only the spinner icon
		})

		it('renders efficiently with label', () => {
			render(<Spinner label="Loading..." />)

			const container = document.querySelector('.flex.flex-col')
			expect(container?.children).toHaveLength(2) // Spinner icon + label
		})
	})
})
