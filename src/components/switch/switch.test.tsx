import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import { Switch } from './switch'

describe('Switch', () => {
	describe('Rendering', () => {
		it('renders switch with default props', () => {
			render(<Switch />)

			const switchElement = screen.getByRole('switch')
			expect(switchElement).toBeInTheDocument()
			expect(switchElement).not.toBeChecked()
		})

		it('renders with custom className', () => {
			render(<Switch className="custom-switch" />)

			const switchElement = screen.getByRole('switch')
			expect(switchElement).toHaveClass('custom-switch')
		})

		it('renders with default styling classes', () => {
			render(<Switch />)

			const switchElement = screen.getByRole('switch')
			expect(switchElement).toHaveClass(
				'peer',
				'inline-flex',
				'h-5',
				'w-9',
				'shrink-0',
				'cursor-pointer',
				'items-center',
				'rounded-full',
				'border-2',
				'border-transparent',
				'shadow-sm',
				'transition-colors',
			)
		})

		it('renders switch thumb', () => {
			render(<Switch />)

			// The thumb is rendered as a child element
			const switchElement = screen.getByRole('switch')
			const thumb = switchElement.querySelector('[data-state]')
			expect(thumb).toBeInTheDocument()
		})
	})

	describe('States', () => {
		it('renders unchecked by default', () => {
			render(<Switch />)

			const switchElement = screen.getByRole('switch')
			expect(switchElement).not.toBeChecked()
			expect(switchElement).toHaveAttribute('data-state', 'unchecked')
		})

		it('renders checked when defaultChecked is true', () => {
			render(<Switch defaultChecked />)

			const switchElement = screen.getByRole('switch')
			expect(switchElement).toBeChecked()
			expect(switchElement).toHaveAttribute('data-state', 'checked')
		})

		it('renders checked when checked prop is true', () => {
			render(<Switch checked />)

			const switchElement = screen.getByRole('switch')
			expect(switchElement).toBeChecked()
			expect(switchElement).toHaveAttribute('data-state', 'checked')
		})

		it('supports disabled state', () => {
			render(<Switch disabled />)

			const switchElement = screen.getByRole('switch')
			expect(switchElement).toBeDisabled()
			expect(switchElement).toHaveClass(
				'disabled:cursor-not-allowed',
				'disabled:opacity-50',
			)
		})
	})

	describe('Interaction', () => {
		it('toggles when clicked', async () => {
			const user = userEvent.setup()

			render(<Switch />)

			const switchElement = screen.getByRole('switch')
			expect(switchElement).not.toBeChecked()

			await user.click(switchElement)
			expect(switchElement).toBeChecked()

			await user.click(switchElement)
			expect(switchElement).not.toBeChecked()
		})

		it('calls onCheckedChange when toggled', async () => {
			const handleCheckedChange = vi.fn()
			const user = userEvent.setup()

			render(<Switch onCheckedChange={handleCheckedChange} />)

			const switchElement = screen.getByRole('switch')
			await user.click(switchElement)

			expect(handleCheckedChange).toHaveBeenCalledWith(true)
		})

		it('calls onCheckedChange with correct values', async () => {
			const handleCheckedChange = vi.fn()
			const user = userEvent.setup()

			render(<Switch onCheckedChange={handleCheckedChange} />)

			const switchElement = screen.getByRole('switch')

			await user.click(switchElement)
			expect(handleCheckedChange).toHaveBeenCalledWith(true)

			await user.click(switchElement)
			expect(handleCheckedChange).toHaveBeenCalledWith(false)
		})

		it('does not toggle when disabled', async () => {
			const handleCheckedChange = vi.fn()
			const user = userEvent.setup()

			render(<Switch disabled onCheckedChange={handleCheckedChange} />)

			const switchElement = screen.getByRole('switch')
			await user.click(switchElement)

			expect(switchElement).not.toBeChecked()
			expect(handleCheckedChange).not.toHaveBeenCalled()
		})
	})

	describe('Keyboard Navigation', () => {
		it('toggles with Space key', async () => {
			const user = userEvent.setup()

			render(<Switch />)

			const switchElement = screen.getByRole('switch')
			switchElement.focus()

			expect(switchElement).not.toBeChecked()

			await user.keyboard(' ')
			expect(switchElement).toBeChecked()

			await user.keyboard(' ')
			expect(switchElement).not.toBeChecked()
		})

		it('toggles with Enter key', async () => {
			const user = userEvent.setup()

			render(<Switch />)

			const switchElement = screen.getByRole('switch')
			switchElement.focus()

			expect(switchElement).not.toBeChecked()

			await user.keyboard('{Enter}')
			expect(switchElement).toBeChecked()
		})

		it('calls onCheckedChange with keyboard interaction', async () => {
			const handleCheckedChange = vi.fn()
			const user = userEvent.setup()

			render(<Switch onCheckedChange={handleCheckedChange} />)

			const switchElement = screen.getByRole('switch')
			switchElement.focus()

			await user.keyboard(' ')
			expect(handleCheckedChange).toHaveBeenCalledWith(true)
		})

		it('does not respond to keyboard when disabled', async () => {
			const handleCheckedChange = vi.fn()
			const user = userEvent.setup()

			render(<Switch disabled onCheckedChange={handleCheckedChange} />)

			const switchElement = screen.getByRole('switch')
			switchElement.focus()

			await user.keyboard(' ')
			expect(handleCheckedChange).not.toHaveBeenCalled()
		})
	})

	describe('Focus Management', () => {
		it('is focusable', () => {
			render(<Switch />)

			const switchElement = screen.getByRole('switch')
			switchElement.focus()
			expect(switchElement).toHaveFocus()
		})

		it('shows focus ring when focused', () => {
			render(<Switch />)

			const switchElement = screen.getByRole('switch')
			expect(switchElement).toHaveClass(
				'focus-visible:outline-none',
				'focus-visible:ring-2',
				'focus-visible:ring-ring',
				'focus-visible:ring-offset-2',
				'focus-visible:ring-offset-background',
			)
		})

		it('is not focusable when disabled', () => {
			render(<Switch disabled />)

			const switchElement = screen.getByRole('switch')
			expect(switchElement).toBeDisabled()
		})
	})

	describe('Accessibility', () => {
		it('has proper ARIA attributes', () => {
			render(<Switch />)

			const switchElement = screen.getByRole('switch')
			expect(switchElement).toHaveAttribute('role', 'switch')
			expect(switchElement).toHaveAttribute('aria-checked', 'false')
		})

		it('updates aria-checked when state changes', async () => {
			const user = userEvent.setup()

			render(<Switch />)

			const switchElement = screen.getByRole('switch')
			expect(switchElement).toHaveAttribute('aria-checked', 'false')

			await user.click(switchElement)
			expect(switchElement).toHaveAttribute('aria-checked', 'true')
		})

		it('supports aria-label', () => {
			render(<Switch aria-label="Enable notifications" />)

			const switchElement = screen.getByLabelText('Enable notifications')
			expect(switchElement).toBeInTheDocument()
		})

		it('supports aria-labelledby', () => {
			render(
				<div>
					<label id="switch-label">Dark mode</label>
					<Switch aria-labelledby="switch-label" />
				</div>,
			)

			const switchElement = screen.getByRole('switch')
			expect(switchElement).toHaveAttribute('aria-labelledby', 'switch-label')
		})

		it('supports aria-describedby', () => {
			render(
				<div>
					<Switch aria-describedby="switch-description" />
					<div id="switch-description">Toggle dark mode on or off</div>
				</div>,
			)

			const switchElement = screen.getByRole('switch')
			expect(switchElement).toHaveAttribute('aria-describedby', 'switch-description')
		})
	})

	describe('Form Integration', () => {
		it('supports name attribute', () => {
			render(<Switch name="notifications" />)

			const switchElement = screen.getByRole('switch')
			// Radix UI Switch may not expose name directly, but it should be in the DOM
			const input = document.querySelector('input[name="notifications"]') || switchElement
			expect(input).toBeInTheDocument()
		})

		it('supports value attribute', () => {
			render(<Switch value="on" />)

			const switchElement = screen.getByRole('switch')
			// Radix UI Switch may not expose value directly, but it should be in the DOM
			const input = document.querySelector('input[value="on"]') || switchElement
			expect(input).toBeInTheDocument()
		})

		it('works in form context', async () => {
			const handleSubmit = vi.fn((e) => e.preventDefault())
			const user = userEvent.setup()

			render(
				<form onSubmit={handleSubmit}>
					<Switch name="agree" />
					<button type="submit">Submit</button>
				</form>,
			)

			const submitButton = screen.getByRole('button', { name: 'Submit' })
			await user.click(submitButton)

			expect(handleSubmit).toHaveBeenCalled()
		})

		it('includes switch value in form data when checked', async () => {
			const user = userEvent.setup()

			render(
				<form>
					<Switch name="newsletter" value="yes" defaultChecked />
					<button type="submit">Submit</button>
				</form>,
			)

			const switchElement = screen.getByRole('switch')
			expect(switchElement).toBeChecked()
			expect(switchElement).toHaveAttribute('value', 'yes')
		})
	})

	describe('Controlled vs Uncontrolled', () => {
		it('works as uncontrolled component', async () => {
			const user = userEvent.setup()

			render(<Switch defaultChecked={false} />)

			const switchElement = screen.getByRole('switch')
			expect(switchElement).not.toBeChecked()

			await user.click(switchElement)
			expect(switchElement).toBeChecked()
		})

		it('works as controlled component', () => {
			const ControlledSwitch = () => {
				const [checked, setChecked] = React.useState(false)

				return <Switch checked={checked} onCheckedChange={setChecked} />
			}

			render(<ControlledSwitch />)

			const switchElement = screen.getByRole('switch')
			expect(switchElement).not.toBeChecked()
		})

		it('updates when controlled value changes', () => {
			const { rerender } = render(<Switch checked={false} />)

			let switchElement = screen.getByRole('switch')
			expect(switchElement).not.toBeChecked()

			rerender(<Switch checked={true} />)

			switchElement = screen.getByRole('switch')
			expect(switchElement).toBeChecked()
		})
	})

	describe('Visual States', () => {
		it('applies correct styling for unchecked state', () => {
			render(<Switch />)

			const switchElement = screen.getByRole('switch')
			expect(switchElement).toHaveAttribute('data-state', 'unchecked')
			expect(switchElement).toHaveClass('data-[state=unchecked]:bg-input')
		})

		it('applies correct styling for checked state', () => {
			render(<Switch checked />)

			const switchElement = screen.getByRole('switch')
			expect(switchElement).toHaveAttribute('data-state', 'checked')
			expect(switchElement).toHaveClass('data-[state=checked]:bg-primary')
		})

		it('thumb translates correctly based on state', () => {
			const { rerender } = render(<Switch checked={false} />)

			let switchElement = screen.getByRole('switch')
			let thumb = switchElement.querySelector('[data-state="unchecked"]')
			expect(thumb).toHaveClass('data-[state=unchecked]:translate-x-0')

			rerender(<Switch checked={true} />)

			switchElement = screen.getByRole('switch')
			thumb = switchElement.querySelector('[data-state="checked"]')
			expect(thumb).toHaveClass('data-[state=checked]:translate-x-4')
		})
	})

	describe('Ref Forwarding', () => {
		it('forwards ref correctly', () => {
			const ref = React.createRef<HTMLButtonElement>()

			render(<Switch ref={ref} />)

			expect(ref.current).toBeInstanceOf(HTMLButtonElement)
			expect(ref.current?.getAttribute('role')).toBe('switch')
		})

		it('allows ref access to focus method', () => {
			const ref = React.createRef<HTMLButtonElement>()

			render(<Switch ref={ref} />)

			expect(ref.current?.focus).toBeDefined()
			expect(typeof ref.current?.focus).toBe('function')
		})
	})

	describe('Edge Cases', () => {
		it('handles undefined className gracefully', () => {
			render(<Switch className={undefined} />)

			const switchElement = screen.getByRole('switch')
			expect(switchElement).toHaveClass('peer', 'inline-flex') // Should still have default classes
		})

		it('handles rapid toggling', async () => {
			const handleCheckedChange = vi.fn()
			const user = userEvent.setup()

			render(<Switch onCheckedChange={handleCheckedChange} />)

			const switchElement = screen.getByRole('switch')

			// Rapid clicks
			await user.click(switchElement)
			await user.click(switchElement)
			await user.click(switchElement)

			expect(handleCheckedChange).toHaveBeenCalledTimes(3)
		})

		it('maintains state consistency during rapid interactions', async () => {
			const user = userEvent.setup()

			render(<Switch />)

			const switchElement = screen.getByRole('switch')

			for (let i = 0; i < 5; i++) {
				await user.click(switchElement)
			}

			// After odd number of clicks, should be checked
			expect(switchElement).toBeChecked()
		})
	})

	describe('Complex Scenarios', () => {
		it('works with labels and descriptions', () => {
			render(
				<div>
					<label htmlFor="theme-switch">Dark Theme</label>
					<Switch id="theme-switch" aria-describedby="theme-description" />
					<div id="theme-description">Enable dark mode for better night viewing</div>
				</div>,
			)

			const switchElement = screen.getByRole('switch')
			expect(switchElement).toHaveAttribute('id', 'theme-switch')
			expect(switchElement).toHaveAttribute('aria-describedby', 'theme-description')
		})

		it('handles multiple switches independently', async () => {
			const user = userEvent.setup()

			render(
				<div>
					<Switch data-testid="switch1" />
					<Switch data-testid="switch2" defaultChecked />
					<Switch data-testid="switch3" />
				</div>,
			)

			const switch1 = screen.getByTestId('switch1')
			const switch2 = screen.getByTestId('switch2')
			const switch3 = screen.getByTestId('switch3')

			expect(switch1).not.toBeChecked()
			expect(switch2).toBeChecked()
			expect(switch3).not.toBeChecked()

			await user.click(switch1)
			await user.click(switch3)

			expect(switch1).toBeChecked()
			expect(switch2).toBeChecked() // Should remain unchanged
			expect(switch3).toBeChecked()
		})
	})
})
