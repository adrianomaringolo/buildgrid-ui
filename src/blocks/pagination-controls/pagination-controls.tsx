import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components'

interface PaginationControlsProps {
	currentPage: number
	totalPages: number
	onPageChange: (page: number) => void
}

export function PaginationControls({
	currentPage,
	totalPages,
	onPageChange,
}: PaginationControlsProps) {
	const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						onClick={() => onPageChange(Math.max(1, currentPage - 1))}
						disabled={currentPage === 1}
					/>
				</PaginationItem>
				{pageNumbers.map((number) => (
					<PaginationItem key={number}>
						<PaginationLink
							onClick={() => onPageChange(number)}
							isActive={currentPage === number}
						>
							{number}
						</PaginationLink>
					</PaginationItem>
				))}
				<PaginationItem>
					<PaginationNext
						onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
						disabled={currentPage === totalPages}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	)
}
