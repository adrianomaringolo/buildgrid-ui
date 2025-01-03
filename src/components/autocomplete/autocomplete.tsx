import { Search } from 'lucide-react'
import { useState } from 'react'

import { cn } from '@/lib'
import { AdaptiveInput } from '../adaptive-input'
import { Popover, PopoverContent, PopoverTrigger } from '../popover'

interface Option {
	value: string
	label: string
}

interface AutoCompleteProps {
	value?: string
	onChange?: (value: string) => void
	options: Option[]
	className?: string
	placeholder?: string
	emptyMessage?: string
}

export function Autocomplete(props: AutoCompleteProps) {
	const {
		value = '',
		onChange,
		options: staticOptions,
		className,
		placeholder = 'Search...',
		emptyMessage = 'Nothing found',
	} = props

	const [query, setQuery] = useState(value)
	const [suggestions, setSuggestions] = useState<Option[]>(staticOptions)
	const [selectedIndex, setSelectedIndex] = useState(-1)
	const [isFocused, setIsFocused] = useState(false)

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value
		setQuery(newValue)
		onChange?.(newValue)
		setSelectedIndex(-1)
		setIsFocused(true)

		if (newValue.trim() === '') {
			setSuggestions(staticOptions)
		} else {
			setSuggestions(
				staticOptions.filter((option) =>
					option.label.toLowerCase().includes(newValue.toLowerCase()),
				),
			)
		}
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'ArrowDown') {
			e.preventDefault()
			setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev))
		} else if (e.key === 'ArrowUp') {
			e.preventDefault()
			setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
		} else if (e.key === 'Enter' && selectedIndex >= 0) {
			const selectedOption = suggestions[selectedIndex]
			setQuery(selectedOption.label)
			onChange?.(selectedOption.value)
			setSuggestions([])
			setSelectedIndex(-1)
			setIsFocused(false)
		} else if (e.key === 'Escape') {
			setSuggestions([])
			setSelectedIndex(-1)
		}
	}

	const handleSuggestionClick = (option: Option) => {
		setIsFocused(false)
		setQuery(option.label)
		onChange?.(option.value)
		setSuggestions(staticOptions)
		setSelectedIndex(-1)
	}

	const handleFocus = () => {
		setIsFocused(true)
	}

	const handleBlur = () => {
		setIsFocused(false)
	}

	return (
		<Popover open={isFocused}>
			<PopoverTrigger asChild>
				<div className="relative w-full">
					<AdaptiveInput
						type="text"
						placeholder={placeholder}
						value={query}
						onChange={handleInputChange}
						onKeyDown={handleKeyDown}
						onClick={handleFocus}
						onFocus={handleFocus}
						onBlur={handleBlur}
						className={cn('pr-10', className)}
						aria-label="Search field"
						aria-autocomplete="list"
						aria-controls="suggestions-list"
						aria-expanded={suggestions.length > 0}
						leftIcon={<Search className="w-4 h-4" />}
					/>
				</div>
			</PopoverTrigger>
			<PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)] max-h-96 overflow-y-auto">
				{suggestions.length > 0 ? (
					<ul id="suggestions-list" role="listbox">
						{suggestions.map((option, index) => (
							<li
								key={option.value}
								className={`px-4 py-2 cursor-pointer hover:bg-muted ${
									index === selectedIndex ? 'bg-muted' : ''
								}`}
								onClick={() => handleSuggestionClick(option)}
								role="option"
								aria-selected={index === selectedIndex}
							>
								{option.label}
							</li>
						))}
					</ul>
				) : (
					<span className="px-4 py-2 block">{emptyMessage}</span>
				)}
			</PopoverContent>
		</Popover>
	)
}
