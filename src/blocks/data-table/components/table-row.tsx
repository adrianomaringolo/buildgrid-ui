import { Checkbox } from '@/components/checkbox'
import { TableCell, TableRow } from '@/components/table'
import type { DataTableColumn } from '../types/data-table'

interface DataTableRowProps<T> {
	row: T
	index: number
	columns: DataTableColumn<T>[]
	isSelected: boolean
	rowId: string
	allowSelection?: boolean
	onToggleSelection: (id: string, checked: boolean) => void
}

export function DataTableRow<T>({
	row,
	index,
	columns,
	isSelected,
	rowId,
	onToggleSelection,
	allowSelection = true,
}: DataTableRowProps<T>) {
	const visibleColumns = columns.filter((col) => !col.hidden)

	return (
		<TableRow className={isSelected ? 'bg-muted/50' : ''}>
			{/* Row Selection Checkbox */}
			{allowSelection && (
				<TableCell className="w-12">
					<Checkbox
						checked={isSelected}
						onCheckedChange={(checked) => onToggleSelection(rowId, !!checked)}
						aria-label={`Select row ${index + 1}`}
					/>
				</TableCell>
			)}

			{/* Row Data */}
			{visibleColumns.map((column) => {
				const value = row[column.key]
				return (
					<TableCell key={String(column.key)}>
						{column.customRenderer
							? column.customRenderer(value, row)
							: String(value ?? '')}
					</TableCell>
				)
			})}
		</TableRow>
	)
}
