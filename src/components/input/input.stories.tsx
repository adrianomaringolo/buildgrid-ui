// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Input } from './input'

const meta: Meta<typeof Input> = {
	title: 'Components/Input/Simple',
	component: Input,
}

export default meta
type Story = StoryObj<typeof Input>

const Template = () => {
	return <Input className="w-64" />
}

export const Default: Story = {
	render: Template.bind({}),
	args: {},
}
