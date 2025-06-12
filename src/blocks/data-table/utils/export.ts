import type { DataTableColumn } from '../types/data-table'

export function exportToCSV<T>(
	data: T[],
	columns: DataTableColumn<T>[],
	filename: string,
) {
	// Get visible columns
	const visibleColumns = columns.filter((col) => !col.hidden)

	// Create header row
	const header = visibleColumns.map((col) => col.title)

	// Create data rows
	const rows = data.map((item) =>
		visibleColumns.map((col) => {
			const value = item[col.key]
			return value !== null && value !== undefined ? String(value) : ''
		}),
	)

	// Combine header and rows
	const csvContent = [header.join(','), ...rows.map((row) => row.join(','))].join('\n')

	// Create download link
	const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
	const url = URL.createObjectURL(blob)
	const link = document.createElement('a')
	link.setAttribute('href', url)
	link.setAttribute('download', `${filename}.csv`)
	link.style.visibility = 'hidden'
	document.body.appendChild(link)
	link.click()
	document.body.removeChild(link)
}
