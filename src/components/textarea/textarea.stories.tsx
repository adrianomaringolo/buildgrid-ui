// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Textarea } from '.'

const meta: Meta<typeof Textarea> = {
	component: Textarea,
}

export default meta
type Story = StoryObj<typeof Textarea>

const Template = () => {
	return <Textarea className="w-64" />
}

export const Default: Story = {
	render: Template.bind({}),
	args: {},
}
