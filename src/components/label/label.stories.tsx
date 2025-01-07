// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Label } from './label'

const meta: Meta<typeof Label> = {
	component: Label,
}

export default meta
type Story = StoryObj<typeof Label>

const Template = () => {
	return <Label>This is a label</Label>
}

export const Default: Story = {
	render: Template.bind({}),
	args: {},
}
