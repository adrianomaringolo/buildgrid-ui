// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './button'
import { Loader2Icon } from 'lucide-react'

const meta: Meta<typeof Button> = {
	component: Button,
	title: 'Components/Button',
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
	args: {
		children: 'Button',
	},
}

export const Destructive: Story = {
	args: {
		...Default.args,
		variant: 'destructive',
	},
}

export const Outline: Story = {
	args: {
		...Default.args,
		variant: 'outline',
	},
}

export const Secondary: Story = {
	args: {
		...Default.args,
		variant: 'secondary',
	},
}

export const Ghost: Story = {
	args: {
		...Default.args,
		variant: 'ghost',
	},
}

export const Link: Story = {
	args: {
		...Default.args,
		variant: 'link',
	},
}

export const IsLoading: Story = {
	args: {
		...Default.args,
		isLoading: true,
	},
}

export const WithIcon: Story = {
	args: {
		...Default.args,
		children: (
			<>
				<Loader2Icon />
				Button
			</>
		),
	},
}

export const Small: Story = {
	args: {
		...Default.args,
		size: 'sm',
	},
}

export const Large: Story = {
	args: {
		...Default.args,
		size: 'lg',
	},
}

export const ExtraLarge: Story = {
	args: {
		...Default.args,
		size: 'xl',
	},
}

export const Icon: Story = {
	args: {
		size: 'icon',
		children: <Loader2Icon />,
	},
}

export const AsChild: Story = {
	args: {
		asChild: true,
		children: <a href="#">Log in</a>,
	},
}

export const AsChildWithLoadingWarning: Story = {
	args: {
		asChild: true,
		isLoading: true, // This will be ignored and show a warning in development
		children: <a href="#">Link that ignores loading</a>,
	},
	parameters: {
		docs: {
			description: {
				story:
					'When using asChild=true, the isLoading prop is ignored because Slot expects exactly one child. Handle loading state in the child component instead.',
			},
		},
	},
}
