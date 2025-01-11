// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Progress } from './progress'

const meta: Meta<typeof Progress> = {
	component: Progress,
}

export default meta
type Story = StoryObj<typeof Progress>

const Template = () => {
	return <Progress value={90} />
}

export const Default: Story = {
	render: Template.bind({}),
	args: {},
}
