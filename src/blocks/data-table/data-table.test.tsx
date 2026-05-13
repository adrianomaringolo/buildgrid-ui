import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { DataTable } from './data-table'
import type { DataTableColumn, DataTableFilter, DataTableRef } from './types/data-table'

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

interface Person {
	id: number
	name: string
	role: string
	age: number
}

const people: Person[] = [
	{ id: 1, name: 'Alice', role: 'admin', age: 30 },
	{ id: 2, name: 'Bob', role: 'user', age: 25 },
	{ id: 3, name: 'Charlie', role: 'user', age: 35 },
	{ id: 4, name: 'Diana', role: 'admin', age: 28 },
	{ id: 5, name: 'Eve', role: 'user', age: 22 },
]

const columns: DataTableColumn<Person>[] = [
	{ key: 'name', title: 'Name', sortable: true },
	{ key: 'role', title: 'Role' },
	{ key: 'age', title: 'Age', sortable: true },
]

const roleFilter: DataTableFilter<Person> = {
	field: 'role',
	label: 'Role',
	options: [
		{ label: 'Admin', value: 'admin' },
		{ label: 'User', value: 'user' },
	],
}

const searchFields: (keyof Person)[] = ['name', 'role']

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function renderTable(overrides: Partial<React.ComponentProps<typeof DataTable<Person>>> = {}) {
	return render(
		<DataTable
			data={people}
			columns={columns}
			searchFields={searchFields}
			{...overrides}
		/>,
	)
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('DataTable', () => {
	describe('Rendering', () => {
		it('renders all rows', () => {
			renderTable()
			expect(screen.getByText('Alice')).toBeInTheDocument()
			expect(screen.getByText('Bob')).toBeInTheDocument()
			expect(screen.getByText('Charlie')).toBeInTheDocument()
		})

		it('renders column headers', () => {
			renderTable()
			expect(screen.getByText('Name')).toBeInTheDocument()
			expect(screen.getByText('Role')).toBeInTheDocument()
			expect(screen.getByText('Age')).toBeInTheDocument()
		})

		it('shows "No data available." when data is empty', () => {
			renderTable({ data: [] })
			expect(screen.getByText('No data available.')).toBeInTheDocument()
		})

		it('renders loading skeleton when loading=true', () => {
			renderTable({ loading: true })
			expect(screen.queryByText('Alice')).not.toBeInTheDocument()
		})
	})

	describe('Search', () => {
		beforeEach(() => vi.useFakeTimers())
		afterEach(() => vi.useRealTimers())

		it('filters rows after debounce delay', async () => {
			renderTable()
			const search = screen.getByPlaceholderText('Search...')
			fireEvent.change(search, { target: { value: 'alice' } })

			// Before debounce fires all rows still visible
			expect(screen.getByText('Bob')).toBeInTheDocument()

			// Advance past the 1000ms debounce used by DataTable
			await act(async () => {
				vi.advanceTimersByTime(1100)
			})

			expect(screen.queryByText('Bob')).not.toBeInTheDocument()
			expect(screen.getByText('Alice')).toBeInTheDocument()
		})

		it('shows "No results found" when search matches nothing', async () => {
			renderTable()
			const search = screen.getByPlaceholderText('Search...')
			fireEvent.change(search, { target: { value: 'zzznomatch' } })

			await act(async () => {
				vi.advanceTimersByTime(1100)
			})

			expect(
				screen.getByText('No results found for the current filters.'),
			).toBeInTheDocument()
		})

		it('hides search input when tools.search.hide = true', () => {
			renderTable({ tools: { search: { hide: true } } })
			expect(screen.queryByPlaceholderText('Search...')).not.toBeInTheDocument()
		})

		it('uses custom search placeholder from tools.search.placeholder', () => {
			renderTable({ tools: { search: { placeholder: 'Buscar...' } } })
			expect(screen.getByPlaceholderText('Buscar...')).toBeInTheDocument()
		})
	})

	describe('Filters', () => {
		it('renders filter dropdown', () => {
			renderTable({ filters: [roleFilter] })
			expect(screen.getByText(/All Role/)).toBeInTheDocument()
		})

		it('applies initialActiveFilters on mount', () => {
			renderTable({
				filters: [roleFilter],
				activeFilters: { role: 'admin' },
			})
			expect(screen.getByText('Alice')).toBeInTheDocument()
			expect(screen.getByText('Diana')).toBeInTheDocument()
			expect(screen.queryByText('Bob')).not.toBeInTheDocument()
		})
	})

	describe('Sorting', () => {
		it('sorts ascending when a sortable header is clicked', async () => {
			renderTable()
			fireEvent.click(screen.getByText('Name'))

			await waitFor(() => {
				const cells = screen.getAllByRole('cell')
				const names = cells
					.map((c) => c.textContent)
					.filter((t) => ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'].includes(t ?? ''))
				expect(names[0]).toBe('Alice')
			})
		})

		it('sorts descending on second click', async () => {
			renderTable()
			fireEvent.click(screen.getByText('Name'))
			fireEvent.click(screen.getByText('Name'))

			await waitFor(() => {
				const cells = screen.getAllByRole('cell')
				const names = cells
					.map((c) => c.textContent)
					.filter((t) => ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'].includes(t ?? ''))
				expect(names[0]).toBe('Eve')
			})
		})

		it('clears sort on third click', async () => {
			renderTable()
			fireEvent.click(screen.getByText('Name'))
			fireEvent.click(screen.getByText('Name'))
			fireEvent.click(screen.getByText('Name'))

			await waitFor(() => {
				expect(screen.getByText('Alice')).toBeInTheDocument()
				expect(screen.getByText('Eve')).toBeInTheDocument()
			})
		})
	})

	describe('Pagination', () => {
		it('paginates when pageSize is smaller than data length', () => {
			renderTable({ pageSize: 2 })
			expect(screen.getByText('Alice')).toBeInTheDocument()
			expect(screen.getByText('Bob')).toBeInTheDocument()
			expect(screen.queryByText('Charlie')).not.toBeInTheDocument()
		})

		it('navigates to next page', async () => {
			renderTable({ pageSize: 2 })
			// The last button in the document is the Next button (after page number buttons)
			const allButtons = screen.getAllByRole('button')
			const nextBtn = allButtons[allButtons.length - 1]
			fireEvent.click(nextBtn)

			await waitFor(() => {
				expect(screen.getByText('Charlie')).toBeInTheDocument()
			})
		})

		it('shows all rows when pageSize >= data.length', () => {
			renderTable({ pageSize: 10 })
			people.forEach(({ name }) => {
				expect(screen.getByText(name)).toBeInTheDocument()
			})
		})
	})

	describe('Server pagination', () => {
		const serverData = [{ id: 1, name: 'Alice', role: 'admin', age: 30 }] as Person[]
		const serverConfig = {
			currentPage: 2,
			totalPages: 10,
			totalItems: 100,
			onPageChange: vi.fn(),
		}

		it('renders only the data provided (current page)', () => {
			renderTable({ data: serverData, serverPagination: serverConfig })
			expect(screen.getByText('Alice')).toBeInTheDocument()
			expect(screen.queryByText('Bob')).not.toBeInTheDocument()
		})

		it('calls onPageChange with next page when Next is clicked', () => {
			const onPageChange = vi.fn()
			renderTable({
				data: serverData,
				serverPagination: { ...serverConfig, onPageChange },
			})
			const allButtons = screen.getAllByRole('button')
			const nextBtn = allButtons[allButtons.length - 1]
			fireEvent.click(nextBtn)
			expect(onPageChange).toHaveBeenCalledWith(3)
		})

		it('calls onPageChange with prev page when Previous is clicked', () => {
			const onPageChange = vi.fn()
			renderTable({
				data: serverData,
				serverPagination: { ...serverConfig, onPageChange },
			})
			// Previous is the first button inside the pagination section (after toolbar buttons)
			// Find it by aria-label or by filtering disabled state
			const allButtons = screen.getAllByRole('button')
			// Export CSV + Columns + prev + page numbers + next
			// Prev is NOT disabled (page 2) and comes before page numbers
			// Find prev by clicking the first non-disabled button that's not Export/Columns
			const paginationButtons = allButtons.filter((btn) => !btn.textContent?.match(/Export|Columns/))
			fireEvent.click(paginationButtons[0])
			expect(onPageChange).toHaveBeenCalledWith(1)
		})
	})

	describe('Row selection', () => {
		it('selects a row via checkbox', async () => {
			renderTable()
			const checkboxes = screen.getAllByRole('checkbox')
			// First checkbox is "select all", rest are per-row
			fireEvent.click(checkboxes[1])
			await waitFor(() => {
				expect(checkboxes[1]).toBeChecked()
			})
		})

		it('selects all rows via header checkbox', async () => {
			renderTable()
			const [selectAll] = screen.getAllByRole('checkbox')
			fireEvent.click(selectAll)
			await waitFor(() => {
				const checkboxes = screen.getAllByRole('checkbox')
				checkboxes.slice(1).forEach((cb) => expect(cb).toBeChecked())
			})
		})

		it('deselects all after clicking header checkbox twice', async () => {
			renderTable()
			const [selectAll] = screen.getAllByRole('checkbox')
			fireEvent.click(selectAll)
			fireEvent.click(selectAll)
			await waitFor(() => {
				const checkboxes = screen.getAllByRole('checkbox')
				checkboxes.slice(1).forEach((cb) => expect(cb).not.toBeChecked())
			})
		})

		it('hides row selector when tools.rowSelector.hide = true', () => {
			renderTable({ tools: { rowSelector: { hide: true } } })
			expect(screen.queryByRole('checkbox')).not.toBeInTheDocument()
		})
	})

	describe('Export', () => {
		it('renders the Export CSV button by default', () => {
			renderTable()
			expect(screen.getByText('Export CSV')).toBeInTheDocument()
		})

		it('hides export button when tools.export.hide = true', () => {
			renderTable({ tools: { export: { hide: true } } })
			expect(screen.queryByText('Export CSV')).not.toBeInTheDocument()
		})

		it('triggers CSV download when Export is clicked', () => {
			// Render BEFORE setting up spies so React can mount correctly
			renderTable()

			const createObjectURL = vi.fn(() => 'blob:mock')
			global.URL.createObjectURL = createObjectURL

			// Spy on createElement to intercept the link creation
			const clickSpy = vi.fn()
			const originalCreateElement = document.createElement.bind(document)
			const createElementSpy = vi
				.spyOn(document, 'createElement')
				.mockImplementation((tag: string) => {
					const el = originalCreateElement(tag)
					if (tag === 'a') {
						Object.defineProperty(el, 'click', { value: clickSpy, writable: true })
					}
					return el
				})

			fireEvent.click(screen.getByText('Export CSV'))

			expect(createObjectURL).toHaveBeenCalled()
			expect(clickSpy).toHaveBeenCalled()

			createElementSpy.mockRestore()
		})
	})

	describe('Column visibility', () => {
		it('renders the Columns button by default', () => {
			renderTable()
			expect(screen.getByText('Columns')).toBeInTheDocument()
		})

		it('hides column selector when tools.columnSelector.hide = true', () => {
			renderTable({ tools: { columnSelector: { hide: true } } })
			expect(screen.queryByText('Columns')).not.toBeInTheDocument()
		})
	})

	describe('Clear filters', () => {
		beforeEach(() => vi.useFakeTimers())
		afterEach(() => vi.useRealTimers())

		it('shows Clear All button after searching', async () => {
			renderTable()
			const search = screen.getByPlaceholderText('Search...')
			fireEvent.change(search, { target: { value: 'alice' } })
			// Clear All appears immediately (based on searchTerm, not debounced value)
			expect(screen.getByText('Clear All')).toBeInTheDocument()
		})

		it('resets search and restores all rows when Clear All is clicked', async () => {
			renderTable()
			const search = screen.getByPlaceholderText('Search...')
			fireEvent.change(search, { target: { value: 'alice' } })

			expect(screen.getByText('Clear All')).toBeInTheDocument()
			fireEvent.click(screen.getByText('Clear All'))

			// After clear, search term is empty so debounce resolves immediately on next tick
			await act(async () => {
				vi.advanceTimersByTime(1100)
			})

			expect(screen.getByText('Bob')).toBeInTheDocument()
		})
	})

	describe('Labels / i18n', () => {
		it('uses custom searchPlaceholder label', () => {
			renderTable({ labels: { searchPlaceholder: 'Pesquisar...' } })
			expect(screen.getByPlaceholderText('Pesquisar...')).toBeInTheDocument()
		})

		it('uses custom exportButton label', () => {
			renderTable({ labels: { exportButton: 'Exportar CSV' } })
			expect(screen.getByText('Exportar CSV')).toBeInTheDocument()
		})

		it('tools.export.label takes priority over labels.exportButton', () => {
			renderTable({
				tools: { export: { label: 'Tools label' } },
				labels: { exportButton: 'Labels label' },
			})
			expect(screen.getByText('Tools label')).toBeInTheDocument()
			expect(screen.queryByText('Labels label')).not.toBeInTheDocument()
		})

		it('uses custom noDataAvailable label', () => {
			renderTable({ data: [], labels: { noDataAvailable: 'Sem dados.' } })
			expect(screen.getByText('Sem dados.')).toBeInTheDocument()
		})

		it('uses custom noResultsWithFilters label after debounced search', async () => {
			vi.useFakeTimers()
			renderTable({ labels: { noResultsWithFilters: 'Nenhum resultado.' } })
			fireEvent.change(screen.getByPlaceholderText('Search...'), {
				target: { value: 'zzz' },
			})
			await act(async () => {
				vi.advanceTimersByTime(1100)
			})
			expect(screen.getByText('Nenhum resultado.')).toBeInTheDocument()
			vi.useRealTimers()
		})
	})

	describe('Imperative ref API', () => {
		it('getSelectedItems returns selected rows', async () => {
			const ref = React.createRef<DataTableRef<Person>>()
			render(
				<DataTable ref={ref} data={people} columns={columns} searchFields={searchFields} />,
			)

			const checkboxes = screen.getAllByRole('checkbox')
			fireEvent.click(checkboxes[1]) // select Alice (row 0)

			await waitFor(() => {
				expect(ref.current?.getSelectedItems()).toHaveLength(1)
				expect(ref.current?.getSelectedItems()[0].name).toBe('Alice')
			})
		})

		it('getSelectionCount returns the correct count', async () => {
			const ref = React.createRef<DataTableRef<Person>>()
			render(
				<DataTable ref={ref} data={people} columns={columns} searchFields={searchFields} />,
			)

			const checkboxes = screen.getAllByRole('checkbox')
			fireEvent.click(checkboxes[1])
			fireEvent.click(checkboxes[2])

			await waitFor(() => {
				expect(ref.current?.getSelectionCount()).toBe(2)
			})
		})

		it('clearSelection empties the selection', async () => {
			const ref = React.createRef<DataTableRef<Person>>()
			render(
				<DataTable ref={ref} data={people} columns={columns} searchFields={searchFields} />,
			)

			const checkboxes = screen.getAllByRole('checkbox')
			fireEvent.click(checkboxes[1])

			await waitFor(() => {
				expect(ref.current?.getSelectionCount()).toBe(1)
			})

			act(() => {
				ref.current?.clearSelection()
			})

			await waitFor(() => {
				expect(ref.current?.getSelectionCount()).toBe(0)
			})
		})

		it('getFilteredData returns all rows when no filters are active', () => {
			const ref = React.createRef<DataTableRef<Person>>()
			render(
				<DataTable ref={ref} data={people} columns={columns} searchFields={searchFields} />,
			)
			expect(ref.current?.getFilteredData()).toHaveLength(people.length)
		})

		it('resetFilters restores all rows', async () => {
			const ref = React.createRef<DataTableRef<Person>>()
			render(
				<DataTable
					ref={ref}
					data={people}
					columns={columns}
					searchFields={searchFields}
					filters={[roleFilter]}
					activeFilters={{ role: 'admin' }}
				/>,
			)

			// Initially only admins visible
			expect(screen.queryByText('Bob')).not.toBeInTheDocument()

			act(() => {
				ref.current?.resetFilters()
			})

			await waitFor(() => {
				expect(ref.current?.getFilteredData()).toHaveLength(people.length)
			})
		})

		it('goToPage navigates to a specific page', async () => {
			const ref = React.createRef<DataTableRef<Person>>()
			render(
				<DataTable
					ref={ref}
					data={people}
					columns={columns}
					searchFields={searchFields}
					pageSize={2}
				/>,
			)

			expect(screen.queryByText('Charlie')).not.toBeInTheDocument()

			act(() => {
				ref.current?.goToPage(2)
			})

			await waitFor(() => {
				expect(screen.getByText('Charlie')).toBeInTheDocument()
			})
		})

		it('selectItems selects rows by ID', async () => {
			const ref = React.createRef<DataTableRef<Person>>()
			render(
				<DataTable ref={ref} data={people} columns={columns} searchFields={searchFields} />,
			)

			act(() => {
				ref.current?.selectItems(['1']) // Alice has id=1
			})

			await waitFor(() => {
				expect(ref.current?.getSelectionCount()).toBe(1)
			})
		})
	})
})
