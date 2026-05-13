import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { PaginationControls } from './pagination-controls'

const defaultProps = {
	currentPage: 1,
	totalPages: 5,
	totalItems: 50,
	startIndex: 0,
	endIndex: 10,
	onPageChange: vi.fn(),
	onPreviousPage: vi.fn(),
	onNextPage: vi.fn(),
}

describe('PaginationControls', () => {
	describe('Items counter', () => {
		it('shows the default counter text', () => {
			render(<PaginationControls {...defaultProps} />)
			expect(screen.getByText(/Showing 1 to 10 of 50 results/)).toBeInTheDocument()
		})

		it('hides counter when showItemsCounter is false', () => {
			render(<PaginationControls {...defaultProps} showItemsCounter={false} />)
			expect(screen.queryByText(/Showing/)).not.toBeInTheDocument()
		})

		it('renders a custom counterText template', () => {
			render(
				<PaginationControls
					{...defaultProps}
					counterText="{{startIndex}}–{{endIndex}} de {{totalItems}}"
				/>,
			)
			expect(screen.getByText('1–10 de 50')).toBeInTheDocument()
		})
	})

	describe('Previous / Next buttons', () => {
		it('disables Previous on the first page', () => {
			render(<PaginationControls {...defaultProps} currentPage={1} />)
			const prev = screen.getAllByRole('button')[0]
			expect(prev).toBeDisabled()
		})

		it('disables Next on the last page', () => {
			render(<PaginationControls {...defaultProps} currentPage={5} totalPages={5} />)
			const buttons = screen.getAllByRole('button')
			const next = buttons[buttons.length - 1]
			expect(next).toBeDisabled()
		})

		it('calls onPreviousPage when Previous is clicked', () => {
			const onPreviousPage = vi.fn()
			render(
				<PaginationControls {...defaultProps} currentPage={3} onPreviousPage={onPreviousPage} />,
			)
			const prev = screen.getAllByRole('button')[0]
			fireEvent.click(prev)
			expect(onPreviousPage).toHaveBeenCalledTimes(1)
		})

		it('calls onNextPage when Next is clicked', () => {
			const onNextPage = vi.fn()
			render(<PaginationControls {...defaultProps} currentPage={2} onNextPage={onNextPage} />)
			const buttons = screen.getAllByRole('button')
			const next = buttons[buttons.length - 1]
			fireEvent.click(next)
			expect(onNextPage).toHaveBeenCalledTimes(1)
		})
	})

	describe('Page numbers', () => {
		it('renders all page numbers when totalPages <= 7', () => {
			render(<PaginationControls {...defaultProps} totalPages={5} />)
			expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument()
			expect(screen.getByRole('button', { name: '5' })).toBeInTheDocument()
		})

		it('highlights the current page button', () => {
			render(<PaginationControls {...defaultProps} currentPage={3} />)
			const page3 = screen.getByRole('button', { name: '3' })
			// Current page uses the 'default' variant which includes a dark bg class
			expect(page3.className).toMatch(/bg-/)
		})

		it('calls onPageChange with correct page when a page button is clicked', () => {
			const onPageChange = vi.fn()
			render(<PaginationControls {...defaultProps} onPageChange={onPageChange} />)
			fireEvent.click(screen.getByRole('button', { name: '3' }))
			expect(onPageChange).toHaveBeenCalledWith(3)
		})

		it('does not render page buttons when totalPages is 1', () => {
			render(
				<PaginationControls
					{...defaultProps}
					totalPages={1}
					currentPage={1}
					totalItems={10}
					endIndex={10}
				/>,
			)
			// No prev/next or numbered page buttons — only the counter text
			expect(screen.queryByRole('button')).not.toBeInTheDocument()
		})
	})

	describe('Ellipsis — large page counts', () => {
		it('shows ellipsis when totalPages > 7 and currentPage is near the start', () => {
			render(
				<PaginationControls
					{...defaultProps}
					totalPages={20}
					currentPage={2}
					totalItems={200}
					endIndex={10}
				/>,
			)
			expect(screen.getByText('...')).toBeInTheDocument()
		})

		it('shows two ellipses when currentPage is in the middle', () => {
			render(
				<PaginationControls
					{...defaultProps}
					totalPages={20}
					currentPage={10}
					totalItems={200}
					endIndex={100}
				/>,
			)
			const ellipses = screen.getAllByText('...')
			expect(ellipses).toHaveLength(2)
		})

		it('always shows first and last page buttons', () => {
			render(
				<PaginationControls
					{...defaultProps}
					totalPages={20}
					currentPage={10}
					totalItems={200}
					endIndex={100}
				/>,
			)
			expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument()
			expect(screen.getByRole('button', { name: '20' })).toBeInTheDocument()
		})
	})

	describe('Custom className', () => {
		it('applies extra className to the wrapper', () => {
			const { container } = render(
				<PaginationControls {...defaultProps} className="my-custom-class" />,
			)
			expect(container.firstChild).toHaveClass('my-custom-class')
		})
	})
})
