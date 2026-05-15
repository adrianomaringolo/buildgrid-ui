// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import {
	ContextMenu,
	ContextMenuCheckboxItem,
	ContextMenuContent,
	ContextMenuGroup,
	ContextMenuItem,
	ContextMenuLabel,
	ContextMenuPortal,
	ContextMenuRadioGroup,
	ContextMenuRadioItem,
	ContextMenuSeparator,
	ContextMenuShortcut,
	ContextMenuSub,
	ContextMenuSubContent,
	ContextMenuSubTrigger,
	ContextMenuTrigger,
} from './context-menu'
import {
	Copy,
	Cut,
	FilePlus,
	FolderPlus,
	Info,
	Paste,
	Scissors,
	Settings,
} from 'lucide-react'

const meta: Meta<typeof ContextMenu> = {
	component: ContextMenu,
}

export default meta
type Story = StoryObj<typeof ContextMenu>

const RightClickArea = ({ children }: { children: React.ReactNode }) => (
	<div className="flex h-48 w-full items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 select-none">
		<p className="text-sm text-muted-foreground">Right-click the area below</p>
		{children}
	</div>
)

const FileManagerTemplate = () => (
	<div className="p-8">
		<p className="mb-4 text-sm text-muted-foreground text-center">Right-click the area below</p>
		<ContextMenu>
			<ContextMenuTrigger>
				<div className="flex h-48 w-full cursor-context-menu items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 select-none">
					<div className="text-center">
						<FolderPlus className="mx-auto mb-2 h-8 w-8 text-muted-foreground/50" />
						<p className="text-sm font-medium text-muted-foreground">My Documents</p>
						<p className="text-xs text-muted-foreground/60">Right-click for options</p>
					</div>
				</div>
			</ContextMenuTrigger>
			<ContextMenuContent className="w-56">
				<ContextMenuLabel>Create</ContextMenuLabel>
				<ContextMenuItem>
					<FolderPlus />
					New Folder
					<ContextMenuShortcut>⇧⌘N</ContextMenuShortcut>
				</ContextMenuItem>
				<ContextMenuItem>
					<FilePlus />
					New File
					<ContextMenuShortcut>⌘N</ContextMenuShortcut>
				</ContextMenuItem>
				<ContextMenuSeparator />
				<ContextMenuLabel>Edit</ContextMenuLabel>
				<ContextMenuItem>
					<Cut />
					Cut
					<ContextMenuShortcut>⌘X</ContextMenuShortcut>
				</ContextMenuItem>
				<ContextMenuItem>
					<Copy />
					Copy
					<ContextMenuShortcut>⌘C</ContextMenuShortcut>
				</ContextMenuItem>
				<ContextMenuItem>
					<Paste />
					Paste
					<ContextMenuShortcut>⌘V</ContextMenuShortcut>
				</ContextMenuItem>
				<ContextMenuSeparator />
				<ContextMenuItem>
					<Info />
					Properties
					<ContextMenuShortcut>⌘I</ContextMenuShortcut>
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	</div>
)

const WithCheckboxesTemplate = () => {
	const [showHidden, setShowHidden] = React.useState(false)
	const [showExtensions, setShowExtensions] = React.useState(true)
	const [sortBy, setSortBy] = React.useState('name')

	return (
		<div className="p-8">
			<p className="mb-4 text-sm text-muted-foreground text-center">Right-click the area below</p>
			<ContextMenu>
				<ContextMenuTrigger>
					<div className="flex h-48 w-full cursor-context-menu items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 select-none">
						<div className="text-center">
							<Settings className="mx-auto mb-2 h-8 w-8 text-muted-foreground/50" />
							<p className="text-sm font-medium text-muted-foreground">View Options</p>
							<p className="text-xs text-muted-foreground/60">Right-click to configure display</p>
						</div>
					</div>
				</ContextMenuTrigger>
				<ContextMenuContent className="w-56">
					<ContextMenuLabel>View Options</ContextMenuLabel>
					<ContextMenuSeparator />
					<ContextMenuCheckboxItem
						checked={showHidden}
						onCheckedChange={setShowHidden}
					>
						Show Hidden Files
					</ContextMenuCheckboxItem>
					<ContextMenuCheckboxItem
						checked={showExtensions}
						onCheckedChange={setShowExtensions}
					>
						Show File Extensions
					</ContextMenuCheckboxItem>
					<ContextMenuSeparator />
					<ContextMenuLabel>Sort By</ContextMenuLabel>
					<ContextMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
						<ContextMenuRadioItem value="name">Name</ContextMenuRadioItem>
						<ContextMenuRadioItem value="date">Date Modified</ContextMenuRadioItem>
						<ContextMenuRadioItem value="size">Size</ContextMenuRadioItem>
						<ContextMenuRadioItem value="kind">Kind</ContextMenuRadioItem>
					</ContextMenuRadioGroup>
				</ContextMenuContent>
			</ContextMenu>
		</div>
	)
}

