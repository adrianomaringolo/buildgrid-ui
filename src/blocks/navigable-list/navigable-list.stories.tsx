import { Meta, StoryObj } from '@storybook/react'
import { NavigableList } from './'

type User = { name: string }

const users: User[] = [
	{ name: 'Alice' },
	{ name: 'Bruno' },
	{ name: 'Carlo' },
	{ name: 'Daniel' },
	{ name: 'Monica' },
]

const meta: Meta<typeof NavigableList<User>> = {
	title: 'Blocks/navigable-list',
	component: NavigableList,
	parameters: {
		layout: 'centered',
	},
}

export default meta

type Story = StoryObj<typeof NavigableList<User>>

export const Default: Story = {
	render: () => (
		<div className="w-full max-w-md">
			<NavigableList
				items={users}
				renderItem={(user, isSelected) => (
					<span className={isSelected ? 'font-semibold text-blue-700' : ''}>
						{user.name}
					</span>
				)}
				actions={[
					{
						shortcut: { key: 'e', ctrl: true },
						label: <button>Edit</button>,
						callback: (user) => alert(`Edit ${user.name}`),
					},
					{
						shortcut: { key: 'd', ctrl: true },
						label: 'Delete',
						callback: (user) => alert(`Delete: ${user.name}`),
					},
				]}
			/>
		</div>
	),
}
