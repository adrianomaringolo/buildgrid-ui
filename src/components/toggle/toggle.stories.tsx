// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Toggle } from '.'

const meta: Meta<typeof Toggle> = {
	component: Toggle,
}

export default meta
type Story = StoryObj<typeof Toggle>

const Template = () => {
	return (
		<>
			<Toggle>A</Toggle>
			<Toggle>B</Toggle>
			<Toggle>C</Toggle>
		</>
	)
}

export const Default: Story = {
	render: Template.bind({}),
	args: {},
}
