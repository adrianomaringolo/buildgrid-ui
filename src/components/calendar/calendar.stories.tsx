// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Calendar } from './calendar'

const meta: Meta<typeof Calendar> = {
	component: Calendar,
}

export default meta
type Story = StoryObj<typeof Calendar>

const Template = () => {
	return <Calendar />
}

export const Default: Story = {
	render: Template.bind({}),
	args: {},
}
