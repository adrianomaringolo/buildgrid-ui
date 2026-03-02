import type React from 'react'

export interface DataTableLabels {
	/** Search input placeholder. Default: `'Search...'` */
	searchPlaceholder?: string
	/** Export button text. Default: `'Export CSV'` */
	exportButton?: string
	/** Clear-all-filters button text. Default: `'Clear All'` */
	clearAllButton?: string
	/**
	 * Pagination counter template. Supports `{{startIndex}}`, `{{endIndex}}`, `{{totalItems}}`.
	 * Default: `'Showing {{startIndex}} to {{endIndex}} of {{totalItems}} results'`
	 */
	paginationCounter?: string
	/** Empty-state label when there is no data. Default: `'No data available.'` */
	noDataAvailable?: string
	/** Empty-state label when filters produce no results. Default: `'No results found for the current filters.'` */
	noResultsWithFilters?: string
	/** Prefix shown in the active-search badge. Default: `'Search'` */
	searchBadgePrefix?: string
	/** Prefix shown in the active-sort badge. Default: `'Sort'` */
	sortBadgePrefix?: string
	/** Column-visibility dropdown trigger label. Default: `'Columns'` */
	columnsButton?: string
	/** Column-visibility dropdown menu label. Default: `'Toggle columns'` */
	toggleColumnsMenuLabel?: string
	/** Reset column-visibility button label. Default: `'Reset columns'` */
	resetColumnsButton?: string
	/**
	 * Factory for the "All" option in filter dropdowns.
	 * Receives the filter label and returns the option text.
	 * Default: `(label) => \`All \${label}\``
	 */
	allFilterOption?: (filterLabel: string) => string
	/** Selected-rows label (singular). Default: `'row selected'` */
	rowSelectedSingular?: string
	/** Selected-rows label (plural). Default: `'rows selected'` */
	rowSelectedPlural?: string
	/** Clear-selection button label. Default: `'Clear selection'` */
	clearSelectionButton?: string
}

export interface DataTableColumn<T> {
	key: keyof T
	/** The title of the column, can be a string or a React node */
	title: string | React.ReactNode
	/** Optional custom renderer for the column cells */
	customRenderer?: (value: any, row: T) => React.ReactNode
	/** Whether the column is sortable, defaults to false */
	sortable?: boolean
	/** Whether the column is hidden by default, defaults to false */
	hidden?: boolean
	/** Optional width for the column, can be a number (px) or string (e.g. '100px', '20%') */
	width?: number | string
	/** Optional className for the column header */
	headerClassName?: string
	/** Optional className for the column cells */
	cellClassName?: string
	/** Optional alignment for the column cells */
	align?: 'left' | 'center' | 'right'
}

export interface FilterOption {
	label: string
	value: string
}

export interface DataTableFilter<T> {
	field: keyof T
	label: string
	defaultValue?: string
	options: FilterOption[]
}

export interface ServerPaginationConfig {
	/** Total number of items on the server */
	totalItems: number
	/** Total number of pages on the server */
	totalPages: number
	/** Current page controlled externally */
	currentPage: number
	/** Callback invoked when the user requests a different page */
	onPageChange: (page: number) => void
}

export interface DataTableToolsProps {
	search?: {
		placeholder?: string
		hide?: boolean
	}
	filter?: {
		hide?: boolean
	}
	sort?: {
		hide?: boolean
	}
	columnSelector?: {
		hide?: boolean
	}
	rowSelector?: {
		hide?: boolean
	}
	pagination?: {
		label?: string
	}

	export?: {
		label?: string
		hide?: boolean
	}
	clearFilters?: {
		label?: string
		hide?: boolean
	}
}

export interface DataTableProps<T> {
	data: T[]
	columns: DataTableColumn<T>[]
	searchFields: (keyof T)[]
	filters?: DataTableFilter<T>[]
	activeFilters?: Record<string, string>
	pageSize?: number
	className?: string
	loading?: boolean
	tools?: DataTableToolsProps
	/**
	 * Override any text rendered by the table and its sub-components.
	 * All fields are optional — omitted ones fall back to English defaults.
	 * Existing `tools.*.label` fields take precedence when both are set (backward-compatible).
	 */
	labels?: DataTableLabels
	/**
	 * When provided, the component delegates pagination control to the server.
	 * - `data` must contain only the items for the current page (already paginated).
	 * - Client-side slicing is skipped; `totalItems`, `totalPages` and `currentPage`
	 *   from this config are used directly by the pagination UI.
	 * - `onPageChange` is called whenever the user navigates to a different page.
	 */
	serverPagination?: ServerPaginationConfig
}

export type SortDirection = 'asc' | 'desc' | null

export interface SortState {
	field: string | null
	direction: SortDirection
}

// DataTable ref interface for imperative API
export interface DataTableRef<T> {
	/** Get currently selected items */
	getSelectedItems: () => T[]
	/** Clear all selected items */
	clearSelection: () => void
	/** Get current selection count */
	getSelectionCount: () => number
	/** Select specific items by their IDs */
	selectItems: (ids: string[]) => void
	/** Get current filtered data (respects search and filters) */
	getFilteredData: () => T[]
	/** Reset all filters and search */
	resetFilters: () => void
	/** Export current data to CSV */
	exportData: (filename?: string) => void
	/** Go to specific page */
	goToPage: (page: number) => void
	/** Refresh/re-render the table */
	refresh: () => void
}

// Generic DataTable component type with proper ref forwarding
export type DataTableComponent = <T extends Record<string, any>>(
	props: DataTableProps<T> & { ref?: React.Ref<DataTableRef<T>> },
) => React.ReactElement
