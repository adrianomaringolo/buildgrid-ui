// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Avatar, AvatarFallback, AvatarImage } from './avatar'

const meta: Meta<typeof Avatar> = {
	component: Avatar,
}

export default meta
type Story = StoryObj<typeof Avatar>

const Template = () => {
	return (
		<Avatar className="w-24 h-24">
			<AvatarImage
				src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
				alt="User avatar"
			/>
			<AvatarFallback>NS</AvatarFallback>
		</Avatar>
	)
}

export const Default: Story = {
	render: Template.bind({}),
	args: {},
}
