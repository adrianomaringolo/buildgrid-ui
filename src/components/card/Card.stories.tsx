// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from './Card'
import { Button } from '../button/Button'

const meta: Meta<typeof Card> = {
	component: Card,
}

export default meta
type Story = StoryObj<typeof Button>

const Template = () => {
	return (
		<Card className="w-96">
			<CardHeader>
				<CardTitle>Title</CardTitle>
				<CardDescription>Description</CardDescription>
			</CardHeader>
			<CardContent className="px-0 pt-2">
				<div className="bg-gray-200 w-full h-40 p-6">Content goes here</div>
			</CardContent>
			<CardFooter>
				<Button variant="outline">Close</Button>
			</CardFooter>
		</Card>
	)
}

export const Default: Story = {
	render: Template.bind({}),
	args: {},
}
