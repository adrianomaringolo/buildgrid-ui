import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs'

describe('Tabs', () => {
	describe('Tabs Root Component', () => {
		it('renders tabs without crashing', () => {
			render(
				<Tabs defaultValue="tab1">
					<TabsList>
						<TabsTrigger value="tab1">Tab 1</TabsTrigger>
					</TabsList>
					<TabsContent value="tab1">Content 1</TabsContent>
				</Tabs>,
			)

			const tabsRoot = document.querySelector('[data-slot="tabs"]')
			expect(tabsRoot).toBeInTheDocument()
		})

		it('renders with custom className', () => {
			render(
				<Tabs defaultValue="tab1" className="custom-tabs">
					<TabsList>
						<TabsTrigger value="tab1">Tab 1</TabsTrigger>
					</TabsList>
					<TabsContent value="tab1">Content 1</TabsContent>
				</Tabs>,
			)

			const tabsRoot = document.querySelector('[data-slot="tabs"]')
			expect(tabsRoot).toHaveClass('custom-tabs')
		})

		it('applies default flex column layout', () => {
			render(
				<Tabs defaultValue="tab1">
					<TabsList>
						<TabsTrigger value="tab1">Tab 1</TabsTrigger>
					</TabsList>
					<TabsContent value="tab1">Content 1</TabsContent>
				</Tabs>,
			)

			const tabsRoot = document.querySelector('[data-slot="tabs"]')
			expect(tabsRoot).toHaveClass('flex', 'flex-col', 'gap-2')
		})
	})

	describe('TabsList Component', () => {
		it('renders tabs list with default styling', () => {
			render(
				<Tabs defaultValue="tab1">
					<TabsList>
						<TabsTrigger value="tab1">Tab 1</TabsTrigger>
						<TabsTrigger value="tab2">Tab 2</TabsTrigger>
					</TabsList>
				</Tabs>,
			)

			const tabsList = document.querySelector('[data-slot="tabs-list"]')
			expect(tabsList).toBeInTheDocument()
			expect(tabsList).toHaveClass('bg-muted', 'text-muted-foreground')
		})

		it('renders with different sizes', () => {
			const sizes = ['sm', 'md', 'lg', 'xl'] as const

			sizes.forEach((size) => {
				const { unmount } = render(
					<Tabs defaultValue="tab1">
						<TabsList size={size}>
							<TabsTrigger value="tab1">Tab 1</TabsTrigger>
						</TabsList>
					</Tabs>,
				)

				const tabsList = document.querySelector('[data-slot="tabs-list"]')
				const sizeClasses = {
					sm: 'h-8',
					md: 'h-9',
					lg: 'h-10',
					xl: 'h-12',
				}

				expect(tabsList).toHaveClass(sizeClasses[size])
				unmount()
			})
		})

		it('uses medium size by default', () => {
			render(
				<Tabs defaultValue="tab1">
					<TabsList>
						<TabsTrigger value="tab1">Tab 1</TabsTrigger>
					</TabsList>
				</Tabs>,
			)

			const tabsList = document.querySelector('[data-slot="tabs-list"]')
			expect(tabsList).toHaveClass('h-9')
		})

		it('renders with custom className', () => {
			render(
				<Tabs defaultValue="tab1">
					<TabsList className="custom-list">
						<TabsTrigger value="tab1">Tab 1</TabsTrigger>
					</TabsList>
				</Tabs>,
			)

			const tabsList = document.querySelector('[data-slot="tabs-list"]')
			expect(tabsList).toHaveClass('custom-list')
		})
	})

	describe('TabsTrigger Component', () => {
		it('renders tab trigger with correct text', () => {
			render(
				<Tabs defaultValue="tab1">
					<TabsList>
						<TabsTrigger value="tab1">First Tab</TabsTrigger>
					</TabsList>
				</Tabs>,
			)

			expect(screen.getByText('First Tab')).toBeInTheDocument()
		})

		it('applies active state styling', () => {
			render(
				<Tabs defaultValue="tab1">
					<TabsList>
						<TabsTrigger value="tab1">Active Tab</TabsTrigger>
						<TabsTrigger value="tab2">Inactive Tab</TabsTrigger>
					</TabsList>
				</Tabs>,
			)

			const activeTab = screen.getByText('Active Tab')
			expect(activeTab).toHaveAttribute('data-state', 'active')
		})

		it('renders with different sizes', () => {
			const sizes = ['sm', 'md', 'lg', 'xl'] as const

			sizes.forEach((size) => {
				const { unmount } = render(
					<Tabs defaultValue="tab1">
						<TabsList>
							<TabsTrigger value="tab1" size={size}>
								Tab 1
							</TabsTrigger>
						</TabsList>
					</Tabs>,
				)

				const trigger = document.querySelector('[data-slot="tabs-trigger"]')
				const sizeClasses = {
					sm: 'px-2 py-1 text-xs',
					md: 'px-2.5 py-1.5 text-sm',
					lg: 'px-3 py-2 text-base',
					xl: 'px-3.5 py-2.5 text-lg',
				}

				const expectedClasses = sizeClasses[size].split(' ')
				expectedClasses.forEach((cls) => {
					expect(trigger).toHaveClass(cls)
				})
				unmount()
			})
		})

		it('uses medium size by default', () => {
			render(
				<Tabs defaultValue="tab1">
					<TabsList>
						<TabsTrigger value="tab1">Tab 1</TabsTrigger>
					</TabsList>
				</Tabs>,
			)

			const trigger = document.querySelector('[data-slot="tabs-trigger"]')
			expect(trigger).toHaveClass('px-2.5', 'py-1.5', 'text-sm')
		})

		it('handles click events', async () => {
			const user = userEvent.setup()

			render(
				<Tabs defaultValue="tab1">
					<TabsList>
						<TabsTrigger value="tab1">Tab 1</TabsTrigger>
						<TabsTrigger value="tab2">Tab 2</TabsTrigger>
					</TabsList>
					<TabsContent value="tab1">Content 1</TabsContent>
					<TabsContent value="tab2">Content 2</TabsContent>
				</Tabs>,
			)

			const tab2 = screen.getByText('Tab 2')
			await user.click(tab2)

			expect(tab2).toHaveAttribute('data-state', 'active')
			expect(screen.getByText('Content 2')).toBeInTheDocument()
		})

		it('supports disabled state', () => {
			render(
				<Tabs defaultValue="tab1">
					<TabsList>
						<TabsTrigger value="tab1" disabled>
							Disabled Tab
						</TabsTrigger>
					</TabsList>
				</Tabs>,
			)

			const disabledTab = screen.getByText('Disabled Tab')
			expect(disabledTab).toBeDisabled()
		})

		it('renders with custom className', () => {
			render(
				<Tabs defaultValue="tab1">
					<TabsList>
						<TabsTrigger value="tab1" className="custom-trigger">
							Tab 1
						</TabsTrigger>
					</TabsList>
				</Tabs>,
			)

			const trigger = document.querySelector('[data-slot="tabs-trigger"]')
			expect(trigger).toHaveClass('custom-trigger')
		})
	})

	describe('TabsContent Component', () => {
		it('renders tab content when active', () => {
			render(
				<Tabs defaultValue="tab1">
					<TabsList>
						<TabsTrigger value="tab1">Tab 1</TabsTrigger>
					</TabsList>
					<TabsContent value="tab1">This is tab 1 content</TabsContent>
				</Tabs>,
			)

			expect(screen.getByText('This is tab 1 content')).toBeInTheDocument()
		})

		it('hides content when not active', () => {
			render(
				<Tabs defaultValue="tab1">
					<TabsList>
						<TabsTrigger value="tab1">Tab 1</TabsTrigger>
						<TabsTrigger value="tab2">Tab 2</TabsTrigger>
					</TabsList>
					<TabsContent value="tab1">Content 1</TabsContent>
					<TabsContent value="tab2">Content 2</TabsContent>
				</Tabs>,
			)

			expect(screen.getByText('Content 1')).toBeInTheDocument()
			expect(screen.queryByText('Content 2')).not.toBeInTheDocument()
		})

		it('applies default styling', () => {
			render(
				<Tabs defaultValue="tab1">
					<TabsList>
						<TabsTrigger value="tab1">Tab 1</TabsTrigger>
					</TabsList>
					<TabsContent value="tab1">Content</TabsContent>
				</Tabs>,
			)

			const content = document.querySelector('[data-slot="tabs-content"]')
			expect(content).toHaveClass('flex-1', 'outline-none')
		})

		it('renders with custom className', () => {
			render(
				<Tabs defaultValue="tab1">
					<TabsList>
						<TabsTrigger value="tab1">Tab 1</TabsTrigger>
					</TabsList>
					<TabsContent value="tab1" className="custom-content">
						Content
					</TabsContent>
				</Tabs>,
			)

			const content = document.querySelector('[data-slot="tabs-content"]')
			expect(content).toHaveClass('custom-content')
		})
	})

	describe('Keyboard Navigation', () => {
		it('supports arrow key navigation', async () => {
			const user = userEvent.setup()

			render(
				<Tabs defaultValue="tab1">
					<TabsList>
						<TabsTrigger value="tab1">Tab 1</TabsTrigger>
						<TabsTrigger value="tab2">Tab 2</TabsTrigger>
						<TabsTrigger value="tab3">Tab 3</TabsTrigger>
					</TabsList>
					<TabsContent value="tab1">Content 1</TabsContent>
					<TabsContent value="tab2">Content 2</TabsContent>
					<TabsContent value="tab3">Content 3</TabsContent>
				</Tabs>,
			)

			const tab1 = screen.getByText('Tab 1')
			tab1.focus()

			await user.keyboard('{ArrowRight}')
			expect(screen.getByText('Tab 2')).toHaveFocus()

			await user.keyboard('{ArrowRight}')
			expect(screen.getByText('Tab 3')).toHaveFocus()

			await user.keyboard('{ArrowLeft}')
			expect(screen.getByText('Tab 2')).toHaveFocus()
		})

		it('supports Home and End keys', async () => {
			const user = userEvent.setup()

			render(
				<Tabs defaultValue="tab2">
					<TabsList>
						<TabsTrigger value="tab1">Tab 1</TabsTrigger>
						<TabsTrigger value="tab2">Tab 2</TabsTrigger>
						<TabsTrigger value="tab3">Tab 3</TabsTrigger>
					</TabsList>
				</Tabs>,
			)

			const tab2 = screen.getByText('Tab 2')
			tab2.focus()

			await user.keyboard('{Home}')
			expect(screen.getByText('Tab 1')).toHaveFocus()

			await user.keyboard('{End}')
			expect(screen.getByText('Tab 3')).toHaveFocus()
		})

		it('activates tab on Space key', async () => {
			const user = userEvent.setup()

			render(
				<Tabs defaultValue="tab1">
					<TabsList>
						<TabsTrigger value="tab1">Tab 1</TabsTrigger>
						<TabsTrigger value="tab2">Tab 2</TabsTrigger>
					</TabsList>
					<TabsContent value="tab1">Content 1</TabsContent>
					<TabsContent value="tab2">Content 2</TabsContent>
				</Tabs>,
			)

			const tab2 = screen.getByText('Tab 2')
			tab2.focus()
			await user.keyboard(' ')

			expect(tab2).toHaveAttribute('data-state', 'active')
			expect(screen.getByText('Content 2')).toBeInTheDocument()
		})
	})

	describe('Controlled vs Uncontrolled', () => {
		it('works as uncontrolled component', () => {
			render(
				<Tabs defaultValue="tab1">
					<TabsList>
						<TabsTrigger value="tab1">Tab 1</TabsTrigger>
						<TabsTrigger value="tab2">Tab 2</TabsTrigger>
					</TabsList>
					<TabsContent value="tab1">Content 1</TabsContent>
					<TabsContent value="tab2">Content 2</TabsContent>
				</Tabs>,
			)

			expect(screen.getByText('Tab 1')).toHaveAttribute('data-state', 'active')
			expect(screen.getByText('Content 1')).toBeInTheDocument()
		})

		it('works as controlled component', () => {
			const ControlledTabs = () => {
				const [value, setValue] = React.useState('tab2')

				return (
					<Tabs value={value} onValueChange={setValue}>
						<TabsList>
							<TabsTrigger value="tab1">Tab 1</TabsTrigger>
							<TabsTrigger value="tab2">Tab 2</TabsTrigger>
						</TabsList>
						<TabsContent value="tab1">Content 1</TabsContent>
						<TabsContent value="tab2">Content 2</TabsContent>
					</Tabs>
				)
			}

			render(<ControlledTabs />)

			expect(screen.getByText('Tab 2')).toHaveAttribute('data-state', 'active')
			expect(screen.getByText('Content 2')).toBeInTheDocument()
		})

		it('calls onValueChange when tab changes', async () => {
			const handleValueChange = vi.fn()
			const user = userEvent.setup()

			render(
				<Tabs defaultValue="tab1" onValueChange={handleValueChange}>
					<TabsList>
						<TabsTrigger value="tab1">Tab 1</TabsTrigger>
						<TabsTrigger value="tab2">Tab 2</TabsTrigger>
					</TabsList>
				</Tabs>,
			)

			const tab2 = screen.getByText('Tab 2')
			await user.click(tab2)

			expect(handleValueChange).toHaveBeenCalledWith('tab2')
		})
	})

	describe('Accessibility', () => {
		it('has proper ARIA attributes', () => {
			render(
				<Tabs defaultValue="tab1">
					<TabsList>
						<TabsTrigger value="tab1">Tab 1</TabsTrigger>
					</TabsList>
					<TabsContent value="tab1">Content 1</TabsContent>
				</Tabs>,
			)

			const tabsList = document.querySelector('[data-slot="tabs-list"]')
			const trigger = document.querySelector('[data-slot="tabs-trigger"]')
			const content = document.querySelector('[data-slot="tabs-content"]')

			expect(tabsList).toHaveAttribute('role', 'tablist')
			expect(trigger).toHaveAttribute('role', 'tab')
			expect(content).toHaveAttribute('role', 'tabpanel')
		})

		it('associates tabs with their content panels', () => {
			render(
				<Tabs defaultValue="tab1">
					<TabsList>
						<TabsTrigger value="tab1">Tab 1</TabsTrigger>
					</TabsList>
					<TabsContent value="tab1">Content 1</TabsContent>
				</Tabs>,
			)

			const trigger = document.querySelector('[data-slot="tabs-trigger"]')
			const content = document.querySelector('[data-slot="tabs-content"]')

			const triggerId = trigger?.getAttribute('id')
			const contentId = content?.getAttribute('id')

			expect(trigger).toHaveAttribute('aria-controls', contentId)
			expect(content).toHaveAttribute('aria-labelledby', triggerId)
		})

		it('indicates selected state correctly', () => {
			render(
				<Tabs defaultValue="tab1">
					<TabsList>
						<TabsTrigger value="tab1">Tab 1</TabsTrigger>
						<TabsTrigger value="tab2">Tab 2</TabsTrigger>
					</TabsList>
				</Tabs>,
			)

			const tab1 = screen.getByText('Tab 1')
			const tab2 = screen.getByText('Tab 2')

			expect(tab1).toHaveAttribute('aria-selected', 'true')
			expect(tab2).toHaveAttribute('aria-selected', 'false')
		})
	})

	describe('Edge Cases', () => {
		it('handles tabs without content', () => {
			render(
				<Tabs defaultValue="tab1">
					<TabsList>
						<TabsTrigger value="tab1">Tab 1</TabsTrigger>
					</TabsList>
				</Tabs>,
			)

			expect(screen.getByText('Tab 1')).toBeInTheDocument()
		})

		it('handles content without corresponding tab', () => {
			render(
				<Tabs defaultValue="tab1">
					<TabsList>
						<TabsTrigger value="tab1">Tab 1</TabsTrigger>
					</TabsList>
					<TabsContent value="tab1">Content 1</TabsContent>
					<TabsContent value="tab2">Orphaned Content</TabsContent>
				</Tabs>,
			)

			expect(screen.getByText('Content 1')).toBeInTheDocument()
			expect(screen.queryByText('Orphaned Content')).not.toBeInTheDocument()
		})

		it('handles undefined className gracefully', () => {
			render(
				<Tabs defaultValue="tab1" className={undefined}>
					<TabsList className={undefined}>
						<TabsTrigger value="tab1" className={undefined}>
							Tab 1
						</TabsTrigger>
					</TabsList>
					<TabsContent value="tab1" className={undefined}>
						Content 1
					</TabsContent>
				</Tabs>,
			)

			expect(screen.getByText('Tab 1')).toBeInTheDocument()
			expect(screen.getByText('Content 1')).toBeInTheDocument()
		})
	})

	describe('Complex Scenarios', () => {
		it('handles many tabs efficiently', () => {
			const tabs = Array.from({ length: 20 }, (_, i) => ({
				value: `tab${i + 1}`,
				label: `Tab ${i + 1}`,
				content: `Content ${i + 1}`,
			}))

			render(
				<Tabs defaultValue="tab1">
					<TabsList>
						{tabs.map((tab) => (
							<TabsTrigger key={tab.value} value={tab.value}>
								{tab.label}
							</TabsTrigger>
						))}
					</TabsList>
					{tabs.map((tab) => (
						<TabsContent key={tab.value} value={tab.value}>
							{tab.content}
						</TabsContent>
					))}
				</Tabs>,
			)

			expect(screen.getByText('Tab 1')).toHaveAttribute('data-state', 'active')
			expect(screen.getByText('Content 1')).toBeInTheDocument()
			expect(screen.getAllByRole('tab')).toHaveLength(20)
		})

		it('maintains state during rapid tab switching', async () => {
			const user = userEvent.setup()

			render(
				<Tabs defaultValue="tab1">
					<TabsList>
						<TabsTrigger value="tab1">Tab 1</TabsTrigger>
						<TabsTrigger value="tab2">Tab 2</TabsTrigger>
						<TabsTrigger value="tab3">Tab 3</TabsTrigger>
					</TabsList>
					<TabsContent value="tab1">Content 1</TabsContent>
					<TabsContent value="tab2">Content 2</TabsContent>
					<TabsContent value="tab3">Content 3</TabsContent>
				</Tabs>,
			)

			// Rapidly switch between tabs
			await user.click(screen.getByText('Tab 2'))
			await user.click(screen.getByText('Tab 3'))
			await user.click(screen.getByText('Tab 1'))

			expect(screen.getByText('Tab 1')).toHaveAttribute('data-state', 'active')
			expect(screen.getByText('Content 1')).toBeInTheDocument()
		})
	})
})
