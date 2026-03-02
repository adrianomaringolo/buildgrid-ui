'use client'

import { Button } from '@/components/button'

interface SelectionInfoProps {
	selectedCount: number
	onClearSelection: () => void
	rowSingular: string
	rowPlural: string
	clearLabel: string
}

export function SelectionInfo({
	selectedCount,
	onClearSelection,
	rowSingular,
	rowPlural,
	clearLabel,
}: SelectionInfoProps) {
	if (selectedCount === 0) return null

	return (
		<div className="bg-muted/50 p-2 rounded-md flex items-center justify-between">
			<div className="text-sm">
				<span className="font-medium">{selectedCount}</span>{' '}
				{selectedCount === 1 ? rowSingular : rowPlural}
			</div>
			<Button variant="ghost" size="sm" onClick={onClearSelection}>
				{clearLabel}
			</Button>
		</div>
	)
}
