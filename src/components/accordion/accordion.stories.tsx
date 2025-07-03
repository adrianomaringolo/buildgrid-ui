// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion'

const meta: Meta<typeof Accordion> = {
	title: 'Components/Accordion',
	component: Accordion,
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Accordion>

const Template = () => {
	return (
		<div className="max-w-[350px]">
			<Accordion type="single" collapsible>
				<AccordionItem value="item-1">
					<AccordionTrigger className="text-blue-800 md:text-orange-700 lg:text-teal-800">
						Is it accessible?
					</AccordionTrigger>
					<AccordionContent>
						Yes. It adheres to the WAI-ARIA design pattern.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-2">
					<AccordionTrigger>Is it styled?</AccordionTrigger>
					<AccordionContent>Yes. It has a default style.</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-3">
					<AccordionTrigger>Is it animated?</AccordionTrigger>
					<AccordionContent>
						Yes. It uses CSS transitions to animate its content.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-4">
					<AccordionTrigger>Can it be closed?</AccordionTrigger>
					<AccordionContent>Yes. It is closed by default.</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	)
}

export const Default: Story = {
	render: Template.bind({}),
	args: {},
}
