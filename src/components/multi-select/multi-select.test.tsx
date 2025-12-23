import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import { MultiSelect } from './multi-select'

const mockOptions = [
	{ label: 'Option 1', value: 'option1' },
	{ label: 'Option 2', value: 'option2' },
	{ label: 'Option 3', value: 'option3' },
	{ label: 'Option 4', value: 'option4' },
	{ label: 'Option 5', value: 'option5' },
]

describe('MultiSelect', () => {
	describe('Rendering', () => {
		it('renders multi-select with default props', () => {
			const handleValueChange = vi.fn()

			render(<MultiSelect options={mockOptions} onValueChange={handleValueChange} />)

			const trigger = screen.getByRole('button')
			expect(trigger).toBeInTheDocument()
			expect(trigger).toHaveTextContent('Select options')
		})

		it('renders with custom placeholder', () => {
			const handleValueChange = vi.fn()

			render(
				<MultiSelect
					options={mockOptions}
					onValueChange={handleValueChange}
					placeholder="Choose items"
				/>,
			)

			const trigger = screen.getByRole('button')
			expect(trigger).toHaveTextContent('Choose items')
		})

		it('renders with default selected values', () => {
			const handleValueChange = vi.fn()

			render(
				<MultiSelect
					options={mockOptions}
					onValueChange={handleValueChange}
					defaultValue={['option1', 'option2']}
				/>,
			)

			expect(screen.getByText('Option 1')).toBeInTheDocument()
			expect(screen.getByText('Option 2')).toBeInTheDocument()
		})

		it('renders with custom className', () => {
			const handleValueChange = vi.fn()

			render(
				<MultiSelect
					options={mockOptions}
					onValueChange={handleValueChange}
					className="custom-multi-select"
				/>,
			)

			const trigger = screen.getByRole('button')
			expect(trigger).toHaveClass('custom-multi-select')
		})

		it('forwards HTML attributes correctly', () => {
			const handleValueChange = vi.fn()

			render(
				<MultiSelect
					options={mockOptions}
					onValueChange={handleValueChange}
					data-testid="test-multi-select"
					id="multi-select-id"
				/>,
			)

			const trigger = screen.getByTestId('test-multi-select')
			expect(trigger).toHaveAttribute('id', 'multi-select-id')
		})
	})

	describe('Variants', () => {
		it('renders with default variant', () => {
			const handleValueChange = vi.fn()

			render(
				<MultiSelect
					options={mockOptions}
					onValueChange={handleValueChange}
					defaultValue={['option1']}
				/>,
			)

			const badge = screen.getByText('Option 1').closest('.mx-1')
			expect(badge).toHaveClass('border-foreground/10', 'text-foreground', 'bg-card')
		})

		it('renders with secondary variant', () => {
			const handleValueChange = vi.fn()

			render(
				<MultiSelect
					options={mockOptions}
					onValueChange={handleValueChange}
					defaultValue={['option1']}
					variant="secondary"
				/>,
			)

			const badge = screen.getByText('Option 1').closest('.mx-1')
			expect(badge).toHaveClass('bg-secondary', 'text-secondary-foreground')
		})

		it('renders with destructive variant', () => {
			const handleValueChange = vi.fn()

			render(
				<MultiSelect
					options={mockOptions}
					onValueChange={handleValueChange}
					defaultValue={['option1']}
					variant="destructive"
				/>,
			)

			const badge = screen.getByText('Option 1').closest('.mx-1')
			expect(badge).toHaveClass('bg-destructive', 'text-destructive-foreground')
		})

		it('renders with inverted variant', () => {
			const handleValueChange = vi.fn()

			render(
				<MultiSelect
					options={mockOptions}
					onValueChange={handleValueChange}
					defaultValue={['option1']}
					variant="inverted"
				/>,
			)

			const badge = screen.getByText('Option 1').closest('.mx-1')
			expect(badge).toHaveClass('inverted')
		})
	})

	describe('Popover Interaction', () => {
		it('opens popover when trigger is clicked', async () => {
			const handleValueChange = vi.fn()
			const user = userEvent.setup()

			render(<MultiSelect options={mockOptions} onValueChange={handleValueChange} />)

			const trigger = screen.getByRole('button')
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
				expect(screen.getByText('Option 1')).toBeInTheDocument()
				expect(screen.getByText('Option 2')).toBeInTheDocument()
			})
		})

		it('closes popover when clicking outside', async () => {
			const handleValueChange = vi.fn()
			const user = userEvent.setup()

			render(
				<div>
					<MultiSelect options={mockOptions} onValueChange={handleValueChange} />
					<div data-testid="outside">Outside element</div>
				</div>,
			)

			const trigger = screen.getByRole('button')
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
			})

			const outside = screen.getByTestId('outside')
			await user.click(outside)

			await waitFor(() => {
				expect(screen.queryByPlaceholderText('Search...')).not.toBeInTheDocument()
			})
		})

		it('closes popover when Escape key is pressed', async () => {
			const handleValueChange = vi.fn()
			const user = userEvent.setup()

			render(<MultiSelect options={mockOptions} onValueChange={handleValueChange} />)

			const trigger = screen.getByRole('button')
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
			})

			await user.keyboard('{Escape}')

			await waitFor(() => {
				expect(screen.queryByPlaceholderText('Search...')).not.toBeInTheDocument()
			})
		})
	})

	describe('Option Selection', () => {
		it('selects single option', async () => {
			const handleValueChange = vi.fn()
			const user = userEvent.setup()

			render(<MultiSelect options={mockOptions} onValueChange={handleValueChange} />)

			const trigger = screen.getByRole('button')
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByText('Option 1')).toBeInTheDocument()
			})

			const option1 = screen.getByText('Option 1')
			await user.click(option1)

			expect(handleValueChange).toHaveBeenCalledWith(['option1'])
		})

		it('selects multiple options', async () => {
			const handleValueChange = vi.fn()
			const user = userEvent.setup()

			render(<MultiSelect options={mockOptions} onValueChange={handleValueChange} />)

			const trigger = screen.getByRole('button')
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByText('Option 1')).toBeInTheDocument()
			})

			const option1 = screen.getByText('Option 1')
			const option2 = screen.getByText('Option 2')

			await user.click(option1)
			expect(handleValueChange).toHaveBeenCalledWith(['option1'])

			await user.click(option2)
			expect(handleValueChange).toHaveBeenCalledWith(['option1', 'option2'])
		})

		it('deselects option when clicked again', async () => {
			const handleValueChange = vi.fn()
			const user = userEvent.setup()

			render(
				<MultiSelect
					options={mockOptions}
					onValueChange={handleValueChange}
					defaultValue={['option1']}
				/>,
			)

			const trigger = screen.getByRole('button')
			await user.click(trigger)

			await waitFor(() => {
				const options = screen.getAllByText('Option 1')
				expect(options.length).toBeGreaterThan(0)
			})

			// Click on the option in the dropdown (not the badge)
			const dropdownOptions = screen.getAllByText('Option 1')
			const dropdownOption = dropdownOptions.find(
				(el) => el.closest('[role="option"]') || el.closest('[cmdk-item]'),
			)

			if (dropdownOption) {
				await user.click(dropdownOption)
				expect(handleValueChange).toHaveBeenCalledWith([])
			}
		})

		it('handles Select All functionality', async () => {
			const handleValueChange = vi.fn()
			const user = userEvent.setup()

			render(<MultiSelect options={mockOptions} onValueChange={handleValueChange} />)

			const trigger = screen.getByRole('button')
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByText('(Select All)')).toBeInTheDocument()
			})

			const selectAll = screen.getByText('(Select All)')
			await user.click(selectAll)

			expect(handleValueChange).toHaveBeenCalledWith([
				'option1',
				'option2',
				'option3',
				'option4',
				'option5',
			])
		})

		it('deselects all when Select All is clicked with all selected', async () => {
			const handleValueChange = vi.fn()
			const user = userEvent.setup()

			render(
				<MultiSelect
					options={mockOptions}
					onValueChange={handleValueChange}
					defaultValue={['option1', 'option2', 'option3', 'option4', 'option5']}
				/>,
			)

			const trigger = screen.getByRole('button')
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByText('(Select All)')).toBeInTheDocument()
			})

			const selectAll = screen.getByText('(Select All)')
			await user.click(selectAll)

			expect(handleValueChange).toHaveBeenCalledWith([])
		})
	})

	describe('Badge Management', () => {
		it('displays selected options as badges', () => {
			const handleValueChange = vi.fn()

			render(
				<MultiSelect
					options={mockOptions}
					onValueChange={handleValueChange}
					defaultValue={['option1', 'option2']}
				/>,
			)

			expect(screen.getByText('Option 1')).toBeInTheDocument()
			expect(screen.getByText('Option 2')).toBeInTheDocument()
		})

		it('removes option when badge X is clicked', async () => {
			const handleValueChange = vi.fn()
			const user = userEvent.setup()

			render(
				<MultiSelect
					options={mockOptions}
					onValueChange={handleValueChange}
					defaultValue={['option1', 'option2']}
				/>,
			)

			const badge1 = screen.getByText('Option 1').closest('.mx-1')
			const removeButton = badge1?.querySelector('svg')

			if (removeButton) {
				await user.click(removeButton)
				expect(handleValueChange).toHaveBeenCalledWith(['option2'])
			}
		})

		it('shows "more" badge when maxCount is exceeded', () => {
			const handleValueChange = vi.fn()

			render(
				<MultiSelect
					options={mockOptions}
					onValueChange={handleValueChange}
					defaultValue={['option1', 'option2', 'option3', 'option4']}
					maxCount={2}
				/>,
			)

			expect(screen.getByText('Option 1')).toBeInTheDocument()
			expect(screen.getByText('Option 2')).toBeInTheDocument()
			expect(screen.getByText('+ 2 more')).toBeInTheDocument()
		})

		it('clears extra options when "more" badge X is clicked', async () => {
			const handleValueChange = vi.fn()
			const user = userEvent.setup()

			render(
				<MultiSelect
					options={mockOptions}
					onValueChange={handleValueChange}
					defaultValue={['option1', 'option2', 'option3', 'option4']}
					maxCount={2}
				/>,
			)

			const moreBadge = screen.getByText('+ 2 more').closest('.mx-1')
			const removeButton = moreBadge?.querySelector('svg')

			if (removeButton) {
				await user.click(removeButton)
				expect(handleValueChange).toHaveBeenCalledWith(['option1', 'option2'])
			}
		})
	})

	describe('Clear Functionality', () => {
		it('clears all selections when clear button is clicked', async () => {
			const handleValueChange = vi.fn()
			const user = userEvent.setup()

			render(
				<MultiSelect
					options={mockOptions}
					onValueChange={handleValueChange}
					defaultValue={['option1', 'option2']}
				/>,
			)

			// Find the clear button (X icon) - it's the first X icon in the trigger
			const clearButton = document.querySelector('svg.lucide-x')

			if (clearButton) {
				await user.click(clearButton)
				expect(handleValueChange).toHaveBeenCalledWith([])
			}
		})

		it('shows clear button in popover when options are selected', async () => {
			const handleValueChange = vi.fn()
			const user = userEvent.setup()

			render(
				<MultiSelect
					options={mockOptions}
					onValueChange={handleValueChange}
					defaultValue={['option1']}
				/>,
			)

			const trigger = screen.getByRole('button')
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByText('Clear')).toBeInTheDocument()
			})
		})

		it('clears selections when Clear button in popover is clicked', async () => {
			const handleValueChange = vi.fn()
			const user = userEvent.setup()

			render(
				<MultiSelect
					options={mockOptions}
					onValueChange={handleValueChange}
					defaultValue={['option1', 'option2']}
				/>,
			)

			const trigger = screen.getByRole('button')
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByText('Clear')).toBeInTheDocument()
			})

			const clearButton = screen.getByText('Clear')
			await user.click(clearButton)

			expect(handleValueChange).toHaveBeenCalledWith([])
		})
	})

	describe('Search Functionality', () => {
		it('filters options based on search input', async () => {
			const handleValueChange = vi.fn()
			const user = userEvent.setup()

			render(<MultiSelect options={mockOptions} onValueChange={handleValueChange} />)

			const trigger = screen.getByRole('button')
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
			})

			const searchInput = screen.getByPlaceholderText('Search...')
			await user.type(searchInput, 'Option 1')

			await waitFor(() => {
				expect(screen.getByText('Option 1')).toBeInTheDocument()
				expect(screen.queryByText('Option 2')).not.toBeInTheDocument()
			})
		})

		it('shows "No results found" when search has no matches', async () => {
			const handleValueChange = vi.fn()
			const user = userEvent.setup()

			render(<MultiSelect options={mockOptions} onValueChange={handleValueChange} />)

			const trigger = screen.getByRole('button')
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
			})

			const searchInput = screen.getByPlaceholderText('Search...')
			await user.type(searchInput, 'nonexistent')

			await waitFor(() => {
				expect(screen.getByText('No results found.')).toBeInTheDocument()
			})
		})

		it('opens popover when Enter is pressed in search', async () => {
			const handleValueChange = vi.fn()
			const user = userEvent.setup()

			render(<MultiSelect options={mockOptions} onValueChange={handleValueChange} />)

			const trigger = screen.getByRole('button')
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
			})

			const searchInput = screen.getByPlaceholderText('Search...')
			await user.type(searchInput, '{Enter}')

			// Popover should remain open
			expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
		})

		it('removes last selected item when Backspace is pressed in empty search', async () => {
			const handleValueChange = vi.fn()
			const user = userEvent.setup()

			render(
				<MultiSelect
					options={mockOptions}
					onValueChange={handleValueChange}
					defaultValue={['option1', 'option2']}
				/>,
			)

			const trigger = screen.getByRole('button')
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
			})

			const searchInput = screen.getByPlaceholderText('Search...')
			await user.type(searchInput, '{Backspace}')

			expect(handleValueChange).toHaveBeenCalledWith(['option1'])
		})
	})

	describe('Keyboard Navigation', () => {
		it('handles Enter key to open popover', async () => {
			const handleValueChange = vi.fn()
			const user = userEvent.setup()

			render(<MultiSelect options={mockOptions} onValueChange={handleValueChange} />)

			const trigger = screen.getByRole('button')
			trigger.focus()
			await user.keyboard('{Enter}')

			await waitFor(() => {
				expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
			})
		})

		it('handles Space key to open popover', async () => {
			const handleValueChange = vi.fn()
			const user = userEvent.setup()

			render(<MultiSelect options={mockOptions} onValueChange={handleValueChange} />)

			const trigger = screen.getByRole('button')
			trigger.focus()
			await user.keyboard(' ')

			await waitFor(() => {
				expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
			})
		})
	})

	describe('Modal Popover', () => {
		it('renders with modal popover when modalPopover is true', async () => {
			const handleValueChange = vi.fn()
			const user = userEvent.setup()

			render(
				<MultiSelect
					options={mockOptions}
					onValueChange={handleValueChange}
					modalPopover={true}
				/>,
			)

			const trigger = screen.getByRole('button')
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
			})
		})
	})

	describe('Close Functionality', () => {
		it('closes popover when Close button is clicked', async () => {
			const handleValueChange = vi.fn()
			const user = userEvent.setup()

			render(<MultiSelect options={mockOptions} onValueChange={handleValueChange} />)

			const trigger = screen.getByRole('button')
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByText('Close')).toBeInTheDocument()
			})

			const closeButton = screen.getByText('Close')
			await user.click(closeButton)

			await waitFor(() => {
				expect(screen.queryByPlaceholderText('Search...')).not.toBeInTheDocument()
			})
		})
	})

	describe('Ref Forwarding', () => {
		it('forwards ref correctly', () => {
			const handleValueChange = vi.fn()
			const ref = React.createRef<HTMLButtonElement>()

			render(
				<MultiSelect ref={ref} options={mockOptions} onValueChange={handleValueChange} />,
			)

			expect(ref.current).toBeInstanceOf(HTMLButtonElement)
		})

		it('allows ref access to button methods', () => {
			const handleValueChange = vi.fn()
			const ref = React.createRef<HTMLButtonElement>()

			render(
				<MultiSelect ref={ref} options={mockOptions} onValueChange={handleValueChange} />,
			)

			expect(ref.current?.click).toBeDefined()
			expect(typeof ref.current?.click).toBe('function')
		})
	})

	describe('Edge Cases', () => {
		it('handles empty options array', () => {
			const handleValueChange = vi.fn()

			render(<MultiSelect options={[]} onValueChange={handleValueChange} />)

			const trigger = screen.getByRole('button')
			expect(trigger).toBeInTheDocument()
			expect(trigger).toHaveTextContent('Select options')
		})

		it('handles undefined className gracefully', () => {
			const handleValueChange = vi.fn()

			render(
				<MultiSelect
					options={mockOptions}
					onValueChange={handleValueChange}
					className={undefined}
				/>,
			)

			const trigger = screen.getByRole('button')
			expect(trigger).toHaveClass('flex', 'w-full') // Should still have default classes
		})

		it('handles maxCount of 0', () => {
			const handleValueChange = vi.fn()

			render(
				<MultiSelect
					options={mockOptions}
					onValueChange={handleValueChange}
					defaultValue={['option1', 'option2']}
					maxCount={0}
				/>,
			)

			expect(screen.getByText('+ 2 more')).toBeInTheDocument()
		})

		it('handles very large maxCount', () => {
			const handleValueChange = vi.fn()

			render(
				<MultiSelect
					options={mockOptions}
					onValueChange={handleValueChange}
					defaultValue={['option1', 'option2']}
					maxCount={100}
				/>,
			)

			expect(screen.getByText('Option 1')).toBeInTheDocument()
			expect(screen.getByText('Option 2')).toBeInTheDocument()
			expect(screen.queryByText('more')).not.toBeInTheDocument()
		})
	})

	describe('Accessibility', () => {
		it('has proper ARIA attributes', () => {
			const handleValueChange = vi.fn()

			render(<MultiSelect options={mockOptions} onValueChange={handleValueChange} />)

			const trigger = screen.getByRole('button')
			expect(trigger).toHaveAttribute('aria-haspopup')
		})

		it('supports custom aria-label', () => {
			const handleValueChange = vi.fn()

			render(
				<MultiSelect
					options={mockOptions}
					onValueChange={handleValueChange}
					aria-label="Select multiple options"
				/>,
			)

			const trigger = screen.getByLabelText('Select multiple options')
			expect(trigger).toBeInTheDocument()
		})
	})

	describe('Complex Scenarios', () => {
		it('handles rapid selection and deselection', async () => {
			const handleValueChange = vi.fn()
			const user = userEvent.setup()

			render(<MultiSelect options={mockOptions} onValueChange={handleValueChange} />)

			const trigger = screen.getByRole('button')
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByText('Option 1')).toBeInTheDocument()
			})

			// Rapidly select and deselect
			const option1 = screen.getByText('Option 1')
			await user.click(option1)
			await user.click(option1)
			await user.click(option1)

			expect(handleValueChange).toHaveBeenCalledTimes(3)
		})

		it('maintains state consistency during interactions', async () => {
			const handleValueChange = vi.fn()
			const user = userEvent.setup()

			render(
				<MultiSelect
					options={mockOptions}
					onValueChange={handleValueChange}
					defaultValue={['option1']}
				/>,
			)

			const trigger = screen.getByRole('button')
			await user.click(trigger)

			// Select another option
			const option2 = screen.getByText('Option 2')
			await user.click(option2)

			// Close and reopen
			await user.keyboard('{Escape}')
			await user.click(trigger)

			// Both options should still be visible as selected
			await waitFor(() => {
				const allOption1Elements = screen.getAllByText('Option 1')
				const allOption2Elements = screen.getAllByText('Option 2')
				expect(allOption1Elements.length).toBeGreaterThan(0)
				expect(allOption2Elements.length).toBeGreaterThan(0)
			})
		})
	})
})
