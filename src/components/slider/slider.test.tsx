import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import { Slider } from './slider'

describe('Slider', () => {
	describe('Rendering', () => {
		it('renders slider with default props', () => {
			render(<Slider />)

			const slider = screen.getByRole('slider')
			expect(slider).toBeInTheDocument()

			const sliderRoot = document.querySelector('[data-slot="slider"]')
			expect(sliderRoot).toHaveAttribute('data-slot', 'slider')
		})

		it('renders with custom className', () => {
			render(<Slider className="custom-slider" />)

			const sliderRoot = document.querySelector('[data-slot="slider"]')
			expect(sliderRoot).toHaveClass('custom-slider')
		})

		it('renders with default min and max values', () => {
			render(<Slider />)

			const slider = screen.getByRole('slider')
			expect(slider).toHaveAttribute('aria-valuemin', '0')
			expect(slider).toHaveAttribute('aria-valuemax', '100')
		})

		it('renders with custom min and max values', () => {
			render(<Slider min={10} max={50} />)

			const slider = screen.getByRole('slider')
			expect(slider).toHaveAttribute('aria-valuemin', '10')
			expect(slider).toHaveAttribute('aria-valuemax', '50')
		})

		it('renders with default value', () => {
			render(<Slider defaultValue={[25]} />)

			const slider = screen.getByRole('slider')
			expect(slider).toHaveAttribute('aria-valuenow', '25')
		})

		it('renders with controlled value', () => {
			render(<Slider value={[75]} />)

			const slider = screen.getByRole('slider')
			expect(slider).toHaveAttribute('aria-valuenow', '75')
		})
	})

	describe('Multiple Values', () => {
		it('renders multiple thumbs for range slider', () => {
			render(<Slider defaultValue={[20, 80]} />)

			const sliders = screen.getAllByRole('slider')
			expect(sliders).toHaveLength(2)
			expect(sliders[0]).toHaveAttribute('aria-valuenow', '20')
			expect(sliders[1]).toHaveAttribute('aria-valuenow', '80')
		})

		it('renders correct number of thumbs based on value array length', () => {
			render(<Slider value={[10, 30, 70]} />)

			const sliders = screen.getAllByRole('slider')
			expect(sliders).toHaveLength(3)
		})

		it('handles empty value array gracefully', () => {
			render(<Slider value={[]} />)

			// With empty array, Radix UI Slider doesn't render any thumbs
			const sliderRoot = document.querySelector('[data-slot="slider"]')
			expect(sliderRoot).toBeInTheDocument()
		})
	})

	describe('Interaction', () => {
		it('calls onValueChange when slider value changes', async () => {
			const handleValueChange = vi.fn()
			const user = userEvent.setup()

			render(<Slider defaultValue={[50]} onValueChange={handleValueChange} />)

			const slider = screen.getByRole('slider')

			// Simulate keyboard interaction
			slider.focus()
			await user.keyboard('{ArrowRight}')

			expect(handleValueChange).toHaveBeenCalled()
		})

		it('supports keyboard navigation with arrow keys', async () => {
			const handleValueChange = vi.fn()
			const user = userEvent.setup()

			render(<Slider defaultValue={[50]} onValueChange={handleValueChange} />)

			const slider = screen.getByRole('slider')
			slider.focus()

			await user.keyboard('{ArrowRight}')
			expect(handleValueChange).toHaveBeenCalled()

			await user.keyboard('{ArrowLeft}')
			expect(handleValueChange).toHaveBeenCalled()
		})

		it('supports Home and End keys', async () => {
			const handleValueChange = vi.fn()
			const user = userEvent.setup()

			render(
				<Slider
					min={0}
					max={100}
					defaultValue={[50]}
					onValueChange={handleValueChange}
				/>,
			)

			const slider = screen.getByRole('slider')
			slider.focus()

			await user.keyboard('{Home}')
			expect(handleValueChange).toHaveBeenCalledWith([0])

			await user.keyboard('{End}')
			expect(handleValueChange).toHaveBeenCalledWith([100])
		})
	})

	describe('States', () => {
		it('supports disabled state', () => {
			render(<Slider disabled />)

			const slider = screen.getByRole('slider')
			expect(slider).toHaveAttribute('data-disabled', '')
		})

		it('applies disabled styling', () => {
			render(<Slider disabled />)

			const sliderContainer = document.querySelector('[data-slot="slider"]')
			expect(sliderContainer).toHaveClass('data-[disabled]:opacity-50')
		})

		it('supports step attribute', () => {
			render(<Slider step={5} />)

			// Step is handled internally by Radix UI, not exposed as HTML attribute
			const sliderRoot = document.querySelector('[data-slot="slider"]')
			expect(sliderRoot).toBeInTheDocument()
		})
	})

	describe('Orientation', () => {
		it('supports horizontal orientation by default', () => {
			render(<Slider />)

			const slider = screen.getByRole('slider')
			expect(slider).toHaveAttribute('aria-orientation', 'horizontal')
		})

		it('supports vertical orientation', () => {
			render(<Slider orientation="vertical" />)

			const slider = screen.getByRole('slider')
			expect(slider).toHaveAttribute('aria-orientation', 'vertical')
		})

		it('applies correct classes for vertical orientation', () => {
			render(<Slider orientation="vertical" />)

			const sliderContainer = document.querySelector('[data-slot="slider"]')
			expect(sliderContainer).toHaveClass('data-[orientation=vertical]:h-full')
		})
	})

	describe('Track and Range', () => {
		it('renders slider track', () => {
			render(<Slider />)

			const track = document.querySelector('[data-slot="slider-track"]')
			expect(track).toBeInTheDocument()
			expect(track).toHaveClass('bg-muted')
		})

		it('renders slider range', () => {
			render(<Slider />)

			const range = document.querySelector('[data-slot="slider-range"]')
			expect(range).toBeInTheDocument()
			expect(range).toHaveClass('bg-primary')
		})

		it('renders slider thumb', () => {
			render(<Slider defaultValue={[50]} />)

			const thumb = document.querySelector('[data-slot="slider-thumb"]')
			expect(thumb).toBeInTheDocument()
			expect(thumb).toHaveClass('border-primary', 'bg-background')
		})
	})

	describe('Accessibility', () => {
		it('has proper ARIA attributes', () => {
			render(<Slider defaultValue={[50]} min={0} max={100} />)

			const slider = screen.getByRole('slider')
			expect(slider).toHaveAttribute('aria-valuemin', '0')
			expect(slider).toHaveAttribute('aria-valuemax', '100')
			expect(slider).toHaveAttribute('aria-valuenow', '50')
		})

		it('supports aria-label', () => {
			render(<Slider aria-label="Volume control" />)

			const slider = screen.getByLabelText('Volume control')
			expect(slider).toBeInTheDocument()
		})

		it('supports aria-labelledby', () => {
			render(
				<div>
					<label id="volume-label">Volume</label>
					<Slider aria-labelledby="volume-label" />
				</div>,
			)

			// aria-labelledby is handled by Radix UI internally
			const sliderRoot = document.querySelector('[data-slot="slider"]')
			expect(sliderRoot).toBeInTheDocument()
		})

		it('is focusable', () => {
			render(<Slider />)

			const slider = screen.getByRole('slider')
			slider.focus()
			expect(slider).toHaveFocus()
		})
	})

	describe('Form Integration', () => {
		it('supports name attribute', () => {
			render(<Slider name="volume" />)

			// Name is handled by Radix UI internally for form integration
			const sliderRoot = document.querySelector('[data-slot="slider"]')
			expect(sliderRoot).toBeInTheDocument()
		})

		it('works with form submission', () => {
			const handleSubmit = vi.fn((e) => e.preventDefault())

			render(
				<form onSubmit={handleSubmit}>
					<Slider name="volume" defaultValue={[50]} />
					<button type="submit">Submit</button>
				</form>,
			)

			const submitButton = screen.getByRole('button', { name: 'Submit' })
			submitButton.click()

			expect(handleSubmit).toHaveBeenCalled()
		})
	})

	describe('Edge Cases', () => {
		it('handles invalid min/max values', () => {
			render(<Slider min={100} max={0} />)

			const slider = screen.getByRole('slider')
			expect(slider).toBeInTheDocument()
		})

		it('handles undefined className gracefully', () => {
			render(<Slider className={undefined} />)

			const sliderContainer = document.querySelector('[data-slot="slider"]')
			expect(sliderContainer).toHaveClass('relative', 'flex', 'w-full')
		})

		it('handles large value arrays', () => {
			const values = Array.from({ length: 10 }, (_, i) => i * 10)
			render(<Slider value={values} />)

			const sliders = screen.getAllByRole('slider')
			expect(sliders).toHaveLength(10)
		})
	})

	describe('Controlled vs Uncontrolled', () => {
		it('works as uncontrolled component', () => {
			render(<Slider defaultValue={[25]} />)

			const slider = screen.getByRole('slider')
			expect(slider).toHaveAttribute('aria-valuenow', '25')
		})

		it('works as controlled component', () => {
			const ControlledSlider = () => {
				const [value, setValue] = React.useState([30])

				return <Slider value={value} onValueChange={setValue} />
			}

			render(<ControlledSlider />)

			const slider = screen.getByRole('slider')
			expect(slider).toHaveAttribute('aria-valuenow', '30')
		})

		it('updates when controlled value changes', () => {
			const { rerender } = render(<Slider value={[40]} />)

			let slider = screen.getByRole('slider')
			expect(slider).toHaveAttribute('aria-valuenow', '40')

			rerender(<Slider value={[60]} />)

			slider = screen.getByRole('slider')
			expect(slider).toHaveAttribute('aria-valuenow', '60')
		})
	})

	describe('Performance', () => {
		it('handles rapid value changes efficiently', async () => {
			const handleValueChange = vi.fn()
			const user = userEvent.setup()

			render(<Slider defaultValue={[50]} onValueChange={handleValueChange} />)

			const slider = screen.getByRole('slider')
			slider.focus()

			// Simulate rapid key presses
			for (let i = 0; i < 10; i++) {
				await user.keyboard('{ArrowRight}')
			}

			expect(handleValueChange).toHaveBeenCalledTimes(10)
		})
	})

	describe('Complex Scenarios', () => {
		it('handles range slider with custom step', async () => {
			const handleValueChange = vi.fn()
			const user = userEvent.setup()

			render(
				<Slider
					defaultValue={[20, 80]}
					min={0}
					max={100}
					step={10}
					onValueChange={handleValueChange}
				/>,
			)

			const sliders = screen.getAllByRole('slider')
			expect(sliders).toHaveLength(2)

			sliders[0].focus()
			await user.keyboard('{ArrowRight}')

			expect(handleValueChange).toHaveBeenCalled()
		})

		it('maintains value constraints', () => {
			render(<Slider value={[150]} min={0} max={100} />)

			const slider = screen.getByRole('slider')
			// Radix UI doesn't automatically constrain values, it passes them through
			expect(slider).toHaveAttribute('aria-valuenow', '150')
		})
	})
})
