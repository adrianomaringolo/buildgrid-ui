import type { Preview, Decorator } from '@storybook/react'
import React, { useEffect } from 'react'
import '../src/styles/tailwind.css'

const withTheme: Decorator = (Story, context) => {
	const theme = context.globals.theme ?? 'light'

	useEffect(() => {
		document.documentElement.classList.toggle('dark', theme === 'dark')
	}, [theme])

	return (
		<div className="bg-background text-foreground min-h-screen">
			<Story />
		</div>
	)
}

const preview: Preview = {
	globalTypes: {
		theme: {
			description: 'Color theme',
			defaultValue: 'light',
			toolbar: {
				title: 'Theme',
				icon: 'circlehollow',
				items: [
					{ value: 'light', title: 'Light', icon: 'sun' },
					{ value: 'dark', title: 'Dark', icon: 'moon' },
				],
				dynamicTitle: true,
			},
		},
	},
	decorators: [withTheme],
	parameters: {
		backgrounds: { disable: true },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
}

export default preview
