'use client'

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/pagination'
import { useEffect, useState } from 'react'

interface PaginationControlsProps {
	current?: number
	totalPages: number
	maxVisiblePages?: number
	mode?: 'full' | 'minimal'
	onPageChange: (page: number) => void
}

export function PaginationControls({
	totalPages,
	maxVisiblePages = 5,
	mode = 'full',
	onPageChange,
	current = 1,
}: PaginationControlsProps) {
	const [currentPage, setCurrentPage] = useState(current)

	useEffect(() => {
		setCurrentPage(current)
	}, [current])

	const handlePageChange = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page)
			onPageChange(page)
		}
	}

	const renderPageNumbers = () => {
		if (mode === 'minimal') return null

		const pageNumbers = []
		const halfVisible = Math.floor(maxVisiblePages / 2)
		let startPage = Math.max(currentPage - halfVisible, 2)
		const endPage = Math.min(startPage + maxVisiblePages - 3, totalPages - 1)

		if (endPage - startPage + 3 < maxVisiblePages) {
			startPage = Math.max(endPage - maxVisiblePages + 4, 2)
		}

		// Always show first page
		pageNumbers.push(
			<PaginationItem key={1}>
				<PaginationLink
					onClick={(e) => {
						e.preventDefault()
						handlePageChange(1)
					}}
					isActive={currentPage === 1}
				>
					1
				</PaginationLink>
			</PaginationItem>,
		)

		if (startPage > 2) {
			pageNumbers.push(
				<PaginationItem key="start-ellipsis">
					<PaginationEllipsis />
				</PaginationItem>,
			)
		}

		for (let i = startPage; i <= endPage; i++) {
			pageNumbers.push(
				<PaginationItem key={i}>
					<PaginationLink
						onClick={(e) => {
							e.preventDefault()
							handlePageChange(i)
						}}
						isActive={currentPage === i}
					>
						{i}
					</PaginationLink>
				</PaginationItem>,
			)
		}

		if (endPage < totalPages - 1) {
			pageNumbers.push(
				<PaginationItem key="end-ellipsis">
					<PaginationEllipsis />
				</PaginationItem>,
			)
		}

		// Always show last page
		if (totalPages > 1) {
			pageNumbers.push(
				<PaginationItem key={totalPages}>
					<PaginationLink
						onClick={(e) => {
							e.preventDefault()
							handlePageChange(totalPages)
						}}
						isActive={currentPage === totalPages}
					>
						{totalPages}
					</PaginationLink>
				</PaginationItem>,
			)
		}

		return pageNumbers
	}

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						disabled={currentPage === 1}
						onClick={(e) => {
							e.preventDefault()
							handlePageChange(currentPage - 1)
						}}
					/>
				</PaginationItem>
				{renderPageNumbers()}
				<PaginationItem>
					<PaginationNext
						disabled={currentPage === totalPages}
						onClick={(e) => {
							e.preventDefault()
							handlePageChange(currentPage + 1)
						}}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	)
}
