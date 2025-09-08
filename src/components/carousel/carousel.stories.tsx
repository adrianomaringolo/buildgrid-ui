// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from './carousel'
import { Card, CardContent } from '../card'

const meta: Meta<typeof Carousel> = {
	component: Carousel,
}

export default meta
type Story = StoryObj<typeof Carousel>

const Template = (args: Story['args']) => (
	<Carousel className="w-full max-w-xs" {...args}>
		<CarouselContent>
			{Array.from({ length: 5 }).map((_, index) => (
				<CarouselItem key={index}>
					<div className="p-1">
						<Card>
							<CardContent className="flex aspect-square items-center justify-center p-6">
								<span className="text-4xl font-semibold">{index + 1}</span>
							</CardContent>
						</Card>
					</div>
				</CarouselItem>
			))}
		</CarouselContent>
		<CarouselPrevious />
		<CarouselNext />
	</Carousel>
)

export const Default: Story = {
	render: Template.bind({}),
	args: {},
}

export const Vertical: Story = {
	render: Template.bind({}),
	args: {
		orientation: 'vertical',
	},
}
