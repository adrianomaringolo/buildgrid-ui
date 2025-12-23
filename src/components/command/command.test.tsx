import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from './command'

describe('Command', () => {
	describe('Command Component', () => {
		it('renders command with default props', () => {
			render(
				<Command>
					<CommandInput placeholder="Search..." />
					<CommandList>
						<CommandItem>Item 1</CommandItem>
					</CommandList>
				</Command>,
			)

			const command = document.querySelector('[cmdk-root]')
			expect(command).toBeInTheDocument()
			expect(command).toHaveClass(
				'flex',
				'h-full',
				'w-full',
				'flex-col',
				'overflow-hidden',
				'rounded-md',
				'bg-popover',
				'text-popover-foreground',
			)
		})

		it('renders command with custom className', () => {
			render(
				<Command className="custom-command">
					<CommandInput placeholder="Search..." />
					<CommandList>
						<CommandItem>Item 1</CommandItem>
					</CommandList>
				</Command>,
			)

			const command = document.querySelector('[cmdk-root]')
			expect(command).toHaveClass('custom-command')
		})

		it('forwards HTML attributes correctly', () => {
			render(
				<Command data-testid="test-command" id="command-id">
					<CommandInput placeholder="Search..." />
					<CommandList>
						<CommandItem>Item 1</CommandItem>
					</CommandList>
				</Command>,
			)

			const command = screen.getByTestId('test-command')
			expect(command).toHaveAttribute('id', 'command-id')
		})
	})

	describe('CommandDialog Component', () => {
		it('renders command dialog when open', () => {
			render(
				<CommandDialog open>
					<CommandInput placeholder="Search..." />
					<CommandList>
						<CommandItem>Dialog Item</CommandItem>
					</CommandList>
				</CommandDialog>,
			)

			expect(screen.getByText('Dialog Item')).toBeInTheDocument()
			expect(screen.getByRole('dialog')).toBeInTheDocument()
		})

		it('does not render command dialog when closed', () => {
			render(
				<CommandDialog open={false}>
					<CommandInput placeholder="Search..." />
					<CommandList>
						<CommandItem>Dialog Item</CommandItem>
					</CommandList>
				</CommandDialog>,
			)

			expect(screen.queryByText('Dialog Item')).not.toBeInTheDocument()
			expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
		})

		it('calls onOpenChange when dialog state changes', async () => {
			const handleOpenChange = vi.fn()
			const user = userEvent.setup()

			render(
				<CommandDialog open onOpenChange={handleOpenChange}>
					<CommandInput placeholder="Search..." />
					<CommandList>
						<CommandItem>Dialog Item</CommandItem>
					</CommandList>
				</CommandDialog>,
			)

			const closeButton = screen.getByRole('button', { name: /close/i })
			await user.click(closeButton)

			expect(handleOpenChange).toHaveBeenCalledWith(false)
		})
	})

	describe('CommandInput Component', () => {
		it('renders command input with search icon', () => {
			render(
				<Command>
					<CommandInput placeholder="Type to search..." />
				</Command>,
			)

			const input = screen.getByPlaceholderText('Type to search...')
			expect(input).toBeInTheDocument()
			expect(input).toHaveClass(
				'flex',
				'h-11',
				'w-full',
				'rounded-md',
				'bg-transparent',
				'py-3',
				'text-sm',
				'outline-none',
			)

			// Check for search icon
			const searchIcon = document.querySelector('svg')
			expect(searchIcon).toBeInTheDocument()
		})

		it('handles input changes', async () => {
			const user = userEvent.setup()

			render(
				<Command>
					<CommandInput placeholder="Search..." />
					<CommandList>
						<CommandItem>Apple</CommandItem>
						<CommandItem>Banana</CommandItem>
					</CommandList>
				</Command>,
			)

			const input = screen.getByPlaceholderText('Search...')
			await user.type(input, 'apple')

			expect(input).toHaveValue('apple')
		})

		it('renders with custom className', () => {
			render(
				<Command>
					<CommandInput placeholder="Search..." className="custom-input" />
				</Command>,
			)

			const input = screen.getByPlaceholderText('Search...')
			expect(input).toHaveClass('custom-input')
		})

		it('supports disabled state', () => {
			render(
				<Command>
					<CommandInput placeholder="Search..." disabled />
				</Command>,
			)

			const input = screen.getByPlaceholderText('Search...')
			expect(input).toBeDisabled()
			expect(input).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50')
		})
	})

	describe('CommandList Component', () => {
		it('renders command list with items', () => {
			render(
				<Command>
					<CommandInput placeholder="Search..." />
					<CommandList>
						<CommandItem>Item 1</CommandItem>
						<CommandItem>Item 2</CommandItem>
					</CommandList>
				</Command>,
			)

			expect(screen.getByText('Item 1')).toBeInTheDocument()
			expect(screen.getByText('Item 2')).toBeInTheDocument()

			const list = document.querySelector('[cmdk-list]')
			expect(list).toHaveClass('max-h-[300px]', 'overflow-y-auto', 'overflow-x-hidden')
		})

		it('renders with custom className', () => {
			render(
				<Command>
					<CommandList className="custom-list">
						<CommandItem>Item 1</CommandItem>
					</CommandList>
				</Command>,
			)

			const list = document.querySelector('[cmdk-list]')
			expect(list).toHaveClass('custom-list')
		})
	})

	describe('CommandEmpty Component', () => {
		it('renders empty state when no items match', async () => {
			const user = userEvent.setup()

			render(
				<Command>
					<CommandInput placeholder="Search..." />
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						<CommandItem>Apple</CommandItem>
					</CommandList>
				</Command>,
			)

			const input = screen.getByPlaceholderText('Search...')
			await user.type(input, 'xyz')

			await waitFor(() => {
				expect(screen.getByText('No results found.')).toBeInTheDocument()
			})
		})

		it('applies correct styling to empty component', () => {
			render(
				<Command>
					<CommandList>
						<CommandEmpty>No results</CommandEmpty>
					</CommandList>
				</Command>,
			)

			const empty = screen.getByText('No results')
			expect(empty).toHaveClass('py-6', 'text-center', 'text-sm')
		})
	})

	describe('CommandGroup Component', () => {
		it('renders command group with heading', () => {
			render(
				<Command>
					<CommandList>
						<CommandGroup heading="Fruits">
							<CommandItem>Apple</CommandItem>
							<CommandItem>Banana</CommandItem>
						</CommandGroup>
					</CommandList>
				</Command>,
			)

			expect(screen.getByText('Fruits')).toBeInTheDocument()
			expect(screen.getByText('Apple')).toBeInTheDocument()
			expect(screen.getByText('Banana')).toBeInTheDocument()
		})

		it('renders with custom className', () => {
			render(
				<Command>
					<CommandList>
						<CommandGroup heading="Test" className="custom-group">
							<CommandItem>Item</CommandItem>
						</CommandGroup>
					</CommandList>
				</Command>,
			)

			const group = document.querySelector('[cmdk-group]')
			expect(group).toHaveClass('custom-group')
		})

		it('applies correct styling to group', () => {
			render(
				<Command>
					<CommandList>
						<CommandGroup heading="Test">
							<CommandItem>Item</CommandItem>
						</CommandGroup>
					</CommandList>
				</Command>,
			)

			const group = document.querySelector('[cmdk-group]')
			expect(group).toHaveClass('overflow-hidden', 'p-1', 'text-foreground')
		})
	})

	describe('CommandItem Component', () => {
		it('renders command item with correct styling', () => {
			render(
				<Command>
					<CommandList>
						<CommandItem>Test Item</CommandItem>
					</CommandList>
				</Command>,
			)

			const item = screen.getByText('Test Item')
			expect(item).toBeInTheDocument()
			expect(item).toHaveClass(
				'relative',
				'flex',
				'cursor-default',
				'gap-2',
				'select-none',
				'items-center',
				'rounded-sm',
				'px-2',
				'py-1.5',
				'text-sm',
				'outline-none',
			)
		})

		it('handles click events', async () => {
			const handleSelect = vi.fn()
			const user = userEvent.setup()

			render(
				<Command>
					<CommandList>
						<CommandItem onSelect={handleSelect}>Clickable Item</CommandItem>
					</CommandList>
				</Command>,
			)

			const item = screen.getByText('Clickable Item')
			await user.click(item)

			expect(handleSelect).toHaveBeenCalledOnce()
		})

		it('supports disabled state', () => {
			render(
				<Command>
					<CommandList>
						<CommandItem disabled>Disabled Item</CommandItem>
					</CommandList>
				</Command>,
			)

			const item = screen.getByText('Disabled Item')
			expect(item).toHaveAttribute('data-disabled', 'true')
		})

		it('renders with custom className', () => {
			render(
				<Command>
					<CommandList>
						<CommandItem className="custom-item">Custom Item</CommandItem>
					</CommandList>
				</Command>,
			)

			const item = screen.getByText('Custom Item')
			expect(item).toHaveClass('custom-item')
		})

		it('renders with icon content', () => {
			const TestIcon = () => <svg data-testid="test-icon" />

			render(
				<Command>
					<CommandList>
						<CommandItem>
							<TestIcon />
							Item with Icon
						</CommandItem>
					</CommandList>
				</Command>,
			)

			expect(screen.getByTestId('test-icon')).toBeInTheDocument()
			expect(screen.getByText('Item with Icon')).toBeInTheDocument()
		})
	})

	describe('CommandSeparator Component', () => {
		it('renders separator with correct styling', () => {
			render(
				<Command>
					<CommandList>
						<CommandItem>Item 1</CommandItem>
						<CommandSeparator />
						<CommandItem>Item 2</CommandItem>
					</CommandList>
				</Command>,
			)

			const separator = document.querySelector('[cmdk-separator]')
			expect(separator).toBeInTheDocument()
			expect(separator).toHaveClass('-mx-1', 'h-px', 'bg-border')
		})

		it('renders with custom className', () => {
			render(
				<Command>
					<CommandList>
						<CommandSeparator className="custom-separator" />
					</CommandList>
				</Command>,
			)

			const separator = document.querySelector('[cmdk-separator]')
			expect(separator).toHaveClass('custom-separator')
		})
	})

	describe('CommandShortcut Component', () => {
		it('renders shortcut with correct styling', () => {
			render(
				<Command>
					<CommandList>
						<CommandItem>
							Open File
							<CommandShortcut>⌘O</CommandShortcut>
						</CommandItem>
					</CommandList>
				</Command>,
			)

			const shortcut = screen.getByText('⌘O')
			expect(shortcut).toBeInTheDocument()
			expect(shortcut).toHaveClass(
				'ml-auto',
				'text-xs',
				'tracking-widest',
				'text-muted-foreground',
			)
		})

		it('renders with custom className', () => {
			render(
				<Command>
					<CommandList>
						<CommandItem>
							Save
							<CommandShortcut className="custom-shortcut">⌘S</CommandShortcut>
						</CommandItem>
					</CommandList>
				</Command>,
			)

			const shortcut = screen.getByText('⌘S')
			expect(shortcut).toHaveClass('custom-shortcut')
		})
	})

	describe('Search Functionality', () => {
		it('filters items based on search input', async () => {
			const user = userEvent.setup()

			render(
				<Command>
					<CommandInput placeholder="Search..." />
					<CommandList>
						<CommandItem>Apple</CommandItem>
						<CommandItem>Banana</CommandItem>
						<CommandItem>Cherry</CommandItem>
					</CommandList>
				</Command>,
			)

			const input = screen.getByPlaceholderText('Search...')
			await user.type(input, 'app')

			await waitFor(() => {
				expect(screen.getByText('Apple')).toBeInTheDocument()
				expect(screen.queryByText('Banana')).not.toBeInTheDocument()
				expect(screen.queryByText('Cherry')).not.toBeInTheDocument()
			})
		})

		it('shows empty state when no items match search', async () => {
			const user = userEvent.setup()

			render(
				<Command>
					<CommandInput placeholder="Search..." />
					<CommandList>
						<CommandEmpty>No results found</CommandEmpty>
						<CommandItem>Apple</CommandItem>
						<CommandItem>Banana</CommandItem>
					</CommandList>
				</Command>,
			)

			const input = screen.getByPlaceholderText('Search...')
			await user.type(input, 'xyz')

			await waitFor(() => {
				expect(screen.getByText('No results found')).toBeInTheDocument()
				expect(screen.queryByText('Apple')).not.toBeInTheDocument()
				expect(screen.queryByText('Banana')).not.toBeInTheDocument()
			})
		})
	})

	describe('Keyboard Navigation', () => {
		it('supports arrow key navigation', async () => {
			const user = userEvent.setup()

			render(
				<Command>
					<CommandInput placeholder="Search..." />
					<CommandList>
						<CommandItem>Item 1</CommandItem>
						<CommandItem>Item 2</CommandItem>
						<CommandItem>Item 3</CommandItem>
					</CommandList>
				</Command>,
			)

			const input = screen.getByPlaceholderText('Search...')
			input.focus()

			await user.keyboard('{ArrowDown}')

			// Check that navigation is working by verifying items are present and interactive
			const item1 = screen.getByText('Item 1')
			expect(item1).toBeInTheDocument()

			// The cmdk library handles selection internally, so we test that the structure is correct
			expect(item1).toHaveAttribute('data-selected')
		})

		it('supports Enter key to select item', async () => {
			const handleSelect = vi.fn()
			const user = userEvent.setup()

			render(
				<Command>
					<CommandInput placeholder="Search..." />
					<CommandList>
						<CommandItem onSelect={handleSelect}>Selectable Item</CommandItem>
					</CommandList>
				</Command>,
			)

			const input = screen.getByPlaceholderText('Search...')
			input.focus()

			await user.keyboard('{ArrowDown}')
			await user.keyboard('{Enter}')

			expect(handleSelect).toHaveBeenCalledOnce()
		})
	})

	describe('Accessibility', () => {
		it('has proper ARIA attributes', () => {
			render(
				<Command>
					<CommandInput placeholder="Search..." />
					<CommandList>
						<CommandItem>Item 1</CommandItem>
					</CommandList>
				</Command>,
			)

			const input = screen.getByPlaceholderText('Search...')
			expect(input).toHaveAttribute('role', 'combobox')
		})

		it('supports aria-label', () => {
			render(
				<Command aria-label="Command menu">
					<CommandInput placeholder="Search..." />
					<CommandList>
						<CommandItem>Item 1</CommandItem>
					</CommandList>
				</Command>,
			)

			const command = screen.getByLabelText('Command menu')
			expect(command).toBeInTheDocument()
		})
	})

	describe('Edge Cases', () => {
		it('handles empty command', () => {
			render(<Command />)

			const command = document.querySelector('[cmdk-root]')
			expect(command).toBeInTheDocument()
		})

		it('handles command with only input', () => {
			render(
				<Command>
					<CommandInput placeholder="Search..." />
				</Command>,
			)

			const input = screen.getByPlaceholderText('Search...')
			expect(input).toBeInTheDocument()
		})

		it('handles undefined className gracefully', () => {
			render(
				<Command className={undefined}>
					<CommandInput placeholder="Search..." />
				</Command>,
			)

			const command = document.querySelector('[cmdk-root]')
			expect(command).toHaveClass('flex', 'h-full', 'w-full') // Should still have default classes
		})
	})

	describe('Complex Command Structure', () => {
		it('renders complex command with groups and separators', () => {
			render(
				<Command>
					<CommandInput placeholder="Search commands..." />
					<CommandList>
						<CommandGroup heading="File">
							<CommandItem>
								New File
								<CommandShortcut>⌘N</CommandShortcut>
							</CommandItem>
							<CommandItem>
								Open File
								<CommandShortcut>⌘O</CommandShortcut>
							</CommandItem>
						</CommandGroup>
						<CommandSeparator />
						<CommandGroup heading="Edit">
							<CommandItem>
								Copy
								<CommandShortcut>⌘C</CommandShortcut>
							</CommandItem>
							<CommandItem>
								Paste
								<CommandShortcut>⌘V</CommandShortcut>
							</CommandItem>
						</CommandGroup>
						<CommandEmpty>No commands found</CommandEmpty>
					</CommandList>
				</Command>,
			)

			expect(screen.getByText('File')).toBeInTheDocument()
			expect(screen.getByText('Edit')).toBeInTheDocument()
			expect(screen.getByText('New File')).toBeInTheDocument()
			expect(screen.getByText('⌘N')).toBeInTheDocument()
			expect(screen.getByText('Copy')).toBeInTheDocument()
			expect(screen.getByText('⌘C')).toBeInTheDocument()
		})
	})
})
