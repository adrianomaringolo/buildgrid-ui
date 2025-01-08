// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from './navigation-menu'

const meta: Meta<typeof NavigationMenu> = {
	component: NavigationMenu,
}

export default meta
type Story = StoryObj<typeof NavigationMenu>

const Template = () => {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Item One</NavigationMenuTrigger>
					<NavigationMenuContent>
						<NavigationMenuLink>Link</NavigationMenuLink>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink>Link</NavigationMenuLink>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	)
}

export const Default: Story = {
	render: Template.bind({}),
	args: {},
}
