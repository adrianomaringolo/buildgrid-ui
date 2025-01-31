// organize-imports-ignore
import React, { useState } from 'react'
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
	const [value, setValue] = useState('This is the <b>initial value</b>')
	return (
		<div className="h-96 max-w-2xl">
			<HtmlTextEditor initialValue={value} onChange={(value) => setValue(value)} />
			Value: {value}
		</div>
	)
}

export const Default: Story = {
	render: Template.bind({}),
	args: {},
}
