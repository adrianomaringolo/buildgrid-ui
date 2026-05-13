import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MultiSelectList } from './multi-select-list'

type Item = { id: string; name: string }

const items: Item[] = [
    { id: '1', name: 'Alice' },
    { id: '2', name: 'Bruno' },
    { id: '3', name: 'Carla' },
    { id: '4', name: 'Daniel' },
    { id: '5', name: 'Eva' },
]

function renderList(
    selectedIds: string[] = [],
    onChange = vi.fn(),
    overrides: Partial<React.ComponentProps<typeof MultiSelectList<Item>>> = {},
) {
    return render(
        <MultiSelectList
            items={items}
            selectedIds={selectedIds}
            onChange={onChange}
            getItemId={(item) => item.id}
            renderItem={(item) => item.name}
            {...overrides}
        />,
    )
}

describe('MultiSelectList', () => {
    describe('Rendering', () => {
        it('renders all items', () => {
            renderList()
            items.forEach((item) => {
                expect(screen.getByText(item.name)).toBeInTheDocument()
            })
        })

        it('renders checked checkboxes for selected ids', () => {
            renderList(['1', '3'])
            const checkboxes = screen.getAllByRole('checkbox')
            expect(checkboxes[0]).toBeChecked()
            expect(checkboxes[1]).not.toBeChecked()
            expect(checkboxes[2]).toBeChecked()
        })

        it('renders the title label when provided', () => {
            renderList([], vi.fn(), { labels: { title: 'Team' } })
            expect(screen.getByText('Team')).toBeInTheDocument()
        })

        it('does not render title when omitted', () => {
            renderList()
            expect(screen.queryByText('Team')).not.toBeInTheDocument()
        })

        it('shows selected count using default label', () => {
            renderList(['1', '2'])
            expect(screen.getByText(/2 of 5 selected/)).toBeInTheDocument()
        })

        it('shows custom selectedCount label', () => {
            renderList(['1'], vi.fn(), {
                labels: { selectedCount: (s, t) => `${s} de ${t} selecionados` },
            })
            expect(screen.getByText(/1 de 5 selecionados/)).toBeInTheDocument()
        })

        it('shows shift+click hint when there is more than one item', () => {
            renderList()
            expect(screen.getByText(/Shift\+click/)).toBeInTheDocument()
        })

        it('hides shift+click hint for a single item', () => {
            renderList([], vi.fn(), { items: [{ id: '1', name: 'Alice' }] })
            expect(screen.queryByText(/Shift\+click/)).not.toBeInTheDocument()
        })

        it('shows custom shiftClickHint', () => {
            renderList([], vi.fn(), { labels: { shiftClickHint: '· Use Shift para range' } })
            expect(screen.getByText(/Use Shift para range/)).toBeInTheDocument()
        })

        it('applies className to the root element', () => {
            const { container } = renderList([], vi.fn(), { className: 'my-custom' })
            expect(container.firstChild).toHaveClass('my-custom')
        })
    })

    describe('Select / deselect toggle button', () => {
        it('shows "Select all" when not all items are selected', () => {
            renderList(['1'])
            expect(screen.getByRole('button', { name: 'Select all' })).toBeInTheDocument()
        })

        it('shows "Deselect all" when all items are selected', () => {
            renderList(items.map((i) => i.id))
            expect(screen.getByRole('button', { name: 'Deselect all' })).toBeInTheDocument()
        })

        it('calls onChange with all ids when "Select all" is clicked', () => {
            const onChange = vi.fn()
            renderList([], onChange)
            fireEvent.click(screen.getByRole('button', { name: 'Select all' }))
            expect(onChange).toHaveBeenCalledWith(items.map((i) => i.id))
        })

        it('calls onChange with empty array when "Deselect all" is clicked', () => {
            const onChange = vi.fn()
            renderList(items.map((i) => i.id), onChange)
            fireEvent.click(screen.getByRole('button', { name: 'Deselect all' }))
            expect(onChange).toHaveBeenCalledWith([])
        })

        it('uses custom selectAll / deselectAll labels', () => {
            renderList([], vi.fn(), {
                labels: { selectAll: 'Selecionar todos', deselectAll: 'Desmarcar todos' },
            })
            expect(screen.getByRole('button', { name: 'Selecionar todos' })).toBeInTheDocument()
        })
    })

    describe('Item click — individual toggle', () => {
        it('adds an item to selection when clicking an unselected row', () => {
            const onChange = vi.fn()
            renderList(['1'], onChange)
            fireEvent.click(screen.getByText('Bruno').closest('li')!)
            expect(onChange).toHaveBeenCalledWith(['1', '2'])
        })

        it('removes an item from selection when clicking a selected row', () => {
            const onChange = vi.fn()
            renderList(['1', '2'], onChange)
            fireEvent.click(screen.getByText('Alice').closest('li')!)
            expect(onChange).toHaveBeenCalledWith(['2'])
        })
    })

    describe('Shift+click — range selection', () => {
        it('extends selection forward via shift-click within one mounted instance', () => {
            const calls: string[][] = []
            const onChange = (ids: string[]) => calls.push(ids)

            const { rerender } = render(
                <MultiSelectList
                    items={items}
                    selectedIds={[]}
                    onChange={onChange}
                    getItemId={(i) => i.id}
                    renderItem={(i) => i.name}
                />,
            )

            // Click Alice (index 0) — sets lastClickedIndex to 0
            fireEvent.click(screen.getByText('Alice').closest('li')!)
            const afterFirst = calls[calls.length - 1]

            rerender(
                <MultiSelectList
                    items={items}
                    selectedIds={afterFirst}
                    onChange={onChange}
                    getItemId={(i) => i.id}
                    renderItem={(i) => i.name}
                />,
            )

            // Shift-click Carla (index 2) — should select Alice, Bruno, Carla
            fireEvent.click(screen.getByText('Carla').closest('li')!, { shiftKey: true })
            const afterShift = calls[calls.length - 1]
            expect(afterShift).toEqual(expect.arrayContaining(['1', '2', '3']))
            expect(afterShift).toHaveLength(3)
        })

        it('deselects a range via shift-click when anchor was unselected', () => {
            const calls: string[][] = []
            const onChange = (ids: string[]) => calls.push(ids)

            // All selected initially
            const { rerender } = render(
                <MultiSelectList
                    items={items}
                    selectedIds={items.map((i) => i.id)}
                    onChange={onChange}
                    getItemId={(i) => i.id}
                    renderItem={(i) => i.name}
                />,
            )

            // Click Alice (index 0) — deselects her, lastClickedIndex = 0
            fireEvent.click(screen.getByText('Alice').closest('li')!)
            const afterFirst = calls[calls.length - 1] // ['2','3','4','5']

            rerender(
                <MultiSelectList
                    items={items}
                    selectedIds={afterFirst}
                    onChange={onChange}
                    getItemId={(i) => i.id}
                    renderItem={(i) => i.name}
                />,
            )

            // Shift-click Carla (index 2) — Alice was unselected, so range 0-2 should be removed
            fireEvent.click(screen.getByText('Carla').closest('li')!, { shiftKey: true })
            const afterShift = calls[calls.length - 1]
            expect(afterShift).not.toContain('1')
            expect(afterShift).not.toContain('2')
            expect(afterShift).not.toContain('3')
        })
    })

    describe('Empty list', () => {
        it('renders nothing in the list when items is empty', () => {
            renderList([], vi.fn(), { items: [] })
            expect(screen.queryByRole('listitem')).not.toBeInTheDocument()
        })

        it('shows "Select all" (not "Deselect all") when items is empty', () => {
            renderList([], vi.fn(), { items: [] })
            expect(screen.getByRole('button', { name: 'Select all' })).toBeInTheDocument()
        })
    })
})
