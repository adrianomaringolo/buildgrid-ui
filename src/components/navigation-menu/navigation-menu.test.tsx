import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from './navigation-menu'

describe('NavigationMenu', () => {
	describe('NavigationMenu Component', () => {
		it('renders navigation menu with default props', () => {
			render(
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Menu Item</NavigationMenuTrigger>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>,
			)

			const menu = screen.getByText('Menu Item').closest('[data-slot="navigation-menu"]')
			expect(menu).toBeInTheDocument()
			expect(menu).toHaveClass(
				'group/navigation-menu',
				'relative',
				'flex',
				'max-w-max',
				'flex-1',
				'items-center',
				'justify-center',
			)
		})

		it('renders with custom className', () => {
			render(
				<NavigationMenu className="custom-nav">
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Menu Item</NavigationMenuTrigger>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>,
			)

			const menu = screen.getByText('Menu Item').closest('[data-slot="navigation-menu"]')
			expect(menu).toHaveClass('custom-nav')
		})

		it('renders with viewport by default', () => {
			render(
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Menu Item</NavigationMenuTrigger>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>,
			)

			const menu = screen.getByText('Menu Item').closest('[data-slot="navigation-menu"]')
			expect(menu).toHaveAttribute('data-viewport', 'true')
		})

		it('renders without viewport when viewport=false', () => {
			render(
				<NavigationMenu viewport={false}>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Menu Item</NavigationMenuTrigger>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>,
			)

			const menu = screen.getByText('Menu Item').closest('[data-slot="navigation-menu"]')
			expect(menu).toHaveAttribute('data-viewport', 'false')
		})

		it('forwards HTML attributes correctly', () => {
			render(
				<NavigationMenu data-testid="test-nav" id="nav-id">
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Menu Item</NavigationMenuTrigger>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>,
			)

			const menu = screen.getByTestId('test-nav')
			expect(menu).toHaveAttribute('id', 'nav-id')
		})
	})

	describe('NavigationMenuList Component', () => {
		it('renders list with correct styling', () => {
			render(
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Item 1</NavigationMenuTrigger>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Item 2</NavigationMenuTrigger>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>,
			)

			const list = document.querySelector('[data-slot="navigation-menu-list"]')
			expect(list).toBeInTheDocument()
			expect(list).toHaveClass(
				'group',
				'flex',
				'flex-1',
				'list-none',
				'items-center',
				'justify-center',
				'gap-1',
			)
		})

		it('renders with custom className', () => {
			render(
				<NavigationMenu>
					<NavigationMenuList className="custom-list">
						<NavigationMenuItem>
							<NavigationMenuTrigger>Menu Item</NavigationMenuTrigger>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>,
			)

			const list = document.querySelector('[data-slot="navigation-menu-list"]')
			expect(list).toHaveClass('custom-list')
		})
	})

	describe('NavigationMenuItem Component', () => {
		it('renders menu item with correct styling', () => {
			render(
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Menu Item</NavigationMenuTrigger>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>,
			)

			const item = document.querySelector('[data-slot="navigation-menu-item"]')
			expect(item).toBeInTheDocument()
			expect(item).toHaveClass('relative')
		})

		it('renders with custom className', () => {
			render(
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem className="custom-item">
							<NavigationMenuTrigger>Menu Item</NavigationMenuTrigger>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>,
			)

			const item = document.querySelector('[data-slot="navigation-menu-item"]')
			expect(item).toHaveClass('custom-item')
		})
	})

	describe('NavigationMenuTrigger Component', () => {
		it('renders trigger with correct styling and chevron', () => {
			render(
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Trigger Item</NavigationMenuTrigger>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>,
			)

			const trigger = screen.getByText('Trigger Item')
			expect(trigger).toBeInTheDocument()
			expect(trigger).toHaveClass(
				'group',
				'inline-flex',
				'h-9',
				'w-max',
				'items-center',
				'justify-center',
				'rounded-md',
				'bg-background',
				'px-4',
				'py-2',
				'text-sm',
				'font-medium',
			)

			// Check for chevron icon
			const chevron = trigger.querySelector('svg')
			expect(chevron).toBeInTheDocument()
			expect(chevron).toHaveClass('ml-1', 'size-3')
		})

		it('renders with custom className', () => {
			render(
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger className="custom-trigger">
								Custom Trigger
							</NavigationMenuTrigger>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>,
			)

			const trigger = screen.getByText('Custom Trigger')
			expect(trigger).toHaveClass('custom-trigger')
		})

		it('handles click events', async () => {
			const handleClick = vi.fn()
			const user = userEvent.setup()

			render(
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger onClick={handleClick}>
								Clickable Trigger
							</NavigationMenuTrigger>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>,
			)

			const trigger = screen.getByText('Clickable Trigger')
			await user.click(trigger)

			expect(handleClick).toHaveBeenCalledOnce()
		})
	})

	describe('NavigationMenuContent Component', () => {
		it('renders content with correct styling', async () => {
			const user = userEvent.setup()

			render(
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Menu</NavigationMenuTrigger>
							<NavigationMenuContent>
								<div>Content Item</div>
							</NavigationMenuContent>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>,
			)

			const trigger = screen.getByText('Menu')
			await user.click(trigger)

			await waitFor(() => {
				const content = document.querySelector('[data-slot="navigation-menu-content"]')
				expect(content).toBeInTheDocument()
				expect(content).toHaveClass('top-0', 'left-0', 'w-full', 'p-2', 'pr-2.5')
			})
		})

		it('renders with custom className', async () => {
			const user = userEvent.setup()

			render(
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Menu</NavigationMenuTrigger>
							<NavigationMenuContent className="custom-content">
								<div>Content Item</div>
							</NavigationMenuContent>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>,
			)

			const trigger = screen.getByText('Menu')
			await user.click(trigger)

			await waitFor(() => {
				const content = document.querySelector('[data-slot="navigation-menu-content"]')
				expect(content).toHaveClass('custom-content')
			})
		})

		it('shows content when trigger is activated', async () => {
			const user = userEvent.setup()

			render(
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Show Content</NavigationMenuTrigger>
							<NavigationMenuContent>
								<div>Hidden Content</div>
							</NavigationMenuContent>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>,
			)

			const trigger = screen.getByText('Show Content')
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByText('Hidden Content')).toBeInTheDocument()
			})
		})
	})

	describe('NavigationMenuLink Component', () => {
		it('renders link with correct styling', () => {
			render(
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuLink href="/test">Link Item</NavigationMenuLink>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>,
			)

			const link = screen.getByText('Link Item')
			expect(link).toBeInTheDocument()
			expect(link).toHaveClass(
				'flex',
				'flex-col',
				'gap-1',
				'rounded-sm',
				'p-2',
				'text-sm',
				'transition-all',
				'outline-none',
			)
			expect(link).toHaveAttribute('href', '/test')
		})

		it('renders with custom className', () => {
			render(
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuLink href="/test" className="custom-link">
								Custom Link
							</NavigationMenuLink>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>,
			)

			const link = screen.getByText('Custom Link')
			expect(link).toHaveClass('custom-link')
		})

		it('handles active state', () => {
			render(
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuLink href="/test" data-active="true">
								Active Link
							</NavigationMenuLink>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>,
			)

			const link = screen.getByText('Active Link')
			expect(link).toHaveAttribute('data-active', 'true')
		})

		it('renders with icon content', () => {
			const TestIcon = () => <svg data-testid="test-icon" />

			render(
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuLink href="/test">
								<TestIcon />
								Link with Icon
							</NavigationMenuLink>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>,
			)

			expect(screen.getByTestId('test-icon')).toBeInTheDocument()
			expect(screen.getByText('Link with Icon')).toBeInTheDocument()
		})
	})

	describe('navigationMenuTriggerStyle Function', () => {
		it('returns correct class string', () => {
			const classes = navigationMenuTriggerStyle()
			expect(classes).toContain('group')
			expect(classes).toContain('inline-flex')
			expect(classes).toContain('h-9')
			expect(classes).toContain('w-max')
			expect(classes).toContain('items-center')
			expect(classes).toContain('justify-center')
		})

		it('can be used with custom className', () => {
			render(
				<button className={navigationMenuTriggerStyle({ className: 'custom-class' })}>
					Custom Button
				</button>,
			)

			const button = screen.getByText('Custom Button')
			expect(button).toHaveClass('custom-class')
			expect(button).toHaveClass('group', 'inline-flex') // Should still have base classes
		})
	})

	describe('Keyboard Navigation', () => {
		it('supports keyboard navigation between items', async () => {
			const user = userEvent.setup()

			render(
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Item 1</NavigationMenuTrigger>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Item 2</NavigationMenuTrigger>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>,
			)

			const item1 = screen.getByText('Item 1')
			const item2 = screen.getByText('Item 2')

			item1.focus()
			await user.keyboard('{Tab}')

			expect(item2).toHaveFocus()
		})

		it('supports Enter key to activate trigger', async () => {
			const user = userEvent.setup()

			render(
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Keyboard Menu</NavigationMenuTrigger>
							<NavigationMenuContent>
								<div>Keyboard Content</div>
							</NavigationMenuContent>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>,
			)

			const trigger = screen.getByText('Keyboard Menu')
			trigger.focus()
			await user.keyboard('{Enter}')

			await waitFor(() => {
				expect(screen.getByText('Keyboard Content')).toBeInTheDocument()
			})
		})

		it('supports Escape key to close content', async () => {
			const user = userEvent.setup()

			render(
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Escapable Menu</NavigationMenuTrigger>
							<NavigationMenuContent>
								<div>Escapable Content</div>
							</NavigationMenuContent>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>,
			)

			const trigger = screen.getByText('Escapable Menu')
			await user.click(trigger)

			await waitFor(() => {
				expect(screen.getByText('Escapable Content')).toBeInTheDocument()
			})

			await user.keyboard('{Escape}')

			await waitFor(() => {
				expect(screen.queryByText('Escapable Content')).not.toBeInTheDocument()
			})
		})
	})

	describe('Mouse Interactions', () => {
		it('shows content on hover', async () => {
			const user = userEvent.setup()

			render(
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Hover Menu</NavigationMenuTrigger>
							<NavigationMenuContent>
								<div>Hover Content</div>
							</NavigationMenuContent>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>,
			)

			const trigger = screen.getByText('Hover Menu')
			await user.hover(trigger)

			await waitFor(() => {
				expect(screen.getByText('Hover Content')).toBeInTheDocument()
			})
		})

		it('hides content when mouse leaves', async () => {
			const user = userEvent.setup()

			render(
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Leave Menu</NavigationMenuTrigger>
							<NavigationMenuContent>
								<div>Leave Content</div>
							</NavigationMenuContent>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>,
			)

			const trigger = screen.getByText('Leave Menu')
			await user.hover(trigger)

			await waitFor(() => {
				expect(screen.getByText('Leave Content')).toBeInTheDocument()
			})

			await user.unhover(trigger)

			await waitFor(() => {
				expect(screen.queryByText('Leave Content')).not.toBeInTheDocument()
			})
		})
	})

	describe('Accessibility', () => {
		it('has proper ARIA attributes', () => {
			render(
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Accessible Menu</NavigationMenuTrigger>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>,
			)

			const menu = screen
				.getByText('Accessible Menu')
				.closest('[data-slot="navigation-menu"]')
			expect(menu).toBeInTheDocument()
		})

		it('supports aria-label', () => {
			render(
				<NavigationMenu aria-label="Main navigation">
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Menu Item</NavigationMenuTrigger>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>,
			)

			const menu = screen.getByLabelText('Main navigation')
			expect(menu).toBeInTheDocument()
		})

		it('has proper focus management', async () => {
			const user = userEvent.setup()

			render(
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Focus Menu</NavigationMenuTrigger>
							<NavigationMenuContent>
								<NavigationMenuLink href="/test">Focus Link</NavigationMenuLink>
							</NavigationMenuContent>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>,
			)

			const trigger = screen.getByText('Focus Menu')
			await user.click(trigger)

			await waitFor(() => {
				const link = screen.getByText('Focus Link')
				expect(link).toBeInTheDocument()
			})

			await user.keyboard('{Tab}')
			const link = screen.getByText('Focus Link')
			expect(link).toHaveFocus()
		})
	})

	describe('Complex Navigation Structure', () => {
		it('renders multi-level navigation', async () => {
			const user = userEvent.setup()

			render(
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Products</NavigationMenuTrigger>
							<NavigationMenuContent>
								<div>
									<NavigationMenuLink href="/product1">Product 1</NavigationMenuLink>
									<NavigationMenuLink href="/product2">Product 2</NavigationMenuLink>
								</div>
							</NavigationMenuContent>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Services</NavigationMenuTrigger>
							<NavigationMenuContent>
								<div>
									<NavigationMenuLink href="/service1">Service 1</NavigationMenuLink>
									<NavigationMenuLink href="/service2">Service 2</NavigationMenuLink>
								</div>
							</NavigationMenuContent>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuLink href="/about">About</NavigationMenuLink>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>,
			)

			// Test Products menu
			const productsMenu = screen.getByText('Products')
			await user.click(productsMenu)

			await waitFor(() => {
				expect(screen.getByText('Product 1')).toBeInTheDocument()
				expect(screen.getByText('Product 2')).toBeInTheDocument()
			})

			// Test direct link
			const aboutLink = screen.getByText('About')
			expect(aboutLink).toHaveAttribute('href', '/about')
		})
	})

	describe('Edge Cases', () => {
		it('handles empty navigation menu', () => {
			render(<NavigationMenu />)

			const menu = document.querySelector('[data-slot="navigation-menu"]')
			expect(menu).toBeInTheDocument()
		})

		it('handles navigation menu with only list', () => {
			render(
				<NavigationMenu>
					<NavigationMenuList />
				</NavigationMenu>,
			)

			const list = document.querySelector('[data-slot="navigation-menu-list"]')
			expect(list).toBeInTheDocument()
		})

		it('handles undefined className gracefully', () => {
			render(
				<NavigationMenu className={undefined}>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Menu Item</NavigationMenuTrigger>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>,
			)

			const menu = document.querySelector('[data-slot="navigation-menu"]')
			expect(menu).toHaveClass('group/navigation-menu', 'relative') // Should still have default classes
		})
	})

	describe('State Management', () => {
		it('maintains proper state when switching between menu items', async () => {
			const user = userEvent.setup()

			render(
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Menu 1</NavigationMenuTrigger>
							<NavigationMenuContent>
								<div>Content 1</div>
							</NavigationMenuContent>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Menu 2</NavigationMenuTrigger>
							<NavigationMenuContent>
								<div>Content 2</div>
							</NavigationMenuContent>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>,
			)

			// Open first menu
			const menu1 = screen.getByText('Menu 1')
			await user.click(menu1)

			await waitFor(() => {
				expect(screen.getByText('Content 1')).toBeInTheDocument()
			})

			// Test that menus exist
			expect(screen.getByText('Menu 2')).toBeInTheDocument()
		})
	})
})
