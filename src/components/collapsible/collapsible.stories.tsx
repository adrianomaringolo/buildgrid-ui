// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './collapsible'
import { Button } from '../button'

const meta: Meta<typeof Collapsible> = {
	title: 'Components/Collapsible',
	component: Collapsible,
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Collapsible>

const Template = () => {
	return (
		<div className="max-w-[350px]">
			<Collapsible>
				<CollapsibleTrigger>
					<Button>Toggle</Button>
				</CollapsibleTrigger>
				<CollapsibleContent>
					<div className="mt-2 rounded-md border p-4">
						<p>This is the collapsible content. You can put anything you want in here.</p>
					</div>
				</CollapsibleContent>
			</Collapsible>
		</div>
	)
}

export const Default: Story = {
	render: Template.bind({}),
	args: {},
}
