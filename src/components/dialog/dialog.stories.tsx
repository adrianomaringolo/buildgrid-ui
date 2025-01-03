// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './dialog'
import { HelpCircle, Phone, User } from 'lucide-react'
import { Button } from '../button'

const meta: Meta<typeof Dialog> = {
	component: Dialog,
}

export default meta
type Story = StoryObj<typeof Dialog>

const Template = () => {
	return (
		<Dialog>
			<DialogTrigger>
				<Button>Open Dialog</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Dialog title</DialogTitle>
					<DialogDescription>This is the dialog description</DialogDescription>
				</DialogHeader>
				<div className="bg-gray-100 p-4 text-xs">Content goes here</div>
				<DialogFooter>
					<Button variant="default">Close</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export const Default: Story = {
	render: Template.bind({}),
	args: {},
}
