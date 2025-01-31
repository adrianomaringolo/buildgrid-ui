// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { HtmlTextEditor } from './html-text-editor'

const meta: Meta<typeof HtmlTextEditor> = {
	component: HtmlTextEditor,
	parameters: {
		status: {
			type: 'beta', // 'beta' | 'stable' | 'deprecated' | 'releaseCandidate'
		},
	},
}

export default meta
type Story = StoryObj<typeof HtmlTextEditor>

const Template = () => {
	return (
		<div className="h-96 max-w-2xl">
			<HtmlTextEditor />
		</div>
	)
}

export const Default: Story = {
	render: Template.bind({}),
	args: {},
}
