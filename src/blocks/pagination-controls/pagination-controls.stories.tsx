// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { PaginationControls } from './pagination-controls'

const meta: Meta<typeof PaginationControls> = {
	component: PaginationControls,
}

export default meta
type Story = StoryObj<typeof PaginationControls>

const Template = () => {
	const [currentPage, setCurrentPage] = React.useState(1)
	return (
		<PaginationControls
			currentPage={currentPage}
			totalPages={10}
			onPageChange={(page) => setCurrentPage(page)}
		/>
	)
}

export const Default: Story = {
	render: Template.bind({}),
	args: {},
}
