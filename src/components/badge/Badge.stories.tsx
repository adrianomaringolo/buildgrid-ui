// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Badge, BadgeProps, badgeVariants } from './Badge'

const meta: Meta<typeof Badge> = {
	component: Badge,
}

export default meta
type Story = StoryObj<typeof Badge>

const Template = (args: BadgeProps) => {
	const variants = ['default', 'secondary', 'destructive', 'outline']
	return (
		<div className="flex gap-2">
			{Object.values(variants).map((variant) => (
				<Badge {...args} variant={variant as BadgeProps['variant']}>
					{variant}
				</Badge>
			))}
		</div>
	)
}

export const Default: Story = {
	render: Template.bind({}),
	args: {},
}
