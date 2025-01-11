// organize-imports-ignore
import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../../components/button'
import {
	Sidebar,
	SidebarFooter,
	SidebarHeader,
	SidebarList,
	SidebarListItem,
	SidebarNav,
} from '../sidebar'
import { Check, Home, List } from 'lucide-react'

const meta: Meta<typeof Sidebar> = {
	component: Sidebar,
}

export default meta
type Story = StoryObj<typeof Sidebar>

const Template = () => {
	const [isSidebarOpen, setSidebarOpen] = useState(true)

	return (
		<div className="bg-gray-200 w-full h-screen">
			<Button onClick={() => setSidebarOpen((prev) => !prev)}>Toggle Sidebar</Button>
			<Sidebar fixed={false} isOpen={isSidebarOpen} onToggle={setSidebarOpen}>
				<SidebarHeader>
					<h1>My app</h1>
					<button
						onClick={() => setSidebarOpen((prev) => !prev)}
						className="toggle-button"
					>
						{isSidebarOpen ? 'Collapse' : 'Expand'}
					</button>
				</SidebarHeader>
				<SidebarNav>
					<SidebarList>
						<SidebarListItem className="px-4 py-2" onClick={() => setSidebarOpen(false)}>
							<Home /> Dashboard
						</SidebarListItem>
						<SidebarListItem className="px-4 py-2" onClick={() => setSidebarOpen(false)}>
							<List /> Projects
						</SidebarListItem>
						<SidebarListItem className="px-4 py-2" onClick={() => setSidebarOpen(false)}>
							<Check /> Tasks
						</SidebarListItem>
					</SidebarList>
				</SidebarNav>
				<SidebarFooter>
					<p>©2025 Copyright</p>
				</SidebarFooter>
			</Sidebar>
		</div>
	)
}

export const Default: Story = {
	render: Template.bind({}),
	args: {},
}
