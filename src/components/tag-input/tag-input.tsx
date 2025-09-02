'use client'

import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import {
	useEffect,
	useRef,
	useState,
	type ChangeEvent,
	type KeyboardEvent,
	type MouseEvent,
} from 'react'

interface TagInputProps {
	value?: string[]
	onChange?: (value: string[]) => void
	separator?: string
	placeholder?: string
	className?: string
	initialValue?: string | string[]
	helperText?: string
}

export function TagInput({
	value = [],
	onChange,
	separator = ',',
	placeholder = 'Type and press Enter or comma to add tags...',
	className,
	initialValue = '',
	helperText = 'Press Enter or comma to add tags',
}: TagInputProps) {
	const [inputValue, setInputValue] = useState('')
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (initialValue && value.length === 0) {
			let initialTags: string[]

			if (Array.isArray(initialValue)) {
				initialTags = initialValue.filter((tag) => tag.trim() !== '')
			} else {
				initialTags = initialValue.split(separator).filter((tag) => tag.trim() !== '')
			}

			if (initialTags.length > 0) {
				onChange?.(initialTags)
			}
		}
	}, [initialValue, separator, onChange, value])

	const tags = value

	const addTag = (tagText: string) => {
		const trimmedTag = tagText.trim()
		if (trimmedTag && !tags.includes(trimmedTag)) {
			const newTags = [...tags, trimmedTag]
			onChange?.(newTags)
		}
		setInputValue('')
	}

	const removeTag = (indexToRemove: number) => {
		const newTags = tags.filter((_, index) => index !== indexToRemove)
		onChange?.(newTags)
	}

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' || e.key === ',') {
			e.preventDefault()
			addTag(inputValue)
		} else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
			removeTag(tags.length - 1)
		}
	}

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value

		if (newValue.includes(',')) {
			const parts = newValue.split(',')
			const tagToAdd = parts[0]
			const remaining = parts.slice(1).join(',')

			addTag(tagToAdd)
			setInputValue(remaining)
		} else {
			setInputValue(newValue)
		}
	}

	const handleContainerClick = (e: MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			inputRef.current?.focus()
		}
	}

	return (
		<div className={cn('w-full', className)}>
			<div
				onClick={handleContainerClick}
				className="w-full min-h-[80px] px-3 py-2 border border-input bg-background text-foreground rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:border-transparent cursor-text"
			>
				<div className="flex flex-wrap gap-2 items-center">
					{tags.map((tag, index) => (
						<div
							key={index}
							className="inline-flex items-center gap-1 px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
						>
							<span>{tag}</span>
							<button
								type="button"
								onClick={() => removeTag(index)}
								className="hover:bg-secondary-foreground/20 rounded-full p-0.5 transition-colors"
								aria-label={`Remove ${tag} tag`}
							>
								<X className="h-3 w-3" />
							</button>
						</div>
					))}

					<input
						ref={inputRef}
						type="text"
						value={inputValue}
						onChange={handleInputChange}
						onKeyDown={handleKeyDown}
						placeholder={tags.length === 0 ? placeholder : ''}
						className="flex-1 min-w-[120px] bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
					/>
				</div>
			</div>

			{helperText && <p className="text-xs text-muted-foreground mt-2">{helperText}</p>}
		</div>
	)
}
