'use client'

import { Input } from '@/components/input'
import { Search } from 'lucide-react'

interface SearchInputProps {
	value: string
	onChange: (value: string) => void
	placeholder?: string
}

export function SearchInput({
	value,
	onChange,
	placeholder = 'Search...',
}: SearchInputProps) {
	return (
		<div className="relative flex-1 max-w-sm">
			<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
			<Input
				placeholder={placeholder}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="pl-10"
			/>
		</div>
	)
}
