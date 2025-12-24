import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, it } from 'vitest'

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from './table'

describe('Table Components', () => {
	describe('Table Component', () => {
		it('renders table with default props', () => {
			render(
				<Table>
					<TableBody>
						<TableRow>
							<TableCell>Cell content</TableCell>
						</TableRow>
					</TableBody>
				</Table>,
			)

			const table = screen.getByRole('table')
			expect(table).toBeInTheDocument()
			expect(table).toHaveClass('w-full', 'caption-bottom', 'text-sm')
		})

		it('renders with custom className', () => {
			render(
				<Table className="custom-table">
					<TableBody>
						<TableRow>
							<TableCell>Content</TableCell>
						</TableRow>
					</TableBody>
				</Table>,
			)

			const table = screen.getByRole('table')
			expect(table).toHaveClass('custom-table')
		})

		it('renders within overflow container', () => {
			render(
				<Table>
					<TableBody>
						<TableRow>
							<TableCell>Content</TableCell>
						</TableRow>
					</TableBody>
				</Table>,
			)

			const container = document.querySelector('.relative.w-full.overflow-auto')
			expect(container).toBeInTheDocument()
		})

		it('forwards HTML attributes correctly', () => {
			render(
				<Table data-testid="test-table" id="table-id">
					<TableBody>
						<TableRow>
							<TableCell>Content</TableCell>
						</TableRow>
					</TableBody>
				</Table>,
			)

			const table = screen.getByTestId('test-table')
			expect(table).toHaveAttribute('id', 'table-id')
		})
	})

	describe('TableHeader Component', () => {
		it('renders table header with default styling', () => {
			render(
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Header</TableHead>
						</TableRow>
					</TableHeader>
				</Table>,
			)

			const header = document.querySelector('thead')
			expect(header).toBeInTheDocument()
			expect(header).toHaveClass('[&_tr]:border-b')
		})

		it('renders with custom className', () => {
			render(
				<Table>
					<TableHeader className="custom-header">
						<TableRow>
							<TableHead>Header</TableHead>
						</TableRow>
					</TableHeader>
				</Table>,
			)

			const header = document.querySelector('thead')
			expect(header).toHaveClass('custom-header')
		})

		it('forwards HTML attributes correctly', () => {
			render(
				<Table>
					<TableHeader data-testid="test-header" id="header-id">
						<TableRow>
							<TableHead>Header</TableHead>
						</TableRow>
					</TableHeader>
				</Table>,
			)

			const header = screen.getByTestId('test-header')
			expect(header).toHaveAttribute('id', 'header-id')
		})
	})

	describe('TableBody Component', () => {
		it('renders table body with default styling', () => {
			render(
				<Table>
					<TableBody>
						<TableRow>
							<TableCell>Body content</TableCell>
						</TableRow>
					</TableBody>
				</Table>,
			)

			const body = document.querySelector('tbody')
			expect(body).toBeInTheDocument()
			expect(body).toHaveClass('[&_tr:last-child]:border-0')
		})

		it('renders with custom className', () => {
			render(
				<Table>
					<TableBody className="custom-body">
						<TableRow>
							<TableCell>Content</TableCell>
						</TableRow>
					</TableBody>
				</Table>,
			)

			const body = document.querySelector('tbody')
			expect(body).toHaveClass('custom-body')
		})

		it('forwards HTML attributes correctly', () => {
			render(
				<Table>
					<TableBody data-testid="test-body" id="body-id">
						<TableRow>
							<TableCell>Content</TableCell>
						</TableRow>
					</TableBody>
				</Table>,
			)

			const body = screen.getByTestId('test-body')
			expect(body).toHaveAttribute('id', 'body-id')
		})
	})

	describe('TableFooter Component', () => {
		it('renders table footer with default styling', () => {
			render(
				<Table>
					<TableFooter>
						<TableRow>
							<TableCell>Footer content</TableCell>
						</TableRow>
					</TableFooter>
				</Table>,
			)

			const footer = document.querySelector('tfoot')
			expect(footer).toBeInTheDocument()
			expect(footer).toHaveClass(
				'border-t',
				'bg-muted/50',
				'font-medium',
				'[&>tr]:last:border-b-0',
			)
		})

		it('renders with custom className', () => {
			render(
				<Table>
					<TableFooter className="custom-footer">
						<TableRow>
							<TableCell>Footer</TableCell>
						</TableRow>
					</TableFooter>
				</Table>,
			)

			const footer = document.querySelector('tfoot')
			expect(footer).toHaveClass('custom-footer')
		})

		it('forwards HTML attributes correctly', () => {
			render(
				<Table>
					<TableFooter data-testid="test-footer" id="footer-id">
						<TableRow>
							<TableCell>Footer</TableCell>
						</TableRow>
					</TableFooter>
				</Table>,
			)

			const footer = screen.getByTestId('test-footer')
			expect(footer).toHaveAttribute('id', 'footer-id')
		})
	})

	describe('TableRow Component', () => {
		it('renders table row with default styling', () => {
			render(
				<Table>
					<TableBody>
						<TableRow>
							<TableCell>Row content</TableCell>
						</TableRow>
					</TableBody>
				</Table>,
			)

			const row = screen.getByRole('row')
			expect(row).toBeInTheDocument()
			expect(row).toHaveClass(
				'border-b',
				'transition-colors',
				'hover:bg-muted/50',
				'data-[state=selected]:bg-muted',
			)
		})

		it('renders with custom className', () => {
			render(
				<Table>
					<TableBody>
						<TableRow className="custom-row">
							<TableCell>Content</TableCell>
						</TableRow>
					</TableBody>
				</Table>,
			)

			const row = screen.getByRole('row')
			expect(row).toHaveClass('custom-row')
		})

		it('supports selected state', () => {
			render(
				<Table>
					<TableBody>
						<TableRow data-state="selected">
							<TableCell>Selected row</TableCell>
						</TableRow>
					</TableBody>
				</Table>,
			)

			const row = screen.getByRole('row')
			expect(row).toHaveAttribute('data-state', 'selected')
		})

		it('forwards HTML attributes correctly', () => {
			render(
				<Table>
					<TableBody>
						<TableRow data-testid="test-row" id="row-id">
							<TableCell>Content</TableCell>
						</TableRow>
					</TableBody>
				</Table>,
			)

			const row = screen.getByTestId('test-row')
			expect(row).toHaveAttribute('id', 'row-id')
		})
	})

	describe('TableHead Component', () => {
		it('renders table head with default styling', () => {
			render(
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Column Header</TableHead>
						</TableRow>
					</TableHeader>
				</Table>,
			)

			const head = screen.getByRole('columnheader')
			expect(head).toBeInTheDocument()
			expect(head).toHaveClass(
				'h-10',
				'px-2',
				'text-left',
				'align-middle',
				'font-medium',
				'text-muted-foreground',
				'[&:has([role=checkbox])]:pr-0',
				'[&>[role=checkbox]]:translate-y-[2px]',
			)
		})

		it('renders with custom className', () => {
			render(
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="custom-head">Header</TableHead>
						</TableRow>
					</TableHeader>
				</Table>,
			)

			const head = screen.getByRole('columnheader')
			expect(head).toHaveClass('custom-head')
		})

		it('supports all th HTML attributes', () => {
			render(
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead scope="col" abbr="Name">
								Full Name
							</TableHead>
						</TableRow>
					</TableHeader>
				</Table>,
			)

			const head = screen.getByRole('columnheader')
			expect(head).toHaveAttribute('scope', 'col')
			expect(head).toHaveAttribute('abbr', 'Name')
		})

		it('forwards HTML attributes correctly', () => {
			render(
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead data-testid="test-head" id="head-id">
								Header
							</TableHead>
						</TableRow>
					</TableHeader>
				</Table>,
			)

			const head = screen.getByTestId('test-head')
			expect(head).toHaveAttribute('id', 'head-id')
		})
	})

	describe('TableCell Component', () => {
		it('renders table cell with default styling', () => {
			render(
				<Table>
					<TableBody>
						<TableRow>
							<TableCell>Cell content</TableCell>
						</TableRow>
					</TableBody>
				</Table>,
			)

			const cell = screen.getByRole('cell')
			expect(cell).toBeInTheDocument()
			expect(cell).toHaveClass(
				'p-2',
				'align-middle',
				'[&:has([role=checkbox])]:pr-0',
				'[&>[role=checkbox]]:translate-y-[2px]',
			)
		})

		it('renders with custom className', () => {
			render(
				<Table>
					<TableBody>
						<TableRow>
							<TableCell className="custom-cell">Content</TableCell>
						</TableRow>
					</TableBody>
				</Table>,
			)

			const cell = screen.getByRole('cell')
			expect(cell).toHaveClass('custom-cell')
		})

		it('supports all td HTML attributes', () => {
			render(
				<Table>
					<TableBody>
						<TableRow>
							<TableCell colSpan={2} rowSpan={1}>
								Spanning cell
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>,
			)

			const cell = screen.getByRole('cell')
			expect(cell).toHaveAttribute('colspan', '2')
			expect(cell).toHaveAttribute('rowspan', '1')
		})

		it('forwards HTML attributes correctly', () => {
			render(
				<Table>
					<TableBody>
						<TableRow>
							<TableCell data-testid="test-cell" id="cell-id">
								Content
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>,
			)

			const cell = screen.getByTestId('test-cell')
			expect(cell).toHaveAttribute('id', 'cell-id')
		})
	})

	describe('TableCaption Component', () => {
		it('renders table caption with default styling', () => {
			render(
				<Table>
					<TableCaption>Table description</TableCaption>
					<TableBody>
						<TableRow>
							<TableCell>Content</TableCell>
						</TableRow>
					</TableBody>
				</Table>,
			)

			const caption = screen.getByText('Table description')
			expect(caption).toBeInTheDocument()
			expect(caption.tagName).toBe('CAPTION')
			expect(caption).toHaveClass('mt-4', 'text-sm', 'text-muted-foreground')
		})

		it('renders with custom className', () => {
			render(
				<Table>
					<TableCaption className="custom-caption">Caption</TableCaption>
					<TableBody>
						<TableRow>
							<TableCell>Content</TableCell>
						</TableRow>
					</TableBody>
				</Table>,
			)

			const caption = screen.getByText('Caption')
			expect(caption).toHaveClass('custom-caption')
		})

		it('forwards HTML attributes correctly', () => {
			render(
				<Table>
					<TableCaption data-testid="test-caption" id="caption-id">
						Caption
					</TableCaption>
					<TableBody>
						<TableRow>
							<TableCell>Content</TableCell>
						</TableRow>
					</TableBody>
				</Table>,
			)

			const caption = screen.getByTestId('test-caption')
			expect(caption).toHaveAttribute('id', 'caption-id')
		})
	})

	describe('Complete Table Structure', () => {
		it('renders complete table with all components', () => {
			render(
				<Table>
					<TableCaption>Employee Information</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Position</TableHead>
							<TableHead>Salary</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell>John Doe</TableCell>
							<TableCell>Developer</TableCell>
							<TableCell>$75,000</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Jane Smith</TableCell>
							<TableCell>Designer</TableCell>
							<TableCell>$65,000</TableCell>
						</TableRow>
					</TableBody>
					<TableFooter>
						<TableRow>
							<TableCell colSpan={2}>Total</TableCell>
							<TableCell>$140,000</TableCell>
						</TableRow>
					</TableFooter>
				</Table>,
			)

			expect(screen.getByText('Employee Information')).toBeInTheDocument()
			expect(screen.getByText('Name')).toBeInTheDocument()
			expect(screen.getByText('John Doe')).toBeInTheDocument()
			expect(screen.getByText('Total')).toBeInTheDocument()

			const table = screen.getByRole('table')
			expect(table).toBeInTheDocument()

			const rows = screen.getAllByRole('row')
			expect(rows).toHaveLength(4) // header + 2 body + footer
		})
	})

	describe('Accessibility', () => {
		it('has proper table semantics', () => {
			render(
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Header</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell>Cell</TableCell>
						</TableRow>
					</TableBody>
				</Table>,
			)

			expect(screen.getByRole('table')).toBeInTheDocument()
			expect(screen.getByRole('columnheader')).toBeInTheDocument()
			expect(screen.getByRole('cell')).toBeInTheDocument()
			expect(screen.getAllByRole('row')).toHaveLength(2)
		})

		it('supports table caption for accessibility', () => {
			render(
				<Table>
					<TableCaption>List of users and their roles</TableCaption>
					<TableBody>
						<TableRow>
							<TableCell>Content</TableCell>
						</TableRow>
					</TableBody>
				</Table>,
			)

			const caption = screen.getByText('List of users and their roles')
			expect(caption.tagName).toBe('CAPTION')
		})

		it('supports scope attribute on headers', () => {
			render(
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead scope="col">Name</TableHead>
							<TableHead scope="col">Age</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell>John</TableCell>
							<TableCell>25</TableCell>
						</TableRow>
					</TableBody>
				</Table>,
			)

			const headers = screen.getAllByRole('columnheader')
			headers.forEach((header) => {
				expect(header).toHaveAttribute('scope', 'col')
			})
		})
	})

	describe('Ref Forwarding', () => {
		it('forwards ref correctly for Table', () => {
			const ref = React.createRef<HTMLTableElement>()

			render(
				<Table ref={ref}>
					<TableBody>
						<TableRow>
							<TableCell>Content</TableCell>
						</TableRow>
					</TableBody>
				</Table>,
			)

			expect(ref.current).toBeInstanceOf(HTMLTableElement)
		})

		it('forwards ref correctly for TableRow', () => {
			const ref = React.createRef<HTMLTableRowElement>()

			render(
				<Table>
					<TableBody>
						<TableRow ref={ref}>
							<TableCell>Content</TableCell>
						</TableRow>
					</TableBody>
				</Table>,
			)

			expect(ref.current).toBeInstanceOf(HTMLTableRowElement)
		})

		it('forwards ref correctly for TableCell', () => {
			const ref = React.createRef<HTMLTableCellElement>()

			render(
				<Table>
					<TableBody>
						<TableRow>
							<TableCell ref={ref}>Content</TableCell>
						</TableRow>
					</TableBody>
				</Table>,
			)

			expect(ref.current).toBeInstanceOf(HTMLTableCellElement)
		})
	})

	describe('Edge Cases', () => {
		it('handles undefined className gracefully', () => {
			render(
				<Table className={undefined}>
					<TableBody>
						<TableRow>
							<TableCell>Content</TableCell>
						</TableRow>
					</TableBody>
				</Table>,
			)

			const table = screen.getByRole('table')
			expect(table).toHaveClass('w-full', 'caption-bottom', 'text-sm')
		})

		it('handles empty table', () => {
			render(<Table />)

			const table = screen.getByRole('table')
			expect(table).toBeInTheDocument()
		})

		it('handles table with only header', () => {
			render(
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Header Only</TableHead>
						</TableRow>
					</TableHeader>
				</Table>,
			)

			expect(screen.getByText('Header Only')).toBeInTheDocument()
			expect(screen.getAllByRole('row')).toHaveLength(1)
		})

		it('handles table with only body', () => {
			render(
				<Table>
					<TableBody>
						<TableRow>
							<TableCell>Body Only</TableCell>
						</TableRow>
					</TableBody>
				</Table>,
			)

			expect(screen.getByText('Body Only')).toBeInTheDocument()
			expect(screen.getAllByRole('row')).toHaveLength(1)
		})
	})

	describe('Complex Scenarios', () => {
		it('handles nested content in cells', () => {
			render(
				<Table>
					<TableBody>
						<TableRow>
							<TableCell>
								<div>
									<strong>John Doe</strong>
									<br />
									<small>Software Engineer</small>
								</div>
							</TableCell>
							<TableCell>
								<button>Edit</button>
								<button>Delete</button>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>,
			)

			expect(screen.getByText('John Doe')).toBeInTheDocument()
			expect(screen.getByText('Software Engineer')).toBeInTheDocument()
			expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument()
			expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument()
		})

		it('handles large tables with many rows', () => {
			const rows = Array.from({ length: 100 }, (_, i) => (
				<TableRow key={i}>
					<TableCell>Row {i + 1}</TableCell>
					<TableCell>Data {i + 1}</TableCell>
				</TableRow>
			))

			render(
				<Table>
					<TableBody>{rows}</TableBody>
				</Table>,
			)

			expect(screen.getByText('Row 1')).toBeInTheDocument()
			expect(screen.getByText('Row 100')).toBeInTheDocument()
			expect(screen.getAllByRole('row')).toHaveLength(100)
		})

		it('handles tables with colspan and rowspan', () => {
			render(
				<Table>
					<TableBody>
						<TableRow>
							<TableCell colSpan={2}>Spanning two columns</TableCell>
							<TableCell>Regular cell</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Cell 1</TableCell>
							<TableCell rowSpan={2}>Spanning two rows</TableCell>
							<TableCell>Cell 3</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Cell 4</TableCell>
							<TableCell>Cell 6</TableCell>
						</TableRow>
					</TableBody>
				</Table>,
			)

			const spanningCell = screen.getByText('Spanning two columns')
			expect(spanningCell).toHaveAttribute('colspan', '2')

			const rowSpanCell = screen.getByText('Spanning two rows')
			expect(rowSpanCell).toHaveAttribute('rowspan', '2')
		})
	})
})
