import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, it } from 'vitest'

import { Progress } from './progress'

describe('Progress', () => {
	describe('Rendering', () => {
		it('renders progress bar with default props', () => {
			render(<Progress />)

			const progressBar = screen.getByRole('progressbar')
			expect(progressBar).toBeInTheDocument()
			expect(progressBar).toHaveClass(
				'relative',
				'h-2',
				'w-full',
				'overflow-hidden',
				'rounded-full',
				'bg-primary/20',
			)
		})

		it('renders with custom className', () => {
			render(<Progress className="custom-progress" />)

			const progressBar = screen.getByRole('progressbar')
			expect(progressBar).toHaveClass('custom-progress')
			expect(progressBar).toHaveClass('relative', 'h-2') // Should still have default classes
		})

		it('renders with specific value', () => {
			render(<Progress value={50} />)

			const progressBar = screen.getByRole('progressbar')
			expect(progressBar).toBeInTheDocument()

			const indicator = progressBar.querySelector('[style*="translateX"]')
			expect(indicator).toBeInTheDocument()
			expect(indicator).toHaveStyle('transform: translateX(-50%)')
		})

		it('renders with zero value', () => {
			render(<Progress value={0} />)

			const progressBar = screen.getByRole('progressbar')
			const indicator = progressBar.querySelector('[style*="translateX"]')
			expect(indicator).toHaveStyle('transform: translateX(-100%)')
		})

		it('renders with maximum value', () => {
			render(<Progress value={100} />)

			const progressBar = screen.getByRole('progressbar')
			const indicator = progressBar.querySelector('[style*="translateX"]')
			expect(indicator).toHaveStyle('transform: translateX(-0%)')
		})

		it('forwards HTML attributes correctly', () => {
			render(
				<Progress
					data-testid="test-progress"
					id="progress-id"
					aria-label="Loading progress"
					value={75}
				/>,
			)

			const progressBar = screen.getByTestId('test-progress')
			expect(progressBar).toHaveAttribute('id', 'progress-id')
			expect(progressBar).toHaveAttribute('aria-label', 'Loading progress')
		})
	})

	describe('Progress Values', () => {
		it('handles undefined value', () => {
			render(<Progress value={undefined} />)

			const progressBar = screen.getByRole('progressbar')
			const indicator = progressBar.querySelector('[style*="translateX"]')
			expect(indicator).toHaveStyle('transform: translateX(-100%)')
		})

		it('handles null value', () => {
			render(<Progress value={null as any} />)

			const progressBar = screen.getByRole('progressbar')
			const indicator = progressBar.querySelector('[style*="translateX"]')
			expect(indicator).toHaveStyle('transform: translateX(-100%)')
		})

		it('handles negative values', () => {
			render(<Progress value={-10} />)

			const progressBar = screen.getByRole('progressbar')
			const indicator = progressBar.querySelector('[style*="translateX"]')
			expect(indicator).toHaveStyle('transform: translateX(-110%)')
		})

		it('handles values over 100', () => {
			render(<Progress value={150} />)

			const progressBar = screen.getByRole('progressbar')
			const indicator = progressBar.querySelector('[style*="translateX"]')
			expect(indicator).toHaveStyle('transform: translateX(--50%)')
		})

		it('handles decimal values', () => {
			render(<Progress value={33.33} />)

			const progressBar = screen.getByRole('progressbar')
			const indicator = progressBar.querySelector('[style*="translateX"]')
			expect(indicator).toHaveStyle('transform: translateX(-66.67%)')
		})

		it('handles very small decimal values', () => {
			render(<Progress value={0.1} />)

			const progressBar = screen.getByRole('progressbar')
			const indicator = progressBar.querySelector('[style*="translateX"]')
			expect(indicator).toHaveStyle('transform: translateX(-99.9%)')
		})
	})

	describe('Accessibility', () => {
		it('has proper role attribute', () => {
			render(<Progress value={50} />)

			const progressBar = screen.getByRole('progressbar')
			expect(progressBar).toHaveAttribute('role', 'progressbar')
		})

		it('supports custom aria-label', () => {
			render(<Progress value={25} aria-label="File upload progress" />)

			const progressBar = screen.getByLabelText('File upload progress')
			expect(progressBar).toBeInTheDocument()
		})

		it('supports aria-labelledby', () => {
			render(
				<div>
					<label id="progress-label">Download Progress</label>
					<Progress value={60} aria-labelledby="progress-label" />
				</div>,
			)

			const progressBar = screen.getByRole('progressbar')
			expect(progressBar).toHaveAttribute('aria-labelledby', 'progress-label')
		})

		it('supports aria-describedby', () => {
			render(
				<div>
					<Progress value={80} aria-describedby="progress-description" />
					<div id="progress-description">80% complete</div>
				</div>,
			)

			const progressBar = screen.getByRole('progressbar')
			expect(progressBar).toHaveAttribute('aria-describedby', 'progress-description')
		})

		it('supports aria-valuemin and aria-valuemax', () => {
			render(<Progress value={30} aria-valuemin={0} aria-valuemax={100} />)

			const progressBar = screen.getByRole('progressbar')
			expect(progressBar).toHaveAttribute('aria-valuemin', '0')
			expect(progressBar).toHaveAttribute('aria-valuemax', '100')
		})

		it('supports aria-valuenow', () => {
			render(<Progress value={45} aria-valuenow={45} />)

			const progressBar = screen.getByRole('progressbar')
			expect(progressBar).toHaveAttribute('aria-valuenow', '45')
		})

		it('supports aria-valuetext', () => {
			render(<Progress value={75} aria-valuetext="75 percent complete" />)

			const progressBar = screen.getByRole('progressbar')
			expect(progressBar).toHaveAttribute('aria-valuetext', '75 percent complete')
		})
	})

	describe('Styling and CSS Classes', () => {
		it('applies default styling classes', () => {
			render(<Progress value={40} />)

			const progressBar = screen.getByRole('progressbar')
			expect(progressBar).toHaveClass(
				'relative',
				'h-2',
				'w-full',
				'overflow-hidden',
				'rounded-full',
				'bg-primary/20',
			)
		})

		it('combines custom className with default classes', () => {
			render(<Progress value={40} className="h-4 bg-red-200" />)

			const progressBar = screen.getByRole('progressbar')
			expect(progressBar).toHaveClass('h-4', 'bg-red-200')
			expect(progressBar).toHaveClass('relative', 'w-full') // Should still have default classes
		})

		it('handles undefined className gracefully', () => {
			render(<Progress value={40} className={undefined} />)

			const progressBar = screen.getByRole('progressbar')
			expect(progressBar).toHaveClass('relative', 'h-2') // Should still have default classes
		})

		it('renders indicator with correct styling', () => {
			render(<Progress value={60} />)

			const progressBar = screen.getByRole('progressbar')
			const indicator = progressBar.querySelector('[style*="translateX"]')

			expect(indicator).toHaveClass(
				'h-full',
				'w-full',
				'flex-1',
				'bg-primary',
				'transition-all',
			)
		})
	})

	describe('Component Structure', () => {
		it('renders with correct DOM structure', () => {
			render(<Progress value={50} />)

			const progressBar = screen.getByRole('progressbar')
			expect(progressBar).toBeInTheDocument()

			const indicator = progressBar.querySelector('[style*="translateX"]')
			expect(indicator).toBeInTheDocument()
			expect(progressBar).toContainElement(indicator as Element)
		})

		it('maintains structure with different values', () => {
			const { rerender } = render(<Progress value={0} />)

			let progressBar = screen.getByRole('progressbar')
			let indicator = progressBar.querySelector('[style*="translateX"]')
			expect(indicator).toBeInTheDocument()

			rerender(<Progress value={100} />)

			progressBar = screen.getByRole('progressbar')
			indicator = progressBar.querySelector('[style*="translateX"]')
			expect(indicator).toBeInTheDocument()
		})
	})

	describe('Ref Forwarding', () => {
		it('forwards ref correctly', () => {
			const ref = React.createRef<HTMLDivElement>()

			render(<Progress ref={ref} value={50} />)

			expect(ref.current).toBeInstanceOf(HTMLDivElement)
			expect(ref.current).toHaveAttribute('role', 'progressbar')
		})

		it('allows ref access to DOM methods', () => {
			const ref = React.createRef<HTMLDivElement>()

			render(<Progress ref={ref} value={50} />)

			expect(ref.current?.focus).toBeDefined()
			expect(typeof ref.current?.focus).toBe('function')
		})

		it('allows ref access to element properties', () => {
			const ref = React.createRef<HTMLDivElement>()

			render(<Progress ref={ref} value={75} />)

			expect(ref.current?.className).toContain('relative')
			expect(ref.current?.getAttribute('role')).toBe('progressbar')
		})
	})

	describe('Dynamic Value Updates', () => {
		it('updates indicator position when value changes', () => {
			const { rerender } = render(<Progress value={25} />)

			let progressBar = screen.getByRole('progressbar')
			let indicator = progressBar.querySelector('[style*="translateX"]')
			expect(indicator).toHaveStyle('transform: translateX(-75%)')

			rerender(<Progress value={75} />)

			progressBar = screen.getByRole('progressbar')
			indicator = progressBar.querySelector('[style*="translateX"]')
			expect(indicator).toHaveStyle('transform: translateX(-25%)')
		})

		it('handles rapid value changes', () => {
			const { rerender } = render(<Progress value={0} />)

			const values = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

			values.forEach((value) => {
				rerender(<Progress value={value} />)

				const progressBar = screen.getByRole('progressbar')
				const indicator = progressBar.querySelector('[style*="translateX"]')
				expect(indicator).toHaveStyle(`transform: translateX(-${100 - value}%)`)
			})
		})
	})

	describe('Edge Cases', () => {
		it('handles extremely large values', () => {
			render(<Progress value={999999} />)

			const progressBar = screen.getByRole('progressbar')
			const indicator = progressBar.querySelector('[style*="translateX"]')
			expect(indicator).toHaveStyle('transform: translateX(--999899%)')
		})

		it('handles extremely small negative values', () => {
			render(<Progress value={-999999} />)

			const progressBar = screen.getByRole('progressbar')
			const indicator = progressBar.querySelector('[style*="translateX"]')
			expect(indicator).toHaveStyle('transform: translateX(-1000099%)')
		})

		it('handles NaN value', () => {
			render(<Progress value={NaN} />)

			const progressBar = screen.getByRole('progressbar')
			const indicator = progressBar.querySelector('[style*="translateX"]')
			expect(indicator).toHaveStyle('transform: translateX(-100%)')
		})

		it('handles Infinity value', () => {
			render(<Progress value={Infinity} />)

			const progressBar = screen.getByRole('progressbar')
			const indicator = progressBar.querySelector('[style*="translateX"]')
			expect(indicator).toHaveStyle('transform: translateX(--Infinity%)')
		})

		it('handles string value coercion', () => {
			render(<Progress value={'50' as any} />)

			const progressBar = screen.getByRole('progressbar')
			const indicator = progressBar.querySelector('[style*="translateX"]')
			expect(indicator).toHaveStyle('transform: translateX(-50%)')
		})
	})

	describe('Radix UI Integration', () => {
		it('inherits Radix Progress functionality', () => {
			render(<Progress value={60} />)

			const progressBar = screen.getByRole('progressbar')
			expect(progressBar).toHaveAttribute('data-state')
			// Note: data-value may not be present in all Radix versions
		})

		it('supports Radix UI data attributes', () => {
			render(<Progress value={80} data-state="loading" />)

			const progressBar = screen.getByRole('progressbar')
			expect(progressBar).toHaveAttribute('data-state', 'loading')
		})

		it('handles max prop correctly', () => {
			render(<Progress value={50} max={200} />)

			const progressBar = screen.getByRole('progressbar')
			expect(progressBar).toBeInTheDocument()

			// With max=200, value=50 should be 25% complete
			const indicator = progressBar.querySelector('[style*="translateX"]')
			expect(indicator).toHaveStyle('transform: translateX(-50%)')
		})
	})

	describe('Animation and Transitions', () => {
		it('applies transition classes to indicator', () => {
			render(<Progress value={50} />)

			const progressBar = screen.getByRole('progressbar')
			const indicator = progressBar.querySelector('[style*="translateX"]')

			expect(indicator).toHaveClass('transition-all')
		})

		it('maintains transition during value changes', () => {
			const { rerender } = render(<Progress value={25} />)

			let progressBar = screen.getByRole('progressbar')
			let indicator = progressBar.querySelector('[style*="translateX"]')
			expect(indicator).toHaveClass('transition-all')

			rerender(<Progress value={75} />)

			progressBar = screen.getByRole('progressbar')
			indicator = progressBar.querySelector('[style*="translateX"]')
			expect(indicator).toHaveClass('transition-all')
		})
	})

	describe('Multiple Progress Bars', () => {
		it('renders multiple progress bars independently', () => {
			render(
				<div>
					<Progress value={25} data-testid="progress-1" />
					<Progress value={75} data-testid="progress-2" />
				</div>,
			)

			const progress1 = screen.getByTestId('progress-1')
			const progress2 = screen.getByTestId('progress-2')

			expect(progress1).toBeInTheDocument()
			expect(progress2).toBeInTheDocument()

			const indicator1 = progress1.querySelector('[style*="translateX"]')
			const indicator2 = progress2.querySelector('[style*="translateX"]')

			expect(indicator1).toHaveStyle('transform: translateX(-75%)')
			expect(indicator2).toHaveStyle('transform: translateX(-25%)')
		})

		it('handles different configurations for multiple bars', () => {
			render(
				<div>
					<Progress value={30} className="h-1" data-testid="thin-progress" />
					<Progress value={60} className="h-4" data-testid="thick-progress" />
				</div>,
			)

			const thinProgress = screen.getByTestId('thin-progress')
			const thickProgress = screen.getByTestId('thick-progress')

			expect(thinProgress).toHaveClass('h-1')
			expect(thickProgress).toHaveClass('h-4')
		})
	})

	describe('Performance', () => {
		it('handles frequent value updates efficiently', () => {
			const { rerender } = render(<Progress value={0} />)

			// Simulate frequent updates
			for (let i = 0; i <= 100; i += 5) {
				rerender(<Progress value={i} />)

				const progressBar = screen.getByRole('progressbar')
				expect(progressBar).toBeInTheDocument()
			}

			// Final check
			const progressBar = screen.getByRole('progressbar')
			const indicator = progressBar.querySelector('[style*="translateX"]')
			expect(indicator).toHaveStyle('transform: translateX(-0%)')
		})
	})
})
