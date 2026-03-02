import { Skeleton } from '@/components'
import { Fragment, ReactNode, useEffect, useState } from 'react'
import { EmptyItems } from '../empty-message'
import { PaginationControls } from '../pagination-controls'

export interface PaginatedItemsServerPagination {
	/** Total number of items on the server. */
	totalItems: number
	/** Total number of pages on the server. */
	totalPages: number
	/** Current active page (controlled externally). */
	currentPage: number
	/** Called when the user navigates to a different page. */
	onPageChange: (page: number) => void
}

export interface PaginatedItemsLabels {
	/**
	 * Text shown in the default empty state.
	 * Ignored when `emptyState` prop is provided.
	 * Default: `'No item found!'`
	 */
	noItemsFound?: string
	/**
	 * Pagination counter template. Supports `{{startIndex}}`, `{{endIndex}}`, `{{totalItems}}`.
	 * Superseded by the top-level `counterText` prop when both are set.
	 */
	paginationCounter?: string
}

interface PaginatedControlsProps {
	initIndex: number
	endIndex: number
	totalItems: number
	totalPages: number
	currentPage: number
	pageTotalItems: number
	onPageChange: (page: number) => void
	showItemsCounter?: boolean
	counterText?: string
}

interface PaginatedItemsProps<Entry> {
	data: Entry[]
	perPage?: number
	initialPage?: number
	itemsContainerClass?: string
	children: (item: Entry, index: number) => React.ReactNode
	emptyState?: ReactNode
	isLoading?: boolean
	/** Height class for skeleton items (e.g. `'h-24'`). Default: `'h-24'`. */
	skeletonHeight?: string
	showItemsCounter?: boolean
	/** Custom pagination counter text. Takes priority over `labels.paginationCounter`. */
	counterText?: string
	/**
	 * When provided, the component delegates pagination to the caller.
	 * `data` must contain only the items for the current page.
	 */
	serverPagination?: PaginatedItemsServerPagination
	/** Override text rendered by the component. All fields are optional. */
	labels?: PaginatedItemsLabels
}

const PaginatedControls = ({
	initIndex,
	onPageChange,
	totalItems,
	totalPages,
	pageTotalItems,
	currentPage,
	showItemsCounter = true,
	counterText,
}: PaginatedControlsProps) => {
	return (
		<div className="flex flex-col gap-2 items-end">
			{totalPages > 1 && (
				<PaginationControls
					currentPage={currentPage}
					onPageChange={onPageChange}
					totalPages={totalPages}
					totalItems={totalItems}
					startIndex={initIndex}
					endIndex={initIndex + pageTotalItems}
					onPreviousPage={() => onPageChange(currentPage - 1)}
					onNextPage={() => onPageChange(currentPage + 1)}
					counterText={counterText}
					showItemsCounter={showItemsCounter}
				/>
			)}
		</div>
	)
}

export const PaginatedItems = <Entry extends { id?: string }>(
	props: PaginatedItemsProps<Entry>,
) => {
	const {
		data: originalData = [],
		perPage = 50,
		initialPage = 1,
		children,
		itemsContainerClass = '',
		emptyState,
		isLoading = false,
		skeletonHeight = 'h-24',
		showItemsCounter = true,
		serverPagination,
		labels,
		counterText,
	} = props

	const isServerPaginated = serverPagination !== undefined

	// labels.paginationCounter < counterText (top-level prop wins)
	const resolvedCounterText = counterText ?? labels?.paginationCounter

	// emptyState prop wins over labels.noItemsFound
	const resolvedEmptyState = emptyState ?? (
		<EmptyItems notFoundText={labels?.noItemsFound ?? 'No item found!'} />
	)

	const [localData, setLocalData] = useState<Entry[]>(originalData)
	const [currentPage, setCurrentPage] = useState(initialPage)

	useEffect(() => {
		if (!isServerPaginated) {
			setLocalData(originalData)
			setCurrentPage(1)
		}
	}, [originalData, isServerPaginated])

	// Unified pagination values
	const activePage = isServerPaginated ? serverPagination.currentPage : currentPage
	const totalItems = isServerPaginated ? serverPagination.totalItems : localData.length
	const totalPages = isServerPaginated
		? serverPagination.totalPages
		: Math.ceil(localData.length / perPage)
	const initIndex = (activePage - 1) * perPage
	const currentPageItems = isServerPaginated
		? originalData
		: localData.slice(initIndex, initIndex + perPage)
	const handlePageChange = isServerPaginated
		? serverPagination.onPageChange
		: setCurrentPage

	const isEmpty = isServerPaginated
		? serverPagination.totalItems === 0
		: localData.length === 0

	return (
		<div className="flex flex-col gap-4 items-end">
			<PaginatedControls
				initIndex={initIndex}
				endIndex={initIndex + currentPageItems.length}
				totalItems={totalItems}
				totalPages={totalPages}
				currentPage={activePage}
				pageTotalItems={currentPageItems.length}
				onPageChange={handlePageChange}
				showItemsCounter={showItemsCounter}
				counterText={resolvedCounterText}
			/>

			{isLoading ? (
				<section className={`w-full ${itemsContainerClass}`}>
					{Array.from({ length: perPage }, (_, i) => (
						<Skeleton key={i} className={`w-full ${skeletonHeight}`} />
					))}
				</section>
			) : isEmpty ? (
				resolvedEmptyState
			) : (
				<section className={`w-full ${itemsContainerClass}`}>
					{currentPageItems.map((item, i) => (
						<Fragment key={item.id}>{children(item, i)}</Fragment>
					))}
				</section>
			)}

			<PaginatedControls
				initIndex={initIndex}
				endIndex={initIndex + currentPageItems.length}
				totalItems={totalItems}
				totalPages={totalPages}
				currentPage={activePage}
				pageTotalItems={currentPageItems.length}
				onPageChange={handlePageChange}
				showItemsCounter={showItemsCounter}
				counterText={resolvedCounterText}
			/>
		</div>
	)
}
