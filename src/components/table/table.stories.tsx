// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '.'

const meta: Meta<typeof Table> = {
	component: Table,
}

export default meta
type Story = StoryObj<typeof Table>

const data = [
	{
		firstName: 'John',
		lastName: 'Doe',
		username: '@johndoe',
	},
	{
		firstName: 'Sally',
		lastName: 'Ross',
		username: '@sallyross',
	},
	{
		firstName: 'Jane',
		lastName: 'Doe',
		username: '@janedoe',
	},
	{
		firstName: 'Bob',
		lastName: 'Ross',
		username: '@bobross',
	},
	{
		firstName: 'Kyle',
		lastName: 'Moss',
		username: '@kylemoss',
	},
	{
		firstName: 'Urden',
		lastName: 'Myckov',
		username: '@urdenmyckov',
	},
]

const Template = () => {
	return (
		<Table>
			<TableHeader>
				<TableHead>First Name</TableHead>
				<TableHead>Last Name</TableHead>
				<TableHead>Username</TableHead>
			</TableHeader>
			<TableBody>
				{data.map((person) => (
					<TableRow key={person.username}>
						<TableCell>{person.firstName}</TableCell>
						<TableCell>{person.lastName}</TableCell>
						<TableCell>{person.username}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}

export const Default: Story = {
	render: Template.bind({}),
	args: {},
}
