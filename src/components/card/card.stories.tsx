// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from './card'
import { Button } from '../button/button'
import { Badge } from '../badge/badge'

const meta: Meta<typeof Card> = {
	title: 'Components/Card',
	component: Card,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: 'select',
			options: ['default', 'sm'],
			description: 'Size variant of the card',
		},
	},
}

export default meta
type Story = StoryObj<typeof Card>

/**
 * Default card with header, content, and footer sections.
 */
export const Default: Story = {
	render: (args) => (
		<Card {...args} className="w-96">
			<CardHeader>
				<CardTitle>Card Title</CardTitle>
				<CardDescription>
					This is a description that provides additional context about the card content.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<p>This is the main content area of the card. You can place any content here.</p>
			</CardContent>
			<CardFooter>
				<Button variant="outline" className="mr-2">
					Cancel
				</Button>
				<Button>Confirm</Button>
			</CardFooter>
		</Card>
	),
}

/**
 * Simple card with only title and content, no footer.
 */
export const Simple: Story = {
	render: (args) => (
		<Card {...args} className="w-96">
			<CardHeader>
				<CardTitle>Simple Card</CardTitle>
			</CardHeader>
			<CardContent>
				<p>A minimal card with just a title and content section.</p>
			</CardContent>
		</Card>
	),
}

/**
 * Card with an action button in the header.
 */
export const WithAction: Story = {
	render: (args) => (
		<Card {...args} className="w-96">
			<CardHeader>
				<CardTitle>Notification Settings</CardTitle>
				<CardDescription>Manage how you receive notifications</CardDescription>
				<CardAction>
					<Button variant="ghost" size="sm">
						Edit
					</Button>
				</CardAction>
			</CardHeader>
			<CardContent>
				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<span>Email notifications</span>
						<Badge>Enabled</Badge>
					</div>
					<div className="flex items-center justify-between">
						<span>Push notifications</span>
						<Badge variant="secondary">Disabled</Badge>
					</div>
				</div>
			</CardContent>
		</Card>
	),
}

/**
 * Card with an image at the top.
 */
export const WithImage: Story = {
	render: (args) => (
		<Card {...args} className="w-96">
			<img
				src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop"
				alt="Laptop on desk"
				className="w-full h-48 object-cover"
			/>
			<CardHeader>
				<CardTitle>Featured Article</CardTitle>
				<CardDescription>Published on January 21, 2026</CardDescription>
			</CardHeader>
			<CardContent>
				<p>
					Discover the latest trends in web development and how they can improve your
					workflow.
				</p>
			</CardContent>
			<CardFooter>
				<Button variant="link" className="px-0">
					Read more →
				</Button>
			</CardFooter>
		</Card>
	),
}

/**
 * Small size variant of the card.
 */
export const SmallSize: Story = {
	render: (args) => (
		<Card {...args} size="sm" className="w-80">
			<CardHeader>
				<CardTitle>Compact Card</CardTitle>
				<CardDescription>Smaller padding and text sizes</CardDescription>
			</CardHeader>
			<CardContent>
				<p className="text-sm">
					This card uses the small size variant with reduced spacing.
				</p>
			</CardContent>
			<CardFooter>
				<Button size="sm">Action</Button>
			</CardFooter>
		</Card>
	),
}

/**
 * Card displaying user profile information.
 */
export const UserProfile: Story = {
	render: (args) => (
		<Card {...args} className="w-96">
			<CardHeader>
				<CardTitle>John Doe</CardTitle>
				<CardDescription>Software Engineer</CardDescription>
				<CardAction>
					<Button variant="outline" size="sm">
						Follow
					</Button>
				</CardAction>
			</CardHeader>
			<CardContent>
				<div className="space-y-2 text-sm">
					<div className="flex items-center gap-2">
						<span className="text-muted-foreground">Location:</span>
						<span>San Francisco, CA</span>
					</div>
					<div className="flex items-center gap-2">
						<span className="text-muted-foreground">Joined:</span>
						<span>January 2024</span>
					</div>
					<div className="flex items-center gap-2">
						<span className="text-muted-foreground">Projects:</span>
						<span>42</span>
					</div>
				</div>
			</CardContent>
			<CardFooter className="justify-between">
				<div className="text-sm">
					<span className="font-medium">1.2k</span> followers
				</div>
				<div className="text-sm">
					<span className="font-medium">342</span> following
				</div>
			</CardFooter>
		</Card>
	),
}

/**
 * Card displaying product information.
 */
export const ProductCard: Story = {
	render: (args) => (
		<Card {...args} className="w-80">
			<img
				src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop"
				alt="Headphones"
				className="w-full h-56 object-cover"
			/>
			<CardHeader>
				<CardTitle>Premium Headphones</CardTitle>
				<CardDescription>Wireless noise-cancelling</CardDescription>
				<CardAction>
					<Badge variant="secondary">New</Badge>
				</CardAction>
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-bold">$299.99</div>
				<p className="text-sm text-muted-foreground mt-2">
					High-quality audio with active noise cancellation and 30-hour battery life.
				</p>
			</CardContent>
			<CardFooter>
				<Button className="w-full">Add to Cart</Button>
			</CardFooter>
		</Card>
	),
}

/**
 * Card with statistics or metrics.
 */
export const StatsCard: Story = {
	render: (args) => (
		<Card {...args} className="w-80">
			<CardHeader>
				<CardTitle>Total Revenue</CardTitle>
				<CardDescription>Last 30 days</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="text-3xl font-bold">$45,231.89</div>
				<p className="text-sm text-green-600 mt-2">+20.1% from last month</p>
			</CardContent>
		</Card>
	),
}

/**
 * Multiple cards in a grid layout.
 */
export const GridLayout: Story = {
	render: (args) => (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl">
			<Card {...args}>
				<CardHeader>
					<CardTitle>Active Users</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">2,543</div>
					<p className="text-sm text-muted-foreground">+12% this week</p>
				</CardContent>
			</Card>
			<Card {...args}>
				<CardHeader>
					<CardTitle>Total Sales</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">$12,345</div>
					<p className="text-sm text-muted-foreground">+8% this week</p>
				</CardContent>
			</Card>
			<Card {...args}>
				<CardHeader>
					<CardTitle>Conversion Rate</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">3.24%</div>
					<p className="text-sm text-muted-foreground">-2% this week</p>
				</CardContent>
			</Card>
		</div>
	),
}
