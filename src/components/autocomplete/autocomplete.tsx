'use client'

import { Search } from 'lucide-react'
import React, { KeyboardEvent, useEffect, useRef, useState } from 'react'
import { AdaptiveInput } from '../adaptive-input'

export interface Option {
	label: string
	value: string
}

interface AutocompleteProps {
	options: Option[]
	placeholder?: string
	onSelect: (option: Option) => void
	defaultSelectedOption?: Option
}

export function Autocomplete({
	options,
	placeholder = 'Type to search...',
	onSelect,
	defaultSelectedOption,
}: AutocompleteProps) {
	const [inputValue, setInputValue] = useState(defaultSelectedOption?.label || '')
	const [filteredOptions, setFilteredOptions] = useState<Option[]>([])
	const [isOpen, setIsOpen] = useState(false)
	const [activeIndex, setActiveIndex] = useState(-1)
	const [dropdownPosition, setDropdownPosition] = useState<'down' | 'up'>('down')
	const [selectedOption, setSelectedOption] = useState<Option | null>(
		defaultSelectedOption || null,
	)
	const autocompleteRef = useRef<HTMLDivElement>(null)
	const inputRef = useRef<HTMLInputElement>(null)
	const listRef = useRef<HTMLUListElement>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				autocompleteRef.current &&
				!autocompleteRef.current.contains(event.target as Node)
			) {
				setIsOpen(false)
			}
		}

		document.addEventListener('click', handleClickOutside)
		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	}, [])

	useEffect(() => {
		const filtered = options.filter((option) =>
			option.label.toLowerCase().includes(inputValue.toLowerCase()),
		)
		setFilteredOptions(filtered)
		setActiveIndex(-1)
	}, [inputValue, options])

	useEffect(() => {
		if (isOpen && inputRef.current) {
			const rect = inputRef.current.getBoundingClientRect()
			const spaceBelow = window.innerHeight - rect.bottom
			const spaceAbove = rect.top
			const listHeight = Math.min(filteredOptions.length * 40, 240) // Assuming each option is 40px high, max 240px

			setDropdownPosition(
				spaceBelow >= listHeight || spaceBelow > spaceAbove ? 'down' : 'up',
			)
		}
	}, [isOpen, filteredOptions])

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value)
		setSelectedOption(null)
		setIsOpen(true)
	}

	const handleOptionClick = (option: Option) => {
		setInputValue(option.label)
		setSelectedOption(option)
		setIsOpen(false)
		onSelect(option)
	}

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (!isOpen) {
			if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
				setIsOpen(true)
				return
			}
		}

		switch (e.key) {
			case 'ArrowDown':
				setActiveIndex((prev) => (prev < filteredOptions.length - 1 ? prev + 1 : prev))
				break
			case 'ArrowUp':
				setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev))
				break
			case 'Enter':
				if (activeIndex >= 0 && activeIndex < filteredOptions.length) {
					handleOptionClick(filteredOptions[activeIndex])
				}
				break
			case 'Escape':
				setIsOpen(false)
				break
		}
	}

	useEffect(() => {
		if (isOpen && listRef.current && activeIndex >= 0) {
			const activeElement = listRef.current.children[activeIndex] as HTMLElement
			activeElement.scrollIntoView({ block: 'nearest' })
		}
	}, [activeIndex, isOpen])

	return (
		<div ref={autocompleteRef} className="relative w-full max-w-xs">
			<AdaptiveInput
				ref={inputRef}
				type="text"
				value={inputValue}
				onChange={handleInputChange}
				onFocus={() => setIsOpen(true)}
				onKeyDown={handleKeyDown}
				placeholder={placeholder}
				className="w-full"
				aria-expanded={isOpen}
				aria-autocomplete="list"
				aria-controls="autocomplete-list"
				role="combobox"
				leftIcon={<Search className="w-4 h-4" />}
			/>
			{isOpen && filteredOptions.length > 0 && (
				<ul
					id="autocomplete-list"
					ref={listRef}
					className={`absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto ${
						dropdownPosition === 'up' ? 'bottom-full mb-1' : 'top-full mt-1'
					}`}
					role="listbox"
				>
					{filteredOptions.map((option, index) => (
						<li
							key={option.value}
							onClick={() => handleOptionClick(option)}
							className={`px-4 py-2 cursor-pointer ${
								index === activeIndex ? 'bg-blue-100' : 'hover:bg-gray-100'
							} ${selectedOption?.value === option.value ? 'bg-blue-200' : ''}`}
							role="option"
							aria-selected={index === activeIndex}
							id={`option-${index}`}
						>
							{option.label}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}
