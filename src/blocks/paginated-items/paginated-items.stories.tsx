// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { PaginatedItems } from '.'
import { User } from 'lucide-react'

const meta: Meta<typeof PaginatedItems> = {
	component: PaginatedItems,
}

export default meta
type Story = StoryObj<typeof PaginatedItems>

type UserItem = {
	id: string
	name: string
	email: string
}

const allUsers: UserItem[] = Array.from({ length: 1000 }, (_, index) => index + 1).map(
	(n) => ({
		id: n.toString(),
		name: `User ${n}`,
		email: `user${n}@example.com`,
	}),
)

// ---------------------------------------------------------------------------
// Default story
// ---------------------------------------------------------------------------

const Template = () => {
	return (
		<PaginatedItems<UserItem> data={allUsers} itemsContainerClass="grid grid-cols-2 gap-3">
			{(user) => (
				<div key={user.id} className="border rounded-sm p-3">
					<div className="flex gap-2 items-center">
						<User />
						{user.name}
					</div>
					<span className="text-sm text-gray-400">{user.email}</span>
				</div>
			)}
		</PaginatedItems>
	)
}

export const Default: Story = {
	render: Template.bind({}),
	args: {},
}

// ---------------------------------------------------------------------------
// Server-side Pagination story
// ---------------------------------------------------------------------------

const SERVER_PAGE_SIZE = 8

function fakeServerFetch(page: number): UserItem[] {
	const start = (page - 1) * SERVER_PAGE_SIZE
	return allUsers.slice(start, start + SERVER_PAGE_SIZE)
}

const ServerPaginationTemplate = () => {
	const [currentPage, setCurrentPage] = useState(1)
	const [pageData, setPageData] = useState<UserItem[]>(() => fakeServerFetch(1))
	const [loading, setLoading] = useState(false)

	const totalItems = allUsers.length
	const totalPages = Math.ceil(totalItems / SERVER_PAGE_SIZE)

	const handlePageChange = (page: number) => {
		setLoading(true)
		setTimeout(() => {
			setPageData(fakeServerFetch(page))
			setCurrentPage(page)
			setLoading(false)
		}, 500)
	}

	return (
		<div className="p-6">
			<div className="mb-6">
				<h1 className="text-3xl font-bold">Server-side Pagination</h1>
				<p className="text-muted-foreground">
					The list receives one page of data at a time. Navigation triggers a
					simulated server request (500 ms delay).
				</p>
			</div>

			<PaginatedItems<UserItem>
				data={pageData}
				isLoading={loading}
				itemsContainerClass="grid grid-cols-2 gap-3"
				serverPagination={{
					totalItems,
					totalPages,
					currentPage,
					onPageChange: handlePageChange,
				}}
			>
				{(user) => (
					<div className="border rounded-sm p-3">
						<div className="flex gap-2 items-center">
							<User />
							{user.name}
						</div>
						<span className="text-sm text-gray-400">{user.email}</span>
					</div>
				)}
			</PaginatedItems>
		</div>
	)
}

export const ServerPagination: Story = {
	render: ServerPaginationTemplate.bind({}),
	args: {},
}

// ---------------------------------------------------------------------------
// Localization story — labels in pt-BR
// ---------------------------------------------------------------------------

const LocalizationTemplate = () => {
	const ptUsers: UserItem[] = Array.from({ length: 30 }, (_, i) => ({
		id: (i + 1).toString(),
		name: `Usuário ${i + 1}`,
		email: `usuario${i + 1}@exemplo.com.br`,
	}))

	return (
		<div className="p-6">
			<div className="mb-6">
				<h1 className="text-3xl font-bold">Localização (pt-BR)</h1>
				<p className="text-muted-foreground">
					Textos do componente traduzidos via a prop <code>labels</code>.
				</p>
			</div>

			<PaginatedItems<UserItem>
				data={ptUsers}
				perPage={8}
				itemsContainerClass="grid grid-cols-2 gap-3"
				labels={{
					noItemsFound: 'Nenhum item encontrado!',
					paginationCounter:
						'Exibindo {{startIndex}} a {{endIndex}} de {{totalItems}} registros',
				}}
			>
				{(user) => (
					<div className="border rounded-sm p-3">
						<div className="flex gap-2 items-center">
							<User />
							{user.name}
						</div>
						<span className="text-sm text-gray-400">{user.email}</span>
					</div>
				)}
			</PaginatedItems>
		</div>
	)
}

export const Localization: Story = {
	render: LocalizationTemplate.bind({}),
	args: {},
}
