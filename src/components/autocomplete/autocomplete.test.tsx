import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { Autocomplete, Option } from './autocomplete'

describe('Autocomplete', () => {
	const mockOptions: Option[] = [
		{ label: 'Apple', value: 'apple' },
		{ label: 'Banana', value: 'banana' },
		{ label: 'Cherry', value: 'cherry' },
		{ label: 'Date', value: 'date' },
		{ label: 'Elderberry', value: 'elderberry' },
	]

	describe('Rendering', () => {
		it('renders with default placeholder', () => {
			render(<Autocomplete options={mockOptions} onSelect={vi.fn()} />)

			expect(screen.getByPlaceholderText('Type to search...')).toBeInTheDocument()
		})

		it('renders with custom placeholder', () => {
			render(
				<Autocomplete
					options={mockOptions}
					onSelect={vi.fn()}
					placeholder="Search fruits..."
				/>,
			)

			expect(screen.getByPlaceholderText('Search fruits...')).toBeInTheDocument()
		})

		it('renders search icon', () => {
			render(<Autocomplete options={mockOptions} onSelect={vi.fn()} />)

			const input = screen.getByRole('combobox')
			const searchIcon = input.parentElement?.querySelector('svg')
			expect(searchIcon).toBeInTheDocument()
		})

		it('does not show dropdown initially', () => {
			render(<Autocomplete options={mockOptions} onSelect={vi.fn()} />)

			expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
		})

		it('applies custom className', () => {
			render(
				<Autocomplete
					options={mockOptions}
					onSelect={vi.fn()}
					className="custom-class"
				/>,
			)

			expect(screen.getByRole('combobox')).toHaveClass('custom-class')
		})
	})

	describe('Dropdown Behavior', () => {
		it('shows dropdown when input is focused', async () => {
			const user = userEvent.setup()
			render(<Autocomplete options={mockOptions} onSelect={vi.fn()} />)

			const input = screen.getByRole('combobox')
			await user.click(input)

			await waitFor(() => {
				expect(screen.getByRole('listbox')).toBeInTheDocument()
			})
		})

		it('shows all options when input is empty and focused', async () => {
			const user = userEvent.setup()
			render(<Autocomplete options={mockOptions} onSelect={vi.fn()} />)

			const input = screen.getByRole('combobox')
			await user.click(input)

			await waitFor(() => {
				mockOptions.forEach((option) => {
					expect(screen.getByText(option.label)).toBeInTheDocument()
				})
			})
		})

		it('filters options based on input value', async () => {
			const user = userEvent.setup()
			render(<Autocomplete options={mockOptions} onSelect={vi.fn()} />)

			const input = screen.getByRole('combobox')
			await user.type(input, 'ap')

			await waitFor(() => {
				// The text "Apple" is split into highlighted "Ap" and "ple"
				expect(screen.getByText('ple')).toBeInTheDocument()
				expect(screen.queryByText('Banana')).not.toBeInTheDocument()
			})
		})

		it('shows no options when no matches found', async () => {
			const user = userEvent.setup()
			render(<Autocomplete options={mockOptions} onSelect={vi.fn()} />)

			const input = screen.getByRole('combobox')
			await user.type(input, 'xyz')

			await waitFor(() => {
				expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
			})
		})

		it('highlights matching text in options', async () => {
			const user = userEvent.setup()
			render(<Autocomplete options={mockOptions} onSelect={vi.fn()} />)

			const input = screen.getByRole('combobox')
			await user.type(input, 'ap')

			await waitFor(() => {
				const highlightedText = screen.getByText('Ap')
				expect(highlightedText).toHaveClass('font-bold', 'text-blue-600')
			})
		})
	})

	describe('Option Selection', () => {
		it('calls onSelect when option is clicked', async () => {
			const handleSelect = vi.fn()
			const user = userEvent.setup()

			render(<Autocomplete options={mockOptions} onSelect={handleSelect} />)

			const input = screen.getByRole('combobox')
			await user.click(input)

			await waitFor(() => {
				expect(screen.getByText('Apple')).toBeInTheDocument()
			})

			await user.click(screen.getByText('Apple'))

			expect(handleSelect).toHaveBeenCalledWith({ label: 'Apple', value: 'apple' })
		})

		it('updates input value when option is selected', async () => {
			const user = userEvent.setup()
			render(<Autocomplete options={mockOptions} onSelect={vi.fn()} />)

			const input = screen.getByRole('combobox')
			await user.click(input)

			await waitFor(() => {
				expect(screen.getByText('Apple')).toBeInTheDocument()
			})

			await user.click(screen.getByText('Apple'))

			expect(input).toHaveValue('Apple')
		})

		it('closes dropdown when option is selected', async () => {
			const user = userEvent.setup()
			render(<Autocomplete options={mockOptions} onSelect={vi.fn()} />)

			const input = screen.getByRole('combobox')
			await user.click(input)

			await waitFor(() => {
				expect(screen.getByRole('listbox')).toBeInTheDocument()
			})

			await user.click(screen.getByText('Apple'))

			await waitFor(() => {
				expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
			})
		})

		it('shows clear button when option is selected', async () => {
			const user = userEvent.setup()
			render(<Autocomplete options={mockOptions} onSelect={vi.fn()} />)

			const input = screen.getByRole('combobox')
			await user.click(input)
			await user.click(screen.getByText('Apple'))

			await waitFor(() => {
				const clearButton = screen.getByRole('button')
				expect(clearButton).toBeInTheDocument()
			})
		})

		it('clears selection when clear button is clicked', async () => {
			const handleSelect = vi.fn()
			const user = userEvent.setup()

			render(<Autocomplete options={mockOptions} onSelect={handleSelect} />)

			const input = screen.getByRole('combobox')
			await user.click(input)
			await user.click(screen.getByText('Apple'))

			await waitFor(() => {
				expect(screen.getByRole('button')).toBeInTheDocument()
			})

			await user.click(screen.getByRole('button'))

			expect(input).toHaveValue('')
			expect(handleSelect).toHaveBeenCalledWith(null)
		})
	})

	describe('Keyboard Navigation', () => {
		it('opens dropdown with ArrowDown key', async () => {
			const user = userEvent.setup()
			render(<Autocomplete options={mockOptions} onSelect={vi.fn()} />)

			const input = screen.getByRole('combobox')
			input.focus()
			await user.keyboard('{ArrowDown}')

			await waitFor(() => {
				expect(screen.getByRole('listbox')).toBeInTheDocument()
			})
		})

		it('opens dropdown with ArrowUp key', async () => {
			const user = userEvent.setup()
			render(<Autocomplete options={mockOptions} onSelect={vi.fn()} />)

			const input = screen.getByRole('combobox')
			input.focus()
			await user.keyboard('{ArrowUp}')

			await waitFor(() => {
				expect(screen.getByRole('listbox')).toBeInTheDocument()
			})
		})

		it('navigates through options with arrow keys', async () => {
			const user = userEvent.setup()
			render(<Autocomplete options={mockOptions} onSelect={vi.fn()} />)

			const input = screen.getByRole('combobox')
			await user.click(input)

			await waitFor(() => {
				expect(screen.getByRole('listbox')).toBeInTheDocument()
			})

			// Navigate down
			await user.keyboard('{ArrowDown}')

			const firstOption = screen.getByText('Apple').closest('li')
			expect(firstOption).toHaveClass('bg-blue-100')

			// Navigate down again
			await user.keyboard('{ArrowDown}')

			const secondOption = screen.getByText('Banana').closest('li')
			expect(secondOption).toHaveClass('bg-blue-100')
		})

		it('selects option with Enter key', async () => {
			const handleSelect = vi.fn()
			const user = userEvent.setup()

			render(<Autocomplete options={mockOptions} onSelect={handleSelect} />)

			const input = screen.getByRole('combobox')
			await user.click(input)

			await waitFor(() => {
				expect(screen.getByRole('listbox')).toBeInTheDocument()
			})

			await user.keyboard('{ArrowDown}')
			await user.keyboard('{Enter}')

			expect(handleSelect).toHaveBeenCalledWith({ label: 'Apple', value: 'apple' })
		})

		it('closes dropdown with Escape key', async () => {
			const user = userEvent.setup()
			render(<Autocomplete options={mockOptions} onSelect={vi.fn()} />)

			const input = screen.getByRole('combobox')
			await user.click(input)

			await waitFor(() => {
				expect(screen.getByRole('listbox')).toBeInTheDocument()
			})

			await user.keyboard('{Escape}')

			await waitFor(() => {
				expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
			})
		})

		it('does not navigate beyond option bounds', async () => {
			const user = userEvent.setup()
			render(<Autocomplete options={[mockOptions[0]]} onSelect={vi.fn()} />)

			const input = screen.getByRole('combobox')
			await user.click(input)

			await waitFor(() => {
				expect(screen.getByRole('listbox')).toBeInTheDocument()
			})

			// Try to navigate down when already at the last option
			await user.keyboard('{ArrowDown}')
			await user.keyboard('{ArrowDown}')

			const option = screen.getByText('Apple').closest('li')
			expect(option).toHaveClass('bg-blue-100')
		})
	})

	describe('Outside Click', () => {
		it('closes dropdown when clicking outside', async () => {
			const user = userEvent.setup()
			render(
				<div>
					<Autocomplete options={mockOptions} onSelect={vi.fn()} />
					<button>Outside button</button>
				</div>,
			)

			const input = screen.getByRole('combobox')
			await user.click(input)

			await waitFor(() => {
				expect(screen.getByRole('listbox')).toBeInTheDocument()
			})

			await user.click(screen.getByText('Outside button'))

			await waitFor(() => {
				expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
			})
		})
	})

	describe('Controlled Component', () => {
		it('works with controlled value', async () => {
			const user = userEvent.setup()
			const { rerender } = render(
				<Autocomplete options={mockOptions} onSelect={vi.fn()} value="apple" />,
			)

			const input = screen.getByRole('combobox')
			expect(input).toHaveValue('Apple')

			// Update value
			rerender(<Autocomplete options={mockOptions} onSelect={vi.fn()} value="banana" />)

			expect(input).toHaveValue('Banana')
		})

		it('calls onChange when typing', async () => {
			const handleChange = vi.fn()
			const user = userEvent.setup()

			render(
				<Autocomplete options={mockOptions} onSelect={vi.fn()} onChange={handleChange} />,
			)

			const input = screen.getByRole('combobox')
			await user.type(input, 'test')

			expect(handleChange).toHaveBeenCalledWith('test')
		})
	})

	describe('Default Selected Option', () => {
		it('renders with default selected option', () => {
			render(
				<Autocomplete
					options={mockOptions}
					onSelect={vi.fn()}
					defaultSelectedOption={{ label: 'Apple', value: 'apple' }}
				/>,
			)

			const input = screen.getByRole('combobox')
			expect(input).toHaveValue('Apple')
		})

		it('shows clear button with default selected option', () => {
			render(
				<Autocomplete
					options={mockOptions}
					onSelect={vi.fn()}
					defaultSelectedOption={{ label: 'Apple', value: 'apple' }}
				/>,
			)

			expect(screen.getByRole('button')).toBeInTheDocument()
		})
	})

	describe('Ref Methods', () => {
		it('exposes clearSelection method via ref', async () => {
			const handleSelect = vi.fn()
			const ref = { current: null }

			render(
				<Autocomplete
					ref={ref}
					options={mockOptions}
					onSelect={handleSelect}
					defaultSelectedOption={{ label: 'Apple', value: 'apple' }}
				/>,
			)

			const input = screen.getByRole('combobox')
			expect(input).toHaveValue('Apple')

			// Call clearSelection via ref
			act(() => {
				ref.current?.clearSelection()
			})

			expect(input).toHaveValue('')
			expect(handleSelect).toHaveBeenCalledWith(null)
		})
	})

	describe('Accessibility', () => {
		it('has proper ARIA attributes', () => {
			render(<Autocomplete options={mockOptions} onSelect={vi.fn()} />)

			const input = screen.getByRole('combobox')
			expect(input).toHaveAttribute('aria-expanded', 'false')
			expect(input).toHaveAttribute('aria-autocomplete', 'list')
			expect(input).toHaveAttribute('aria-controls', 'autocomplete-list')
		})

		it('updates aria-expanded when dropdown opens', async () => {
			const user = userEvent.setup()
			render(<Autocomplete options={mockOptions} onSelect={vi.fn()} />)

			const input = screen.getByRole('combobox')
			await user.click(input)

			await waitFor(() => {
				expect(input).toHaveAttribute('aria-expanded', 'true')
			})
		})

		it('has proper option roles and attributes', async () => {
			const user = userEvent.setup()
			render(<Autocomplete options={mockOptions} onSelect={vi.fn()} />)

			const input = screen.getByRole('combobox')
			await user.click(input)

			await waitFor(() => {
				const options = screen.getAllByRole('option')
				expect(options).toHaveLength(mockOptions.length)

				options.forEach((option, index) => {
					expect(option).toHaveAttribute('aria-selected')
					expect(option).toHaveAttribute('id', `option-${index}`)
				})
			})
		})

		it('updates aria-selected for active option', async () => {
			const user = userEvent.setup()
			render(<Autocomplete options={mockOptions} onSelect={vi.fn()} />)

			const input = screen.getByRole('combobox')
			await user.click(input)

			await waitFor(() => {
				expect(screen.getByRole('listbox')).toBeInTheDocument()
			})

			await user.keyboard('{ArrowDown}')

			const firstOption = screen.getAllByRole('option')[0]
			expect(firstOption).toHaveAttribute('aria-selected', 'true')
		})
	})

	describe('Edge Cases', () => {
		it('handles empty options array', () => {
			render(<Autocomplete options={[]} onSelect={vi.fn()} />)

			expect(screen.getByRole('combobox')).toBeInTheDocument()
		})

		it('handles options with duplicate labels', async () => {
			const duplicateOptions = [
				{ label: 'Apple', value: 'apple1' },
				{ label: 'Apple', value: 'apple2' },
			]
			const handleSelect = vi.fn()
			const user = userEvent.setup()

			render(<Autocomplete options={duplicateOptions} onSelect={handleSelect} />)

			const input = screen.getByRole('combobox')
			await user.click(input)

			await waitFor(() => {
				const appleOptions = screen.getAllByText('Apple')
				expect(appleOptions).toHaveLength(2)
			})

			const firstApple = screen.getAllByText('Apple')[0]
			await user.click(firstApple)

			expect(handleSelect).toHaveBeenCalledWith({ label: 'Apple', value: 'apple1' })
		})

		it('handles case-insensitive filtering', async () => {
			const user = userEvent.setup()
			render(<Autocomplete options={mockOptions} onSelect={vi.fn()} />)

			const input = screen.getByRole('combobox')
			await user.type(input, 'APPLE')

			await waitFor(() => {
				expect(screen.getByText('Apple')).toBeInTheDocument()
			})
		})
	})
})
