'use client'

import { Button } from '@/components/button'
import { Table, TableBody, TableCell, TableHeader } from '@/components/table'
import { FileDown, X } from 'lucide-react'
import React, { useCallback, useMemo, useState } from 'react'

// Import components
import { ActiveFilters } from './components/active-filters'
import { ColumnVisibilityDropdown } from './components/column-visibility-dropdown'
import { FilterDropdown } from './components/filter-dropdown'
import { SearchInput } from './components/search-input'
import { SelectionInfo } from './components/selection-info'
import { TableHeader as DataTableHeader } from './components/table-header'
import { DataTableRow } from './components/table-row'
import { TableSkeleton } from './components/table-skeleton'

// Import utilities and hooks
import { exportToCSV } from './utils/export'

// Import types
import { Skeleton } from '@/components'
import { useDebounce } from '@/lib/hooks'
import { PaginationControls } from '../pagination-controls'
import type { DataTableProps, DataTableRef, SortState } from './types/data-table'

function DataTableInner<T extends Record<string, any>>(
	{
		data,
		columns: initialColumns,
		searchFields,
		filters = [],
		pageSize = 40,
		className = '',
		loading = false,
		tools,
		activeFilters: defaultFilters = {},
	}: DataTableProps<T>,
	ref: React.Ref<DataTableRef<T>>,
) {
	const [searchTerm, setSearchTerm] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const [activeFilters, setActiveFilters] =
		useState<Record<string, string>>(defaultFilters)
	const [sortState, setSortState] = useState<SortState>({ field: null, direction: null })
	const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
	const [columns, setColumns] = useState(initialColumns)
	const [refreshKey, setRefreshKey] = useState(0)

	// Debounce search term for performance
	const debouncedSearchTerm = useDebounce(searchTerm, 1000)

	// Simple row ID function
	const getRowId = (row: T, index: number): string => {
		return String(row.id || row._id || `row-${index}`)
	}

	// Memoized filtered and sorted data
	const processedData = useMemo(() => {
		let result = data.slice()

		// Apply search filter
		if (debouncedSearchTerm.trim()) {
			const searchLower = debouncedSearchTerm.toLowerCase()
			result = result.filter((item) =>
				searchFields.some((field) => {
					const value = item[field]
					if (value == null) return false
					return String(value).toLowerCase().includes(searchLower)
				}),
			)
		}

		// Apply dropdown filters
		Object.entries(activeFilters).forEach(([field, filterValue]) => {
			if (filterValue && filterValue !== 'all') {
				result = result.filter((item) => {
					const value = item[field as keyof T]
					return String(value) === filterValue
				})
			}
		})

		// Apply sorting
		if (sortState.field && sortState.direction) {
			const { field, direction } = sortState
			result.sort((a, b) => {
				const aValue = a[field as keyof T]
				const bValue = b[field as keyof T]

				// Handle null/undefined values
				if (aValue == null && bValue == null) return 0
				if (aValue == null) return direction === 'asc' ? -1 : 1
				if (bValue == null) return direction === 'asc' ? 1 : -1

				// Compare based on type
				if (typeof aValue === 'string' && typeof bValue === 'string') {
					return direction === 'asc'
						? aValue.localeCompare(bValue)
						: bValue.localeCompare(aValue)
				}

				// Numeric comparison
				return direction === 'asc'
					? (aValue as number) - (bValue as number)
					: (bValue as number) - (aValue as number)
			})
		}

		return result
	}, [data, searchFields, debouncedSearchTerm, activeFilters, sortState, refreshKey])

	// Memoized pagination calculations
	const paginationData = useMemo(() => {
		const totalItems = processedData.length
		const totalPages = Math.ceil(totalItems / pageSize)
		const startIndex = (currentPage - 1) * pageSize
		const endIndex = startIndex + pageSize
		const currentData = processedData.slice(startIndex, endIndex)

		return {
			currentData,
			totalItems,
			totalPages,
			startIndex,
			endIndex: Math.min(endIndex, totalItems),
		}
	}, [processedData, currentPage, pageSize])

	// Reset to first page when search or filters change
	React.useEffect(() => {
		setCurrentPage(1)
	}, [debouncedSearchTerm, activeFilters, sortState])

	// Get selected items for external use
	const getSelectedItems = useCallback(() => {
		return processedData.filter((item, index) => {
			const id = getRowId(item, index)
			return selectedRows.has(id)
		})
	}, [processedData, selectedRows])

	// Get selection count
	const getSelectionCount = useCallback(() => {
		return selectedRows.size
	}, [selectedRows])

	// Select specific items by IDs
	const selectItems = useCallback((ids: string[]) => {
		setSelectedRows(new Set(ids))
	}, [])

	// Get filtered data
	const getFilteredData = useCallback(() => {
		return processedData
	}, [processedData])

	// Reset all filters
	const resetFilters = useCallback(() => {
		setActiveFilters({})
		setSearchTerm('')
		setSortState({ field: null, direction: null })
		setCurrentPage(1)
	}, [])

	// Export data
	const exportData = useCallback(
		(filename = 'table-export') => {
			exportToCSV(processedData, columns, filename)
		},
		[processedData, columns],
	)

	// Go to specific page
	const goToPage = useCallback(
		(page: number) => {
			if (page >= 1 && page <= paginationData.totalPages) {
				setCurrentPage(page)
			}
		},
		[paginationData.totalPages],
	)

	// Refresh table
	const refresh = useCallback(() => {
		setRefreshKey((prev) => prev + 1)
	}, [])

	// Filter handlers
	const handleFilterChange = useCallback((field: string, value: string) => {
		setActiveFilters((prev) => ({
			...prev,
			[field]: value,
		}))
	}, [])

	const clearFilter = useCallback((field: string) => {
		setActiveFilters((prev) => {
			const newFilters = { ...prev }
			delete newFilters[field]
			return newFilters
		})
	}, [])

	const clearAllFilters = useCallback(() => {
		resetFilters()
	}, [resetFilters])

	// Sorting handlers
	const handleSort = useCallback((field: string) => {
		setSortState((prev) => {
			if (prev.field === field) {
				// Cycle through: asc -> desc -> null
				if (prev.direction === 'asc') return { field, direction: 'desc' }
				if (prev.direction === 'desc') return { field: null, direction: null }
				return { field, direction: 'asc' }
			}
			// New field, start with ascending
			return { field, direction: 'asc' }
		})
	}, [])

	// Column visibility handlers
	const toggleColumnVisibility = useCallback((key: string, visible: boolean) => {
		setColumns((prev) =>
			prev.map((col) => (String(col.key) === key ? { ...col, hidden: !visible } : col)),
		)
	}, [])

	const resetColumnVisibility = useCallback(() => {
		setColumns(initialColumns)
	}, [initialColumns])

	// Row selection handlers
	const toggleAllRows = useCallback(
		(checked: boolean) => {
			if (checked) {
				const newSelected = new Set<string>()
				paginationData.currentData.forEach((row, index) => {
					const id = getRowId(row, index)
					newSelected.add(id)
				})
				setSelectedRows(newSelected)
			} else {
				setSelectedRows(new Set())
			}
		},
		[paginationData.currentData],
	)

	const toggleRowSelection = useCallback((id: string, checked: boolean) => {
		setSelectedRows((prev) => {
			const newSet = new Set(prev)
			if (checked) {
				newSet.add(id)
			} else {
				newSet.delete(id)
			}
			return newSet
		})
	}, [])

	// Export handlers
	const handleExport = useCallback(() => {
		exportData()
	}, [exportData])

	// Pagination handlers
	const handlePreviousPage = useCallback(() => {
		setCurrentPage((prev) => Math.max(prev - 1, 1))
	}, [])

	const handleNextPage = useCallback(() => {
		setCurrentPage((prev) => Math.min(prev + 1, paginationData.totalPages))
	}, [paginationData.totalPages])

	const handlePageChange = useCallback(
		(page: number) => {
			goToPage(page)
		},
		[goToPage],
	)

	// Count active filters
	const activeFilterCount = Object.values(activeFilters).filter(
		(value) => value && value !== 'all',
	).length
	const hasActiveFilters =
		activeFilterCount > 0 || searchTerm.trim().length > 0 || sortState.field !== null

	// Get visible columns
	const visibleColumns = columns.filter((col) => !col.hidden)
	const selectedCount = selectedRows.size

	// Check if all rows on current page are selected
	const allRowsSelected = useMemo(() => {
		return (
			paginationData.currentData.length > 0 &&
			paginationData.currentData.every((row, index) => {
				const id = getRowId(row, index)
				return selectedRows.has(id)
			})
		)
	}, [paginationData.currentData, selectedRows])

	// Expose methods for parent component
	React.useImperativeHandle(
		ref,
		() => ({
			getSelectedItems,
			clearSelection: () => setSelectedRows(new Set()),
			getSelectionCount,
			selectItems,
			getFilteredData,
			resetFilters,
			exportData,
			goToPage,
			refresh,
		}),
		[
			getSelectedItems,
			getSelectionCount,
			selectItems,
			getFilteredData,
			resetFilters,
			exportData,
			goToPage,
			refresh,
		],
	)

	if (loading) {
		return (
			<div className={`space-y-4 ${className}`}>
				<div className="flex flex-wrap items-center gap-4">
					<Skeleton className="h-10 w-full max-w-sm" />
					{filters.map((_, index) => (
						<Skeleton key={index} className="h-10 w-30" />
					))}
					<Skeleton className="h-10 w-32 ml-auto" />
				</div>
				<TableSkeleton columns={visibleColumns.length + 1} rows={pageSize} />
				<div className="flex items-center justify-between">
					<Skeleton className="h-4 w-48" />
					<div className="flex items-center space-x-2">
						<Skeleton className="h-8 w-20" />
						<Skeleton className="h-8 w-8" />
						<Skeleton className="h-8 w-8" />
						<Skeleton className="h-8 w-8" />
						<Skeleton className="h-8 w-20" />
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className={`space-y-4 ${className}`}>
			{/* Table Controls */}
			<div className="flex flex-wrap items-center gap-4">
				{!Boolean(tools?.search?.hide) ? (
					<SearchInput
						placeholder={tools?.search?.placeholder}
						value={searchTerm}
						onChange={setSearchTerm}
					/>
				) : null}

				{filters.map((filter) => (
					<FilterDropdown
						key={String(filter.field)}
						filter={filter}
						value={activeFilters[String(filter.field)]}
						onChange={(value) => handleFilterChange(String(filter.field), value)}
					/>
				))}

				{Boolean(tools?.columnSelector?.hide) ? (
					<ColumnVisibilityDropdown
						columns={columns}
						onToggleVisibility={toggleColumnVisibility}
						onReset={resetColumnVisibility}
					/>
				) : null}

				{Boolean(tools?.export?.hide) ? (
					<Button variant="outline" onClick={handleExport}>
						<FileDown className="h-4 w-4 mr-2" />
						{tools?.export?.label ?? 'Export CSV'}
					</Button>
				) : null}

				{!Boolean(tools?.clearFilters?.hide) && hasActiveFilters && (
					<Button variant="outline" onClick={clearAllFilters}>
						<X className="h-4 w-4 mr-2" />
						{tools?.clearFilters?.label ?? 'Clear All'}
					</Button>
				)}
			</div>

			{/* Active Filters Display */}
			<ActiveFilters
				searchTerm={searchTerm}
				activeFilters={activeFilters}
				sortState={sortState}
				filters={filters}
				columns={columns}
				onClearSearch={() => setSearchTerm('')}
				onClearFilter={clearFilter}
				onClearSort={() => setSortState({ field: null, direction: null })}
			/>

			{/* Selected Rows Count */}
			<SelectionInfo
				selectedCount={selectedCount}
				onClearSelection={() => setSelectedRows(new Set())}
			/>

			{/* Table */}
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<DataTableHeader
							allowSelectAllRows={!Boolean(tools?.rowSelector?.hide)}
							columns={columns}
							sortState={sortState}
							allRowsSelected={allRowsSelected}
							hasData={paginationData.currentData.length > 0}
							onSort={handleSort}
							onToggleAllRows={toggleAllRows}
						/>
					</TableHeader>
					<TableBody>
						{paginationData.currentData.length === 0 ? (
							<tr>
								<TableCell
									colSpan={visibleColumns.length + 1}
									className="h-24 text-center text-muted-foreground"
								>
									{hasActiveFilters
										? 'No results found for the current filters.'
										: 'No data available.'}
								</TableCell>
							</tr>
						) : (
							paginationData.currentData.map((row, index) => {
								const rowId = getRowId(row, index)
								return (
									<DataTableRow
										key={rowId}
										row={row}
										index={index}
										allowSelection={!Boolean(tools?.rowSelector?.hide)}
										columns={columns}
										isSelected={selectedRows.has(rowId)}
										rowId={rowId}
										onToggleSelection={toggleRowSelection}
									/>
								)
							})
						)}
					</TableBody>
				</Table>
			</div>

			{/* Pagination */}
			<PaginationControls
				currentPage={currentPage}
				totalPages={paginationData.totalPages}
				totalItems={paginationData.totalItems}
				startIndex={paginationData.startIndex}
				endIndex={paginationData.endIndex}
				onPageChange={handlePageChange}
				onPreviousPage={handlePreviousPage}
				onNextPage={handleNextPage}
				counterText={tools?.pagination?.label}
			/>
		</div>
	)
}

// Create the generic DataTable component with proper forwardRef typing
export const DataTable = React.forwardRef(DataTableInner) as <
	T extends Record<string, any>,
>(
	props: DataTableProps<T> & { ref?: React.Ref<DataTableRef<T>> },
) => React.ReactElement

// Re-export types for convenience
export type {
	DataTableColumn,
	DataTableFilter,
	DataTableProps,
	DataTableRef,
} from './types/data-table'
