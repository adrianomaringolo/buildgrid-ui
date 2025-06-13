import type React from 'react'

export interface DataTableColumn<T> {
	key: keyof T
	title: string
	customRenderer?: (value: any, row: T) => React.ReactNode
	sortable?: boolean
	hidden?: boolean
}

export interface FilterOption {
	label: string
	value: string
}

export interface DataTableFilter<T> {
	field: keyof T
	label: string
	options: FilterOption[]
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
	pageSize?: number
	className?: string
	loading?: boolean
	tools?: DataTableToolsProps
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
