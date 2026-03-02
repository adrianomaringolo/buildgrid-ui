// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { useState, useRef } from 'react'
import {
	DataTable,
	type DataTableColumn,
	type DataTableFilter,
} from './data-table'
import { Badge } from '../../components/badge'
import { Button } from '../../components/button'
import { Mail, Phone, Edit, RefreshCw, Trash2 } from 'lucide-react'
import { toast } from '../../components/toaster'

const meta: Meta<typeof DataTable> = {
	component: DataTable,
}

export default meta
type Story = StoryObj<typeof DataTable>

// Example data type
interface User {
	id: number
	name: string
	email: string
	phone: string
	status: 'active' | 'inactive' | 'pending'
	role: string
	department: string
	joinDate: string
}

// Mock data
const mockUsers: User[] = Array.from({ length: 150 }, (_, i) => ({
	id: i + 1,
	name: `User ${i + 1}`,
	email: `user${i + 1}@example.com`,
	phone: `+1 (555) ${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
	status: ['active', 'inactive', 'pending'][Math.floor(Math.random() * 3)] as
		| 'active'
		| 'inactive'
		| 'pending',
	role: ['Admin', 'User', 'Manager', 'Editor'][Math.floor(Math.random() * 4)],
	department: ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'][
		Math.floor(Math.random() * 5)
	],
	joinDate: new Date(
		2020 + Math.floor(Math.random() * 4),
		Math.floor(Math.random() * 12),
		Math.floor(Math.random() * 28) + 1,
	)
		.toISOString()
		.split('T')[0],
}))

const Template = () => {
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState(mockUsers)
	const [selectedCount, setSelectedCount] = useState(0)
	const tableRef = useRef<any>(null)

	// Simulate loading
	const handleRefresh = () => {
		setLoading(true)
		setTimeout(() => {
			setData([...mockUsers].sort(() => Math.random() - 0.5)) // Shuffle data
			setLoading(false)
		}, 2000)
	}

	// Handle bulk delete - manual approach
	const handleBulkDelete = () => {
		if (!tableRef.current) return

		const selectedItems = tableRef.current.getSelectedItems()
		if (selectedItems.length === 0) return

		const selectedIds = selectedItems.map((row: User) => row.id)
		setData((prev) => prev.filter((user) => !selectedIds.includes(user.id)))

		// Clear selection after delete
		tableRef.current.clearSelection()

		toast.success(`Successfully removed ${selectedItems.length} users from the table.`)
	}

	// Define columns with custom renderers
	const columns: DataTableColumn<User>[] = [
		{
			key: 'id',
			title: 'ID',
			sortable: true,
		},
		{
			key: 'name',
			title: 'Name',
			sortable: true,
			customRenderer: (value, row) => <div className="font-medium">{value}</div>,
		},
		{
			key: 'email',
			title: 'Email',
			sortable: true,
			customRenderer: (value) => (
				<div className="flex items-center gap-2">
					<Mail className="h-4 w-4 text-muted-foreground" />
					<span className="text-sm">{value}</span>
				</div>
			),
		},
		{
			key: 'phone',
			title: 'Phone',
			customRenderer: (value) => (
				<div className="flex items-center gap-2">
					<Phone className="h-4 w-4 text-muted-foreground" />
					<span className="text-sm font-mono">{value}</span>
				</div>
			),
		},
		{
			key: 'status',
			title: 'Status',
			sortable: true,
			customRenderer: (value) => (
				<Badge
					variant={
						value === 'active'
							? 'default'
							: value === 'inactive'
								? 'destructive'
								: 'secondary'
					}
				>
					{value}
				</Badge>
			),
		},
		{
			key: 'role',
			title: 'Role',
			sortable: true,
		},
		{
			key: 'department',
			title: 'Department',
			sortable: true,
		},
		{
			key: 'joinDate',
			title: 'Join Date',
			sortable: true,
			align: 'right',
			headerClassName: 'bg-muted-foreground/10',
			customRenderer: (value) => (
				<span className="text-sm text-muted-foreground">
					{new Date(value).toLocaleDateString()}
				</span>
			),
		},
		{
			key: 'id',
			title: 'Actions',
			width: '100px',
			customRenderer: (_, row) => (
				<div className="flex gap-2">
					<Button variant="ghost" size="sm">
						<Edit className="h-4 w-4" />
					</Button>
					<Button
						variant="ghost"
						size="sm"
						className="text-destructive hover:text-destructive"
						onClick={() => {
							setData((prev) => prev.filter((user) => user.id !== row.id))
							toast.success(`User ${row.name} has been removed.`)
						}}
					>
						<Trash2 className="h-4 w-4" />
					</Button>
				</div>
			),
		},
	]

	// Define filters
	const filters: DataTableFilter<User>[] = [
		{
			field: 'status',
			label: 'Status',

			options: [
				{ label: 'Active', value: 'active' },
				{ label: 'Inactive', value: 'inactive' },
				{ label: 'Pending', value: 'pending' },
			],
		},
		{
			field: 'role',
			label: 'Role',
			options: [
				{ label: 'Admin', value: 'Admin' },
				{ label: 'User', value: 'User' },
				{ label: 'Manager', value: 'Manager' },
				{ label: 'Editor', value: 'Editor' },
			],
		},
		{
			field: 'department',
			label: 'Department',
			options: [
				{ label: 'Engineering', value: 'Engineering' },
				{ label: 'Marketing', value: 'Marketing' },
				{ label: 'Sales', value: 'Sales' },
				{ label: 'HR', value: 'HR' },
				{ label: 'Finance', value: 'Finance' },
			],
		},
	]

	// Define which fields to search
	const searchFields: (keyof User)[] = ['name', 'email', 'role', 'department']

	// Get selected count manually when needed
	const updateSelectedCount = () => {
		if (tableRef.current) {
			const selected = tableRef.current.getSelectedItems()
			setSelectedCount(selected.length)
		}
	}

	return (
		<div className="container mx-auto py-8">
			<div className="mb-6 flex flex-wrap items-center justify-between gap-4">
				<div>
					<h1 className="text-3xl font-bold">User Management</h1>
					<p className="text-muted-foreground">
						Manage your users with advanced table features.
					</p>
				</div>
				<div className="flex gap-2">
					<Button onClick={updateSelectedCount} variant="outline">
						Check Selection ({selectedCount})
					</Button>
					{selectedCount > 0 && (
						<Button variant="destructive" onClick={handleBulkDelete}>
							<Trash2 className="h-4 w-4 mr-2" />
							Delete Selected ({selectedCount})
						</Button>
					)}
					<Button onClick={handleRefresh} disabled={loading} variant="outline">
						<RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
						Refresh
					</Button>
				</div>
			</div>

			<DataTable<User>
				ref={tableRef}
				data={data}
				columns={columns}
				searchFields={searchFields}
				filters={filters}
				activeFilters={{ status: 'active', role: 'User' }}
				pageSize={10}
				className="w-full"
				loading={loading}
				tools={{
					rowSelector: {
						hide: true,
					},
					search: {
						placeholder: 'Search something...',
					},
					pagination: {
						label:
							'Displaying now {{startIndex}} to {{endIndex}} of total {{totalItems}} items',
					},
				}}
			/>
		</div>
	)
}

export const Default: Story = {
	render: Template.bind({}),
	args: {},
}

// ---------------------------------------------------------------------------
// Server-side Pagination story
// ---------------------------------------------------------------------------

const SERVER_PAGE_SIZE = 10

/** Simulates a server response: returns the slice for the requested page. */
function fakeServerFetch(page: number) {
	const start = (page - 1) * SERVER_PAGE_SIZE
	return mockUsers.slice(start, start + SERVER_PAGE_SIZE)
}

const ServerPaginationTemplate = () => {
	const [currentPage, setCurrentPage] = useState(1)
	const [pageData, setPageData] = useState<User[]>(() => fakeServerFetch(1))
	const [loading, setLoading] = useState(false)

	const totalItems = mockUsers.length
	const totalPages = Math.ceil(totalItems / SERVER_PAGE_SIZE)

	const handlePageChange = (page: number) => {
		setLoading(true)
		// Simulate network latency
		setTimeout(() => {
			setPageData(fakeServerFetch(page))
			setCurrentPage(page)
			setLoading(false)
		}, 600)
	}

	const columns: DataTableColumn<User>[] = [
		{ key: 'id', title: 'ID', sortable: true },
		{
			key: 'name',
			title: 'Name',
			sortable: true,
			customRenderer: (value) => <div className="font-medium">{value}</div>,
		},
		{
			key: 'email',
			title: 'Email',
			sortable: true,
			customRenderer: (value) => (
				<div className="flex items-center gap-2">
					<Mail className="h-4 w-4 text-muted-foreground" />
					<span className="text-sm">{value}</span>
				</div>
			),
		},
		{
			key: 'status',
			title: 'Status',
			customRenderer: (value) => (
				<Badge
					variant={
						value === 'active'
							? 'default'
							: value === 'inactive'
								? 'destructive'
								: 'secondary'
					}
				>
					{value}
				</Badge>
			),
		},
		{ key: 'role', title: 'Role', sortable: true },
		{ key: 'department', title: 'Department', sortable: true },
	]

	return (
		<div className="container mx-auto py-8">
			<div className="mb-6">
				<h1 className="text-3xl font-bold">Server-side Pagination</h1>
				<p className="text-muted-foreground">
					The table receives one page of data at a time. Navigation triggers a
					simulated server request (600 ms delay).
				</p>
			</div>

			<DataTable<User>
				data={pageData}
				columns={columns}
				searchFields={['name', 'email', 'role', 'department']}
				loading={loading}
				serverPagination={{
					totalItems,
					totalPages,
					currentPage,
					onPageChange: handlePageChange,
				}}
			/>
		</div>
	)
}

export const ServerPagination: Story = {
	render: ServerPaginationTemplate.bind({}),
	args: {},
}

// ---------------------------------------------------------------------------
// Localization story — all labels in pt-BR
// ---------------------------------------------------------------------------

const LocalizationTemplate = () => {
	const [data, setData] = useState(mockUsers.slice(0, 30))

	const columns: DataTableColumn<User>[] = [
		{ key: 'id', title: 'ID', sortable: true },
		{
			key: 'name',
			title: 'Nome',
			sortable: true,
			customRenderer: (value) => <div className="font-medium">{value}</div>,
		},
		{
			key: 'email',
			title: 'E-mail',
			sortable: true,
			customRenderer: (value) => (
				<div className="flex items-center gap-2">
					<Mail className="h-4 w-4 text-muted-foreground" />
					<span className="text-sm">{value}</span>
				</div>
			),
		},
		{
			key: 'status',
			title: 'Status',
			customRenderer: (value) => (
				<Badge
					variant={
						value === 'active'
							? 'default'
							: value === 'inactive'
								? 'destructive'
								: 'secondary'
					}
				>
					{value}
				</Badge>
			),
		},
		{ key: 'role', title: 'Função', sortable: true },
		{ key: 'department', title: 'Departamento', sortable: true },
	]

	const filters: DataTableFilter<User>[] = [
		{
			field: 'status',
			label: 'Status',
			options: [
				{ label: 'Ativo', value: 'active' },
				{ label: 'Inativo', value: 'inactive' },
				{ label: 'Pendente', value: 'pending' },
			],
		},
		{
			field: 'role',
			label: 'Função',
			options: [
				{ label: 'Admin', value: 'Admin' },
				{ label: 'Usuário', value: 'User' },
				{ label: 'Gerente', value: 'Manager' },
				{ label: 'Editor', value: 'Editor' },
			],
		},
	]

	return (
		<div className="container mx-auto py-8">
			<div className="mb-6">
				<h1 className="text-3xl font-bold">Localização (pt-BR)</h1>
				<p className="text-muted-foreground">
					Todos os textos da tabela traduzidos via a prop <code>labels</code>.
				</p>
			</div>

			<DataTable<User>
				data={data}
				columns={columns}
				searchFields={['name', 'email', 'role', 'department']}
				filters={filters}
				pageSize={10}
				labels={{
					searchPlaceholder: 'Buscar...',
					exportButton: 'Exportar CSV',
					clearAllButton: 'Limpar tudo',
					paginationCounter:
						'Exibindo {{startIndex}} a {{endIndex}} de {{totalItems}} registros',
					noDataAvailable: 'Nenhum dado disponível.',
					noResultsWithFilters: 'Nenhum resultado para os filtros ativos.',
					searchBadgePrefix: 'Busca',
					sortBadgePrefix: 'Ordem',
					columnsButton: 'Colunas',
					toggleColumnsMenuLabel: 'Exibir colunas',
					resetColumnsButton: 'Restaurar colunas',
					allFilterOption: (label) => `Todos: ${label}`,
					rowSelectedSingular: 'linha selecionada',
					rowSelectedPlural: 'linhas selecionadas',
					clearSelectionButton: 'Limpar seleção',
				}}
			/>
		</div>
	)
}

export const Localization: Story = {
	render: LocalizationTemplate.bind({}),
	args: {},
}
