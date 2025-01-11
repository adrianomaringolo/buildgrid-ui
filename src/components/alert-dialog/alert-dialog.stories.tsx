// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from './alert-dialog'
import { Button } from '../button'

const meta: Meta<typeof AlertDialog> = {
	component: AlertDialog,
}

export default meta
type Story = StoryObj<typeof AlertDialog>

const Template = () => {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button>Open dialog</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Alert title</AlertDialogTitle>
					<AlertDialogDescription>This is the alert description</AlertDialogDescription>
				</AlertDialogHeader>
				<div className="bg-gray-200 p-4 h-20 text-sm">Content goes here</div>

				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction>Submit</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export const Default: Story = {
	render: Template.bind({}),
	args: {},
}
