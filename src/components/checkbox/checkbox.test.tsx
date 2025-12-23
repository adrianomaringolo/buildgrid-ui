import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import { Checkbox } from './checkbox'

describe('Checkbox', () => {
	describe('Rendering', () => {
		it('renders checkbox with default props', () => {
			render(<Checkbox />)

			const checkbox = screen.getByRole('checkbox')
			expect(checkbox).toBeInTheDocument()
			expect(checkbox).toHaveClass(
				'peer',
				'h-4',
				'w-4',
				'shrink-0',
				'rounded-sm',
				'border',
				'border-primary',
				'shadow',
			)
		})

		it('renders checkbox with custom className', () => {
			render(<Checkbox className="custom-checkbox" />)

			const checkbox = screen.getByRole('checkbox')
			expect(checkbox).toHaveClass('custom-checkbox')
		})

		it('forwards HTML attributes correctly', () => {
			render(
				<Checkbox data-testid="test-checkbox" id="checkbox-id" title="Checkbox title" />,
			)

			const checkbox = screen.getByTestId('test-checkbox')
			expect(checkbox).toHaveAttribute('id', 'checkbox-id')
			expect(checkbox).toHaveAttribute('title', 'Checkbox title')
		})

		it('renders with aria-label', () => {
			render(<Checkbox aria-label="Accept terms" />)

			const checkbox = screen.getByLabelText('Accept terms')
			expect(checkbox).toBeInTheDocument()
		})
	})

	describe('States', () => {
		it('renders unchecked by default', () => {
			render(<Checkbox />)

			const checkbox = screen.getByRole('checkbox')
			expect(checkbox).not.toBeChecked()
			expect(checkbox).toHaveAttribute('data-state', 'unchecked')
		})

		it('renders checked when checked prop is true', () => {
			render(<Checkbox checked />)

			const checkbox = screen.getByRole('checkbox')
			expect(checkbox).toBeChecked()
			expect(checkbox).toHaveAttribute('data-state', 'checked')
		})

		it('renders indeterminate state', () => {
			render(<Checkbox checked="indeterminate" />)

			const checkbox = screen.getByRole('checkbox')
			expect(checkbox).toHaveAttribute('data-state', 'indeterminate')
		})

		it('renders disabled state', () => {
			render(<Checkbox disabled />)

			const checkbox = screen.getByRole('checkbox')
			expect(checkbox).toBeDisabled()
			expect(checkbox).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50')
		})

		it('renders checked and disabled state', () => {
			render(<Checkbox checked disabled />)

			const checkbox = screen.getByRole('checkbox')
			expect(checkbox).toBeChecked()
			expect(checkbox).toBeDisabled()
		})
	})

	describe('Interactions', () => {
		it('calls onCheckedChange when clicked', async () => {
			const handleCheckedChange = vi.fn()
			const user = userEvent.setup()

			render(<Checkbox onCheckedChange={handleCheckedChange} />)

			const checkbox = screen.getByRole('checkbox')
			await user.click(checkbox)

			expect(handleCheckedChange).toHaveBeenCalledOnce()
			expect(handleCheckedChange).toHaveBeenCalledWith(true)
		})

		it('calls onCheckedChange with false when unchecking', async () => {
			const handleCheckedChange = vi.fn()
			const user = userEvent.setup()

			render(<Checkbox checked onCheckedChange={handleCheckedChange} />)

			const checkbox = screen.getByRole('checkbox')
			await user.click(checkbox)

			expect(handleCheckedChange).toHaveBeenCalledOnce()
			expect(handleCheckedChange).toHaveBeenCalledWith(false)
		})

		it('does not call onCheckedChange when disabled', async () => {
			const handleCheckedChange = vi.fn()
			const user = userEvent.setup()

			render(<Checkbox disabled onCheckedChange={handleCheckedChange} />)

			const checkbox = screen.getByRole('checkbox')
			await user.click(checkbox)

			expect(handleCheckedChange).not.toHaveBeenCalled()
		})

		it('supports keyboard navigation with Space key', async () => {
			const handleCheckedChange = vi.fn()
			const user = userEvent.setup()

			render(<Checkbox onCheckedChange={handleCheckedChange} />)

			const checkbox = screen.getByRole('checkbox')
			checkbox.focus()
			await user.keyboard(' ')

			expect(handleCheckedChange).toHaveBeenCalledOnce()
			expect(handleCheckedChange).toHaveBeenCalledWith(true)
		})

		it('does not support Enter key activation (Radix behavior)', async () => {
			const handleCheckedChange = vi.fn()
			const user = userEvent.setup()

			render(<Checkbox onCheckedChange={handleCheckedChange} />)

			const checkbox = screen.getByRole('checkbox')
			checkbox.focus()
			await user.keyboard('{Enter}')

			// Radix checkbox only responds to Space, not Enter
			expect(handleCheckedChange).not.toHaveBeenCalled()
		})
	})

	describe('Controlled Component', () => {
		it('works as controlled component', async () => {
			const ControlledCheckbox = () => {
				const [checked, setChecked] = React.useState(false)

				return <Checkbox checked={checked} onCheckedChange={setChecked} />
			}

			const user = userEvent.setup()
			render(<ControlledCheckbox />)

			const checkbox = screen.getByRole('checkbox')
			expect(checkbox).not.toBeChecked()

			await user.click(checkbox)
			expect(checkbox).toBeChecked()

			await user.click(checkbox)
			expect(checkbox).not.toBeChecked()
		})

		it('handles indeterminate state in controlled mode', () => {
			const ControlledCheckbox = () => {
				const [checked, setChecked] = React.useState<boolean | 'indeterminate'>(
					'indeterminate',
				)

				return <Checkbox checked={checked} onCheckedChange={setChecked} />
			}

			render(<ControlledCheckbox />)

			const checkbox = screen.getByRole('checkbox')
			expect(checkbox).toHaveAttribute('data-state', 'indeterminate')
		})
	})

	describe('Accessibility', () => {
		it('has proper focus styles', () => {
			render(<Checkbox />)

			const checkbox = screen.getByRole('checkbox')
			expect(checkbox).toHaveClass(
				'focus-visible:outline-none',
				'focus-visible:ring-1',
				'focus-visible:ring-ring',
			)
		})

		it('supports aria-describedby', () => {
			render(
				<div>
					<Checkbox aria-describedby="checkbox-description" />
					<div id="checkbox-description">This checkbox accepts terms</div>
				</div>,
			)

			const checkbox = screen.getByRole('checkbox')
			expect(checkbox).toHaveAttribute('aria-describedby', 'checkbox-description')
		})

		it('supports aria-invalid', () => {
			render(<Checkbox aria-invalid="true" />)

			const checkbox = screen.getByRole('checkbox')
			expect(checkbox).toHaveAttribute('aria-invalid', 'true')
		})

		it('supports required attribute', () => {
			render(<Checkbox required />)

			const checkbox = screen.getByRole('checkbox')
			expect(checkbox).toHaveAttribute('aria-required', 'true')
		})

		it('works with form labels', () => {
			render(
				<div>
					<label htmlFor="terms-checkbox">Accept Terms</label>
					<Checkbox id="terms-checkbox" />
				</div>,
			)

			const checkbox = screen.getByLabelText('Accept Terms')
			expect(checkbox).toBeInTheDocument()
		})
	})

	describe('Visual Indicator', () => {
		it('shows check icon when checked', () => {
			render(<Checkbox checked />)

			const checkbox = screen.getByRole('checkbox')
			const checkIcon = checkbox.querySelector('svg')
			expect(checkIcon).toBeInTheDocument()
			expect(checkIcon).toHaveClass('h-4', 'w-4')
		})

		it('applies checked styling when checked', () => {
			render(<Checkbox checked />)

			const checkbox = screen.getByRole('checkbox')
			expect(checkbox).toHaveClass(
				'data-[state=checked]:bg-primary',
				'data-[state=checked]:text-primary-foreground',
			)
		})
	})

	describe('Form Integration', () => {
		it('supports value attribute', () => {
			render(<Checkbox value="accepted" />)

			const checkbox = screen.getByRole('checkbox')
			expect(checkbox).toHaveAttribute('value', 'accepted')
		})

		it('works in form context', async () => {
			const handleSubmit = vi.fn((e) => e.preventDefault())
			const user = userEvent.setup()

			render(
				<form onSubmit={handleSubmit}>
					<Checkbox value="accepted" />
					<button type="submit">Submit</button>
				</form>,
			)

			const checkbox = screen.getByRole('checkbox')
			const submitButton = screen.getByRole('button', { name: 'Submit' })

			await user.click(checkbox)
			await user.click(submitButton)

			expect(handleSubmit).toHaveBeenCalledOnce()
		})
	})

	describe('Edge Cases', () => {
		it('handles undefined onCheckedChange gracefully', async () => {
			const user = userEvent.setup()

			render(<Checkbox />)

			const checkbox = screen.getByRole('checkbox')
			await user.click(checkbox)

			// Should not throw error
			expect(checkbox).toBeInTheDocument()
		})

		it('handles undefined className gracefully', () => {
			render(<Checkbox className={undefined} />)

			const checkbox = screen.getByRole('checkbox')
			expect(checkbox).toHaveClass('peer', 'h-4', 'w-4') // Should still have default classes
		})

		it('handles rapid clicks', async () => {
			const handleCheckedChange = vi.fn()
			const user = userEvent.setup()

			render(<Checkbox onCheckedChange={handleCheckedChange} />)

			const checkbox = screen.getByRole('checkbox')
			await user.click(checkbox)
			await user.click(checkbox)
			await user.click(checkbox)

			expect(handleCheckedChange).toHaveBeenCalledTimes(3)
		})
	})

	describe('Multiple Checkboxes', () => {
		it('renders multiple checkboxes independently', async () => {
			const user = userEvent.setup()

			render(
				<div>
					<Checkbox aria-label="Option 1" />
					<Checkbox aria-label="Option 2" />
					<Checkbox aria-label="Option 3" />
				</div>,
			)

			const checkbox1 = screen.getByLabelText('Option 1')
			const checkbox2 = screen.getByLabelText('Option 2')
			const checkbox3 = screen.getByLabelText('Option 3')

			expect(checkbox1).not.toBeChecked()
			expect(checkbox2).not.toBeChecked()
			expect(checkbox3).not.toBeChecked()

			await user.click(checkbox1)
			await user.click(checkbox3)

			expect(checkbox1).toBeChecked()
			expect(checkbox2).not.toBeChecked()
			expect(checkbox3).toBeChecked()
		})
	})

	describe('Custom Styling', () => {
		it('merges custom classes with default classes', () => {
			render(<Checkbox className="border-red-500 bg-blue-100" />)

			const checkbox = screen.getByRole('checkbox')
			expect(checkbox).toHaveClass('border-red-500', 'bg-blue-100')
			expect(checkbox).toHaveClass('peer', 'h-4', 'w-4') // Default classes should still be present
		})

		it('supports custom size styling', () => {
			render(<Checkbox className="h-6 w-6" />)

			const checkbox = screen.getByRole('checkbox')
			expect(checkbox).toHaveClass('h-6', 'w-6')
		})
	})

	describe('Ref Forwarding', () => {
		it('forwards ref correctly', () => {
			const ref = React.createRef<HTMLButtonElement>()

			render(<Checkbox ref={ref} />)

			expect(ref.current).toBeInstanceOf(HTMLButtonElement)
			expect(ref.current).toHaveAttribute('role', 'checkbox')
		})

		it('allows ref access to focus method', () => {
			const ref = React.createRef<HTMLButtonElement>()

			render(<Checkbox ref={ref} />)

			expect(ref.current?.focus).toBeDefined()
			expect(typeof ref.current?.focus).toBe('function')
		})
	})
})
