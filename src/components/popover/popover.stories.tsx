// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { Button } from '../button/button'

const meta: Meta<typeof Popover> = {
	component: Popover,
}

export default meta
type Story = StoryObj<typeof Popover>

const Template = () => {
	const variants = ['default', 'secondary', 'destructive', 'outline']
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline">Open popover</Button>
			</PopoverTrigger>
			<PopoverContent className="w-80">
				<div className="bg-gray-200 p-6 w-full h-20">Popover content</div>
			</PopoverContent>
		</Popover>
	)
}

export const Default: Story = {
	render: Template.bind({}),
	args: {},
}
