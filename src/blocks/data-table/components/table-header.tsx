'use client'

import { Checkbox } from '@/components/checkbox'
import { TableHead, TableRow } from '@/components/table'
import { cn } from '@/lib/utils'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import type { DataTableColumn, SortState } from '../types/data-table'

interface TableHeaderProps<T> {
	columns: DataTableColumn<T>[]
	sortState: SortState
	allRowsSelected: boolean
	hasData: boolean
	allowSelectAllRows: boolean
	onSort: (field: string) => void
	onToggleAllRows: (checked: boolean) => void
}

export function TableHeader<T>({
	columns,
	sortState,
	allRowsSelected,
	hasData,
	onSort,
	onToggleAllRows,
	allowSelectAllRows,
}: TableHeaderProps<T>) {
	const visibleColumns = columns.filter((col) => !col.hidden)

	return (
		<TableRow>
			{/* Selection Checkbox */}
			{allowSelectAllRows && (
				<TableHead className="w-12">
					<Checkbox
						checked={allRowsSelected && hasData}
						onCheckedChange={onToggleAllRows}
						aria-label="Select all rows"
					/>
				</TableHead>
			)}

			{/* Column Headers */}
			{visibleColumns.map((column) => (
				<TableHead
					key={String(column.key)}
					className={cn(
						column.sortable ? 'cursor-pointer select-none' : '',
						column.headerClassName,
						column.align === 'right' ? 'text-right' : '',
						column.align === 'center' ? 'text-center' : '',
					)}
					onClick={column.sortable ? () => onSort(String(column.key)) : undefined}
					style={{
						width: column.width
							? typeof column.width === 'number'
								? `${column.width}px`
								: column.width
							: undefined,
					}}
				>
					<div className="flex items-center gap-1">
						{column.title}
						{column.sortable && (
							<>
								{sortState.field === column.key ? (
									sortState.direction === 'asc' ? (
										<ArrowUp className="h-4 w-4" />
									) : (
										<ArrowDown className="h-4 w-4" />
									)
								) : (
									<ArrowUpDown className="h-4 w-4 opacity-50" />
								)}
							</>
						)}
					</div>
				</TableHead>
			))}
		</TableRow>
	)
}
