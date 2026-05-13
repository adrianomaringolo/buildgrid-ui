import { Checkbox, Label } from '@/components'
import { useRef } from 'react'

export type MultiSelectListLabels = {
    title?: string
    selectAll?: string
    deselectAll?: string
    selectedCount?: (selected: number, total: number) => string
    shiftClickHint?: string
}

export type MultiSelectListProps<T> = {
    items: T[]
    selectedIds: string[]
    onChange: (selectedIds: string[]) => void
    getItemId: (item: T) => string
    renderItem: (item: T) => React.ReactNode
    labels?: MultiSelectListLabels
    className?: string
}

const defaultLabels: Required<MultiSelectListLabels> = {
    title: '',
    selectAll: 'Select all',
    deselectAll: 'Deselect all',
    selectedCount: (selected, total) => `${selected} of ${total} selected`,
    shiftClickHint: '· Shift+click to select a range',
}

export function MultiSelectList<T>({
    items,
    selectedIds,
    onChange,
    getItemId,
    renderItem,
    labels,
    className,
}: MultiSelectListProps<T>) {
    const lastClickedIndex = useRef<number | null>(null)

    const resolved = { ...defaultLabels, ...labels }

    const allSelected = items.length > 0 && selectedIds.length === items.length

    const toggleAll = () => {
        onChange(allSelected ? [] : items.map(getItemId))
        lastClickedIndex.current = null
    }

    const handleItemClick = (index: number, e: React.MouseEvent) => {
        const item = items[index]
        const id = getItemId(item)

        if (e.shiftKey && lastClickedIndex.current !== null) {
            const from = Math.min(lastClickedIndex.current, index)
            const to = Math.max(lastClickedIndex.current, index)
            const rangeIds = items.slice(from, to + 1).map(getItemId)

            const lastWasSelected = selectedIds.includes(getItemId(items[lastClickedIndex.current]))
            const next = lastWasSelected
                ? Array.from(new Set([...selectedIds, ...rangeIds]))
                : selectedIds.filter((sid) => !rangeIds.includes(sid))

            onChange(next)
        } else {
            const isSelected = selectedIds.includes(id)
            onChange(
                isSelected ? selectedIds.filter((sid) => sid !== id) : [...selectedIds, id],
            )
            lastClickedIndex.current = index
        }
    }

    return (
        <div className={className}>
            <div className="flex items-center justify-between mb-2">
                {resolved.title && <Label>{resolved.title}</Label>}
                <button
                    type="button"
                    className="text-sm text-blue-700 hover:underline ml-auto"
                    onClick={toggleAll}
                >
                    {allSelected ? resolved.deselectAll : resolved.selectAll}
                </button>
            </div>

            <ul className="max-h-64 overflow-y-auto border rounded-md divide-y select-none">
                {items.map((item, index) => {
                    const id = getItemId(item)
                    const isSelected = selectedIds.includes(id)
                    return (
                        <li
                            key={id}
                            className="flex items-center gap-3 px-3 py-2 hover:bg-muted cursor-pointer"
                            onClick={(e) => handleItemClick(index, e)}
                        >
                            <Checkbox
                                id={`multi-select-${id}`}
                                checked={isSelected}
                                onCheckedChange={() =>
                                    handleItemClick(index, {} as React.MouseEvent)
                                }
                            />
                            <label
                                htmlFor={`multi-select-${id}`}
                                className="cursor-pointer text-sm flex-1 pointer-events-none"
                            >
                                {renderItem(item)}
                            </label>
                        </li>
                    )
                })}
            </ul>

            <p className="text-xs text-gray-500 mt-1">
                {resolved.selectedCount(selectedIds.length, items.length)}
                {items.length > 1 && (
                    <span className="ml-2 text-gray-400">{resolved.shiftClickHint}</span>
                )}
            </p>
        </div>
    )
}
