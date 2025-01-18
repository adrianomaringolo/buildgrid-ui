import React from 'react'

interface Feature {
	icon: React.ReactNode
	title: string
	description: string
}

const features: Feature[] = [
	{
		icon: '🚀',
		title: 'Ready-to-Use Components',
		description:
			'A rich library of accessible, responsive, and modern components like buttons, inputs, dropdowns, modals, and more. Designed to get you started faster.',
	},
	{
		icon: '🎨',
		title: 'Customizable and Theming Support',
		description:
			'Easily adaptable to your brand with Tailwind CSS. Supports light and dark modes out of the box, with options for further customization.',
	},
	{
		icon: '⚡',
		title: 'Optimized for Performance',
		description:
			'Lightweight and tree-shakable components ensure your applications stay fast and efficient.',
	},
	{
		icon: '🛠️',
		title: 'Utility Functions Included',
		description:
			'Enhance your development experience with ready-to-use utilities like debouncing, formatting, and state management hooks.',
	},
	{
		icon: '🌐',
		title: 'TypeScript First',
		description:
			'Built with TypeScript for better type safety, enhanced developer tooling, and confidence in your code.',
	},
	{
		icon: '✅',
		title: 'Accessible and Compliant',
		description:
			'All components are WCAG-compliant, with ARIA roles pre-configured, ensuring a seamless experience for all users.',
	},
	{
		icon: '📖',
		title: 'Comprehensive Documentation',
		description:
			'Step-by-step guides, code examples, and a playground for every component. Powered by Docusaurus for an easy learning curve.',
	},
	{
		icon: '🔄',
		title: 'Flexible Integration',
		description:
			'Tree-shakable ESM, CJS, and UMD builds, allowing seamless integration into any project.',
	},
	{
		icon: '🤝',
		title: 'Developer-Friendly',
		description:
			'Includes Storybook for testing and exploration, linting and formatting with ESLint and Prettier, and clear contribution guidelines.',
	},
]

export const FeaturesSection: React.FC = () => {
	return (
		<section className="py-16 bg-gray-50 dark:bg-gray-900">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 text-center">
					Why Choose{' '}
					<span className="text-blue-600 dark:text-blue-400">buildgrid-ui</span>?
				</h2>
				<p className="mt-4 text-lg text-gray-600 dark:text-gray-300 text-center">
					Unlock the full potential of your web development projects with these standout
					features.
				</p>
				<div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{features.map((feature, index) => (
						<div
							key={index}
							className="p-6 bg-white dark:bg-gray-800 shadow rounded-lg hover:shadow-lg dark:shadow-none transition-shadow"
						>
							<div className="text-4xl">{feature.icon}</div>
							<h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
								{feature.title}
							</h3>
							<p className="mt-2 text-gray-600 dark:text-gray-400">
								{feature.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
