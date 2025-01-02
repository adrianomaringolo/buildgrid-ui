// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Button, ButtonProps } from './Button'

const meta: Meta<typeof Button> = {
	component: Button,
}

export default meta
type Story = StoryObj<typeof Button>

const Template = (args: ButtonProps) => {
	return (
		<div style={{ padding: '10px' }}>
			<Button>{args.children}</Button>
		</div>
	)
}

export const Default: Story = {
	render: Template.bind({}),
	args: {
		children: 'Primary Button',
		variant: 'default',
		size: 'default',
	},
}
