// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import {
	Menubar,
	MenubarCheckboxItem,
	MenubarContent,
	MenubarGroup,
	MenubarItem,
	MenubarLabel,
	MenubarMenu,
	MenubarPortal,
	MenubarRadioGroup,
	MenubarRadioItem,
	MenubarSeparator,
	MenubarShortcut,
	MenubarSub,
	MenubarSubContent,
	MenubarSubTrigger,
	MenubarTrigger,
} from './menubar'

const meta: Meta<typeof Menubar> = {
	component: Menubar,
}

export default meta
type Story = StoryObj<typeof Menubar>

const TextEditorTemplate = () => (
	<div className="p-8">
		<Menubar>
			<MenubarMenu>
				<MenubarTrigger>File</MenubarTrigger>
				<MenubarContent>
					<MenubarItem>
						New Tab
						<MenubarShortcut>⌘T</MenubarShortcut>
					</MenubarItem>
					<MenubarItem>
						New Window
						<MenubarShortcut>⌘N</MenubarShortcut>
					</MenubarItem>
					<MenubarItem disabled>New Incognito Window</MenubarItem>
					<MenubarSeparator />
					<MenubarSub>
						<MenubarSubTrigger>Share</MenubarSubTrigger>
						<MenubarPortal>
							<MenubarSubContent>
								<MenubarItem>Email Link</MenubarItem>
								<MenubarItem>Messages</MenubarItem>
								<MenubarItem>AirDrop</MenubarItem>
							</MenubarSubContent>
						</MenubarPortal>
					</MenubarSub>
					<MenubarSeparator />
					<MenubarItem>
						Open…
						<MenubarShortcut>⌘O</MenubarShortcut>
					</MenubarItem>
					<MenubarItem>
						Save
						<MenubarShortcut>⌘S</MenubarShortcut>
					</MenubarItem>
					<MenubarItem>
						Save As…
						<MenubarShortcut>⇧⌘S</MenubarShortcut>
					</MenubarItem>
					<MenubarSeparator />
					<MenubarItem>
						Print…
						<MenubarShortcut>⌘P</MenubarShortcut>
					</MenubarItem>
				</MenubarContent>
			</MenubarMenu>

			<MenubarMenu>
				<MenubarTrigger>Edit</MenubarTrigger>
				<MenubarContent>
					<MenubarItem>
						Undo
						<MenubarShortcut>⌘Z</MenubarShortcut>
					</MenubarItem>
					<MenubarItem>
						Redo
						<MenubarShortcut>⌘Y</MenubarShortcut>
					</MenubarItem>
					<MenubarSeparator />
					<MenubarGroup>
						<MenubarItem>
							Cut
							<MenubarShortcut>⌘X</MenubarShortcut>
						</MenubarItem>
						<MenubarItem>
							Copy
							<MenubarShortcut>⌘C</MenubarShortcut>
						</MenubarItem>
						<MenubarItem>
							Paste
							<MenubarShortcut>⌘V</MenubarShortcut>
						</MenubarItem>
					</MenubarGroup>
					<MenubarSeparator />
					<MenubarItem>
						Select All
						<MenubarShortcut>⌘A</MenubarShortcut>
					</MenubarItem>
					<MenubarSeparator />
					<MenubarItem>
						Find…
						<MenubarShortcut>⌘F</MenubarShortcut>
					</MenubarItem>
					<MenubarItem>
						Find and Replace…
						<MenubarShortcut>⌘H</MenubarShortcut>
					</MenubarItem>
				</MenubarContent>
			</MenubarMenu>

			<MenubarMenu>
				<MenubarTrigger>View</MenubarTrigger>
				<MenubarContent>
					<MenubarItem>
						Zoom In
						<MenubarShortcut>⌘+</MenubarShortcut>
					</MenubarItem>
					<MenubarItem>
						Zoom Out
						<MenubarShortcut>⌘-</MenubarShortcut>
					</MenubarItem>
					<MenubarItem>
						Reset Zoom
						<MenubarShortcut>⌘0</MenubarShortcut>
					</MenubarItem>
					<MenubarSeparator />
					<MenubarItem>
						Toggle Full Screen
						<MenubarShortcut>⌃⌘F</MenubarShortcut>
					</MenubarItem>
					<MenubarSeparator />
					<MenubarItem>Toggle Developer Tools</MenubarItem>
				</MenubarContent>
			</MenubarMenu>

			<MenubarMenu>
				<MenubarTrigger>Help</MenubarTrigger>
				<MenubarContent>
					<MenubarItem>Documentation</MenubarItem>
					<MenubarItem>Keyboard Shortcuts</MenubarItem>
					<MenubarSeparator />
					<MenubarItem>Report an Issue…</MenubarItem>
					<MenubarItem>Check for Updates…</MenubarItem>
					<MenubarSeparator />
					<MenubarItem>About</MenubarItem>
				</MenubarContent>
			</MenubarMenu>
		</Menubar>
	</div>
)

const WithCheckboxesTemplate = () => {
	const [showToolbar, setShowToolbar] = React.useState(true)
	const [showStatusbar, setShowStatusbar] = React.useState(true)
	const [showSidebar, setShowSidebar] = React.useState(false)
	const [theme, setTheme] = React.useState('system')

	return (
		<div className="p-8">
			<Menubar>
				<MenubarMenu>
					<MenubarTrigger>View</MenubarTrigger>
					<MenubarContent>
						<MenubarLabel>Panels</MenubarLabel>
						<MenubarCheckboxItem
							checked={showToolbar}
							onCheckedChange={setShowToolbar}
						>
							Show Toolbar
						</MenubarCheckboxItem>
						<MenubarCheckboxItem
							checked={showStatusbar}
							onCheckedChange={setShowStatusbar}
						>
							Show Status Bar
						</MenubarCheckboxItem>
						<MenubarCheckboxItem
							checked={showSidebar}
							onCheckedChange={setShowSidebar}
						>
							Show Sidebar
						</MenubarCheckboxItem>
						<MenubarSeparator />
						<MenubarLabel>Theme</MenubarLabel>
						<MenubarRadioGroup value={theme} onValueChange={setTheme}>
							<MenubarRadioItem value="light">Light</MenubarRadioItem>
							<MenubarRadioItem value="dark">Dark</MenubarRadioItem>
							<MenubarRadioItem value="system">System</MenubarRadioItem>
						</MenubarRadioGroup>
					</MenubarContent>
				</MenubarMenu>
			</Menubar>

			<div className="mt-4 rounded-md border p-4 text-sm text-muted-foreground">
				<p>
					Toolbar: <strong>{showToolbar ? 'Visible' : 'Hidden'}</strong>
				</p>
				<p>
					Status Bar: <strong>{showStatusbar ? 'Visible' : 'Hidden'}</strong>
				</p>
				<p>
					Sidebar: <strong>{showSidebar ? 'Visible' : 'Hidden'}</strong>
				</p>
				<p>
					Theme: <strong className="capitalize">{theme}</strong>
				</p>
			</div>
		</div>
	)
}

export const TextEditor: Story = {
	render: () => <TextEditorTemplate />,
}

export const WithCheckboxes: Story = {
	render: () => <WithCheckboxesTemplate />,
}

export const Default: Story = {
	render: () => <TextEditorTemplate />,
}
