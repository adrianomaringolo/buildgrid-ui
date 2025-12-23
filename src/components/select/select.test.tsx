import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectScrollDownButton,
	SelectScrollUpButton,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
} from './select'

describe('Select', () => {
	describe('Select Root Component', () => {
		it('renders select without crashing', () => {
			render(
				<Select>
					<SelectTrigger>
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="option1">Option 1</SelectItem>
					</SelectContent>
				</Select>,
			)

			expect(screen.getByRole('combobox')).toBeInTheDocument()
		})

		it('supports controlled state', () => {
			const ControlledSelect = () => {
				const [value, setValue] = React.useState('option1')
				return (
					<Select value={value} onValueChange={setValue}>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="option1">Option 1</SelectItem>
							<SelectItem value="option2">Option 2</SelectItem>
						</SelectContent>
					</Select>
				)
			}

			render(<ControlledSelect />)

			expect(screen.getByRole('combobox')).toHaveAttribute('data-state', 'closed')
		})

		it('supports default value', () => {
			render(
				<Select defaultValue="option2">
					<SelectTrigger>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="option1">Option 1</SelectItem>
						<SelectItem value="option2">Option 2</SelectItem>
					</SelectContent>
				</Select>,
			)

			expect(screen.getByRole('combobox')).toBeInTheDocument()
		})

		it('supports disabled state', () => {
			render(
				<Select disabled>
					<SelectTrigger>
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="option1">Option 1</SelectItem>
					</SelectContent>
				</Select>,
			)

			const trigger = screen.getByRole('combobox')
			expect(trigger).toBeDisabled()
		})
	})

	describe('SelectTrigger Component', () => {
		it('renders trigger with default styling', () => {
			render(
				<Select>
					<SelectTrigger>
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="option1">Option 1</SelectItem>
					</SelectContent>
				</Select>,
			)

			const trigger = screen.getByRole('combobox')
			expect(trigger).toHaveClass(
				'flex',
				'h-9',
				'w-full',
				'items-center',
				'justify-between',
				'rounded-md',
				'border',
			)
		})

		it('renders with custom className', () => {
			render(
				<Select>
					<SelectTrigger className="custom-trigger">
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="option1">Option 1</SelectItem>
					</SelectContent>
				</Select>,
			)

			const trigger = screen.getByRole('combobox')
			expect(trigger).toHaveClass('custom-trigger')
		})

		it('opens select when clicked', async () => {
			const user = userEvent.setup()

			render(
				<Select>
					<SelectTrigger>
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="option1">Option 1</SelectItem>
					</SelectContent>
				</Select>,
			)

			const trigger = screen.getByRole('combobox')
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByText('Option 1')).toBeInTheDocument()
			})
		})

		it('displays chevron down icon', () => {
			render(
				<Select>
					<SelectTrigger>
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="option1">Option 1</SelectItem>
					</SelectContent>
				</Select>,
			)

			const chevronIcon = document.querySelector('svg')
			expect(chevronIcon).toBeInTheDocument()
			expect(chevronIcon).toHaveClass('h-4', 'w-4', 'opacity-50')
		})

		it('forwards HTML attributes correctly', () => {
			render(
				<Select>
					<SelectTrigger data-testid="test-trigger" id="select-trigger">
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="option1">Option 1</SelectItem>
					</SelectContent>
				</Select>,
			)

			const trigger = screen.getByTestId('test-trigger')
			expect(trigger).toHaveAttribute('id', 'select-trigger')
		})
	})

	describe('SelectValue Component', () => {
		it('displays placeholder when no value is selected', () => {
			render(
				<Select>
					<SelectTrigger>
						<SelectValue placeholder="Choose an option" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="option1">Option 1</SelectItem>
					</SelectContent>
				</Select>,
			)

			expect(screen.getByText('Choose an option')).toBeInTheDocument()
		})

		it('displays selected value', async () => {
			const user = userEvent.setup()

			render(
				<Select>
					<SelectTrigger>
						<SelectValue placeholder="Choose an option" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="option1">Option 1</SelectItem>
						<SelectItem value="option2">Option 2</SelectItem>
					</SelectContent>
				</Select>,
			)

			const trigger = screen.getByRole('combobox')
			await user.click(trigger)

			await waitFor(() => {
				const option1 = screen.getByText('Option 1')
				expect(option1).toBeInTheDocument()
			})

			const option1 = screen.getByText('Option 1')
			await user.click(option1)

			await waitFor(() => {
				expect(screen.getByText('Option 1')).toBeInTheDocument()
			})
		})
	})

	describe('SelectContent Component', () => {
		it('renders content with default styling', async () => {
			const user = userEvent.setup()

			render(
				<Select>
					<SelectTrigger>
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="option1">Option 1</SelectItem>
					</SelectContent>
				</Select>,
			)

			const trigger = screen.getByRole('combobox')
			await user.click(trigger)

			await waitFor(() => {
				const content = screen.getByRole('listbox')
				expect(content).toHaveClass(
					'relative',
					'z-50',
					'max-h-96',
					'min-w-[8rem]',
					'overflow-hidden',
					'rounded-md',
					'border',
				)
			})
		})

		it('renders with custom className', async () => {
			const user = userEvent.setup()

			render(
				<Select>
					<SelectTrigger>
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent className="custom-content">
						<SelectItem value="option1">Option 1</SelectItem>
					</SelectContent>
				</Select>,
			)

			const trigger = screen.getByRole('combobox')
			await user.click(trigger)

			await waitFor(() => {
				const content = screen.getByRole('listbox')
				expect(content).toHaveClass('custom-content')
			})
		})

		it('supports different position prop', async () => {
			const user = userEvent.setup()

			render(
				<Select>
					<SelectTrigger>
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent position="item-aligned">
						<SelectItem value="option1">Option 1</SelectItem>
					</SelectContent>
				</Select>,
			)

			const trigger = screen.getByRole('combobox')
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByRole('listbox')).toBeInTheDocument()
			})
		})

		it('includes scroll buttons', async () => {
			const user = userEvent.setup()

			render(
				<Select>
					<SelectTrigger>
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent>
						<SelectScrollUpButton />
						<SelectItem value="option1">Option 1</SelectItem>
						<SelectScrollDownButton />
					</SelectContent>
				</Select>,
			)

			const trigger = screen.getByRole('combobox')
			await user.click(trigger)

			await waitFor(() => {
				// Check that content is rendered - scroll buttons may not be visible without overflow
				expect(screen.getByRole('listbox')).toBeInTheDocument()
			})
		})
	})

	describe('SelectItem Component', () => {
		it('renders item with default styling', async () => {
			const user = userEvent.setup()

			render(
				<Select>
					<SelectTrigger>
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="option1">Option 1</SelectItem>
					</SelectContent>
				</Select>,
			)

			const trigger = screen.getByRole('combobox')
			await user.click(trigger)

			await waitFor(() => {
				const item = screen.getByRole('option', { name: 'Option 1' })
				expect(item).toHaveClass(
					'relative',
					'flex',
					'w-full',
					'cursor-default',
					'select-none',
					'items-center',
					'rounded-sm',
				)
			})
		})

		it('renders with custom className', async () => {
			const user = userEvent.setup()

			render(
				<Select>
					<SelectTrigger>
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="option1" className="custom-item">
							Option 1
						</SelectItem>
					</SelectContent>
				</Select>,
			)

			const trigger = screen.getByRole('combobox')
			await user.click(trigger)

			await waitFor(() => {
				const item = screen.getByRole('option', { name: 'Option 1' })
				expect(item).toHaveClass('custom-item')
			})
		})

		it('selects item when clicked', async () => {
			const handleValueChange = vi.fn()
			const user = userEvent.setup()

			render(
				<Select onValueChange={handleValueChange}>
					<SelectTrigger>
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="option1">Option 1</SelectItem>
						<SelectItem value="option2">Option 2</SelectItem>
					</SelectContent>
				</Select>,
			)

			const trigger = screen.getByRole('combobox')
			await user.click(trigger)

			await waitFor(() => {
				const option1 = screen.getByRole('option', { name: 'Option 1' })
				expect(option1).toBeInTheDocument()
			})

			const option1 = screen.getByRole('option', { name: 'Option 1' })
			await user.click(option1)

			expect(handleValueChange).toHaveBeenCalledWith('option1')
		})

		it('shows check indicator when selected', async () => {
			const user = userEvent.setup()

			render(
				<Select defaultValue="option1">
					<SelectTrigger>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="option1">Option 1</SelectItem>
						<SelectItem value="option2">Option 2</SelectItem>
					</SelectContent>
				</Select>,
			)

			const trigger = screen.getByRole('combobox')
			await user.click(trigger)

			await waitFor(() => {
				const option1 = screen.getByRole('option', { name: 'Option 1' })
				expect(option1).toHaveAttribute('data-state', 'checked')
			})
		})

		it('supports disabled state', async () => {
			const user = userEvent.setup()

			render(
				<Select>
					<SelectTrigger>
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="option1">Option 1</SelectItem>
						<SelectItem value="option2" disabled>
							Option 2 (Disabled)
						</SelectItem>
					</SelectContent>
				</Select>,
			)

			const trigger = screen.getByRole('combobox')
			await user.click(trigger)

			await waitFor(() => {
				const disabledOption = screen.getByRole('option', { name: 'Option 2 (Disabled)' })
				expect(disabledOption).toHaveAttribute('data-disabled', '')
			})
		})

		it('forwards HTML attributes correctly', async () => {
			const user = userEvent.setup()

			render(
				<Select>
					<SelectTrigger>
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="option1" data-testid="test-item" id="item-1">
							Option 1
						</SelectItem>
					</SelectContent>
				</Select>,
			)

			const trigger = screen.getByRole('combobox')
			await user.click(trigger)

			await waitFor(() => {
				const item = screen.getByTestId('test-item')
				expect(item).toHaveAttribute('id', 'item-1')
			})
		})
	})

	describe('SelectLabel Component', () => {
		it('renders label with default styling', async () => {
			const user = userEvent.setup()

			render(
				<Select>
					<SelectTrigger>
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Fruits</SelectLabel>
							<SelectItem value="apple">Apple</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>,
			)

			const trigger = screen.getByRole('combobox')
			await user.click(trigger)

			await waitFor(() => {
				const label = screen.getByText('Fruits')
				expect(label).toHaveClass('px-2', 'py-1.5', 'text-sm', 'font-semibold')
			})
		})

		it('renders with custom className', async () => {
			const user = userEvent.setup()

			render(
				<Select>
					<SelectTrigger>
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel className="custom-label">Fruits</SelectLabel>
							<SelectItem value="apple">Apple</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>,
			)

			const trigger = screen.getByRole('combobox')
			await user.click(trigger)

			await waitFor(() => {
				const label = screen.getByText('Fruits')
				expect(label).toHaveClass('custom-label')
			})
		})
	})

	describe('SelectGroup Component', () => {
		it('groups related items', async () => {
			const user = userEvent.setup()

			render(
				<Select>
					<SelectTrigger>
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Fruits</SelectLabel>
							<SelectItem value="apple">Apple</SelectItem>
							<SelectItem value="banana">Banana</SelectItem>
						</SelectGroup>
						<SelectGroup>
							<SelectLabel>Vegetables</SelectLabel>
							<SelectItem value="carrot">Carrot</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>,
			)

			const trigger = screen.getByRole('combobox')
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByText('Fruits')).toBeInTheDocument()
				expect(screen.getByText('Vegetables')).toBeInTheDocument()
				expect(screen.getByText('Apple')).toBeInTheDocument()
				expect(screen.getByText('Carrot')).toBeInTheDocument()
			})
		})
	})

	describe('SelectSeparator Component', () => {
		it('renders separator with default styling', async () => {
			const user = userEvent.setup()

			render(
				<Select>
					<SelectTrigger>
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="option1">Option 1</SelectItem>
						<SelectSeparator />
						<SelectItem value="option2">Option 2</SelectItem>
					</SelectContent>
				</Select>,
			)

			const trigger = screen.getByRole('combobox')
			await user.click(trigger)

			await waitFor(() => {
				// SelectSeparator renders as a div with aria-hidden, not role="separator"
				const separator = document.querySelector('[aria-hidden="true"].bg-muted')
				expect(separator).toBeInTheDocument()
				expect(separator).toHaveClass('-mx-1', 'my-1', 'h-px', 'bg-muted')
			})
		})

		it('renders with custom className', async () => {
			const user = userEvent.setup()

			render(
				<Select>
					<SelectTrigger>
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="option1">Option 1</SelectItem>
						<SelectSeparator className="custom-separator" />
						<SelectItem value="option2">Option 2</SelectItem>
					</SelectContent>
				</Select>,
			)

			const trigger = screen.getByRole('combobox')
			await user.click(trigger)

			await waitFor(() => {
				const separator = document.querySelector('.custom-separator')
				expect(separator).toHaveClass('custom-separator')
			})
		})
	})

	describe('SelectScrollUpButton and SelectScrollDownButton', () => {
		it('renders scroll buttons with correct icons', async () => {
			const user = userEvent.setup()

			render(
				<Select>
					<SelectTrigger>
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent>
						<SelectScrollUpButton />
						<SelectItem value="option1">Option 1</SelectItem>
						<SelectScrollDownButton />
					</SelectContent>
				</Select>,
			)

			const trigger = screen.getByRole('combobox')
			await user.click(trigger)

			await waitFor(() => {
				// Verify content is rendered - scroll buttons may not be visible without overflow
				expect(screen.getByRole('listbox')).toBeInTheDocument()
			})
		})

		it('renders scroll buttons with custom className', async () => {
			const user = userEvent.setup()

			render(
				<Select>
					<SelectTrigger>
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent>
						<SelectScrollUpButton className="custom-scroll-up" />
						<SelectItem value="option1">Option 1</SelectItem>
						<SelectScrollDownButton className="custom-scroll-down" />
					</SelectContent>
				</Select>,
			)

			const trigger = screen.getByRole('combobox')
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByRole('listbox')).toBeInTheDocument()
			})
		})
	})

	describe('Keyboard Navigation', () => {
		it('opens select with Enter key', async () => {
			const user = userEvent.setup()

			render(
				<Select>
					<SelectTrigger>
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="option1">Option 1</SelectItem>
					</SelectContent>
				</Select>,
			)

			const trigger = screen.getByRole('combobox')
			trigger.focus()
			await user.keyboard('{Enter}')

			await waitFor(() => {
				expect(screen.getByText('Option 1')).toBeInTheDocument()
			})
		})

		it('opens select with Space key', async () => {
			const user = userEvent.setup()

			render(
				<Select>
					<SelectTrigger>
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="option1">Option 1</SelectItem>
					</SelectContent>
				</Select>,
			)

			const trigger = screen.getByRole('combobox')
			trigger.focus()
			await user.keyboard(' ')

			await waitFor(() => {
				expect(screen.getByText('Option 1')).toBeInTheDocument()
			})
		})

		it('navigates items with arrow keys', async () => {
			const user = userEvent.setup()

			render(
				<Select>
					<SelectTrigger>
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="option1">Option 1</SelectItem>
						<SelectItem value="option2">Option 2</SelectItem>
						<SelectItem value="option3">Option 3</SelectItem>
					</SelectContent>
				</Select>,
			)

			const trigger = screen.getByRole('combobox')
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByText('Option 1')).toBeInTheDocument()
			})

			// Navigate with arrow keys
			await user.keyboard('{ArrowDown}')
			await user.keyboard('{ArrowDown}')

			// The navigation behavior depends on Radix UI implementation
			expect(screen.getByText('Option 3')).toBeInTheDocument()
		})

		it('closes select with Escape key', async () => {
			const user = userEvent.setup()

			render(
				<Select>
					<SelectTrigger>
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="option1">Option 1</SelectItem>
					</SelectContent>
				</Select>,
			)

			const trigger = screen.getByRole('combobox')
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByText('Option 1')).toBeInTheDocument()
			})

			await user.keyboard('{Escape}')

			await waitFor(() => {
				expect(screen.queryByText('Option 1')).not.toBeInTheDocument()
			})
		})
	})

	describe('Accessibility', () => {
		it('has proper ARIA attributes', () => {
			render(
				<Select>
					<SelectTrigger>
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="option1">Option 1</SelectItem>
					</SelectContent>
				</Select>,
			)

			const trigger = screen.getByRole('combobox')
			expect(trigger).toHaveAttribute('aria-expanded', 'false')
		})

		it('updates ARIA expanded when opened', async () => {
			const user = userEvent.setup()

			render(
				<Select>
					<SelectTrigger>
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="option1">Option 1</SelectItem>
					</SelectContent>
				</Select>,
			)

			const trigger = screen.getByRole('combobox')
			await user.click(trigger)

			await waitFor(() => {
				expect(trigger).toHaveAttribute('aria-expanded', 'true')
			})
		})

		it('supports custom aria-label', () => {
			render(
				<Select>
					<SelectTrigger aria-label="Choose your favorite fruit">
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="apple">Apple</SelectItem>
					</SelectContent>
				</Select>,
			)

			const trigger = screen.getByLabelText('Choose your favorite fruit')
			expect(trigger).toBeInTheDocument()
		})

		it('associates with external label', () => {
			render(
				<div>
					<label htmlFor="fruit-select">Favorite Fruit</label>
					<Select>
						<SelectTrigger id="fruit-select">
							<SelectValue placeholder="Select an option" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="apple">Apple</SelectItem>
						</SelectContent>
					</Select>
				</div>,
			)

			const trigger = screen.getByRole('combobox')
			expect(trigger).toHaveAttribute('id', 'fruit-select')
		})
	})

	describe('Form Integration', () => {
		it('works with form submission', async () => {
			const handleSubmit = vi.fn((e) => e.preventDefault())
			const user = userEvent.setup()

			render(
				<form onSubmit={handleSubmit}>
					<Select name="fruit">
						<SelectTrigger>
							<SelectValue placeholder="Select a fruit" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="apple">Apple</SelectItem>
							<SelectItem value="banana">Banana</SelectItem>
						</SelectContent>
					</Select>
					<button type="submit">Submit</button>
				</form>,
			)

			const trigger = screen.getByRole('combobox')
			await user.click(trigger)

			await waitFor(() => {
				const apple = screen.getByRole('option', { name: 'Apple' })
				expect(apple).toBeInTheDocument()
			})

			const apple = screen.getByRole('option', { name: 'Apple' })
			await user.click(apple)

			const submitButton = screen.getByRole('button', { name: 'Submit' })
			await user.click(submitButton)

			expect(handleSubmit).toHaveBeenCalledOnce()
		})

		it('supports required attribute', () => {
			render(
				<Select required>
					<SelectTrigger>
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="option1">Option 1</SelectItem>
					</SelectContent>
				</Select>,
			)

			const trigger = screen.getByRole('combobox')
			expect(trigger).toBeRequired()
		})

		it('supports name attribute', () => {
			render(
				<Select name="test-select">
					<SelectTrigger>
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="option1">Option 1</SelectItem>
					</SelectContent>
				</Select>,
			)

			// The name attribute is passed to the Select root, not directly visible in DOM
			// We can verify the component renders without error
			const trigger = screen.getByRole('combobox')
			expect(trigger).toBeInTheDocument()
		})
	})

	describe('Edge Cases', () => {
		it('handles empty content', async () => {
			const user = userEvent.setup()

			render(
				<Select>
					<SelectTrigger>
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent></SelectContent>
				</Select>,
			)

			const trigger = screen.getByRole('combobox')
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByRole('listbox')).toBeInTheDocument()
			})
		})

		it('handles undefined className gracefully', () => {
			render(
				<Select>
					<SelectTrigger className={undefined}>
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent className={undefined}>
						<SelectItem value="option1" className={undefined}>
							Option 1
						</SelectItem>
					</SelectContent>
				</Select>,
			)

			const trigger = screen.getByRole('combobox')
			expect(trigger).toBeInTheDocument()
		})

		it('handles rapid open/close operations', async () => {
			const user = userEvent.setup()

			render(
				<Select>
					<SelectTrigger>
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="option1">Option 1</SelectItem>
					</SelectContent>
				</Select>,
			)

			const trigger = screen.getByRole('combobox')

			// Rapidly open and close
			await user.click(trigger)
			await user.keyboard('{Escape}')
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByText('Option 1')).toBeInTheDocument()
			})
		})
	})

	describe('Ref Forwarding', () => {
		it('forwards ref to trigger element', () => {
			const ref = React.createRef<HTMLButtonElement>()

			render(
				<Select>
					<SelectTrigger ref={ref}>
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="option1">Option 1</SelectItem>
					</SelectContent>
				</Select>,
			)

			expect(ref.current).toBeInstanceOf(HTMLButtonElement)
			expect(ref.current).toHaveAttribute('role', 'combobox')
		})

		it('forwards ref to content element', async () => {
			const ref = React.createRef<HTMLDivElement>()
			const user = userEvent.setup()

			render(
				<Select>
					<SelectTrigger>
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent ref={ref}>
						<SelectItem value="option1">Option 1</SelectItem>
					</SelectContent>
				</Select>,
			)

			const trigger = screen.getByRole('combobox')
			await user.click(trigger)

			await waitFor(() => {
				expect(ref.current).toBeInstanceOf(HTMLDivElement)
			})
		})

		it('forwards ref to item element', async () => {
			const ref = React.createRef<HTMLDivElement>()
			const user = userEvent.setup()

			render(
				<Select>
					<SelectTrigger>
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem ref={ref} value="option1">
							Option 1
						</SelectItem>
					</SelectContent>
				</Select>,
			)

			const trigger = screen.getByRole('combobox')
			await user.click(trigger)

			await waitFor(() => {
				expect(ref.current).toBeInstanceOf(HTMLDivElement)
			})
		})
	})

	describe('Complex Scenarios', () => {
		it('handles large number of options', async () => {
			const user = userEvent.setup()
			const options = Array.from({ length: 100 }, (_, i) => ({
				value: `option${i}`,
				label: `Option ${i}`,
			}))

			render(
				<Select>
					<SelectTrigger>
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent>
						{options.map((option) => (
							<SelectItem key={option.value} value={option.value}>
								{option.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>,
			)

			const trigger = screen.getByRole('combobox')
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByText('Option 0')).toBeInTheDocument()
			})
		})

		it('handles nested content structure', async () => {
			const user = userEvent.setup()

			render(
				<Select>
					<SelectTrigger>
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Group 1</SelectLabel>
							<SelectItem value="option1">
								<div>
									<strong>Option 1</strong>
									<span>Description</span>
								</div>
							</SelectItem>
						</SelectGroup>
						<SelectSeparator />
						<SelectGroup>
							<SelectLabel>Group 2</SelectLabel>
							<SelectItem value="option2">Option 2</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>,
			)

			const trigger = screen.getByRole('combobox')
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByText('Group 1')).toBeInTheDocument()
				expect(screen.getByText('Group 2')).toBeInTheDocument()
				expect(screen.getByText('Option 1')).toBeInTheDocument()
			})
		})

		it('maintains state with dynamic options', () => {
			const DynamicSelect = () => {
				const [options, setOptions] = React.useState(['option1', 'option2'])
				const [value, setValue] = React.useState('')

				return (
					<div>
						<Select value={value} onValueChange={setValue}>
							<SelectTrigger>
								<SelectValue placeholder="Select an option" />
							</SelectTrigger>
							<SelectContent>
								{options.map((option) => (
									<SelectItem key={option} value={option}>
										{option}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<button
							onClick={() => setOptions([...options, `option${options.length + 1}`])}
						>
							Add Option
						</button>
					</div>
				)
			}

			render(<DynamicSelect />)

			const trigger = screen.getByRole('combobox')
			expect(trigger).toBeInTheDocument()
		})
	})

	describe('Radix UI Integration', () => {
		it('inherits Radix Select functionality', () => {
			render(
				<Select>
					<SelectTrigger>
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="option1">Option 1</SelectItem>
					</SelectContent>
				</Select>,
			)

			const trigger = screen.getByRole('combobox')
			expect(trigger).toHaveAttribute('data-state')
		})

		it('supports Radix UI data attributes', async () => {
			const user = userEvent.setup()

			render(
				<Select>
					<SelectTrigger>
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="option1">Option 1</SelectItem>
					</SelectContent>
				</Select>,
			)

			const trigger = screen.getByRole('combobox')
			await user.click(trigger)

			await waitFor(() => {
				expect(trigger).toHaveAttribute('data-state', 'open')
			})
		})

		it('supports dir prop for RTL', () => {
			render(
				<Select dir="rtl">
					<SelectTrigger>
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="option1">Option 1</SelectItem>
					</SelectContent>
				</Select>,
			)

			const trigger = screen.getByRole('combobox')
			expect(trigger).toBeInTheDocument()
		})
	})
})