const WithSubmenusTemplate = () => (
	<div className="p-8">
		<p className="mb-4 text-sm text-muted-foreground text-center">Right-click the area below</p>
		<ContextMenu>
			<ContextMenuTrigger>
				<div className="flex h-48 w-full cursor-context-menu items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 select-none">
					<div className="text-center">
						<Scissors className="mx-auto mb-2 h-8 w-8 text-muted-foreground/50" />
						<p className="text-sm font-medium text-muted-foreground">Selected Item</p>
						<p className="text-xs text-muted-foreground/60">Right-click for nested actions</p>
					</div>
				</div>
			</ContextMenuTrigger>
			<ContextMenuContent className="w-56">
				<ContextMenuItem>Open</ContextMenuItem>
				<ContextMenuSub>
					<ContextMenuSubTrigger>Open With</ContextMenuSubTrigger>
					<ContextMenuPortal>
						<ContextMenuSubContent>
							<ContextMenuItem>VS Code</ContextMenuItem>
							<ContextMenuItem>Sublime Text</ContextMenuItem>
							<ContextMenuItem>Vim</ContextMenuItem>
							<ContextMenuSeparator />
							<ContextMenuItem>Other Application…</ContextMenuItem>
						</ContextMenuSubContent>
					</ContextMenuPortal>
				</ContextMenuSub>
				<ContextMenuSeparator />
				<ContextMenuSub>
					<ContextMenuSubTrigger>Share</ContextMenuSubTrigger>
					<ContextMenuPortal>
						<ContextMenuSubContent>
							<ContextMenuItem>AirDrop</ContextMenuItem>
							<ContextMenuItem>Messages</ContextMenuItem>
							<ContextMenuItem>Mail</ContextMenuItem>
							<ContextMenuSeparator />
							<ContextMenuItem>Copy Link</ContextMenuItem>
						</ContextMenuSubContent>
					</ContextMenuPortal>
				</ContextMenuSub>
				<ContextMenuSeparator />
				<ContextMenuGroup>
					<ContextMenuItem>
						<Copy />
						Copy
						<ContextMenuShortcut>⌘C</ContextMenuShortcut>
					</ContextMenuItem>
					<ContextMenuItem>
						<Cut />
						Cut
						<ContextMenuShortcut>⌘X</ContextMenuShortcut>
					</ContextMenuItem>
				</ContextMenuGroup>
				<ContextMenuSeparator />
				<ContextMenuItem className="text-destructive focus:text-destructive">
					Move to Trash
					<ContextMenuShortcut>⌫</ContextMenuShortcut>
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	</div>
)

export const FileManager: Story = {
	render: () => <FileManagerTemplate />,
}

export const WithCheckboxes: Story = {
	render: () => <WithCheckboxesTemplate />,
}

export const WithSubmenus: Story = {
	render: () => <WithSubmenusTemplate />,
}

export const Default: Story = {
	render: () => (
		<div className="space-y-8">
			<FileManagerTemplate />
			<WithCheckboxesTemplate />
			<WithSubmenusTemplate />
		</div>
	),
}
