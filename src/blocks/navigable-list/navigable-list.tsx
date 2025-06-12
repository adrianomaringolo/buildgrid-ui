import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

type Shortcut = {
	key: string
	ctrl?: boolean
	alt?: boolean
	shift?: boolean
}

type RowAction<T> = {
	shortcut: Shortcut
	callback: (item: T) => void
	label: React.ReactNode // Agora pode ser botão, ícone, etc.
}

type NavigableListProps<T> = {
	items: T[]
	renderItem: (item: T, isSelected: boolean) => React.ReactNode
	actions: RowAction<T>[]
	className?: string
}

function formatShortcut(shortcut: Shortcut): string {
	const keys = []
	if (shortcut.ctrl) keys.push('Ctrl')
	if (shortcut.alt) keys.push('Alt')
	if (shortcut.shift) keys.push('Shift')
	keys.push(shortcut.key.toUpperCase())
	return keys.join(' + ')
}

export function NavigableList<T>({
	items,
	renderItem,
	actions,
	className,
}: NavigableListProps<T>) {
	const [selectedIndex, setSelectedIndex] = useState(0)
	const [isFocused, setIsFocused] = useState(false)
	const containerRef = useRef<HTMLDivElement>(null)
	const itemRefs = useRef<(HTMLDivElement | null)[]>([])

	const matchShortcut = useCallback((event: KeyboardEvent, shortcut: Shortcut) => {
		return (
			event.key.toLowerCase() === shortcut.key.toLowerCase() &&
			!!shortcut.ctrl === event.ctrlKey &&
			!!shortcut.alt === event.altKey &&
			!!shortcut.shift === event.shiftKey
		)
	}, [])

	useEffect(() => {
		const container = containerRef.current
		if (!container) return

		const handleKeyDown = (event: KeyboardEvent) => {
			if (document.activeElement !== container) return

			if (event.key === 'ArrowDown') {
				event.preventDefault()
				setSelectedIndex((prev) => Math.min(prev + 1, items.length - 1))
			} else if (event.key === 'ArrowUp') {
				event.preventDefault()
				setSelectedIndex((prev) => Math.max(prev - 1, 0))
			} else {
				const currentItem = items[selectedIndex]
				for (const action of actions) {
					if (matchShortcut(event, action.shortcut)) {
						event.preventDefault()
						action.callback(currentItem)
						break
					}
				}
			}
		}

		container.addEventListener('keydown', handleKeyDown)
		return () => container.removeEventListener('keydown', handleKeyDown)
	}, [items, selectedIndex, actions, matchShortcut])

	useLayoutEffect(() => {
		const selectedItem = itemRefs.current[selectedIndex]
		selectedItem?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
	}, [selectedIndex])

	return (
		<div
			ref={containerRef}
			className={`outline-none max-h-80 overflow-y-auto border rounded-md transition ring-2 ring-transparent focus-visible:ring-blue-500 ${className} ${
				isFocused ? 'ring-blue-500' : ''
			}`}
			tabIndex={0}
			role="listbox"
			aria-activedescendant={`item-${selectedIndex}`}
			onFocus={() => setIsFocused(true)}
			onBlur={() => setIsFocused(false)}
		>
			{items.map((item, index) => {
				const isSelected = index === selectedIndex

				return (
					<div
						key={index}
						id={`item-${index}`}
						ref={(el) => {
							itemRefs.current[index] = el
						}}
						role="option"
						aria-selected={isSelected}
						onClick={() => setSelectedIndex(index)}
						className={`flex justify-between items-center px-4 py-2 cursor-pointer transition-colors ${
							isSelected ? 'bg-blue-100' : 'hover:bg-gray-100'
						}`}
					>
						<div className="flex-1">{renderItem(item, isSelected)}</div>
						<div className="flex space-x-2 text-sm text-gray-500">
							{actions.map((action, i) => (
								<div
									key={i}
									className="hover:text-blue-600"
									title={`${formatShortcut(action.shortcut)}`}
									onClick={(e) => {
										e.stopPropagation()
										action.callback(item)
									}}
								>
									{action.label}
								</div>
							))}
						</div>
					</div>
				)
			})}
		</div>
	)
}
