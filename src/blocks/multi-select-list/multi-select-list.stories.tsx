import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { MultiSelectList } from './multi-select-list'

type Person = { id: string; name: string; role: string }

const people: Person[] = [
    { id: '1', name: 'Alice Johnson', role: 'Admin' },
    { id: '2', name: 'Bruno Souza', role: 'Editor' },
    { id: '3', name: 'Carla Lima', role: 'Viewer' },
    { id: '4', name: 'Daniel Park', role: 'Editor' },
    { id: '5', name: 'Eva Müller', role: 'Admin' },
    { id: '6', name: 'Felipe Torres', role: 'Viewer' },
]

const meta: Meta<typeof MultiSelectList<Person>> = {
    component: MultiSelectList,
    title: 'Blocks/MultiSelectList',
    parameters: { layout: 'centered' },
}

export default meta

type Story = StoryObj<typeof MultiSelectList<Person>>

export const Default: Story = {
    render: () => {
        const [selectedIds, setSelectedIds] = React.useState<string[]>([])
        return (
            <div className="w-80">
                <MultiSelectList
                    items={people}
                    selectedIds={selectedIds}
                    onChange={setSelectedIds}
                    getItemId={(p) => p.id}
                    renderItem={(p) => p.name}
                    labels={{ title: 'People' }}
                />
            </div>
        )
    },
}

export const WithPreselection: Story = {
    render: () => {
        const [selectedIds, setSelectedIds] = React.useState<string[]>(['1', '3'])
        return (
            <div className="w-80">
                <MultiSelectList
                    items={people}
                    selectedIds={selectedIds}
                    onChange={setSelectedIds}
                    getItemId={(p) => p.id}
                    renderItem={(p) => p.name}
                    labels={{ title: 'People' }}
                />
            </div>
        )
    },
}

export const CustomLabels: Story = {
    render: () => {
        const [selectedIds, setSelectedIds] = React.useState<string[]>([])
        return (
            <div className="w-80">
                <MultiSelectList
                    items={people}
                    selectedIds={selectedIds}
                    onChange={setSelectedIds}
                    getItemId={(p) => p.id}
                    renderItem={(p) => p.name}
                    labels={{
                        title: 'Trabalhadores',
                        selectAll: 'Selecionar todos',
                        deselectAll: 'Desmarcar todos',
                        selectedCount: (s, t) => `${s} de ${t} selecionados`,
                        shiftClickHint: '· Shift+clique para selecionar um intervalo',
                    }}
                />
            </div>
        )
    },
}

export const CustomRenderItem: Story = {
    render: () => {
        const [selectedIds, setSelectedIds] = React.useState<string[]>([])
        return (
            <div className="w-80">
                <MultiSelectList
                    items={people}
                    selectedIds={selectedIds}
                    onChange={setSelectedIds}
                    getItemId={(p) => p.id}
                    renderItem={(p) => (
                        <span className="flex justify-between w-full">
                            <span>{p.name}</span>
                            <span className="text-xs text-gray-400">{p.role}</span>
                        </span>
                    )}
                    labels={{ title: 'Team members' }}
                />
            </div>
        )
    },
}

export const EmptyList: Story = {
    render: () => {
        const [selectedIds, setSelectedIds] = React.useState<string[]>([])
        return (
            <div className="w-80">
                <MultiSelectList
                    items={[]}
                    selectedIds={selectedIds}
                    onChange={setSelectedIds}
                    getItemId={(p) => p.id}
                    renderItem={(p) => p.name}
                    labels={{ title: 'No items' }}
                />
            </div>
        )
    },
}
