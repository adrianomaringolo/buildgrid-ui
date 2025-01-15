// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '.'
import { Button } from '../button/button'

const meta: Meta<typeof Tooltip> = {
	component: Tooltip,
}

export default meta
type Story = StoryObj<typeof Tooltip>

const Template = () => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button>Hover me</Button>
				</TooltipTrigger>
				<TooltipContent>This is a tooltip</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}

export const Default: Story = {
	render: Template.bind({}),
	args: {},
}
