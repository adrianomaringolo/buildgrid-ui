// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { HelpCarousel } from './help-carousel'
import { BadgeHelp, HelpCircle, Phone, User } from 'lucide-react'
import { Button } from '../../components/button'

const meta: Meta<typeof HelpCarousel> = {
	component: HelpCarousel,
}

export default meta
type Story = StoryObj<typeof HelpCarousel>

const helpSteps = [
	{
		title: 'Welcome to Our App',
		description: "Let's walk you through the main features of our application.",
	},
	{
		title: 'Dashboard Overview',
		description:
			'Your dashboard shows you a summary of your recent activity and key metrics.',
	},
	{
		title: 'Creating a New Project',
		description:
			"Click the 'New Project' button to start a new project and fill in the details.",
	},
	{
		title: 'Inviting Team Members',
		description:
			"You can invite team members to collaborate on your projects from the 'Team' tab.",
	},
]

const Template = () => {
	return (
		<HelpCarousel
			steps={helpSteps}
			triggerElement={
				<Button variant="outline" size="xl">
					<BadgeHelp />
				</Button>
			}
		/>
	)
}

export const Default: Story = {
	render: Template.bind({}),
	args: {},
}
