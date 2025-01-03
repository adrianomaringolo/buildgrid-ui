// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton } from './Skeleton'

const meta: Meta<typeof Skeleton> = {
	component: Skeleton,
}

export default meta
type Story = StoryObj<typeof Skeleton>

const Template = () => {
	return (
		<div className="space-y-2">
			<Skeleton className="w-96 h-5" repeat={3} />
		</div>
	)
}

export const Default: Story = {
	render: Template.bind({}),
	args: {},
}
