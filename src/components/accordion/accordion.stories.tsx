// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion'

const meta: Meta<typeof Accordion> = {
	title: 'Components/Accordion',
	component: Accordion,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		type: {
			control: 'select',
			options: ['single', 'multiple'],
			description:
				'Determines whether one or multiple items can be opened at the same time',
		},
		collapsible: {
			control: 'boolean',
			description: 'When type is "single", allows closing the open item',
		},
	},
}

export default meta
type Story = StoryObj<typeof Accordion>

/**
 * Default accordion with single collapsible behavior.
 * Only one item can be open at a time, and it can be closed.
 */
export const Default: Story = {
	render: (args) => (
		<div className="w-[500px]">
			<Accordion type="single" collapsible {...args}>
				<AccordionItem value="item-1">
					<AccordionTrigger>Is it accessible?</AccordionTrigger>
					<AccordionContent>
						Yes. It adheres to the WAI-ARIA design pattern and includes proper keyboard
						navigation support.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-2">
					<AccordionTrigger>Is it styled?</AccordionTrigger>
					<AccordionContent>
						Yes. It comes with default styles that you can customize using Tailwind CSS
						classes.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-3">
					<AccordionTrigger>Is it animated?</AccordionTrigger>
					<AccordionContent>
						Yes. It uses smooth CSS transitions to animate the expand and collapse
						actions.
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	),
}

/**
 * Accordion that allows multiple items to be open simultaneously.
 */
export const Multiple: Story = {
	render: (args) => (
		<div className="w-[500px]">
			<Accordion type="multiple" {...args}>
				<AccordionItem value="item-1">
					<AccordionTrigger>Getting Started</AccordionTrigger>
					<AccordionContent>
						<p>To get started, install the package and import the components you need.</p>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-2">
					<AccordionTrigger>Installation</AccordionTrigger>
					<AccordionContent>
						<p>Run the following command in your terminal:</p>
						<code className="block mt-2 p-2 bg-muted rounded">
							npm install @buildgrid/ui
						</code>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-3">
					<AccordionTrigger>Usage</AccordionTrigger>
					<AccordionContent>
						<p>Import the components and use them in your React application.</p>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	),
}

/**
 * Accordion with default open item.
 */
export const DefaultOpen: Story = {
	render: (args) => (
		<div className="w-[500px]">
			<Accordion type="single" collapsible defaultValue="item-2" {...args}>
				<AccordionItem value="item-1">
					<AccordionTrigger>What is BuildGrid UI?</AccordionTrigger>
					<AccordionContent>
						BuildGrid UI is a comprehensive React component library built with TypeScript
						and Tailwind CSS.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-2">
					<AccordionTrigger>Why use BuildGrid UI?</AccordionTrigger>
					<AccordionContent>
						It provides accessible, customizable, and production-ready components that
						help you build modern web applications faster.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-3">
					<AccordionTrigger>Is it free?</AccordionTrigger>
					<AccordionContent>
						Yes, BuildGrid UI is open source and free to use in your projects.
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	),
}

/**
 * FAQ-style accordion with detailed content.
 */
export const FAQ: Story = {
	render: (args) => (
		<div className="w-[600px]">
			<h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
			<Accordion type="single" collapsible {...args}>
				<AccordionItem value="shipping">
					<AccordionTrigger>What are the shipping options?</AccordionTrigger>
					<AccordionContent>
						<p>We offer several shipping options:</p>
						<ul className="list-disc list-inside mt-2 space-y-1">
							<li>Standard shipping (5-7 business days)</li>
							<li>Express shipping (2-3 business days)</li>
							<li>Overnight shipping (next business day)</li>
						</ul>
						<p className="mt-2">
							Shipping costs are calculated at checkout based on your location and
							selected method.
						</p>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="returns">
					<AccordionTrigger>What is your return policy?</AccordionTrigger>
					<AccordionContent>
						<p>
							We accept returns within 30 days of purchase. Items must be in original
							condition with tags attached.
						</p>
						<p className="mt-2">
							To initiate a return, please contact our customer service team with your
							order number.
						</p>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="warranty">
					<AccordionTrigger>Do you offer a warranty?</AccordionTrigger>
					<AccordionContent>
						<p>
							Yes, all products come with a 1-year manufacturer warranty covering defects
							in materials and workmanship.
						</p>
						<p className="mt-2">
							Extended warranty options are available at checkout for select products.
						</p>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="payment">
					<AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
					<AccordionContent>
						<p>We accept the following payment methods:</p>
						<ul className="list-disc list-inside mt-2 space-y-1">
							<li>Credit cards (Visa, Mastercard, American Express)</li>
							<li>PayPal</li>
							<li>Apple Pay</li>
							<li>Google Pay</li>
						</ul>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	),
}

