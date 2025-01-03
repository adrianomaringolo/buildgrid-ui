// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { PasswordInput } from './password-input'

const meta: Meta<typeof PasswordInput> = {
	title: 'Components/Input/Password',
	component: PasswordInput,
}

export default meta
type Story = StoryObj<typeof PasswordInput>

const Template = () => {
	return <PasswordInput className="w-96" />
}

export const Default: Story = {
	render: Template.bind({}),
	args: {},
}
