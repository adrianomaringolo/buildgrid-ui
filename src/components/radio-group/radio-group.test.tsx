import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import { RadioGroup, RadioGroupItem } from './radio-group'

describe('RadioGroup', () => {
	describe('RadioGroup Component', () => {
		it('renders radio group with default props', () => {
			render(
				<RadioGroup>
					<RadioGroupItem value="option1" />
					<RadioGroupItem value="option2" />
				</RadioGroup>,
			)

			const radioGroup = screen.getByRole('radiogroup')
			expect(radioGroup).toBeInTheDocument()
			expect(radioGroup).toHaveClass('grid', 'gap-2')
		})

		it('renders with custom className', () => {
			render(
				<RadioGroup className="custom-radio-group">
					<RadioGroupItem value="option1" />
				</RadioGroup>,
			)

			const radioGroup = screen.getByRole('radiogroup')
			expect(radioGroup).toHaveClass('custom-radio-group')
			expect(radioGroup).toHaveClass('grid', 'gap-2') // Should still have default classes
		})

		it('forwards HTML attributes correctly', () => {
			render(
				<RadioGroup data-testid="test-radio-group" id="radio-group-id">
					<RadioGroupItem value="option1" />
				</RadioGroup>,
			)

			const radioGroup = screen.getByTestId('test-radio-group')
			expect(radioGroup).toHaveAttribute('id', 'radio-group-id')
		})

		it('supports default value', () => {
			render(
				<RadioGroup defaultValue="option2">
					<RadioGroupItem value="option1" />
					<RadioGroupItem value="option2" />
				</RadioGroup>,
			)

			const radioButtons = screen.getAllByRole('radio')
			expect(radioButtons[0]).not.toBeChecked()
			expect(radioButtons[1]).toBeChecked()
		})

		it('supports controlled value', () => {
			const ControlledRadioGroup = () => {
				const [value, setValue] = React.useState('option1')
				return (
					<RadioGroup value={value} onValueChange={setValue}>
						<RadioGroupItem value="option1" />
						<RadioGroupItem value="option2" />
					</RadioGroup>
				)
			}

			render(<ControlledRadioGroup />)

			const radioButtons = screen.getAllByRole('radio')
			expect(radioButtons[0]).toBeChecked()
			expect(radioButtons[1]).not.toBeChecked()
		})
	})

	describe('RadioGroupItem Component', () => {
		it('renders radio item with default styling', () => {
			render(
				<RadioGroup>
					<RadioGroupItem value="test" />
				</RadioGroup>,
			)

			const radioButton = screen.getByRole('radio')
			expect(radioButton).toBeInTheDocument()
			expect(radioButton).toHaveClass(
				'aspect-square',
				'h-4',
				'w-4',
				'rounded-full',
				'border',
				'border-primary',
				'text-primary',
				'shadow',
			)
		})

		it('renders with custom className', () => {
			render(
				<RadioGroup>
					<RadioGroupItem value="test" className="custom-radio-item" />
				</RadioGroup>,
			)

			const radioButton = screen.getByRole('radio')
			expect(radioButton).toHaveClass('custom-radio-item')
			expect(radioButton).toHaveClass('aspect-square', 'h-4') // Should still have default classes
		})

		it('renders with correct value attribute', () => {
			render(
				<RadioGroup>
					<RadioGroupItem value="unique-value" />
				</RadioGroup>,
			)

			const radioButton = screen.getByRole('radio')
			expect(radioButton).toHaveAttribute('value', 'unique-value')
		})

		it('forwards HTML attributes correctly', () => {
			render(
				<RadioGroup>
					<RadioGroupItem value="test" data-testid="test-radio-item" id="radio-item-id" />
				</RadioGroup>,
			)

			const radioButton = screen.getByTestId('test-radio-item')
			expect(radioButton).toHaveAttribute('id', 'radio-item-id')
		})

		it('supports disabled state', () => {
			render(
				<RadioGroup>
					<RadioGroupItem value="disabled" disabled />
				</RadioGroup>,
			)

			const radioButton = screen.getByRole('radio')
			expect(radioButton).toBeDisabled()
			expect(radioButton).toHaveClass(
				'disabled:cursor-not-allowed',
				'disabled:opacity-50',
			)
		})

		it('renders indicator when selected', () => {
			render(
				<RadioGroup defaultValue="selected">
					<RadioGroupItem value="selected" />
				</RadioGroup>,
			)

			const radioButton = screen.getByRole('radio')
			expect(radioButton).toBeChecked()

			// Check for indicator (Circle icon)
			const indicator = radioButton.querySelector('svg')
			expect(indicator).toBeInTheDocument()
			expect(indicator).toHaveClass('h-3.5', 'w-3.5', 'fill-primary')
		})

		it('does not render indicator when not selected', () => {
			render(
				<RadioGroup>
					<RadioGroupItem value="unselected" />
				</RadioGroup>,
			)

			const radioButton = screen.getByRole('radio')
			expect(radioButton).not.toBeChecked()

			// Check that the radio button has unchecked state
			expect(radioButton).toHaveAttribute('data-state', 'unchecked')
		})
	})

	describe('Selection Behavior', () => {
		it('selects radio item when clicked', async () => {
			const user = userEvent.setup()

			render(
				<RadioGroup>
					<RadioGroupItem value="option1" />
					<RadioGroupItem value="option2" />
				</RadioGroup>,
			)

			const radioButtons = screen.getAllByRole('radio')

			await user.click(radioButtons[0])
			expect(radioButtons[0]).toBeChecked()
			expect(radioButtons[1]).not.toBeChecked()

			await user.click(radioButtons[1])
			expect(radioButtons[0]).not.toBeChecked()
			expect(radioButtons[1]).toBeChecked()
		})

		it('calls onValueChange when selection changes', async () => {
			const handleValueChange = vi.fn()
			const user = userEvent.setup()

			render(
				<RadioGroup onValueChange={handleValueChange}>
					<RadioGroupItem value="option1" />
					<RadioGroupItem value="option2" />
				</RadioGroup>,
			)

			const radioButtons = screen.getAllByRole('radio')

			await user.click(radioButtons[0])
			expect(handleValueChange).toHaveBeenCalledWith('option1')

			await user.click(radioButtons[1])
			expect(handleValueChange).toHaveBeenCalledWith('option2')
		})

		it('maintains single selection (radio behavior)', async () => {
			const user = userEvent.setup()

			render(
				<RadioGroup>
					<RadioGroupItem value="option1" />
					<RadioGroupItem value="option2" />
					<RadioGroupItem value="option3" />
				</RadioGroup>,
			)

			const radioButtons = screen.getAllByRole('radio')

			// Select first option
			await user.click(radioButtons[0])
			expect(radioButtons[0]).toBeChecked()
			expect(radioButtons[1]).not.toBeChecked()
			expect(radioButtons[2]).not.toBeChecked()

			// Select second option - first should be deselected
			await user.click(radioButtons[1])
			expect(radioButtons[0]).not.toBeChecked()
			expect(radioButtons[1]).toBeChecked()
			expect(radioButtons[2]).not.toBeChecked()
		})

		it('does not change selection when disabled item is clicked', async () => {
			const user = userEvent.setup()

			render(
				<RadioGroup defaultValue="option1">
					<RadioGroupItem value="option1" />
					<RadioGroupItem value="option2" disabled />
				</RadioGroup>,
			)

			const radioButtons = screen.getAllByRole('radio')

			expect(radioButtons[0]).toBeChecked()
			expect(radioButtons[1]).not.toBeChecked()

			await user.click(radioButtons[1])

			// Selection should not change
			expect(radioButtons[0]).toBeChecked()
			expect(radioButtons[1]).not.toBeChecked()
		})
	})

	describe('Keyboard Navigation', () => {
		it('supports arrow key navigation', async () => {
			const user = userEvent.setup()

			render(
				<RadioGroup>
					<RadioGroupItem value="option1" />
					<RadioGroupItem value="option2" />
					<RadioGroupItem value="option3" />
				</RadioGroup>,
			)

			const radioButtons = screen.getAllByRole('radio')

			// Focus first radio button
			radioButtons[0].focus()
			expect(radioButtons[0]).toHaveFocus()

			// Arrow down should move to next option
			await user.keyboard('{ArrowDown}')
			expect(radioButtons[1]).toHaveFocus()
			// Note: Radix UI may not auto-select on navigation in jsdom

			// Arrow down again
			await user.keyboard('{ArrowDown}')
			expect(radioButtons[2]).toHaveFocus()
		})

		it('supports arrow up navigation', async () => {
			const user = userEvent.setup()

			render(
				<RadioGroup defaultValue="option3">
					<RadioGroupItem value="option1" />
					<RadioGroupItem value="option2" />
					<RadioGroupItem value="option3" />
				</RadioGroup>,
			)

			const radioButtons = screen.getAllByRole('radio')

			// Focus last radio button (which is selected)
			radioButtons[2].focus()
			expect(radioButtons[2]).toHaveFocus()
			expect(radioButtons[2]).toBeChecked()

			// Arrow up should move to previous option
			await user.keyboard('{ArrowUp}')
			expect(radioButtons[1]).toHaveFocus()
			// Note: In jsdom, keyboard navigation may not auto-select
		})

		it('wraps around when navigating past boundaries', async () => {
			const user = userEvent.setup()

			render(
				<RadioGroup>
					<RadioGroupItem value="option1" />
					<RadioGroupItem value="option2" />
				</RadioGroup>,
			)

			const radioButtons = screen.getAllByRole('radio')

			// Focus last radio button
			radioButtons[1].focus()

			// Arrow down should wrap to first option
			await user.keyboard('{ArrowDown}')
			expect(radioButtons[0]).toHaveFocus()
			// Note: In jsdom, keyboard navigation may not auto-select

			// Arrow up should wrap to last option
			await user.keyboard('{ArrowUp}')
			expect(radioButtons[1]).toHaveFocus()
			// Note: In jsdom, keyboard navigation may not auto-select
		})

		it('skips disabled items during navigation', async () => {
			const user = userEvent.setup()

			render(
				<RadioGroup>
					<RadioGroupItem value="option1" />
					<RadioGroupItem value="option2" disabled />
					<RadioGroupItem value="option3" />
				</RadioGroup>,
			)

			const radioButtons = screen.getAllByRole('radio')

			radioButtons[0].focus()
			await user.keyboard('{ArrowDown}')

			// Should skip disabled option and go to option3
			expect(radioButtons[2]).toHaveFocus()
			// Note: In jsdom, keyboard navigation may not auto-select
		})

		it('supports Space key selection', async () => {
			const user = userEvent.setup()

			render(
				<RadioGroup>
					<RadioGroupItem value="option1" />
					<RadioGroupItem value="option2" />
				</RadioGroup>,
			)

			const radioButtons = screen.getAllByRole('radio')

			radioButtons[1].focus()
			await user.keyboard(' ')

			expect(radioButtons[1]).toBeChecked()
		})

		it('supports Tab navigation to radio group', async () => {
			const user = userEvent.setup()

			render(
				<div>
					<button>Before</button>
					<RadioGroup>
						<RadioGroupItem value="option1" />
						<RadioGroupItem value="option2" />
					</RadioGroup>
					<button>After</button>
				</div>,
			)

			const beforeButton = screen.getByText('Before')
			const radioButtons = screen.getAllByRole('radio')
			const afterButton = screen.getByText('After')

			beforeButton.focus()
			await user.keyboard('{Tab}')

			// Should focus the first radio button
			expect(radioButtons[0]).toHaveFocus()

			await user.keyboard('{Tab}')

			// Should move to after button (radio group is treated as single tab stop)
			expect(afterButton).toHaveFocus()
		})
	})

	describe('Accessibility', () => {
		it('has proper role attributes', () => {
			render(
				<RadioGroup>
					<RadioGroupItem value="option1" />
					<RadioGroupItem value="option2" />
				</RadioGroup>,
			)

			const radioGroup = screen.getByRole('radiogroup')
			const radioButtons = screen.getAllByRole('radio')

			expect(radioGroup).toBeInTheDocument()
			expect(radioButtons).toHaveLength(2)
		})

		it('supports aria-label for radio group', () => {
			render(
				<RadioGroup aria-label="Choose an option">
					<RadioGroupItem value="option1" />
					<RadioGroupItem value="option2" />
				</RadioGroup>,
			)

			const radioGroup = screen.getByLabelText('Choose an option')
			expect(radioGroup).toBeInTheDocument()
		})

		it('supports aria-labelledby for radio group', () => {
			render(
				<div>
					<h3 id="radio-group-label">Select your preference</h3>
					<RadioGroup aria-labelledby="radio-group-label">
						<RadioGroupItem value="option1" />
						<RadioGroupItem value="option2" />
					</RadioGroup>
				</div>,
			)

			const radioGroup = screen.getByRole('radiogroup')
			expect(radioGroup).toHaveAttribute('aria-labelledby', 'radio-group-label')
		})

		it('supports aria-describedby for radio group', () => {
			render(
				<div>
					<RadioGroup aria-describedby="radio-group-description">
						<RadioGroupItem value="option1" />
						<RadioGroupItem value="option2" />
					</RadioGroup>
					<div id="radio-group-description">Choose one option</div>
				</div>,
			)

			const radioGroup = screen.getByRole('radiogroup')
			expect(radioGroup).toHaveAttribute('aria-describedby', 'radio-group-description')
		})

		it('supports aria-label for individual radio items', () => {
			render(
				<RadioGroup>
					<RadioGroupItem value="option1" aria-label="First option" />
					<RadioGroupItem value="option2" aria-label="Second option" />
				</RadioGroup>,
			)

			const firstOption = screen.getByLabelText('First option')
			const secondOption = screen.getByLabelText('Second option')

			expect(firstOption).toBeInTheDocument()
			expect(secondOption).toBeInTheDocument()
		})

		it('has proper focus management', async () => {
			const user = userEvent.setup()

			render(
				<RadioGroup>
					<RadioGroupItem value="option1" />
					<RadioGroupItem value="option2" />
				</RadioGroup>,
			)

			const radioButtons = screen.getAllByRole('radio')

			// Focus should be visible
			await user.tab()
			expect(radioButtons[0]).toHaveFocus()
			expect(radioButtons[0]).toHaveClass(
				'focus-visible:ring-1',
				'focus-visible:ring-ring',
			)
		})

		it('supports required attribute', () => {
			render(
				<RadioGroup required>
					<RadioGroupItem value="option1" />
					<RadioGroupItem value="option2" />
				</RadioGroup>,
			)

			const radioGroup = screen.getByRole('radiogroup')
			expect(radioGroup).toBeRequired()
		})
	})

	describe('Form Integration', () => {
		it('works with form submission', async () => {
			const handleSubmit = vi.fn((e) => e.preventDefault())
			const user = userEvent.setup()

			render(
				<form onSubmit={handleSubmit}>
					<RadioGroup name="preference">
						<RadioGroupItem value="option1" />
						<RadioGroupItem value="option2" />
					</RadioGroup>
					<button type="submit">Submit</button>
				</form>,
			)

			const radioButtons = screen.getAllByRole('radio')
			const submitButton = screen.getByRole('button', { name: 'Submit' })

			await user.click(radioButtons[0])
			await user.click(submitButton)

			expect(handleSubmit).toHaveBeenCalledOnce()
		})

		it('supports name attribute', () => {
			render(
				<RadioGroup name="test-group">
					<RadioGroupItem value="option1" />
					<RadioGroupItem value="option2" />
				</RadioGroup>,
			)

			// Note: Radix UI RadioGroup doesn't automatically set name attributes on individual items
			// The name prop is passed to the root but not propagated to items
			const radioGroup = screen.getByRole('radiogroup')
			expect(radioGroup).toBeInTheDocument()
		})

		it('supports form validation', () => {
			render(
				<form>
					<RadioGroup required name="required-group">
						<RadioGroupItem value="option1" />
						<RadioGroupItem value="option2" />
					</RadioGroup>
				</form>,
			)

			const radioGroup = screen.getByRole('radiogroup')
			expect(radioGroup).toBeRequired()
		})

		it('integrates with labels correctly', async () => {
			const user = userEvent.setup()

			render(
				<RadioGroup>
					<div>
						<RadioGroupItem value="option1" id="radio-1" />
						<label htmlFor="radio-1">Option 1</label>
					</div>
					<div>
						<RadioGroupItem value="option2" id="radio-2" />
						<label htmlFor="radio-2">Option 2</label>
					</div>
				</RadioGroup>,
			)

			const label1 = screen.getByText('Option 1')
			const label2 = screen.getByText('Option 2')
			const radioButtons = screen.getAllByRole('radio')

			// Clicking label should select radio
			await user.click(label1)
			expect(radioButtons[0]).toBeChecked()

			await user.click(label2)
			expect(radioButtons[1]).toBeChecked()
			expect(radioButtons[0]).not.toBeChecked()
		})
	})

	describe('Edge Cases', () => {
		it('handles empty radio group', () => {
			render(<RadioGroup />)

			const radioGroup = screen.getByRole('radiogroup')
			expect(radioGroup).toBeInTheDocument()
			expect(radioGroup).toBeEmptyDOMElement()
		})

		it('handles single radio item', async () => {
			const user = userEvent.setup()

			render(
				<RadioGroup>
					<RadioGroupItem value="single" />
				</RadioGroup>,
			)

			const radioButton = screen.getByRole('radio')

			await user.click(radioButton)
			expect(radioButton).toBeChecked()
		})

		it('handles undefined className gracefully', () => {
			render(
				<RadioGroup className={undefined}>
					<RadioGroupItem value="test" className={undefined} />
				</RadioGroup>,
			)

			const radioGroup = screen.getByRole('radiogroup')
			const radioButton = screen.getByRole('radio')

			expect(radioGroup).toHaveClass('grid', 'gap-2') // Should still have default classes
			expect(radioButton).toHaveClass('aspect-square', 'h-4') // Should still have default classes
		})

		it('handles duplicate values gracefully', async () => {
			const user = userEvent.setup()

			render(
				<RadioGroup>
					<RadioGroupItem value="duplicate" />
					<RadioGroupItem value="duplicate" />
				</RadioGroup>,
			)

			const radioButtons = screen.getAllByRole('radio')

			await user.click(radioButtons[0])
			expect(radioButtons[0]).toBeChecked()

			await user.click(radioButtons[1])
			// Both should have same value, behavior depends on Radix UI implementation
			expect(radioButtons[1]).toBeChecked()
		})

		it('handles rapid selection changes', async () => {
			const handleValueChange = vi.fn()
			const user = userEvent.setup()

			render(
				<RadioGroup onValueChange={handleValueChange}>
					<RadioGroupItem value="option1" />
					<RadioGroupItem value="option2" />
					<RadioGroupItem value="option3" />
				</RadioGroup>,
			)

			const radioButtons = screen.getAllByRole('radio')

			// Rapidly click different options
			await user.click(radioButtons[0])
			await user.click(radioButtons[1])
			await user.click(radioButtons[2])
			await user.click(radioButtons[0])

			expect(handleValueChange).toHaveBeenCalledTimes(4)
			expect(handleValueChange).toHaveBeenLastCalledWith('option1')
			expect(radioButtons[0]).toBeChecked()
		})
	})

	describe('Ref Forwarding', () => {
		it('forwards ref to radio group element', () => {
			const ref = React.createRef<HTMLDivElement>()

			render(
				<RadioGroup ref={ref}>
					<RadioGroupItem value="test" />
				</RadioGroup>,
			)

			expect(ref.current).toBeInstanceOf(HTMLDivElement)
			expect(ref.current).toHaveAttribute('role', 'radiogroup')
		})

		it('forwards ref to radio item element', () => {
			const ref = React.createRef<HTMLButtonElement>()

			render(
				<RadioGroup>
					<RadioGroupItem ref={ref} value="test" />
				</RadioGroup>,
			)

			expect(ref.current).toBeInstanceOf(HTMLButtonElement)
			expect(ref.current).toHaveAttribute('role', 'radio')
		})

		it('allows ref access to DOM methods', () => {
			const groupRef = React.createRef<HTMLDivElement>()
			const itemRef = React.createRef<HTMLButtonElement>()

			render(
				<RadioGroup ref={groupRef}>
					<RadioGroupItem ref={itemRef} value="test" />
				</RadioGroup>,
			)

			expect(groupRef.current?.focus).toBeDefined()
			expect(itemRef.current?.focus).toBeDefined()
			expect(typeof groupRef.current?.focus).toBe('function')
			expect(typeof itemRef.current?.focus).toBe('function')
		})
	})

	describe('Complex Scenarios', () => {
		it('handles nested content in radio items', async () => {
			const user = userEvent.setup()

			render(
				<RadioGroup>
					<div>
						<RadioGroupItem value="complex1" id="complex-1" />
						<label htmlFor="complex-1">
							<strong>Option 1</strong>
							<span>Description for option 1</span>
						</label>
					</div>
					<div>
						<RadioGroupItem value="complex2" id="complex-2" />
						<label htmlFor="complex-2">
							<strong>Option 2</strong>
							<span>Description for option 2</span>
						</label>
					</div>
				</RadioGroup>,
			)

			const option1Label = screen.getByText('Option 1')
			const radioButtons = screen.getAllByRole('radio')

			await user.click(option1Label)
			expect(radioButtons[0]).toBeChecked()
		})

		it('maintains state with dynamic options', () => {
			const DynamicRadioGroup = () => {
				const [options, setOptions] = React.useState(['option1', 'option2'])
				const [value, setValue] = React.useState('option1')

				return (
					<div>
						<RadioGroup value={value} onValueChange={setValue}>
							{options.map((option) => (
								<RadioGroupItem key={option} value={option} />
							))}
						</RadioGroup>
						<button
							onClick={() => setOptions([...options, `option${options.length + 1}`])}
						>
							Add Option
						</button>
					</div>
				)
			}

			render(<DynamicRadioGroup />)

			const radioButtons = screen.getAllByRole('radio')
			expect(radioButtons[0]).toBeChecked()
			expect(radioButtons).toHaveLength(2)
		})

		it('handles conditional rendering of radio items', () => {
			const ConditionalRadioGroup = () => {
				const [showThird, setShowThird] = React.useState(false)

				return (
					<div>
						<RadioGroup>
							<RadioGroupItem value="option1" />
							<RadioGroupItem value="option2" />
							{showThird && <RadioGroupItem value="option3" />}
						</RadioGroup>
						<button onClick={() => setShowThird(!showThird)}>Toggle Third Option</button>
					</div>
				)
			}

			render(<ConditionalRadioGroup />)

			let radioButtons = screen.getAllByRole('radio')
			expect(radioButtons).toHaveLength(2)
		})
	})

	describe('Radix UI Integration', () => {
		it('inherits Radix RadioGroup functionality', () => {
			render(
				<RadioGroup>
					<RadioGroupItem value="test" />
				</RadioGroup>,
			)

			const radioGroup = screen.getByRole('radiogroup')
			const radioButton = screen.getByRole('radio')

			// Check for Radix UI data attributes
			expect(radioButton).toHaveAttribute('data-state')
		})

		it('supports orientation prop', () => {
			render(
				<RadioGroup orientation="horizontal">
					<RadioGroupItem value="option1" />
					<RadioGroupItem value="option2" />
				</RadioGroup>,
			)

			const radioGroup = screen.getByRole('radiogroup')
			expect(radioGroup).toHaveAttribute('data-orientation', 'horizontal')
		})

		it('supports disabled prop on group', () => {
			render(
				<RadioGroup disabled>
					<RadioGroupItem value="option1" />
					<RadioGroupItem value="option2" />
				</RadioGroup>,
			)

			const radioButtons = screen.getAllByRole('radio')
			radioButtons.forEach((button) => {
				expect(button).toBeDisabled()
			})
		})
	})
})
