// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from './pagination'

const meta: Meta<typeof Pagination> = {
	component: Pagination,
}

export default meta
type Story = StoryObj<typeof Pagination>

const Template = () => {
	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious />
				</PaginationItem>
				<PaginationItem>
					<PaginationLink>1</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink isActive>2</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink>3</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationEllipsis />
				</PaginationItem>
				<PaginationItem>
					<PaginationNext />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	)
}

export const Default: Story = {
	render: Template.bind({}),
	args: {},
}
