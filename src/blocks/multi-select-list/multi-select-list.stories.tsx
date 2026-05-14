import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Avatar, AvatarFallback, Badge } from '@/components'
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

type User = {
    id: string
    name: string
    email: string
    role: 'Admin' | 'Editor' | 'Viewer'
    department: string
    status: 'online' | 'away' | 'offline'
}

const users: User[] = [
    { id: 'u1', name: 'Alice Johnson', email: 'alice@acme.com', role: 'Admin', department: 'Engineering', status: 'online' },
    { id: 'u2', name: 'Bruno Souza', email: 'bruno@acme.com', role: 'Editor', department: 'Design', status: 'away' },
    { id: 'u3', name: 'Carla Lima', email: 'carla@acme.com', role: 'Viewer', department: 'Marketing', status: 'offline' },
    { id: 'u4', name: 'Daniel Park', email: 'daniel@acme.com', role: 'Editor', department: 'Engineering', status: 'online' },
    { id: 'u5', name: 'Eva Müller', email: 'eva@acme.com', role: 'Admin', department: 'Product', status: 'online' },
    { id: 'u6', name: 'Felipe Torres', email: 'felipe@acme.com', role: 'Viewer', department: 'Sales', status: 'away' },
]

const avatarColors: Record<string, string> = {
    u1: 'bg-violet-500',
    u2: 'bg-blue-500',
    u3: 'bg-emerald-500',
    u4: 'bg-orange-500',
    u5: 'bg-rose-500',
    u6: 'bg-cyan-500',
}

const roleVariant: Record<User['role'], 'default' | 'secondary' | 'outline'> = {
    Admin: 'default',
    Editor: 'secondary',
    Viewer: 'outline',
}

const statusConfig: Record<User['status'], { color: string; label: string }> = {
    online: { color: 'bg-emerald-500', label: 'Online' },
    away: { color: 'bg-yellow-400', label: 'Away' },
    offline: { color: 'bg-gray-400', label: 'Offline' },
}

function initials(name: string) {
    return name
        .split(' ')
        .slice(0, 2)
        .map((n) => n[0])
        .join('')
        .toUpperCase()
}

export const RichItems: StoryObj<typeof MultiSelectList<User>> = {
    render: () => {
        const [selectedIds, setSelectedIds] = React.useState<string[]>([])
        return (
            <div className="w-[420px]">
                <MultiSelectList
                    items={users}
                    selectedIds={selectedIds}
                    onChange={setSelectedIds}
                    getItemId={(u) => u.id}
                    renderItem={(u) => (
                        <span className="flex items-center gap-3 w-full pr-2">
                            <span className="relative shrink-0">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback
                                        className={`text-xs text-white ${avatarColors[u.id]}`}
                                    >
                                        {initials(u.name)}
                                    </AvatarFallback>
                                </Avatar>
                                <span
                                    className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-background ${statusConfig[u.status].color}`}
                                    title={statusConfig[u.status].label}
                                />
                            </span>

                            <span className="flex-1 min-w-0">
                                <span className="block text-sm font-medium truncate">{u.name}</span>
                                <span className="block text-xs text-muted-foreground truncate">
                                    {u.email} · {u.department}
                                </span>
                            </span>

                            <Badge variant={roleVariant[u.role]} className="shrink-0 text-xs">
                                {u.role}
                            </Badge>
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
