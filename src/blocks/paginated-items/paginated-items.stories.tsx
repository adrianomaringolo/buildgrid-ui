// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { PaginatedItems } from '.'
import { User } from 'lucide-react'

const meta: Meta<typeof PaginatedItems> = {
	component: PaginatedItems,
}

export default meta
type Story = StoryObj<typeof PaginatedItems>

type User = {
	id: string
	name: string
	email: string
}
// create a list of 100 users using the map function
const users: User[] = Array.from({ length: 1000 }, (_, index) => index + 1).map(
	(user) => ({
		id: user.toString(),
		name: `User ${user}`,
		email: `user${user}@example.com`,
	}),
)

const Template = () => {
	return (
		<PaginatedItems<User> data={users} itemsContainerClass="grid grid-cols-2 gap-3">
			{(user) => (
				<div key={user.id} className="border rounded-sm p-3">
					<div className="flex gap-2 items-center">
						<User />
						{user.name}
					</div>
					<span className="text-sm text-gray-400">{user.email}</span>
				</div>
			)}
		</PaginatedItems>
	)
}

export const Default: Story = {
	render: Template.bind({}),
	args: {},
}
