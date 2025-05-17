import { Skeleton, Spinner } from '@/components'
import { Fragment, ReactNode, useEffect, useState } from 'react'
import { EmptyItems } from '../empty-message'
import { PaginationControls } from '../pagination-controls'

interface PaginatedControlsProps {
	initIndex: number
	endIndex: number
	totalItems: number
	totalPages: number
	currentPage: number
	pageTotalItems: number
	onPageChange: (page: number) => void
	showItemsCounter?: boolean
}

interface PaginatedItemsProps<Entry> {
	data: Entry[]
	perPage?: number
	initialPage?: number
	itemsContainerClass?: string
	children: (item: Entry, index: number) => React.ReactNode
	emptyState?: ReactNode
	isLoading?: boolean
	loadingVariant?: 'loader' | 'skeleton'
	showItemsCounter?: boolean
}

const PaginatedControls = ({
	initIndex,
	onPageChange,
	totalItems,
	totalPages,
	pageTotalItems,
	currentPage,
	showItemsCounter = true,
}: PaginatedControlsProps) => (
	<div className="flex flex-col gap-2 items-end">
		{showItemsCounter && (
			<p>
				<b>{initIndex + 1}</b> - <b>{initIndex + pageTotalItems}</b> ({totalItems})
			</p>
		)}
		{totalPages > 1 && (
			<PaginationControls
				current={currentPage}
				onPageChange={onPageChange}
				totalPages={totalPages}
			/>
		)}
	</div>
)

export const PaginatedItems = <Entry extends { id?: string }>(
	props: PaginatedItemsProps<Entry>,
) => {
	const {
		data: originalData = [],
		perPage = 50,
		initialPage = 1,
		children,
		itemsContainerClass = '',
		emptyState = <EmptyItems notFoundText="No item found!" />,
		isLoading = false,
		showItemsCounter = true,
		loadingVariant = 'loader',
	} = props

	const [data, setData] = useState<Entry[]>(originalData)

	useEffect(() => {
		setData(originalData)
		setCurrentPage(1)
	}, [originalData])

	const [currentPage, setCurrentPage] = useState(initialPage)
	const totalPages = Math.ceil(data.length / perPage)
	const initIndex = (currentPage - 1) * perPage
	const endIndex = currentPage * perPage
	const currentPageItems = data.slice(initIndex, endIndex)

	const alternativeDisplay = isLoading ? (
		<section className="w-full">
			{loadingVariant === 'loader' ? (
				<Spinner size="lg" />
			) : (
				<Skeleton className="h-12 w-full" repeat={perPage} />
			)}
		</section>
	) : data.length === 0 ? (
		emptyState
	) : undefined

	return (
		<div className="flex flex-col gap-4 items-end">
			<PaginatedControls
				initIndex={initIndex}
				endIndex={endIndex}
				totalItems={data.length}
				totalPages={totalPages}
				currentPage={currentPage}
				pageTotalItems={currentPageItems.length}
				onPageChange={setCurrentPage}
				showItemsCounter={showItemsCounter}
			/>

			{alternativeDisplay ? (
				<section className="w-full">{alternativeDisplay}</section>
			) : (
				<section className={`w-full ${itemsContainerClass}`}>
					{currentPageItems.map((item, i) => (
						<Fragment key={item.id}>{children(item, i)}</Fragment>
					))}
				</section>
			)}
			<PaginatedControls
				initIndex={initIndex}
				endIndex={endIndex}
				totalItems={data.length}
				totalPages={totalPages}
				currentPage={currentPage}
				pageTotalItems={currentPageItems.length}
				onPageChange={setCurrentPage}
				showItemsCounter={showItemsCounter}
			/>
		</div>
	)
}
