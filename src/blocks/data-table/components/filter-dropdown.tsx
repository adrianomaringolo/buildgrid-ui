'use client'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/select'
import { Filter } from 'lucide-react'
import type { DataTableFilter } from '../types/data-table'

interface FilterDropdownProps<T> {
	filter: DataTableFilter<T>
	value: string
	onChange: (value: string) => void
}

export function FilterDropdown<T>({ filter, value, onChange }: FilterDropdownProps<T>) {
	return (
		<Select value={value || 'all'} onValueChange={onChange}>
			<SelectTrigger className="w-40">
				<div className="flex items-center gap-2">
					<Filter className="h-4 w-4" />
					<SelectValue placeholder={filter.label} />
				</div>
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="all">All {filter.label}</SelectItem>
				{filter.options.map((option) => (
					<SelectItem key={option.value} value={option.value}>
						{option.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}
