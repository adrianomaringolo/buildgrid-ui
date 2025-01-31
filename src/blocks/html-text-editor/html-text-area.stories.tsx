// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { HtmlTextArea } from './html-text-area'

const meta: Meta<typeof HtmlTextArea> = {
	component: HtmlTextArea,
	parameters: {
		status: {
			type: 'beta', // 'beta' | 'stable' | 'deprecated' | 'releaseCandidate'
		},
	},
}

export default meta
type Story = StoryObj<typeof HtmlTextArea>

const Template = () => {
	return (
		<div className="h-96 border rounded p-2">
			<HtmlTextArea>
				{`<p>hello world</p>
				<ul>
					<li>1</li>
					<li>2</li>
					<li>3</li>
					<li>4</li>
				</ul>`}
			</HtmlTextArea>
		</div>
	)
}

export const Default: Story = {
	render: Template.bind({}),
	args: {},
}
