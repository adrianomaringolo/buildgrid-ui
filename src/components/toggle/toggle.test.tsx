import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import { Toggle } from './toggle'

describe('Toggle', () => {
	describe('Rendering', () => {
		it('renders toggle with default props', () => {
			render(<Toggle>Toggle</Toggle>)

			const toggle = screen.getByRole('button')
			expect(toggle).toBeInTheDocument()
			expect(toggle).toHaveTextContent('Toggle')
		})

		it('renders with custom className', () => {
			render(<Toggle className="custom-toggle">Toggle</Toggle>)

			const toggle = screen.getByRole('button')
			expect(toggle).toHaveClass('custom-toggle')
		})

		it('applies default styling classes', () => {
			render(<Toggle>Toggle</Toggle>)

			const toggle = screen.getByRole('button')
			expect(toggle).toHaveClass(
				'inline-flex',
				'items-center',
				'justify-center',
				'gap-2',
				'rounded-md',
				'text-sm',
				'font-medium',
				'transition-colors',
			)
		})

		it('applies hover and focus styling', () => {
			render(<Toggle>Toggle</Toggle>)

			const toggle = screen.getByRole('button')
			expect(toggle).toHaveClass(
				'hover:bg-muted',
				'hover:text-muted-foreground',
				'focus-visible:outline-none',
				'focus-visible:ring-1',
				'focus-visible:ring-ring',
			)
		})

		it('applies disabled styling', () => {
			render(<Toggle disabled>Toggle</Toggle>)

			const toggle = screen.getByRole('button')
			expect(toggle).toHaveClass('disabled:pointer-events-none', 'disabled:opacity-50')
		})

		it('applies pressed state styling', () => {
			render(<Toggle pressed>Toggle</Toggle>)

			const toggle = screen.getByRole('button')
			expect(toggle).toHaveClass(
				'data-[state=on]:bg-accent',
				'data-[state=on]:text-accent-foreground',
			)
		})
	})

	describe('Variants', () => {
		it('renders with default variant', () => {
			render(<Toggle>Toggle</Toggle>)

			const toggle = screen.getByRole('button')
			expect(toggle).toHaveClass('bg-transparent')
		})

		it('renders with outline variant', () => {
			render(<Toggle variant="outline">Toggle</Toggle>)

			const toggle = screen.getByRole('button')
			expect(toggle).toHaveClass(
				'border',
				'border-input',
				'bg-transparent',
				'shadow-sm',
				'hover:bg-accent',
				'hover:text-accent-foreground',
			)
		})
	})

	describe('Sizes', () => {
		it('renders with default size', () => {
			render(<Toggle>Toggle</Toggle>)

			const toggle = screen.getByRole('button')
			expect(toggle).toHaveClass('h-9', 'px-2', 'min-w-9')
		})

		it('renders with small size', () => {
			render(<Toggle size="sm">Toggle</Toggle>)

			const toggle = screen.getByRole('button')
			expect(toggle).toHaveClass('h-8', 'px-1.5', 'min-w-8')
		})

		it('renders with large size', () => {
			render(<Toggle size="lg">Toggle</Toggle>)

			const toggle = screen.getByRole('button')
			expect(toggle).toHaveClass('h-10', 'px-2.5', 'min-w-10')
		})
	})

	describe('States', () => {
		it('renders unpressed by default', () => {
			render(<Toggle>Toggle</Toggle>)

			const toggle = screen.getByRole('button')
			expect(toggle).toHaveAttribute('data-state', 'off')
			expect(toggle).toHaveAttribute('aria-pressed', 'false')
		})

		it('renders pressed when pressed prop is true', () => {
			render(<Toggle pressed>Toggle</Toggle>)

			const toggle = screen.getByRole('button')
			expect(toggle).toHaveAttribute('data-state', 'on')
			expect(toggle).toHaveAttribute('aria-pressed', 'true')
		})

		it('renders pressed when defaultPressed is true', () => {
			render(<Toggle defaultPressed>Toggle</Toggle>)

			const toggle = screen.getByRole('button')
			expect(toggle).toHaveAttribute('data-state', 'on')
			expect(toggle).toHaveAttribute('aria-pressed', 'true')
		})

		it('supports disabled state', () => {
			render(<Toggle disabled>Toggle</Toggle>)

			const toggle = screen.getByRole('button')
			expect(toggle).toBeDisabled()
			expect(toggle).toHaveAttribute('data-disabled')
		})
	})

	describe('Interaction', () => {
		it('toggles when clicked', async () => {
			const user = userEvent.setup()

			render(<Toggle>Toggle</Toggle>)

			const toggle = screen.getByRole('button')
			expect(toggle).toHaveAttribute('aria-pressed', 'false')

			await user.click(toggle)
			expect(toggle).toHaveAttribute('aria-pressed', 'true')

			await user.click(toggle)
			expect(toggle).toHaveAttribute('aria-pressed', 'false')
		})

		it('calls onPressedChange when toggled', async () => {
			const onPressedChange = vi.fn()
			const user = userEvent.setup()

			render(<Toggle onPressedChange={onPressedChange}>Toggle</Toggle>)

			const toggle = screen.getByRole('button')
			await user.click(toggle)

			expect(onPressedChange).toHaveBeenCalledWith(true)

			await user.click(toggle)
			expect(onPressedChange).toHaveBeenCalledWith(false)
		})

		it('calls onPressedChange with correct values', async () => {
			const onPressedChange = vi.fn()
			const user = userEvent.setup()

			render(<Toggle onPressedChange={onPressedChange}>Toggle</Toggle>)

			const toggle = screen.getByRole('button')

			await user.click(toggle)
			expect(onPressedChange).toHaveBeenLastCalledWith(true)

			await user.click(toggle)
			expect(onPressedChange).toHaveBeenLastCalledWith(false)

			expect(onPressedChange).toHaveBeenCalledTimes(2)
		})

		it('does not toggle when disabled', async () => {
			const onPressedChange = vi.fn()
			const user = userEvent.setup()

			render(
				<Toggle disabled onPressedChange={onPressedChange}>
					Toggle
				</Toggle>,
			)

			const toggle = screen.getByRole('button')
			await user.click(toggle)

			expect(onPressedChange).not.toHaveBeenCalled()
			expect(toggle).toHaveAttribute('aria-pressed', 'false')
		})
	})

	describe('Keyboard Navigation', () => {
		it('toggles with Space key', async () => {
			const user = userEvent.setup()

			render(<Toggle>Toggle</Toggle>)

			const toggle = screen.getByRole('button')
			toggle.focus()

			await user.keyboard(' ')
			expect(toggle).toHaveAttribute('aria-pressed', 'true')

			await user.keyboard(' ')
			expect(toggle).toHaveAttribute('aria-pressed', 'false')
		})

		it('toggles with Enter key', async () => {
			const user = userEvent.setup()

			render(<Toggle>Toggle</Toggle>)

			const toggle = screen.getByRole('button')
			toggle.focus()

			await user.keyboard('{Enter}')
			expect(toggle).toHaveAttribute('aria-pressed', 'true')

			await user.keyboard('{Enter}')
			expect(toggle).toHaveAttribute('aria-pressed', 'false')
		})

		it('calls onPressedChange with keyboard interaction', async () => {
			const onPressedChange = vi.fn()
			const user = userEvent.setup()

			render(<Toggle onPressedChange={onPressedChange}>Toggle</Toggle>)

			const toggle = screen.getByRole('button')
			toggle.focus()

			await user.keyboard(' ')
			expect(onPressedChange).toHaveBeenCalledWith(true)
		})

		it('does not respond to keyboard when disabled', async () => {
			const onPressedChange = vi.fn()
			const user = userEvent.setup()

			render(
				<Toggle disabled onPressedChange={onPressedChange}>
					Toggle
				</Toggle>,
			)

			const toggle = screen.getByRole('button')
			toggle.focus()

			await user.keyboard(' ')
			expect(onPressedChange).not.toHaveBeenCalled()
		})
	})

	describe('Focus Management', () => {
		it('is focusable', async () => {
			const user = userEvent.setup()

			render(<Toggle>Toggle</Toggle>)

			const toggle = screen.getByRole('button')
			await user.tab()

			expect(toggle).toHaveFocus()
		})

		it('shows focus ring when focused', async () => {
			const user = userEvent.setup()

			render(<Toggle>Toggle</Toggle>)

			const toggle = screen.getByRole('button')
			await user.tab()

			expect(toggle).toHaveClass('focus-visible:ring-1')
		})

		it('is not focusable when disabled', () => {
			render(<Toggle disabled>Toggle</Toggle>)

			const toggle = screen.getByRole('button')
			expect(toggle).toBeDisabled()
		})
	})

	describe('Accessibility', () => {
		it('has proper ARIA attributes', () => {
			render(<Toggle>Toggle</Toggle>)

			const toggle = screen.getByRole('button')
			expect(toggle).toHaveAttribute('type', 'button')
			expect(toggle).toHaveAttribute('aria-pressed', 'false')
			expect(toggle).toHaveAttribute('data-state', 'off')
		})

		it('updates aria-pressed when state changes', async () => {
			const user = userEvent.setup()

			render(<Toggle>Toggle</Toggle>)

			const toggle = screen.getByRole('button')
			expect(toggle).toHaveAttribute('aria-pressed', 'false')

			await user.click(toggle)
			expect(toggle).toHaveAttribute('aria-pressed', 'true')
		})

		it('supports aria-label', () => {
			render(<Toggle aria-label="Toggle setting">Toggle</Toggle>)

			const toggle = screen.getByLabelText('Toggle setting')
			expect(toggle).toBeInTheDocument()
		})

		it('supports aria-labelledby', () => {
			render(
				<div>
					<div id="toggle-label">Toggle Setting</div>
					<Toggle aria-labelledby="toggle-label">Toggle</Toggle>
				</div>,
			)

			const toggle = screen.getByRole('button')
			expect(toggle).toHaveAttribute('aria-labelledby', 'toggle-label')
		})

		it('supports aria-describedby', () => {
			render(
				<div>
					<Toggle aria-describedby="toggle-help">Toggle</Toggle>
					<div id="toggle-help">Help text for toggle</div>
				</div>,
			)

			const toggle = screen.getByRole('button')
			expect(toggle).toHaveAttribute('aria-describedby', 'toggle-help')
		})
	})

	describe('Content', () => {
		it('renders text content', () => {
			render(<Toggle>Toggle Text</Toggle>)

			const toggle = screen.getByRole('button')
			expect(toggle).toHaveTextContent('Toggle Text')
		})

		it('renders React node content', () => {
			render(
				<Toggle>
					<span>Toggle</span> <strong>Content</strong>
				</Toggle>,
			)

			const toggle = screen.getByRole('button')
			expect(toggle).toHaveTextContent('Toggle Content')
		})

		it('renders with icon', () => {
			render(
				<Toggle>
					<svg data-testid="toggle-icon" />
					Toggle
				</Toggle>,
			)

			const toggle = screen.getByRole('button')
			const icon = screen.getByTestId('toggle-icon')
			expect(toggle).toContainElement(icon)
		})

		it('applies icon styling', () => {
			render(<Toggle>Toggle</Toggle>)

			const toggle = screen.getByRole('button')
			expect(toggle).toHaveClass(
				'[&_svg]:pointer-events-none',
				'[&_svg]:size-4',
				'[&_svg]:shrink-0',
			)
		})
	})

	describe('Controlled vs Uncontrolled', () => {
		it('works as uncontrolled component', async () => {
			const user = userEvent.setup()

			render(<Toggle defaultPressed={false}>Toggle</Toggle>)

			const toggle = screen.getByRole('button')
			expect(toggle).toHaveAttribute('aria-pressed', 'false')

			await user.click(toggle)
			expect(toggle).toHaveAttribute('aria-pressed', 'true')
		})

		it('works as controlled component', async () => {
			const ControlledToggle = () => {
				const [pressed, setPressed] = React.useState(false)

				return (
					<Toggle pressed={pressed} onPressedChange={setPressed}>
						Toggle
					</Toggle>
				)
			}

			const user = userEvent.setup()
			render(<ControlledToggle />)

			const toggle = screen.getByRole('button')
			expect(toggle).toHaveAttribute('aria-pressed', 'false')

			await user.click(toggle)
			expect(toggle).toHaveAttribute('aria-pressed', 'true')
		})

		it('updates when controlled value changes', () => {
			const { rerender } = render(<Toggle pressed={false}>Toggle</Toggle>)

			let toggle = screen.getByRole('button')
			expect(toggle).toHaveAttribute('aria-pressed', 'false')

			rerender(<Toggle pressed={true}>Toggle</Toggle>)

			toggle = screen.getByRole('button')
			expect(toggle).toHaveAttribute('aria-pressed', 'true')
		})
	})

	describe('Ref Forwarding', () => {
		it('forwards ref correctly', () => {
			const ref = React.createRef<HTMLButtonElement>()

			render(<Toggle ref={ref}>Toggle</Toggle>)

			expect(ref.current).toBeInstanceOf(HTMLButtonElement)
			expect(ref.current?.tagName).toBe('BUTTON')
		})

		it('allows ref access to focus method', () => {
			const ref = React.createRef<HTMLButtonElement>()

			render(<Toggle ref={ref}>Toggle</Toggle>)

			expect(typeof ref.current?.focus).toBe('function')
			expect(typeof ref.current?.blur).toBe('function')
		})
	})

	describe('Edge Cases', () => {
		it('handles undefined className gracefully', () => {
			render(<Toggle className={undefined}>Toggle</Toggle>)

			const toggle = screen.getByRole('button')
			expect(toggle).toBeInTheDocument()
		})

		it('handles empty children', () => {
			render(<Toggle></Toggle>)

			const toggle = screen.getByRole('button')
			expect(toggle).toBeInTheDocument()
		})

		it('handles rapid toggling', async () => {
			const onPressedChange = vi.fn()
			const user = userEvent.setup()

			render(<Toggle onPressedChange={onPressedChange}>Toggle</Toggle>)

			const toggle = screen.getByRole('button')

			// Rapid clicks
			await user.click(toggle)
			await user.click(toggle)
			await user.click(toggle)
			await user.click(toggle)

			expect(onPressedChange).toHaveBeenCalledTimes(4)
			expect(toggle).toHaveAttribute('aria-pressed', 'false')
		})

		it('maintains state consistency during rapid interactions', async () => {
			const user = userEvent.setup()

			render(<Toggle>Toggle</Toggle>)

			const toggle = screen.getByRole('button')

			// Multiple rapid interactions
			await user.click(toggle)
			expect(toggle).toHaveAttribute('aria-pressed', 'true')

			await user.keyboard(' ')
			expect(toggle).toHaveAttribute('aria-pressed', 'false')

			await user.keyboard('{Enter}')
			expect(toggle).toHaveAttribute('aria-pressed', 'true')
		})
	})

	describe('Complex Scenarios', () => {
		it('works with labels and descriptions', () => {
			render(
				<div>
					<label htmlFor="toggle-1">Toggle Setting</label>
					<Toggle id="toggle-1" aria-describedby="toggle-desc">
						Toggle
					</Toggle>
					<div id="toggle-desc">This toggle controls a setting</div>
				</div>,
			)

			const toggle = screen.getByRole('button')
			expect(toggle).toHaveAttribute('id', 'toggle-1')
			expect(toggle).toHaveAttribute('aria-describedby', 'toggle-desc')
		})

		it('handles multiple toggles independently', async () => {
			const user = userEvent.setup()

			render(
				<div>
					<Toggle>Toggle 1</Toggle>
					<Toggle>Toggle 2</Toggle>
					<Toggle>Toggle 3</Toggle>
				</div>,
			)

			const toggles = screen.getAllByRole('button')
			expect(toggles).toHaveLength(3)

			// Toggle first one
			await user.click(toggles[0])
			expect(toggles[0]).toHaveAttribute('aria-pressed', 'true')
			expect(toggles[1]).toHaveAttribute('aria-pressed', 'false')
			expect(toggles[2]).toHaveAttribute('aria-pressed', 'false')

			// Toggle third one
			await user.click(toggles[2])
			expect(toggles[0]).toHaveAttribute('aria-pressed', 'true')
			expect(toggles[1]).toHaveAttribute('aria-pressed', 'false')
			expect(toggles[2]).toHaveAttribute('aria-pressed', 'true')
		})

		it('combines all variants and sizes correctly', () => {
			const { rerender } = render(
				<Toggle variant="default" size="default">
					Toggle
				</Toggle>,
			)

			let toggle = screen.getByRole('button')
			expect(toggle).toHaveClass('bg-transparent', 'h-9', 'px-2', 'min-w-9')

			rerender(
				<Toggle variant="outline" size="lg">
					Toggle
				</Toggle>,
			)

			toggle = screen.getByRole('button')
			expect(toggle).toHaveClass('border', 'border-input', 'h-10', 'px-2.5', 'min-w-10')
		})
	})
})
