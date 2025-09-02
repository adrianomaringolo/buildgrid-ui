'use client'

import type { Meta, StoryObj } from '@storybook/react'
import { useEffect, useState } from 'react'
import { TagInput } from './tag-input'

const meta: Meta<typeof TagInput> = {
	title: 'Components/TagInput',
	component: TagInput,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	render: (args) => {
		const [tags, setTags] = useState<string[]>([])

		useEffect(() => {
			let initialTags: string[] = []
			if (args.initialValue) {
				if (Array.isArray(args.initialValue)) {
					initialTags = args.initialValue
				} else {
					initialTags = args.initialValue.split(args.separator || ',')
				}
			}
			setTags(initialTags)
		}, [args.initialValue, args.separator])

		return <TagInput {...args} value={tags} onChange={setTags} />
	},
}

export default meta
type Story = StoryObj<typeof TagInput>

export const Default: Story = {
	args: {
		placeholder: 'Add tags separated by comma or Enter...',
		helperText: 'Press Enter or comma to add tags',
	},
}

export const CustomSeparator: Story = {
	args: {
		...Default.args,
		separator: '|',
		placeholder: 'Add tags separated by pipe | or Enter...',
	},
}

export const WithInitialValueAsString: Story = {
	args: {
		...Default.args,
		initialValue: 'react,typescript,nextjs',
		placeholder: 'Pre-filled with initial tags...',
	},
}

export const WithInitialValueAsArray: Story = {
	args: {
		...Default.args,
		initialValue: ['javascript', 'css', 'html'],
		placeholder: 'Pre-filled with array of tags...',
	},
}
