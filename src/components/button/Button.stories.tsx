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
	const variants: Array<ButtonProps['variant']> = [
		'default',
		'secondary',
		'destructive',
		'outline',
		'ghost',
		'link',
	]
	return (
		<div className="flex gap-2">
			{Object.values(variants).map((variant) => (
				<Button
					{...args}
					variant={variant as ButtonProps['variant']}
					className="capitalize"
				>
					{variant}
				</Button>
			))}
		</div>
	)
}

export const Default: Story = {
	render: Template.bind({}),
	args: {},
}
