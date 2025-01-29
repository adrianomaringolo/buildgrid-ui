// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { LazyImageGallery } from './lazy-image-gallery'

const meta: Meta<typeof LazyImageGallery> = {
	component: LazyImageGallery,
}

export default meta
type Story = StoryObj<typeof LazyImageGallery>

const imageUrls = [
	'https://placehold.co/600x400',
	'https://placehold.co/700x500',
	'https://placehold.co/800x600',
	'https://placehold.co/900x700',
	'https://placehold.co/1000x800',
	'https://placehold.co/1100x900',
	'https://placehold.co/1200x1000',
	'https://placehold.co/1300x1100',
	'https://placehold.co/1400x1200',
	'https://placehold.co/1500x1300',
	'https://placehold.co/1600x1400',
	'https://placehold.co/1800x1500',
	'https://placehold.co/1900x1600',
	'https://placehold.co/2000x1700',
	'https://placehold.co/2100x1800',
	'https://placehold.co/2200x1900',
	// Add more URLs here
]

const Template = () => {
	return (
		<div className="h-96 border rounded p-2">
			<LazyImageGallery images={imageUrls} />
		</div>
	)
}

export const Default: Story = {
	render: Template.bind({}),
	args: {},
}
