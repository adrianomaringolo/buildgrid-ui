'use client'

import { Badge } from '@/components/badge'
import { X } from 'lucide-react'
import type { DataTableColumn, DataTableFilter, SortState } from '../types/data-table'

interface ActiveFiltersProps<T> {
	searchTerm: string
	activeFilters: Record<string, string>
	sortState: SortState
	filters: DataTableFilter<T>[]
	columns: DataTableColumn<T>[]
	onClearSearch: () => void
	onClearFilter: (field: string) => void
	onClearSort: () => void
}

export function ActiveFilters<T>({
	searchTerm,
	activeFilters,
	sortState,
	filters,
	columns,
	onClearSearch,
	onClearFilter,
	onClearSort,
}: ActiveFiltersProps<T>) {
	const hasActiveFilters =
		Object.values(activeFilters).filter((value) => value && value !== 'all').length > 0 ||
		searchTerm.trim().length > 0 ||
		sortState.field !== null

	if (!hasActiveFilters) return null

	return (
		<div className="flex flex-wrap gap-2">
			{searchTerm.trim() && (
				<Badge variant="secondary" className="gap-1">
					Search: {searchTerm}
					<X
						className="h-3 w-3 cursor-pointer hover:text-destructive"
						onClick={onClearSearch}
					/>
				</Badge>
			)}
			{Object.entries(activeFilters).map(([field, value]) => {
				if (!value || value === 'all') return null
				const filter = filters.find((f) => String(f.field) === field)
				const option = filter?.options.find((o) => o.value === value)
				return (
					<Badge key={field} variant="secondary" className="gap-1">
						{filter?.label}: {option?.label || value}
						<X
							className="h-3 w-3 cursor-pointer hover:text-destructive"
							onClick={() => onClearFilter(field)}
						/>
					</Badge>
				)
			})}
			{sortState.field && (
				<Badge variant="secondary" className="gap-1">
					Sort:{' '}
					{columns.find((col) => String(col.key) === sortState.field)?.title ||
						sortState.field}{' '}
					{sortState.direction === 'asc' ? '↑' : '↓'}
					<X
						className="h-3 w-3 cursor-pointer hover:text-destructive"
						onClick={onClearSort}
					/>
				</Badge>
			)}
		</div>
	)
}
