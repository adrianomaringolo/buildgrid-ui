// organize-imports-ignore
import type { Meta, StoryObj } from '@storybook/react'
import { PaginationControls } from './pagination-controls'
import React from 'react'

const meta: Meta<typeof PaginationControls> = {
	component: PaginationControls,
	title: 'Blocks/PaginationControls',
	tags: ['autodocs'],
	args: {
		currentPage: 1,
		totalPages: 10,
		totalItems: 100,
		startIndex: 0,
		endIndex: 10,
		showItemsCounter: true,
		counterText: 'Showing {{startIndex}} to {{endIndex}} of {{totalItems}} results',
	},
	argTypes: {
		onPageChange: { action: 'onPageChange' },
		onPreviousPage: { action: 'onPreviousPage' },
		onNextPage: { action: 'onNextPage' },
	},
	render: (args) => {
		const [currentPage, setCurrentPage] = React.useState(args.currentPage)

		return (
			<PaginationControls
				{...args}
				currentPage={currentPage}
				onPageChange={(page) => {
					args.onPageChange(page)
					setCurrentPage(page)
				}}
				onPreviousPage={() => {
					args.onPreviousPage()
					setCurrentPage(currentPage - 1)
				}}
				onNextPage={() => {
					args.onNextPage()
					setCurrentPage(currentPage + 1)
				}}
			/>
		)
	},
}

export default meta
type Story = StoryObj<typeof PaginationControls>

export const Default: Story = {}

export const NoItemsCounter: Story = {
	args: {
		showItemsCounter: false,
	},
}

export const CustomCounterText: Story = {
	args: {
		counterText: 'Displaying {{startIndex}}-{{endIndex}} of {{totalItems}} items.',
	},
}

export const SinglePage: Story = {
	args: {
		totalPages: 1,
		endIndex: 5,
		totalItems: 5,
	},
}

export const WithCustomClassName: Story = {
	args: {
		className: 'bg-blue-200 p-4 rounded-lg flex-col! justify-center',
	},
}
