// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Switch } from './switch'

const meta: Meta<typeof Switch> = {
	component: Switch,
}

export default meta
type Story = StoryObj<typeof Switch>

const Template = () => {
	return <Switch />
}

export const Default: Story = {
	render: Template.bind({}),
	args: {},
}
