// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from './command'

const meta: Meta<typeof Command> = {
	component: Command,
}

export default meta
type Story = StoryObj<typeof Command>

const Template = () => {
	return (
		<Command className="rounded-lg border shadow-md md:min-w-[450px]">
			<CommandInput placeholder="Type a command or search..." />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup heading="Suggestions">
					<CommandItem>Calendar</CommandItem>
					<CommandItem>Search Emoji</CommandItem>
					<CommandItem>Calculator</CommandItem>
				</CommandGroup>
				<CommandSeparator />
				<CommandGroup heading="Settings">
					<CommandItem>Profile</CommandItem>
					<CommandItem>Billing</CommandItem>
					<CommandItem>Settings</CommandItem>
				</CommandGroup>
			</CommandList>
		</Command>
	)
}

export const Default: Story = {
	render: Template.bind({}),
	args: {},
}
