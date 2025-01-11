// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from './dropdown-menu'
import { Button } from '../button/button'
import {
	Key,
	Mail,
	MessageSquare,
	Pencil,
	PlusCircle,
	Settings2,
	Trash,
	UserPlus,
} from 'lucide-react'

const meta: Meta<typeof DropdownMenu> = {
	component: DropdownMenu,
}

export default meta
type Story = StoryObj<typeof DropdownMenu>

const Template = () => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon">
					<Settings2 className="w-6 h-6" />
					<span className="sr-only">Open settings</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>Jhon Doe</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Pencil /> Edit
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Trash /> Delete
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Key /> Send password reset
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuSub>
					<DropdownMenuSubTrigger>
						<UserPlus />
						<span>Invite users</span>
					</DropdownMenuSubTrigger>
					<DropdownMenuPortal>
						<DropdownMenuSubContent>
							<DropdownMenuItem>
								<Mail />
								<span>Email</span>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<MessageSquare />
								<span>Message</span>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<PlusCircle />
								<span>More...</span>
							</DropdownMenuItem>
						</DropdownMenuSubContent>
					</DropdownMenuPortal>
				</DropdownMenuSub>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export const Default: Story = {
	render: Template.bind({}),
	args: {},
}
