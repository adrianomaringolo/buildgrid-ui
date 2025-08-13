// organize-imports-ignore
import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from './sheet'

const meta: Meta<typeof Sheet> = {
	component: Sheet,
}

export default meta
type Story = StoryObj<typeof Sheet>

const Template = () => {
	return (
		<Sheet>
			<SheetTrigger>Open</SheetTrigger>
			<SheetContent className="w-[400px] sm:w-[540px]">
				<SheetHeader>
					<SheetTitle>Are you absolutely sure?</SheetTitle>
					<SheetDescription>
						This action cannot be undone. This will permanently delete your account and
						remove your data from our servers.
					</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	)
}

export const Default: Story = {
	render: Template.bind({}),
	args: {},
}