/**
 * Accordion with rich content including links and formatting.
 */
export const RichContent: Story = {
	render: (args) => (
		<div className="w-[600px]">
			<Accordion type="single" collapsible {...args}>
				<AccordionItem value="features">
					<AccordionTrigger>Key Features</AccordionTrigger>
					<AccordionContent>
						<p>Our platform includes:</p>
						<ul className="list-disc list-inside mt-2 space-y-1">
							<li>Real-time collaboration</li>
							<li>Advanced analytics dashboard</li>
							<li>Customizable workflows</li>
							<li>API integration support</li>
						</ul>
						<p className="mt-3">
							<a href="#" className="text-primary">
								Learn more about features →
							</a>
						</p>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="pricing">
					<AccordionTrigger>Pricing Plans</AccordionTrigger>
					<AccordionContent>
						<div className="space-y-3">
							<div>
								<strong>Free Plan:</strong> Perfect for individuals getting started
							</div>
							<div>
								<strong>Pro Plan:</strong> $29/month - For growing teams
							</div>
							<div>
								<strong>Enterprise:</strong> Custom pricing - For large organizations
							</div>
							<p className="mt-3">
								<a href="#" className="text-primary">
									View detailed pricing →
								</a>
							</p>
						</div>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="support">
					<AccordionTrigger>Support & Resources</AccordionTrigger>
					<AccordionContent>
						<p>Get help through multiple channels:</p>
						<ul className="list-disc list-inside mt-2 space-y-1">
							<li>
								<a href="#" className="text-primary">
									Documentation
								</a>
							</li>
							<li>
								<a href="#" className="text-primary">
									Community Forum
								</a>
							</li>
							<li>
								<a href="#" className="text-primary">
									Email Support
								</a>
							</li>
							<li>
								<a href="#" className="text-primary">
									Live Chat (Pro & Enterprise)
								</a>
							</li>
						</ul>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	),
}

/**
 * Compact accordion with minimal content.
 */
export const Compact: Story = {
	render: (args) => (
		<div className="w-[400px]">
			<Accordion type="single" collapsible {...args}>
				<AccordionItem value="q1">
					<AccordionTrigger>Quick question 1?</AccordionTrigger>
					<AccordionContent>Short answer here.</AccordionContent>
				</AccordionItem>
				<AccordionItem value="q2">
					<AccordionTrigger>Quick question 2?</AccordionTrigger>
					<AccordionContent>Another brief response.</AccordionContent>
				</AccordionItem>
				<AccordionItem value="q3">
					<AccordionTrigger>Quick question 3?</AccordionTrigger>
					<AccordionContent>Concise information.</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	),
}

/**
 * Accordion with disabled items.
 */
export const WithDisabledItems: Story = {
	render: (args) => (
		<div className="w-[500px]">
			<Accordion type="single" collapsible {...args}>
				<AccordionItem value="item-1">
					<AccordionTrigger>Available Item</AccordionTrigger>
					<AccordionContent>This item is available and can be expanded.</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-2" disabled>
					<AccordionTrigger>Disabled Item</AccordionTrigger>
					<AccordionContent>
						This content cannot be accessed because the item is disabled.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-3">
					<AccordionTrigger>Another Available Item</AccordionTrigger>
					<AccordionContent>
						This item is also available for interaction.
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	),
}
