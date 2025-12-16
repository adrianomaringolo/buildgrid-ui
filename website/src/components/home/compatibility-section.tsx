import {
	SiEslint,
	SiNextdotjs,
	SiRadixui,
	SiReact,
	SiShadcnui,
	SiStorybook,
	SiTailwindcss,
	SiVite,
} from '@icons-pack/react-simple-icons'
import React from 'react'

export const CompatibilitySection: React.FC = () => {
	return (
		<section className="py-20 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
						Built on{' '}
						<span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
							proven foundations
						</span>
					</h2>
					<p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto! mb-6! text-balance">
						BuildGrid UI is built on top of shadcn/ui and Radix UI primitives, ensuring
						accessibility, reliability, and seamless integration with your favorite tools.
					</p>
					<div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
						<div className="flex items-center gap-2">
							<SiShadcnui size={16} />
							<span>Based on shadcn/ui</span>
						</div>
						<div className="flex items-center gap-2">
							<SiRadixui size={16} />
							<span>Powered by Radix UI</span>
						</div>
					</div>
				</div>

				{/* Foundation libraries */}
				<div className="grid md:grid-cols-2 gap-8 mb-20">
					{/* shadcn/ui */}
					<div className="group relative bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-900/50 dark:to-slate-900/50 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-105">
						<div className="flex items-center gap-6 mb-6">
							<SiShadcnui size={40} className="text-gray-900 dark:text-white" />
							<div>
								<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-0!">
									shadcn/ui
								</h3>
								<p className="text-gray-600 dark:text-gray-300">
									Copy & paste components foundation
								</p>
							</div>
						</div>
						<div className="">
							<div className="flex items-center gap-3">
								<div className="w-2 h-2 bg-green-500 rounded-full"></div>
								<span className="text-gray-700 dark:text-gray-300">
									Beautifully designed components
								</span>
							</div>
							<div className="flex items-center gap-3">
								<div className="w-2 h-2 bg-green-500 rounded-full"></div>
								<span className="text-gray-700 dark:text-gray-300">
									Customizable and extensible
								</span>
							</div>
							<div className="flex items-center gap-3">
								<div className="w-2 h-2 bg-green-500 rounded-full"></div>
								<span className="text-gray-700 dark:text-gray-300">
									Built with Tailwind CSS
								</span>
							</div>
						</div>
					</div>

					{/* Radix UI */}
					<div className="group relative bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800 hover:shadow-xl transition-all duration-300 hover:scale-105">
						<div className="flex items-center gap-6 mb-6">
							<div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
								<SiRadixui size={40} className="text-gray-900 dark:text-white" />
							</div>
							<div>
								<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-0!">
									Radix UI
								</h3>
								<p className="text-gray-600 dark:text-gray-300">
									Accessible component primitives
								</p>
							</div>
						</div>
						<div className="">
							<div className="flex items-center gap-3">
								<div className="w-2 h-2 bg-green-500 rounded-full"></div>
								<span className="text-gray-700 dark:text-gray-300">
									WAI-ARIA compliant
								</span>
							</div>
							<div className="flex items-center gap-3">
								<div className="w-2 h-2 bg-green-500 rounded-full"></div>
								<span className="text-gray-700 dark:text-gray-300">
									Keyboard navigation
								</span>
							</div>
							<div className="flex items-center gap-3">
								<div className="w-2 h-2 bg-green-500 rounded-full"></div>
								<span className="text-gray-700 dark:text-gray-300">Focus management</span>
							</div>
						</div>
					</div>
				</div>

				{/* Framework compatibility */}
				<div className="grid md:grid-cols-2 gap-12 items-center mb-16">
					{/* React */}
					<div className="group relative bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800 hover:shadow-xl transition-all duration-300 hover:scale-105">
						<div className="flex items-center gap-6 mb-6">
							<div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center">
								<SiReact size={40} className="text-gray-900 dark:text-white" />
							</div>
							<div>
								<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-0!">
									React
								</h3>
								<p className="text-gray-600 dark:text-gray-300">
									Built for React 18+ with full TypeScript support
								</p>
							</div>
						</div>
						<div className="">
							<div className="flex items-center gap-3">
								<div className="w-2 h-2 bg-green-500 rounded-full"></div>
								<span className="text-gray-700 dark:text-gray-300">
									React 18+ compatible
								</span>
							</div>
							<div className="flex items-center gap-3">
								<div className="w-2 h-2 bg-green-500 rounded-full"></div>
								<span className="text-gray-700 dark:text-gray-300">
									Full TypeScript support
								</span>
							</div>
							<div className="flex items-center gap-3">
								<div className="w-2 h-2 bg-green-500 rounded-full"></div>
								<span className="text-gray-700 dark:text-gray-300">
									Tree-shakable imports
								</span>
							</div>
						</div>
					</div>

					{/* Next.js */}
					<div className="group relative bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-900/50 dark:to-slate-900/50 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-105">
						<div className="flex items-center gap-6 mb-6">
							<div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-black rounded-xl flex items-center justify-center">
								<SiNextdotjs size={40} className="text-gray-900 dark:text-white" />
							</div>
							<div>
								<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-0!">
									Next.js
								</h3>
								<p className="text-gray-600 dark:text-gray-300">
									Perfect for Next.js 13+ with App Router support
								</p>
							</div>
						</div>
						<div className="">
							<div className="flex items-center gap-3">
								<div className="w-2 h-2 bg-green-500 rounded-full"></div>
								<span className="text-gray-700 dark:text-gray-300">
									App Router compatible
								</span>
							</div>
							<div className="flex items-center gap-3">
								<div className="w-2 h-2 bg-green-500 rounded-full"></div>
								<span className="text-gray-700 dark:text-gray-300">
									Server Components ready
								</span>
							</div>
							<div className="flex items-center gap-3">
								<div className="w-2 h-2 bg-green-500 rounded-full"></div>
								<span className="text-gray-700 dark:text-gray-300">
									SSR & SSG support
								</span>
							</div>
						</div>
					</div>
				</div>

				{/* Additional tools */}
				<div className="text-center">
					<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
						And many more tools you love
					</h3>
					<div className="flex flex-wrap justify-center items-center gap-8 opacity-60 hover:opacity-100 transition-opacity duration-300">
						{/* Vite */}
						<div className="flex items-center gap-3 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:scale-105 transition-transform duration-200">
							<div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-yellow-500 rounded flex items-center justify-center">
								<SiVite size={20} className="text-gray-700 dark:text-gray-300" />
							</div>
							<span className="font-semibold text-gray-700 dark:text-gray-300">Vite</span>
						</div>

						{/* Tailwind CSS */}
						<div className="flex items-center gap-3 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:scale-105 transition-transform duration-200">
							<div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded flex items-center justify-center">
								<SiTailwindcss size={20} className="text-gray-700 dark:text-gray-300" />
							</div>
							<span className="font-semibold text-gray-700 dark:text-gray-300">
								Tailwind CSS
							</span>
						</div>

						{/* Storybook */}
						<div className="flex items-center gap-3 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:scale-105 transition-transform duration-200">
							<div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-red-500 rounded flex items-center justify-center">
								<SiStorybook size={20} className="text-gray-700 dark:text-gray-300" />
							</div>
							<span className="font-semibold text-gray-700 dark:text-gray-300">
								Storybook
							</span>
						</div>

						{/* ESLint */}
						<div className="flex items-center gap-3 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:scale-105 transition-transform duration-200">
							<div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded flex items-center justify-center">
								<SiEslint size={20} className="text-gray-700 dark:text-gray-300" />
							</div>
							<span className="font-semibold text-gray-700 dark:text-gray-300">
								ESLint
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
