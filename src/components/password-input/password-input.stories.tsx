// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { PasswordInput } from './password-input'

const meta: Meta<typeof PasswordInput> = {
	title: 'Components/input/password',
	component: PasswordInput,
}

export default meta
type Story = StoryObj<typeof PasswordInput>

const Template = () => {
	return (
		<div className="w-96">
			<PasswordInput />
		</div>
	)
}

export const Default: Story = {
	render: Template.bind({}),
	args: {},
}
