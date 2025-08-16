// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs'
import { TabsListVariantProps } from './tabs'

const meta: Meta<typeof Tabs & TabsListVariantProps> = {
	component: Tabs,
	argTypes: {
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg', 'xl'],
		},
	},
	args: {
		size: 'md',
	},
}

export default meta
type Story = StoryObj<typeof meta>

const Template = (args: TabsListVariantProps) => {
	return (
		<Tabs defaultValue="option1">
			<TabsList size={args.size}>
				<TabsTrigger value="option1" size={args.size}>
					Option 1
				</TabsTrigger>
				<TabsTrigger value="option2" size={args.size}>
					Option 2
				</TabsTrigger>
				<TabsTrigger value="option3" size={args.size}>
					Option 3
				</TabsTrigger>
			</TabsList>
			<TabsContent value="option1">
				<div className="bg-gray-100 p-2 text-xs">Content 1</div>
			</TabsContent>
			<TabsContent value="option2">
				<div className="bg-gray-100 p-2 text-xs">Content 2</div>
			</TabsContent>
			<TabsContent value="option3">
				<div className="bg-gray-100 p-2 text-xs">Content 3</div>
			</TabsContent>
		</Tabs>
	)
}

export const Default: Story = {
	render: Template,
}
