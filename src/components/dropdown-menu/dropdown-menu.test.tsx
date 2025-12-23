import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from './dropdown-menu'

describe('DropdownMenu', () => {
	describe('DropdownMenu Component', () => {
		it('renders dropdown menu with trigger and content', async () => {
			const user = userEvent.setup()

			render(
				<DropdownMenu>
					<DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>Item 1</DropdownMenuItem>
						<DropdownMenuItem>Item 2</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>,
			)

			const trigger = screen.getByRole('button', { name: 'Open Menu' })
			expect(trigger).toBeInTheDocument()

			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByText('Item 1')).toBeInTheDocument()
				expect(screen.getByText('Item 2')).toBeInTheDocument()
			})
		})

		it('does not render content when closed', () => {
			render(
				<DropdownMenu open={false}>
					<DropdownMenuTrigger>Closed Menu</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>Hidden Item</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>,
			)

			expect(screen.queryByText('Hidden Item')).not.toBeInTheDocument()
		})

		it('calls onOpenChange when menu state changes', async () => {
			const handleOpenChange = vi.fn()
			const user = userEvent.setup()

			render(
				<DropdownMenu onOpenChange={handleOpenChange}>
					<DropdownMenuTrigger>Toggle Menu</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>Item</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>,
			)

			const trigger = screen.getByRole('button', { name: 'Toggle Menu' })
			await user.click(trigger)

			expect(handleOpenChange).toHaveBeenCalledWith(true)
		})
	})

	describe('DropdownMenuTrigger Component', () => {
		it('renders trigger button', () => {
			render(
				<DropdownMenu>
					<DropdownMenuTrigger>Click to open</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>Item</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>,
			)

			const trigger = screen.getByRole('button', { name: 'Click to open' })
			expect(trigger).toBeInTheDocument()
		})

		it('can render as different element using asChild', () => {
			render(
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<button type="button">Custom Trigger</button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>Item</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>,
			)

			const trigger = screen.getByRole('button', { name: 'Custom Trigger' })
			expect(trigger).toBeInTheDocument()
		})
	})

	describe('DropdownMenuContent Component', () => {
		it('renders content with correct styling', async () => {
			const user = userEvent.setup()

			render(
				<DropdownMenu>
					<DropdownMenuTrigger>Open</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>Content Item</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>,
			)

			const trigger = screen.getByRole('button', { name: 'Open' })
			await user.click(trigger)

			await waitFor(() => {
				const content = screen.getByRole('menu')
				expect(content).toBeInTheDocument()
				expect(content).toHaveClass(
					'z-50',
					'min-w-[8rem]',
					'overflow-hidden',
					'rounded-md',
					'border',
					'bg-popover',
					'p-1',
					'text-popover-foreground',
					'shadow-md',
				)
			})
		})

		it('renders with custom className', async () => {
			const user = userEvent.setup()

			render(
				<DropdownMenu>
					<DropdownMenuTrigger>Open</DropdownMenuTrigger>
					<DropdownMenuContent className="custom-content">
						<DropdownMenuItem>Item</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>,
			)

			const trigger = screen.getByRole('button', { name: 'Open' })
			await user.click(trigger)

			await waitFor(() => {
				const content = screen.getByRole('menu')
				expect(content).toHaveClass('custom-content')
			})
		})

		it('uses custom sideOffset', async () => {
			const user = userEvent.setup()

			render(
				<DropdownMenu>
					<DropdownMenuTrigger>Open</DropdownMenuTrigger>
					<DropdownMenuContent sideOffset={10}>
						<DropdownMenuItem>Item</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>,
			)

			const trigger = screen.getByRole('button', { name: 'Open' })
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByRole('menu')).toBeInTheDocument()
			})
		})
	})

	describe('DropdownMenuItem Component', () => {
		it('renders menu item with correct styling', async () => {
			const user = userEvent.setup()

			render(
				<DropdownMenu>
					<DropdownMenuTrigger>Open</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>Test Item</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>,
			)

			const trigger = screen.getByRole('button', { name: 'Open' })
			await user.click(trigger)

			await waitFor(() => {
				const item = screen.getByRole('menuitem', { name: 'Test Item' })
				expect(item).toBeInTheDocument()
				expect(item).toHaveClass(
					'relative',
					'flex',
					'cursor-default',
					'select-none',
					'items-center',
					'gap-2',
					'rounded-sm',
					'px-2',
					'py-1.5',
					'text-sm',
					'outline-none',
				)
			})
		})

		it('handles click events', async () => {
			const handleClick = vi.fn()
			const user = userEvent.setup()

			render(
				<DropdownMenu>
					<DropdownMenuTrigger>Open</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem onClick={handleClick}>Clickable Item</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>,
			)

			const trigger = screen.getByRole('button', { name: 'Open' })
			await user.click(trigger)

			await waitFor(() => {
				const item = screen.getByRole('menuitem', { name: 'Clickable Item' })
				expect(item).toBeInTheDocument()
			})

			const item = screen.getByRole('menuitem', { name: 'Clickable Item' })
			await user.click(item)

			expect(handleClick).toHaveBeenCalledOnce()
		})

		it('supports disabled state', async () => {
			const user = userEvent.setup()

			render(
				<DropdownMenu>
					<DropdownMenuTrigger>Open</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem disabled>Disabled Item</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>,
			)

			const trigger = screen.getByRole('button', { name: 'Open' })
			await user.click(trigger)

			await waitFor(() => {
				const item = screen.getByRole('menuitem', { name: 'Disabled Item' })
				expect(item).toHaveAttribute('data-disabled')
				expect(item).toHaveAttribute('aria-disabled', 'true')
			})
		})

		it('renders with inset styling', async () => {
			const user = userEvent.setup()

			render(
				<DropdownMenu>
					<DropdownMenuTrigger>Open</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem inset>Inset Item</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>,
			)

			const trigger = screen.getByRole('button', { name: 'Open' })
			await user.click(trigger)

			await waitFor(() => {
				const item = screen.getByRole('menuitem', { name: 'Inset Item' })
				expect(item).toHaveClass('pl-8')
			})
		})

		it('renders with custom className', async () => {
			const user = userEvent.setup()

			render(
				<DropdownMenu>
					<DropdownMenuTrigger>Open</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem className="custom-item">Custom Item</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>,
			)

			const trigger = screen.getByRole('button', { name: 'Open' })
			await user.click(trigger)

			await waitFor(() => {
				const item = screen.getByRole('menuitem', { name: 'Custom Item' })
				expect(item).toHaveClass('custom-item')
			})
		})
	})

	describe('DropdownMenuCheckboxItem Component', () => {
		it('renders checkbox item with check indicator when checked', async () => {
			const user = userEvent.setup()

			render(
				<DropdownMenu>
					<DropdownMenuTrigger>Open</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuCheckboxItem checked>Checked Item</DropdownMenuCheckboxItem>
					</DropdownMenuContent>
				</DropdownMenu>,
			)

			const trigger = screen.getByRole('button', { name: 'Open' })
			await user.click(trigger)

			await waitFor(() => {
				const item = screen.getByRole('menuitemcheckbox', { name: 'Checked Item' })
				expect(item).toBeInTheDocument()
				expect(item).toHaveAttribute('data-state', 'checked')
			})
		})

		it('renders checkbox item without check indicator when unchecked', async () => {
			const user = userEvent.setup()

			render(
				<DropdownMenu>
					<DropdownMenuTrigger>Open</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuCheckboxItem checked={false}>
							Unchecked Item
						</DropdownMenuCheckboxItem>
					</DropdownMenuContent>
				</DropdownMenu>,
			)

			const trigger = screen.getByRole('button', { name: 'Open' })
			await user.click(trigger)

			await waitFor(() => {
				const item = screen.getByRole('menuitemcheckbox', { name: 'Unchecked Item' })
				expect(item).toBeInTheDocument()
				expect(item).toHaveAttribute('data-state', 'unchecked')
			})
		})

		it('handles onCheckedChange events', async () => {
			const handleCheckedChange = vi.fn()
			const user = userEvent.setup()

			render(
				<DropdownMenu>
					<DropdownMenuTrigger>Open</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuCheckboxItem
							checked={false}
							onCheckedChange={handleCheckedChange}
						>
							Toggle Item
						</DropdownMenuCheckboxItem>
					</DropdownMenuContent>
				</DropdownMenu>,
			)

			const trigger = screen.getByRole('button', { name: 'Open' })
			await user.click(trigger)

			await waitFor(() => {
				const item = screen.getByRole('menuitemcheckbox', { name: 'Toggle Item' })
				expect(item).toBeInTheDocument()
			})

			const item = screen.getByRole('menuitemcheckbox', { name: 'Toggle Item' })
			await user.click(item)

			expect(handleCheckedChange).toHaveBeenCalledWith(true)
		})

		it('applies correct styling', async () => {
			const user = userEvent.setup()

			render(
				<DropdownMenu>
					<DropdownMenuTrigger>Open</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuCheckboxItem>Checkbox Item</DropdownMenuCheckboxItem>
					</DropdownMenuContent>
				</DropdownMenu>,
			)

			const trigger = screen.getByRole('button', { name: 'Open' })
			await user.click(trigger)

			await waitFor(() => {
				const item = screen.getByRole('menuitemcheckbox', { name: 'Checkbox Item' })
				expect(item).toHaveClass(
					'relative',
					'flex',
					'cursor-default',
					'select-none',
					'items-center',
					'rounded-sm',
					'py-1.5',
					'pl-8',
					'pr-2',
					'text-sm',
				)
			})
		})
	})

	describe('DropdownMenuRadioGroup and DropdownMenuRadioItem Components', () => {
		it('renders radio group with radio items', async () => {
			const user = userEvent.setup()

			render(
				<DropdownMenu>
					<DropdownMenuTrigger>Open</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuRadioGroup value="option1">
							<DropdownMenuRadioItem value="option1">Option 1</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value="option2">Option 2</DropdownMenuRadioItem>
						</DropdownMenuRadioGroup>
					</DropdownMenuContent>
				</DropdownMenu>,
			)

			const trigger = screen.getByRole('button', { name: 'Open' })
			await user.click(trigger)

			await waitFor(() => {
				const option1 = screen.getByRole('menuitemradio', { name: 'Option 1' })
				const option2 = screen.getByRole('menuitemradio', { name: 'Option 2' })

				expect(option1).toBeInTheDocument()
				expect(option2).toBeInTheDocument()
				expect(option1).toHaveAttribute('data-state', 'checked')
				expect(option2).toHaveAttribute('data-state', 'unchecked')
			})
		})

		it('handles onValueChange events', async () => {
			const handleValueChange = vi.fn()
			const user = userEvent.setup()

			render(
				<DropdownMenu>
					<DropdownMenuTrigger>Open</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuRadioGroup value="option1" onValueChange={handleValueChange}>
							<DropdownMenuRadioItem value="option1">Option 1</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value="option2">Option 2</DropdownMenuRadioItem>
						</DropdownMenuRadioGroup>
					</DropdownMenuContent>
				</DropdownMenu>,
			)

			const trigger = screen.getByRole('button', { name: 'Open' })
			await user.click(trigger)

			await waitFor(() => {
				const option2 = screen.getByRole('menuitemradio', { name: 'Option 2' })
				expect(option2).toBeInTheDocument()
			})

			const option2 = screen.getByRole('menuitemradio', { name: 'Option 2' })
			await user.click(option2)

			expect(handleValueChange).toHaveBeenCalledWith('option2')
		})

		it('applies correct styling to radio items', async () => {
			const user = userEvent.setup()

			render(
				<DropdownMenu>
					<DropdownMenuTrigger>Open</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuRadioGroup value="option1">
							<DropdownMenuRadioItem value="option1">Radio Item</DropdownMenuRadioItem>
						</DropdownMenuRadioGroup>
					</DropdownMenuContent>
				</DropdownMenu>,
			)

			const trigger = screen.getByRole('button', { name: 'Open' })
			await user.click(trigger)

			await waitFor(() => {
				const item = screen.getByRole('menuitemradio', { name: 'Radio Item' })
				expect(item).toHaveClass(
					'relative',
					'flex',
					'cursor-default',
					'select-none',
					'items-center',
					'rounded-sm',
					'py-1.5',
					'pl-8',
					'pr-2',
					'text-sm',
				)
			})
		})
	})

	describe('DropdownMenuLabel Component', () => {
		it('renders label with correct styling', async () => {
			const user = userEvent.setup()

			render(
				<DropdownMenu>
					<DropdownMenuTrigger>Open</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>Menu Label</DropdownMenuLabel>
						<DropdownMenuItem>Item</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>,
			)

			const trigger = screen.getByRole('button', { name: 'Open' })
			await user.click(trigger)

			await waitFor(() => {
				const label = screen.getByText('Menu Label')
				expect(label).toBeInTheDocument()
				expect(label).toHaveClass('px-2', 'py-1.5', 'text-sm', 'font-semibold')
			})
		})

		it('renders with inset styling', async () => {
			const user = userEvent.setup()

			render(
				<DropdownMenu>
					<DropdownMenuTrigger>Open</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel inset>Inset Label</DropdownMenuLabel>
						<DropdownMenuItem>Item</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>,
			)

			const trigger = screen.getByRole('button', { name: 'Open' })
			await user.click(trigger)

			await waitFor(() => {
				const label = screen.getByText('Inset Label')
				expect(label).toHaveClass('pl-8')
			})
		})

		it('renders with custom className', async () => {
			const user = userEvent.setup()

			render(
				<DropdownMenu>
					<DropdownMenuTrigger>Open</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel className="custom-label">Custom Label</DropdownMenuLabel>
						<DropdownMenuItem>Item</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>,
			)

			const trigger = screen.getByRole('button', { name: 'Open' })
			await user.click(trigger)

			await waitFor(() => {
				const label = screen.getByText('Custom Label')
				expect(label).toHaveClass('custom-label')
			})
		})
	})

	describe('DropdownMenuSeparator Component', () => {
		it('renders separator with correct styling', async () => {
			const user = userEvent.setup()

			render(
				<DropdownMenu>
					<DropdownMenuTrigger>Open</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>Item 1</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Item 2</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>,
			)

			const trigger = screen.getByRole('button', { name: 'Open' })
			await user.click(trigger)

			await waitFor(() => {
				const separator = screen.getByRole('separator')
				expect(separator).toBeInTheDocument()
				expect(separator).toHaveClass('-mx-1', 'my-1', 'h-px', 'bg-muted')
			})
		})

		it('renders with custom className', async () => {
			const user = userEvent.setup()

			render(
				<DropdownMenu>
					<DropdownMenuTrigger>Open</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>Item 1</DropdownMenuItem>
						<DropdownMenuSeparator className="custom-separator" />
						<DropdownMenuItem>Item 2</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>,
			)

			const trigger = screen.getByRole('button', { name: 'Open' })
			await user.click(trigger)

			await waitFor(() => {
				const separator = screen.getByRole('separator')
				expect(separator).toHaveClass('custom-separator')
			})
		})
	})

	describe('DropdownMenuShortcut Component', () => {
		it('renders shortcut with correct styling', async () => {
			const user = userEvent.setup()

			render(
				<DropdownMenu>
					<DropdownMenuTrigger>Open</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>
							Save File
							<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>,
			)

			const trigger = screen.getByRole('button', { name: 'Open' })
			await user.click(trigger)

			await waitFor(() => {
				const shortcut = screen.getByText('⌘S')
				expect(shortcut).toBeInTheDocument()
				expect(shortcut).toHaveClass(
					'ml-auto',
					'text-xs',
					'tracking-widest',
					'opacity-60',
				)
			})
		})

		it('renders with custom className', async () => {
			const user = userEvent.setup()

			render(
				<DropdownMenu>
					<DropdownMenuTrigger>Open</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>
							Copy
							<DropdownMenuShortcut className="custom-shortcut">⌘C</DropdownMenuShortcut>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>,
			)

			const trigger = screen.getByRole('button', { name: 'Open' })
			await user.click(trigger)

			await waitFor(() => {
				const shortcut = screen.getByText('⌘C')
				expect(shortcut).toHaveClass('custom-shortcut')
			})
		})
	})

	describe('DropdownMenuGroup Component', () => {
		it('renders group with items', async () => {
			const user = userEvent.setup()

			render(
				<DropdownMenu>
					<DropdownMenuTrigger>Open</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuGroup>
							<DropdownMenuItem>Group Item 1</DropdownMenuItem>
							<DropdownMenuItem>Group Item 2</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>,
			)

			const trigger = screen.getByRole('button', { name: 'Open' })
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByText('Group Item 1')).toBeInTheDocument()
				expect(screen.getByText('Group Item 2')).toBeInTheDocument()
			})
		})
	})

	describe('DropdownMenuSub Components', () => {
		it('renders submenu with trigger and content', async () => {
			const user = userEvent.setup()

			render(
				<DropdownMenu>
					<DropdownMenuTrigger>Open</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>Regular Item</DropdownMenuItem>
						<DropdownMenuSub>
							<DropdownMenuSubTrigger>More Options</DropdownMenuSubTrigger>
							<DropdownMenuSubContent>
								<DropdownMenuItem>Sub Item 1</DropdownMenuItem>
								<DropdownMenuItem>Sub Item 2</DropdownMenuItem>
							</DropdownMenuSubContent>
						</DropdownMenuSub>
					</DropdownMenuContent>
				</DropdownMenu>,
			)

			const trigger = screen.getByRole('button', { name: 'Open' })
			await user.click(trigger)

			await waitFor(() => {
				const subTrigger = screen.getByText('More Options')
				expect(subTrigger).toBeInTheDocument()
				expect(subTrigger).toHaveClass(
					'flex',
					'cursor-default',
					'gap-2',
					'select-none',
					'items-center',
					'rounded-sm',
					'px-2',
					'py-1.5',
					'text-sm',
				)
			})

			// Hover over submenu trigger to open submenu
			const subTrigger = screen.getByText('More Options')
			await user.hover(subTrigger)

			await waitFor(() => {
				expect(screen.getByText('Sub Item 1')).toBeInTheDocument()
				expect(screen.getByText('Sub Item 2')).toBeInTheDocument()
			})
		})

		it('renders submenu trigger with inset styling', async () => {
			const user = userEvent.setup()

			render(
				<DropdownMenu>
					<DropdownMenuTrigger>Open</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuSub>
							<DropdownMenuSubTrigger inset>Inset Sub Trigger</DropdownMenuSubTrigger>
							<DropdownMenuSubContent>
								<DropdownMenuItem>Sub Item</DropdownMenuItem>
							</DropdownMenuSubContent>
						</DropdownMenuSub>
					</DropdownMenuContent>
				</DropdownMenu>,
			)

			const trigger = screen.getByRole('button', { name: 'Open' })
			await user.click(trigger)

			await waitFor(() => {
				const subTrigger = screen.getByText('Inset Sub Trigger')
				expect(subTrigger).toHaveClass('pl-8')
			})
		})

		it('renders submenu content with correct styling', async () => {
			const user = userEvent.setup()

			render(
				<DropdownMenu>
					<DropdownMenuTrigger>Open</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuSub>
							<DropdownMenuSubTrigger>Sub Menu</DropdownMenuSubTrigger>
							<DropdownMenuSubContent className="custom-sub-content">
								<DropdownMenuItem>Sub Item</DropdownMenuItem>
							</DropdownMenuSubContent>
						</DropdownMenuSub>
					</DropdownMenuContent>
				</DropdownMenu>,
			)

			const trigger = screen.getByRole('button', { name: 'Open' })
			await user.click(trigger)

			const subTrigger = screen.getByText('Sub Menu')
			await user.hover(subTrigger)

			await waitFor(() => {
				const subContent = screen.getByText('Sub Item').closest('[role="menu"]')
				expect(subContent).toHaveClass('custom-sub-content')
				expect(subContent).toHaveClass(
					'z-50',
					'min-w-[8rem]',
					'overflow-hidden',
					'rounded-md',
					'border',
					'bg-popover',
					'p-1',
				)
			})
		})
	})

	describe('Keyboard Navigation', () => {
		it('supports arrow key navigation', async () => {
			const user = userEvent.setup()

			render(
				<DropdownMenu>
					<DropdownMenuTrigger>Open</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>Item 1</DropdownMenuItem>
						<DropdownMenuItem>Item 2</DropdownMenuItem>
						<DropdownMenuItem>Item 3</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>,
			)

			const trigger = screen.getByRole('button', { name: 'Open' })
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByText('Item 1')).toBeInTheDocument()
			})

			await user.keyboard('{ArrowDown}')
			await user.keyboard('{ArrowDown}')

			// The second item should be highlighted (check for data-highlighted attribute)
			const item2 = screen.getByRole('menuitem', { name: 'Item 2' })
			expect(item2).toHaveAttribute('data-highlighted')
		})

		it('supports Enter key to select item', async () => {
			const handleClick = vi.fn()
			const user = userEvent.setup()

			render(
				<DropdownMenu>
					<DropdownMenuTrigger>Open</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem onClick={handleClick}>Selectable Item</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>,
			)

			const trigger = screen.getByRole('button', { name: 'Open' })
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByText('Selectable Item')).toBeInTheDocument()
			})

			await user.keyboard('{ArrowDown}')
			await user.keyboard('{Enter}')

			expect(handleClick).toHaveBeenCalledOnce()
		})

		it('closes menu when Escape key is pressed', async () => {
			const user = userEvent.setup()

			render(
				<DropdownMenu>
					<DropdownMenuTrigger>Open</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>Item</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>,
			)

			const trigger = screen.getByRole('button', { name: 'Open' })
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByText('Item')).toBeInTheDocument()
			})

			await user.keyboard('{Escape}')

			await waitFor(() => {
				expect(screen.queryByText('Item')).not.toBeInTheDocument()
			})
		})
	})

	describe('Accessibility', () => {
		it('has proper ARIA attributes', async () => {
			const user = userEvent.setup()

			render(
				<DropdownMenu>
					<DropdownMenuTrigger>Accessible Menu</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>Item 1</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>,
			)

			const trigger = screen.getByRole('button', { name: 'Accessible Menu' })
			expect(trigger).toHaveAttribute('aria-haspopup', 'menu')

			await user.click(trigger)

			await waitFor(() => {
				const menu = screen.getByRole('menu')
				expect(menu).toBeInTheDocument()
			})
		})

		it('supports aria-label on trigger', () => {
			render(
				<DropdownMenu>
					<DropdownMenuTrigger aria-label="Custom menu trigger">Menu</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>Item</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>,
			)

			const trigger = screen.getByLabelText('Custom menu trigger')
			expect(trigger).toBeInTheDocument()
		})
	})

	describe('Complete Menu Structure', () => {
		it('renders complex menu with all components', async () => {
			const user = userEvent.setup()

			render(
				<DropdownMenu>
					<DropdownMenuTrigger>Complete Menu</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>File Operations</DropdownMenuLabel>
						<DropdownMenuGroup>
							<DropdownMenuItem>
								New File
								<DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
							</DropdownMenuItem>
							<DropdownMenuItem>
								Open File
								<DropdownMenuShortcut>⌘O</DropdownMenuShortcut>
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuCheckboxItem checked>Show Hidden Files</DropdownMenuCheckboxItem>
						<DropdownMenuSeparator />
						<DropdownMenuRadioGroup value="list">
							<DropdownMenuRadioItem value="list">List View</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value="grid">Grid View</DropdownMenuRadioItem>
						</DropdownMenuRadioGroup>
						<DropdownMenuSeparator />
						<DropdownMenuSub>
							<DropdownMenuSubTrigger>More Options</DropdownMenuSubTrigger>
							<DropdownMenuSubContent>
								<DropdownMenuItem>Sub Option 1</DropdownMenuItem>
								<DropdownMenuItem>Sub Option 2</DropdownMenuItem>
							</DropdownMenuSubContent>
						</DropdownMenuSub>
					</DropdownMenuContent>
				</DropdownMenu>,
			)

			const trigger = screen.getByRole('button', { name: 'Complete Menu' })
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByText('File Operations')).toBeInTheDocument()
				expect(screen.getByText('New File')).toBeInTheDocument()
				expect(screen.getByText('⌘N')).toBeInTheDocument()
				expect(screen.getByText('Show Hidden Files')).toBeInTheDocument()
				expect(screen.getByText('List View')).toBeInTheDocument()
				expect(screen.getByText('More Options')).toBeInTheDocument()
			})
		})
	})

	describe('Edge Cases', () => {
		it('handles menu without items', async () => {
			const user = userEvent.setup()

			render(
				<DropdownMenu>
					<DropdownMenuTrigger>Empty Menu</DropdownMenuTrigger>
					<DropdownMenuContent />
				</DropdownMenu>,
			)

			const trigger = screen.getByRole('button', { name: 'Empty Menu' })
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByRole('menu')).toBeInTheDocument()
			})
		})

		it('handles undefined className gracefully', async () => {
			const user = userEvent.setup()

			render(
				<DropdownMenu>
					<DropdownMenuTrigger>Menu</DropdownMenuTrigger>
					<DropdownMenuContent className={undefined}>
						<DropdownMenuItem className={undefined}>Item</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>,
			)

			const trigger = screen.getByRole('button', { name: 'Menu' })
			await user.click(trigger)

			await waitFor(() => {
				const menu = screen.getByRole('menu')
				const item = screen.getByRole('menuitem', { name: 'Item' })
				expect(menu).toHaveClass('z-50', 'min-w-[8rem]') // Should still have default classes
				expect(item).toHaveClass('relative', 'flex') // Should still have default classes
			})
		})
	})

	describe('Controlled vs Uncontrolled', () => {
		it('works as controlled component', async () => {
			const ControlledMenu = () => {
				const [open, setOpen] = React.useState(false)

				return (
					<DropdownMenu open={open} onOpenChange={setOpen}>
						<DropdownMenuTrigger>Controlled Menu</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>Controlled Item</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				)
			}

			const user = userEvent.setup()
			render(<ControlledMenu />)

			const trigger = screen.getByRole('button', { name: 'Controlled Menu' })
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByText('Controlled Item')).toBeInTheDocument()
			})

			await user.keyboard('{Escape}')

			await waitFor(() => {
				expect(screen.queryByText('Controlled Item')).not.toBeInTheDocument()
			})
		})

		it('works as uncontrolled component', async () => {
			const user = userEvent.setup()

			render(
				<DropdownMenu>
					<DropdownMenuTrigger>Uncontrolled Menu</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>Uncontrolled Item</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>,
			)

			const trigger = screen.getByRole('button', { name: 'Uncontrolled Menu' })
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByText('Uncontrolled Item')).toBeInTheDocument()
			})
		})
	})
})
