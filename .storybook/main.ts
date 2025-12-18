
import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: ['@storybook/addon-docs', '@storybook/addon-onboarding'],
	framework: {
		name: '@storybook/react-vite',
		options: {},
	},
	viteFinal: async (config) => {
		// Set the base URL to match Docusaurus baseUrl + storybook path
		config.base = '/buildgrid-ui/storybook/'
		return config
	},
}
export default config
