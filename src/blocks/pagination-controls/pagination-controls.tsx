'use client'

import { Button } from '@/components/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'

interface PaginationControlsProps {
	currentPage: number
	totalPages: number
	totalItems: number
	startIndex: number
	endIndex: number
	onPageChange: (page: number) => void
	onPreviousPage: () => void
	onNextPage: () => void
	showItemsCounter?: boolean
}

export const PaginationControls = (props: PaginationControlsProps) => {
	const {
		currentPage,
		totalPages,
		totalItems,
		startIndex,
		endIndex,
		onPageChange,
		onPreviousPage,
		onNextPage,
		showItemsCounter = true,
	} = props

	// Generate page numbers for pagination
	const getPageNumbers = () => {
		const pages: (number | string)[] = []
		const maxVisiblePages = 7

		if (totalPages <= maxVisiblePages) {
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i)
			}
		} else {
			// Always show first page
			pages.push(1)

			if (currentPage > 4) {
				pages.push('...')
			}

			// Show pages around current page
			const start = Math.max(2, currentPage - 1)
			const end = Math.min(totalPages - 1, currentPage + 1)

			for (let i = start; i <= end; i++) {
				if (i !== 1 && i !== totalPages) {
					pages.push(i)
				}
			}

			if (currentPage < totalPages - 3) {
				pages.push('...')
			}

			// Always show last page
			if (totalPages > 1) {
				pages.push(totalPages)
			}
		}

		return pages
	}

	if (totalPages <= 1) return null

	return (
		<div className="flex flex-col sm:flex-row items-center justify-between gap-4">
			{showItemsCounter ? (
				<div className="text-sm text-muted-foreground">
					Showing {startIndex + 1} to {endIndex} of {totalItems} results
				</div>
			) : null}

			<div className="flex items-center space-x-1">
				<Button
					variant="outline"
					size="sm"
					onClick={onPreviousPage}
					disabled={currentPage === 1}
					className="h-8 w-8 p-0"
				>
					<ChevronLeft className="h-4 w-4" />
				</Button>

				{getPageNumbers().map((page, index) => (
					<React.Fragment key={index}>
						{page === '...' ? (
							<span className="px-2 text-muted-foreground">...</span>
						) : (
							<Button
								variant={currentPage === page ? 'default' : 'outline'}
								size="sm"
								onClick={() => onPageChange(page as number)}
								className="h-8 w-8 p-0"
							>
								{page}
							</Button>
						)}
					</React.Fragment>
				))}

				<Button
					variant="outline"
					size="sm"
					onClick={onNextPage}
					disabled={currentPage === totalPages}
					className="h-8 w-8 p-0"
				>
					<ChevronRight className="h-4 w-4" />
				</Button>
			</div>
		</div>
	)
}
