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
			'Includes comprehensive documentation, linting and formatting with ESLint and Prettier, and clear contribution guidelines.',
	},
]

export const FeaturesSection: React.FC = () => {
	return (
		<section className="py-20 bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-slate-800 relative overflow-hidden">
			{/* Background decoration */}
			<div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(147,51,234,0.02)_50%,transparent_75%)] bg-[length:60px_60px]"></div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
						Why Choose{' '}
						<span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
							buildgrid-ui
						</span>
						?
					</h2>
					<p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto! text-balance">
						Unlock the full potential of your web development projects with these standout
						features that make building UIs faster and more enjoyable.
					</p>
				</div>

				<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{features.map((feature, index) => (
						<div
							key={index}
							className="group relative p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl hover:shadow-2xl hover:shadow-purple-500/10 dark:hover:shadow-purple-500/20 transition-all duration-500 hover:-translate-y-2"
						>
							{/* Gradient border on hover */}
							<div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-25 transition-all duration-500 -z-10 blur-sm"></div>

							{/* Icon with animation */}
							<div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
								{feature.icon}
							</div>

							<h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
								{feature.title}
							</h3>

							<p className="text-gray-600 dark:text-gray-400 leading-relaxed">
								{feature.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
