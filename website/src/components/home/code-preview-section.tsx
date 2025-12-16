import { cn } from 'buildgrid-ui'
import React, { useState } from 'react'
import { codeExamples } from '../../data/code-examples'

export const CodePreviewSection: React.FC = () => {
	const [activeExample, setActiveExample] = useState(0)
	const [activeTab, setActiveTab] = useState<'code' | 'preview'>('preview')

	return (
		<section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
						See it in{' '}
						<span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
							action
						</span>
					</h2>
					<p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto! text-balance">
						Clean, intuitive APIs that make building UIs a joy. Here are some examples of
						what you can build.
					</p>
				</div>

				<div className="grid lg:grid-cols-2 gap-12 items-start">
					{/* Code tabs */}
					<div className="space-y-4">
						{codeExamples.map((example, index) => (
							<button
								key={index}
								onClick={() => setActiveExample(index)}
								className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-300 ${
									activeExample === index
										? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
										: 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600'
								}`}
							>
								<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-0!">
									{example.title}
								</h3>
								<span className="text-gray-600 dark:text-gray-400">
									{example.description}
								</span>
							</button>
						))}
					</div>

					{/* Code/Preview display */}
					<div className="relative">
						{/* Tab switcher */}
						<div className="flex mb-4 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
							<button
								onClick={() => setActiveTab('preview')}
								className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
									activeTab === 'preview'
										? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
										: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
								}`}
							>
								Preview
							</button>
							<button
								onClick={() => setActiveTab('code')}
								className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
									activeTab === 'code'
										? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
										: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
								}`}
							>
								Code
							</button>
						</div>

						{activeTab === 'preview' ? (
							/* Preview display */
							<div className="relative">
								<div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-lg">
									{/* Preview header */}
									<div className="flex items-center gap-2 px-4 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
										<div className="w-3 h-3 rounded-full bg-red-500"></div>
										<div className="w-3 h-3 rounded-full bg-yellow-500"></div>
										<div className="w-3 h-3 rounded-full bg-green-500"></div>
										<span className="ml-4 text-gray-600 dark:text-gray-400 text-sm">
											Preview
										</span>
									</div>

									{/* Preview content */}
									<div className="p-8 min-h-[200px] flex items-center justify-center">
										{codeExamples[activeExample].preview}
									</div>
								</div>

								{/* Glow effect */}
								<div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl blur-xl -z-10"></div>
							</div>
						) : (
							/* Code display */
							<div className="relative">
								<div className="bg-gray-900 dark:bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
									{/* Terminal header */}
									<div className="flex items-center gap-2 px-4 py-3 bg-gray-800 dark:bg-gray-800">
										<div className="w-3 h-3 rounded-full bg-red-500"></div>
										<div className="w-3 h-3 rounded-full bg-yellow-500"></div>
										<div className="w-3 h-3 rounded-full bg-green-500"></div>
										<span className="ml-4 text-gray-400 text-sm">
											{codeExamples[activeExample].title.toLowerCase().replace(' ', '-')}
											.tsx
										</span>
									</div>

									{/* Code content */}
									<div className="p-6 overflow-x-auto">
										<pre className="text-sm text-gray-300">
											<code>{codeExamples[activeExample].code}</code>
										</pre>
									</div>
								</div>

								{/* Glow effect */}
								<div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl blur-xl -z-10 opacity-50"></div>
							</div>
						)}
					</div>
				</div>

				{/* Bottom CTA */}
				<div className="text-center mt-16">
					<a
						href="/buildgrid-ui/docs/components/button"
						className={cn(
							'inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600',
							'text-white! font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transform hover:scale-105',
							'transition-all duration-300',
						)}
					>
						Explore All Components
						<svg
							className="w-5 h-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M17 8l4 4m0 0l-4 4m4-4H3"
							/>
						</svg>
					</a>
				</div>
			</div>
		</section>
	)
}
