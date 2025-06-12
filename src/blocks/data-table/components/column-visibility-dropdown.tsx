'use client'

import { Button } from '@/components/button'
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/dropdown-menu'
import { SlidersHorizontal } from 'lucide-react'
import type { DataTableColumn } from '../types/data-table'

interface ColumnVisibilityDropdownProps<T> {
	columns: DataTableColumn<T>[]
	onToggleVisibility: (key: string, visible: boolean) => void
	onReset: () => void
}

export function ColumnVisibilityDropdown<T>({
	columns,
	onToggleVisibility,
	onReset,
}: ColumnVisibilityDropdownProps<T>) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="ml-auto">
					<SlidersHorizontal className="h-4 w-4 mr-2" />
					Columns
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-48">
				<DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{columns.map((column) => (
					<DropdownMenuCheckboxItem
						key={String(column.key)}
						checked={!column.hidden}
						onCheckedChange={(checked) => onToggleVisibility(String(column.key), checked)}
					>
						{column.title}
					</DropdownMenuCheckboxItem>
				))}
				<DropdownMenuSeparator />
				<Button
					variant="ghost"
					size="sm"
					className="w-full justify-start"
					onClick={onReset}
				>
					Reset columns
				</Button>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
