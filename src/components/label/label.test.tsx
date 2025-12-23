import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { describe, expect, it } from 'vitest'

import { Label } from './label'

describe('Label', () => {
	describe('Rendering', () => {
		it('renders label with default props', () => {
			render(<Label>Test Label</Label>)

			const label = screen.getByText('Test Label')
			expect(label).toBeInTheDocument()
			expect(label).toHaveClass(
				'text-sm',
				'font-medium',
				'leading-none',
				'peer-disabled:cursor-not-allowed',
				'peer-disabled:opacity-70',
			)
		})

		it('renders with custom className', () => {
			render(<Label className="custom-label">Custom Label</Label>)

			const label = screen.getByText('Custom Label')
			expect(label).toHaveClass('custom-label')
			expect(label).toHaveClass('text-sm', 'font-medium') // Should still have default classes
		})

		it('forwards HTML attributes correctly', () => {
			render(
				<Label data-testid="test-label" id="label-id" title="Label title">
					Attributed Label
				</Label>,
			)

			const label = screen.getByTestId('test-label')
			expect(label).toHaveAttribute('id', 'label-id')
			expect(label).toHaveAttribute('title', 'Label title')
		})

		it('renders as label element by default', () => {
			render(<Label>Default Label</Label>)

			const label = screen.getByText('Default Label')
			expect(label.tagName).toBe('LABEL')
		})
	})

	describe('Form Association', () => {
		it('associates with form control using htmlFor', async () => {
			const user = userEvent.setup()

			render(
				<div>
					<Label htmlFor="username">Username</Label>
					<input id="username" type="text" />
				</div>,
			)

			const label = screen.getByText('Username')
			const input = screen.getByRole('textbox')

			expect(label).toHaveAttribute('for', 'username')
			expect(input).toHaveAttribute('id', 'username')

			// Test that clicking label focuses input
			await user.click(label)
			expect(input).toHaveFocus()
		})

		it('works with nested form controls', async () => {
			const user = userEvent.setup()

			render(
				<Label>
					Email Address
					<input type="email" />
				</Label>,
			)

			const label = screen.getByText('Email Address')
			const input = screen.getByRole('textbox')

			// Clicking the label should focus the nested input
			await user.click(label)
			expect(input).toHaveFocus()
		})

		it('supports aria-labelledby relationship', () => {
			render(
				<div>
					<Label id="password-label">Password</Label>
					<input type="password" aria-labelledby="password-label" />
				</div>,
			)

			const label = screen.getByText('Password')
			const input = document.querySelector('input[type="password"]')

			expect(label).toHaveAttribute('id', 'password-label')
			expect(input).toHaveAttribute('aria-labelledby', 'password-label')
		})
	})

	describe('Accessibility', () => {
		it('supports required indicator', () => {
			render(
				<Label htmlFor="required-field">
					Required Field <span aria-label="required">*</span>
				</Label>,
			)

			const label = screen.getByText('Required Field')
			const requiredIndicator = screen.getByLabelText('required')

			expect(label).toBeInTheDocument()
			expect(requiredIndicator).toBeInTheDocument()
		})

		it('supports screen reader text', () => {
			render(
				<Label htmlFor="search">
					Search <span className="sr-only">in products</span>
				</Label>,
			)

			const label = screen.getByText('Search')
			const srText = document.querySelector('.sr-only')

			expect(label).toBeInTheDocument()
			expect(srText).toHaveTextContent('in products')
		})

		it('handles disabled state styling', () => {
			render(
				<div>
					<Label htmlFor="disabled-input" className="peer-disabled:text-red-500">
						Disabled Field
					</Label>
					<input id="disabled-input" disabled />
				</div>,
			)

			const label = screen.getByText('Disabled Field')
			expect(label).toHaveClass(
				'peer-disabled:cursor-not-allowed',
				'peer-disabled:opacity-70',
			)
		})
	})

	describe('Content Types', () => {
		it('renders text content', () => {
			render(<Label>Simple Text Label</Label>)

			expect(screen.getByText('Simple Text Label')).toBeInTheDocument()
		})

		it('renders with React elements', () => {
			render(
				<Label>
					<strong>Bold</strong> and <em>italic</em> text
				</Label>,
			)

			expect(screen.getByText('Bold')).toBeInTheDocument()
			expect(screen.getByText('italic')).toBeInTheDocument()
			expect(screen.getByText(/and/)).toBeInTheDocument()
		})

		it('renders with icons', () => {
			const TestIcon = () => <svg data-testid="test-icon" />

			render(
				<Label>
					<TestIcon />
					Label with Icon
				</Label>,
			)

			expect(screen.getByTestId('test-icon')).toBeInTheDocument()
			expect(screen.getByText('Label with Icon')).toBeInTheDocument()
		})

		it('handles empty content', () => {
			render(<Label data-testid="empty-label" />)

			const label = screen.getByTestId('empty-label')
			expect(label).toBeInTheDocument()
			expect(label).toBeEmptyDOMElement()
		})
	})

	describe('Styling', () => {
		it('applies default styling classes', () => {
			render(<Label>Styled Label</Label>)

			const label = screen.getByText('Styled Label')
			expect(label).toHaveClass(
				'text-sm',
				'font-medium',
				'leading-none',
				'peer-disabled:cursor-not-allowed',
				'peer-disabled:opacity-70',
			)
		})

		it('combines custom className with default classes', () => {
			render(<Label className="text-blue-500 font-bold">Custom Styled Label</Label>)

			const label = screen.getByText('Custom Styled Label')
			expect(label).toHaveClass('text-blue-500', 'font-bold')
			expect(label).toHaveClass('leading-none', 'peer-disabled:cursor-not-allowed') // Default classes should still be present
		})

		it('handles undefined className gracefully', () => {
			render(<Label className={undefined}>Undefined Class Label</Label>)

			const label = screen.getByText('Undefined Class Label')
			expect(label).toHaveClass('text-sm', 'font-medium') // Should still have default classes
		})
	})

	describe('Ref Forwarding', () => {
		it('forwards ref correctly', () => {
			const ref = React.createRef<HTMLLabelElement>()

			render(<Label ref={ref}>Ref Label</Label>)

			expect(ref.current).toBeInstanceOf(HTMLLabelElement)
			expect(ref.current?.textContent).toBe('Ref Label')
		})

		it('allows ref access to DOM methods', () => {
			const ref = React.createRef<HTMLLabelElement>()

			render(<Label ref={ref}>Focusable Label</Label>)

			expect(ref.current?.click).toBeDefined()
			expect(typeof ref.current?.click).toBe('function')
		})
	})

	describe('Form Integration', () => {
		it('works in complex form structures', () => {
			render(
				<form>
					<div>
						<Label htmlFor="first-name">First Name</Label>
						<input id="first-name" type="text" required />
					</div>
					<div>
						<Label htmlFor="last-name">Last Name</Label>
						<input id="last-name" type="text" required />
					</div>
					<div>
						<Label>
							<input type="checkbox" />I agree to the terms
						</Label>
					</div>
				</form>,
			)

			const firstNameLabel = screen.getByText('First Name')
			const lastNameLabel = screen.getByText('Last Name')
			const checkboxLabel = screen.getByText('I agree to the terms')

			expect(firstNameLabel).toHaveAttribute('for', 'first-name')
			expect(lastNameLabel).toHaveAttribute('for', 'last-name')
			expect(checkboxLabel).toBeInTheDocument()
		})

		it('supports fieldset and legend patterns', () => {
			render(
				<fieldset>
					<legend>Personal Information</legend>
					<Label htmlFor="name">Full Name</Label>
					<input id="name" type="text" />
				</fieldset>,
			)

			const legend = screen.getByText('Personal Information')
			const label = screen.getByText('Full Name')

			expect(legend).toBeInTheDocument()
			expect(label).toBeInTheDocument()
		})
	})

	describe('Edge Cases', () => {
		it('handles very long text content', () => {
			const longText =
				'This is a very long label text that might wrap to multiple lines and should still maintain proper styling and functionality'

			render(<Label>{longText}</Label>)

			const label = screen.getByText(longText)
			expect(label).toBeInTheDocument()
			expect(label).toHaveClass('leading-none')
		})

		it('handles special characters in content', () => {
			render(<Label>Label with special chars: @#$%^&*()</Label>)

			expect(screen.getByText('Label with special chars: @#$%^&*()')).toBeInTheDocument()
		})

		it('handles numeric content', () => {
			render(<Label>123 Numeric Label</Label>)

			expect(screen.getByText('123 Numeric Label')).toBeInTheDocument()
		})

		it('handles boolean attributes', () => {
			render(<Label hidden>Hidden Label</Label>)

			const label = screen.getByText('Hidden Label')
			expect(label).toHaveAttribute('hidden')
		})
	})

	describe('Radix UI Integration', () => {
		it('inherits Radix Label functionality', async () => {
			const user = userEvent.setup()

			render(
				<div>
					<Label htmlFor="radix-input">Radix Label</Label>
					<input id="radix-input" type="text" />
				</div>,
			)

			const label = screen.getByText('Radix Label')
			const input = screen.getByRole('textbox')

			// Test Radix UI label behavior
			await user.click(label)
			expect(input).toHaveFocus()
		})

		it('supports Radix UI data attributes', () => {
			render(<Label data-state="active">State Label</Label>)

			const label = screen.getByText('State Label')
			expect(label).toHaveAttribute('data-state', 'active')
		})
	})

	describe('Multiple Labels', () => {
		it('renders multiple labels correctly', () => {
			render(
				<div>
					<Label htmlFor="input1">Label 1</Label>
					<Label htmlFor="input2">Label 2</Label>
					<Label htmlFor="input3">Label 3</Label>
				</div>,
			)

			expect(screen.getByText('Label 1')).toBeInTheDocument()
			expect(screen.getByText('Label 2')).toBeInTheDocument()
			expect(screen.getByText('Label 3')).toBeInTheDocument()
		})

		it('handles labels with same text content', () => {
			render(
				<div>
					<Label htmlFor="input1">Same Label</Label>
					<Label htmlFor="input2">Same Label</Label>
				</div>,
			)

			const labels = screen.getAllByText('Same Label')
			expect(labels).toHaveLength(2)
			expect(labels[0]).toHaveAttribute('for', 'input1')
			expect(labels[1]).toHaveAttribute('for', 'input2')
		})
	})
})
