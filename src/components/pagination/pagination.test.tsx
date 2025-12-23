import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from './pagination'

describe('Pagination', () => {
	describe('Pagination Component', () => {
		it('renders pagination nav with default props', () => {
			render(
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationLink href="/page/1">1</PaginationLink>
						</PaginationItem>
					</PaginationContent>
				</Pagination>,
			)

			const nav = screen.getByRole('navigation')
			expect(nav).toBeInTheDocument()
			expect(nav).toHaveAttribute('aria-label', 'pagination')
			expect(nav).toHaveClass('mx-auto', 'flex', 'w-full', 'justify-center')
		})

		it('renders with custom className', () => {
			render(
				<Pagination className="custom-pagination">
					<PaginationContent>
						<PaginationItem>
							<PaginationLink href="/page/1">1</PaginationLink>
						</PaginationItem>
					</PaginationContent>
				</Pagination>,
			)

			const nav = screen.getByRole('navigation')
			expect(nav).toHaveClass('custom-pagination')
			expect(nav).toHaveClass('mx-auto', 'flex') // Should still have default classes
		})

		it('forwards HTML attributes correctly', () => {
			render(
				<Pagination data-testid="test-pagination" id="pagination-id">
					<PaginationContent>
						<PaginationItem>
							<PaginationLink href="/page/1">1</PaginationLink>
						</PaginationItem>
					</PaginationContent>
				</Pagination>,
			)

			const nav = screen.getByTestId('test-pagination')
			expect(nav).toHaveAttribute('id', 'pagination-id')
		})
	})

	describe('PaginationContent Component', () => {
		it('renders content list with correct styling', () => {
			render(
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationLink href="/page/1">1</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="/page/2">2</PaginationLink>
						</PaginationItem>
					</PaginationContent>
				</Pagination>,
			)

			const list = document.querySelector('ul')
			expect(list).toBeInTheDocument()
			expect(list).toHaveClass('flex', 'flex-row', 'items-center', 'gap-1')
		})

		it('renders with custom className', () => {
			render(
				<Pagination>
					<PaginationContent className="custom-content">
						<PaginationItem>
							<PaginationLink href="/page/1">1</PaginationLink>
						</PaginationItem>
					</PaginationContent>
				</Pagination>,
			)

			const list = document.querySelector('ul')
			expect(list).toHaveClass('custom-content')
		})

		it('forwards ref correctly', () => {
			const ref = React.createRef<HTMLUListElement>()

			render(
				<Pagination>
					<PaginationContent ref={ref}>
						<PaginationItem>
							<PaginationLink href="/page/1">1</PaginationLink>
						</PaginationItem>
					</PaginationContent>
				</Pagination>,
			)

			expect(ref.current).toBeInstanceOf(HTMLUListElement)
		})
	})

	describe('PaginationItem Component', () => {
		it('renders list item with correct styling', () => {
			render(
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationLink href="/page/1">1</PaginationLink>
						</PaginationItem>
					</PaginationContent>
				</Pagination>,
			)

			const listItem = document.querySelector('li')
			expect(listItem).toBeInTheDocument()
		})

		it('renders with custom className', () => {
			render(
				<Pagination>
					<PaginationContent>
						<PaginationItem className="custom-item">
							<PaginationLink href="/page/1">1</PaginationLink>
						</PaginationItem>
					</PaginationContent>
				</Pagination>,
			)

			const listItem = document.querySelector('li')
			expect(listItem).toHaveClass('custom-item')
		})

		it('forwards ref correctly', () => {
			const ref = React.createRef<HTMLLIElement>()

			render(
				<Pagination>
					<PaginationContent>
						<PaginationItem ref={ref}>
							<PaginationLink href="/page/1">1</PaginationLink>
						</PaginationItem>
					</PaginationContent>
				</Pagination>,
			)

			expect(ref.current).toBeInstanceOf(HTMLLIElement)
		})
	})

	describe('PaginationLink Component', () => {
		it('renders link with default styling', () => {
			render(
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationLink href="/page/1">1</PaginationLink>
						</PaginationItem>
					</PaginationContent>
				</Pagination>,
			)

			const link = screen.getByRole('button', { name: '1' })
			expect(link).toBeInTheDocument()
			expect(link).toHaveClass('text-foreground')
		})

		it('renders active link with correct styling', () => {
			render(
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationLink href="/page/1" isActive>
								1
							</PaginationLink>
						</PaginationItem>
					</PaginationContent>
				</Pagination>,
			)

			const link = screen.getByRole('button', { name: '1' })
			expect(link).toHaveAttribute('aria-current', 'page')
			expect(link).toHaveClass('text-primary-foreground')
		})

		it('renders inactive link without aria-current', () => {
			render(
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationLink href="/page/1" isActive={false}>
								1
							</PaginationLink>
						</PaginationItem>
					</PaginationContent>
				</Pagination>,
			)

			const link = screen.getByRole('button', { name: '1' })
			expect(link).not.toHaveAttribute('aria-current')
		})

		it('handles click events', async () => {
			const handleClick = vi.fn()
			const user = userEvent.setup()

			render(
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationLink href="/page/1" onClick={handleClick}>
								1
							</PaginationLink>
						</PaginationItem>
					</PaginationContent>
				</Pagination>,
			)

			const link = screen.getByRole('button', { name: '1' })
			await user.click(link)

			expect(handleClick).toHaveBeenCalledOnce()
		})

		it('renders with custom size', () => {
			render(
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationLink href="/page/1" size="sm">
								1
							</PaginationLink>
						</PaginationItem>
					</PaginationContent>
				</Pagination>,
			)

			const link = screen.getByRole('button', { name: '1' })
			expect(link).toBeInTheDocument()
		})

		it('renders with custom className', () => {
			render(
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationLink href="/page/1" className="custom-link">
								1
							</PaginationLink>
						</PaginationItem>
					</PaginationContent>
				</Pagination>,
			)

			const link = screen.getByRole('button', { name: '1' })
			expect(link).toHaveClass('custom-link')
		})

		it('supports disabled state', () => {
			render(
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationLink href="/page/1" disabled>
								1
							</PaginationLink>
						</PaginationItem>
					</PaginationContent>
				</Pagination>,
			)

			const link = screen.getByRole('button', { name: '1' })
			expect(link).toBeDisabled()
		})
	})

	describe('PaginationPrevious Component', () => {
		it('renders previous button with correct styling and icon', () => {
			render(
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious href="/page/1" />
						</PaginationItem>
					</PaginationContent>
				</Pagination>,
			)

			const prevButton = screen.getByLabelText('Previous page')
			expect(prevButton).toBeInTheDocument()
			expect(prevButton).toHaveClass('gap-1')

			// Check for chevron left icon
			const chevron = prevButton.querySelector('svg')
			expect(chevron).toBeInTheDocument()
			expect(chevron).toHaveClass('h-4', 'w-4')
		})

		it('renders with custom className', () => {
			render(
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious href="/page/1" className="custom-prev" />
						</PaginationItem>
					</PaginationContent>
				</Pagination>,
			)

			const prevButton = screen.getByLabelText('Previous page')
			expect(prevButton).toHaveClass('custom-prev')
		})

		it('handles click events', async () => {
			const handleClick = vi.fn()
			const user = userEvent.setup()

			render(
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious href="/page/1" onClick={handleClick} />
						</PaginationItem>
					</PaginationContent>
				</Pagination>,
			)

			const prevButton = screen.getByLabelText('Previous page')
			await user.click(prevButton)

			expect(handleClick).toHaveBeenCalledOnce()
		})

		it('supports disabled state', () => {
			render(
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious href="/page/1" disabled />
						</PaginationItem>
					</PaginationContent>
				</Pagination>,
			)

			const prevButton = screen.getByLabelText('Previous page')
			expect(prevButton).toBeDisabled()
		})

		it('renders with custom content', () => {
			render(
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious href="/page/1" className="custom-prev">
								Back
							</PaginationPrevious>
						</PaginationItem>
					</PaginationContent>
				</Pagination>,
			)

			const prevButton = screen.getByLabelText('Previous page')
			expect(prevButton).toHaveClass('custom-prev')
			// The component only renders the chevron icon, not custom children
			const chevron = prevButton.querySelector('svg')
			expect(chevron).toBeInTheDocument()
		})
	})

	describe('PaginationNext Component', () => {
		it('renders next button with correct styling and icon', () => {
			render(
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationNext href="/page/2" />
						</PaginationItem>
					</PaginationContent>
				</Pagination>,
			)

			const nextButton = screen.getByLabelText('Next page')
			expect(nextButton).toBeInTheDocument()
			expect(nextButton).toHaveClass('gap-1')

			// Check for chevron right icon
			const chevron = nextButton.querySelector('svg')
			expect(chevron).toBeInTheDocument()
			expect(chevron).toHaveClass('h-4', 'w-4')
		})

		it('renders with custom className', () => {
			render(
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationNext href="/page/2" className="custom-next" />
						</PaginationItem>
					</PaginationContent>
				</Pagination>,
			)

			const nextButton = screen.getByLabelText('Next page')
			expect(nextButton).toHaveClass('custom-next')
		})

		it('handles click events', async () => {
			const handleClick = vi.fn()
			const user = userEvent.setup()

			render(
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationNext href="/page/2" onClick={handleClick} />
						</PaginationItem>
					</PaginationContent>
				</Pagination>,
			)

			const nextButton = screen.getByLabelText('Next page')
			await user.click(nextButton)

			expect(handleClick).toHaveBeenCalledOnce()
		})

		it('supports disabled state', () => {
			render(
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationNext href="/page/2" disabled />
						</PaginationItem>
					</PaginationContent>
				</Pagination>,
			)

			const nextButton = screen.getByLabelText('Next page')
			expect(nextButton).toBeDisabled()
		})

		it('renders with custom content', () => {
			render(
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationNext href="/page/2" className="custom-next">
								Forward
							</PaginationNext>
						</PaginationItem>
					</PaginationContent>
				</Pagination>,
			)

			const nextButton = screen.getByLabelText('Next page')
			expect(nextButton).toHaveClass('custom-next')
			// The component only renders the chevron icon, not custom children
			const chevron = nextButton.querySelector('svg')
			expect(chevron).toBeInTheDocument()
		})
	})

	describe('PaginationEllipsis Component', () => {
		it('renders ellipsis with correct styling and icon', () => {
			render(
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
					</PaginationContent>
				</Pagination>,
			)

			const ellipsis = document.querySelector('span[aria-hidden]')
			expect(ellipsis).toBeInTheDocument()
			expect(ellipsis).toHaveClass('flex', 'h-9', 'w-9', 'items-center', 'justify-center')

			// Check for more horizontal icon
			const icon = ellipsis?.querySelector('svg')
			expect(icon).toBeInTheDocument()
			expect(icon).toHaveClass('h-4', 'w-4')

			// Check for screen reader text
			const srText = ellipsis?.querySelector('.sr-only')
			expect(srText).toHaveTextContent('More pages')
		})

		it('renders with custom className', () => {
			render(
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationEllipsis className="custom-ellipsis" />
						</PaginationItem>
					</PaginationContent>
				</Pagination>,
			)

			const ellipsis = document.querySelector('span[aria-hidden]')
			expect(ellipsis).toHaveClass('custom-ellipsis')
		})

		it('has proper accessibility attributes', () => {
			render(
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
					</PaginationContent>
				</Pagination>,
			)

			const ellipsis = document.querySelector('span[aria-hidden]')
			expect(ellipsis).toHaveAttribute('aria-hidden')

			const srText = ellipsis?.querySelector('.sr-only')
			expect(srText).toBeInTheDocument()
		})
	})

	describe('Complete Pagination Structure', () => {
		it('renders complete pagination with all components', () => {
			render(
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious href="/page/1" />
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="/page/1">1</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="/page/2" isActive>
								2
							</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="/page/3">3</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="/page/10">10</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationNext href="/page/3" />
						</PaginationItem>
					</PaginationContent>
				</Pagination>,
			)

			expect(screen.getByLabelText('Previous page')).toBeInTheDocument()
			expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument()
			expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument()
			expect(screen.getByRole('button', { name: '3' })).toBeInTheDocument()
			expect(screen.getByRole('button', { name: '10' })).toBeInTheDocument()
			expect(screen.getByLabelText('Next page')).toBeInTheDocument()

			const activeLink = screen.getByRole('button', { name: '2' })
			expect(activeLink).toHaveAttribute('aria-current', 'page')

			const ellipsis = document.querySelector('span[aria-hidden]')
			expect(ellipsis).toBeInTheDocument()
		})
	})

	describe('Keyboard Navigation', () => {
		it('supports keyboard navigation between pagination items', async () => {
			const user = userEvent.setup()

			render(
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious href="/page/1" />
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="/page/1">1</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="/page/2">2</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationNext href="/page/3" />
						</PaginationItem>
					</PaginationContent>
				</Pagination>,
			)

			const prevButton = screen.getByLabelText('Previous page')
			const page1 = screen.getByRole('button', { name: '1' })
			const page2 = screen.getByRole('button', { name: '2' })
			const nextButton = screen.getByLabelText('Next page')

			prevButton.focus()
			expect(prevButton).toHaveFocus()

			await user.keyboard('{Tab}')
			expect(page1).toHaveFocus()

			await user.keyboard('{Tab}')
			expect(page2).toHaveFocus()

			await user.keyboard('{Tab}')
			expect(nextButton).toHaveFocus()
		})

		it('supports Enter key to activate pagination links', async () => {
			const handleClick = vi.fn()
			const user = userEvent.setup()

			render(
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationLink href="/page/1" onClick={handleClick}>
								1
							</PaginationLink>
						</PaginationItem>
					</PaginationContent>
				</Pagination>,
			)

			const link = screen.getByRole('button', { name: '1' })
			link.focus()
			await user.keyboard('{Enter}')

			expect(handleClick).toHaveBeenCalledOnce()
		})

		it('supports Space key to activate pagination links', async () => {
			const handleClick = vi.fn()
			const user = userEvent.setup()

			render(
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationLink href="/page/1" onClick={handleClick}>
								1
							</PaginationLink>
						</PaginationItem>
					</PaginationContent>
				</Pagination>,
			)

			const link = screen.getByRole('button', { name: '1' })
			link.focus()
			await user.keyboard(' ')

			expect(handleClick).toHaveBeenCalledOnce()
		})
	})

	describe('Accessibility', () => {
		it('has proper navigation role and aria-label', () => {
			render(
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationLink href="/page/1">1</PaginationLink>
						</PaginationItem>
					</PaginationContent>
				</Pagination>,
			)

			const nav = screen.getByRole('navigation')
			expect(nav).toHaveAttribute('aria-label', 'pagination')
		})

		it('provides proper aria-current for active page', () => {
			render(
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationLink href="/page/1" isActive>
								1
							</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="/page/2">2</PaginationLink>
						</PaginationItem>
					</PaginationContent>
				</Pagination>,
			)

			const activePage = screen.getByRole('button', { name: '1' })
			const inactivePage = screen.getByRole('button', { name: '2' })

			expect(activePage).toHaveAttribute('aria-current', 'page')
			expect(inactivePage).not.toHaveAttribute('aria-current')
		})

		it('provides proper aria-labels for navigation buttons', () => {
			render(
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious href="/page/1" />
						</PaginationItem>
						<PaginationItem>
							<PaginationNext href="/page/3" />
						</PaginationItem>
					</PaginationContent>
				</Pagination>,
			)

			expect(screen.getByLabelText('Previous page')).toBeInTheDocument()
			expect(screen.getByLabelText('Next page')).toBeInTheDocument()
		})

		it('hides ellipsis from screen readers', () => {
			render(
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
					</PaginationContent>
				</Pagination>,
			)

			const ellipsis = document.querySelector('span[aria-hidden]')
			expect(ellipsis).toHaveAttribute('aria-hidden')
		})

		it('provides screen reader text for ellipsis', () => {
			render(
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
					</PaginationContent>
				</Pagination>,
			)

			const srText = document.querySelector('.sr-only')
			expect(srText).toHaveTextContent('More pages')
		})
	})

	describe('Edge Cases', () => {
		it('handles empty pagination', () => {
			render(<Pagination />)

			const nav = screen.getByRole('navigation')
			expect(nav).toBeInTheDocument()
		})

		it('handles pagination with only content', () => {
			render(
				<Pagination>
					<PaginationContent />
				</Pagination>,
			)

			const nav = screen.getByRole('navigation')
			const list = document.querySelector('ul')
			expect(nav).toBeInTheDocument()
			expect(list).toBeInTheDocument()
		})

		it('handles undefined className gracefully', () => {
			render(
				<Pagination className={undefined}>
					<PaginationContent>
						<PaginationItem>
							<PaginationLink href="/page/1">1</PaginationLink>
						</PaginationItem>
					</PaginationContent>
				</Pagination>,
			)

			const nav = screen.getByRole('navigation')
			expect(nav).toHaveClass('mx-auto', 'flex') // Should still have default classes
		})

		it('handles single page pagination', () => {
			render(
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationLink href="/page/1" isActive>
								1
							</PaginationLink>
						</PaginationItem>
					</PaginationContent>
				</Pagination>,
			)

			const page = screen.getByRole('button', { name: '1' })
			expect(page).toHaveAttribute('aria-current', 'page')
		})

		it('handles large page numbers', () => {
			render(
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationLink href="/page/999">999</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="/page/1000" isActive>
								1000
							</PaginationLink>
						</PaginationItem>
					</PaginationContent>
				</Pagination>,
			)

			expect(screen.getByRole('button', { name: '999' })).toBeInTheDocument()
			expect(screen.getByRole('button', { name: '1000' })).toBeInTheDocument()
		})
	})

	describe('Button Integration', () => {
		it('inherits button variants correctly', () => {
			render(
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationLink href="/page/1" variant="destructive">
								1
							</PaginationLink>
						</PaginationItem>
					</PaginationContent>
				</Pagination>,
			)

			const link = screen.getByRole('button', { name: '1' })
			expect(link).toBeInTheDocument()
		})

		it('supports different button sizes', () => {
			render(
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationLink href="/page/1" size="sm">
								1
							</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="/page/2" size="lg">
								2
							</PaginationLink>
						</PaginationItem>
					</PaginationContent>
				</Pagination>,
			)

			expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument()
			expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument()
		})
	})

	describe('Complex Pagination Scenarios', () => {
		it('handles pagination with gaps', () => {
			render(
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious href="/page/4" />
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="/page/1">1</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="/page/4">4</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="/page/5" isActive>
								5
							</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="/page/6">6</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="/page/20">20</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationNext href="/page/6" />
						</PaginationItem>
					</PaginationContent>
				</Pagination>,
			)

			expect(screen.getByLabelText('Previous page')).toBeInTheDocument()
			expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument()
			expect(screen.getByRole('button', { name: '4' })).toBeInTheDocument()
			expect(screen.getByRole('button', { name: '5' })).toHaveAttribute(
				'aria-current',
				'page',
			)
			expect(screen.getByRole('button', { name: '6' })).toBeInTheDocument()
			expect(screen.getByRole('button', { name: '20' })).toBeInTheDocument()
			expect(screen.getByLabelText('Next page')).toBeInTheDocument()

			const ellipses = document.querySelectorAll('span[aria-hidden]')
			expect(ellipses).toHaveLength(2)
		})

		it('handles first page state', () => {
			render(
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious href="/page/1" disabled />
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="/page/1" isActive>
								1
							</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="/page/2">2</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationNext href="/page/2" />
						</PaginationItem>
					</PaginationContent>
				</Pagination>,
			)

			const prevButton = screen.getByLabelText('Previous page')
			const nextButton = screen.getByLabelText('Next page')
			const activePage = screen.getByRole('button', { name: '1' })

			expect(prevButton).toBeDisabled()
			expect(nextButton).not.toBeDisabled()
			expect(activePage).toHaveAttribute('aria-current', 'page')
		})

		it('handles last page state', () => {
			render(
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious href="/page/9" />
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="/page/9">9</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="/page/10" isActive>
								10
							</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationNext href="/page/10" disabled />
						</PaginationItem>
					</PaginationContent>
				</Pagination>,
			)

			const prevButton = screen.getByLabelText('Previous page')
			const nextButton = screen.getByLabelText('Next page')
			const activePage = screen.getByRole('button', { name: '10' })

			expect(prevButton).not.toBeDisabled()
			expect(nextButton).toBeDisabled()
			expect(activePage).toHaveAttribute('aria-current', 'page')
		})
	})
})
