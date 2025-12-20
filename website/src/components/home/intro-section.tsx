import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { BUILDGRID_UI_VERSION } from '@site/src/utils/version'
import Logo from '@site/static/img/buildgrid-ui-logo.png'
import { cn } from 'buildgrid-ui'

interface IntroSectionProps {
	className?: string
}

export const IntroSection = ({ className }: IntroSectionProps) => {
	const { siteConfig } = useDocusaurusContext()

	return (
		<section
			className={cn(
				'relative min-h-screen overflow-hidden',
				// Light mode: gradient from light purple/blue
				'bg-gradient-to-br from-purple-50 via-blue-50 to-purple-100',
				// Dark mode: gradient from dark slate/purple
				'dark:from-slate-900 dark:via-purple-900 dark:to-slate-900',
				className,
			)}
		>
			{/* Animated background elements */}
			<div className="absolute inset-0">
				{/* Floating orbs */}
				<div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 dark:opacity-20 animate-pulse"></div>
				<div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 dark:opacity-20 animate-pulse animation-delay-2000"></div>
				<div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 dark:opacity-20 animate-pulse animation-delay-4000"></div>

				{/* Grid pattern */}
				<div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
			</div>

			{/* Main content */}
			<div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-32">
				<div className="max-w-4xl mx-auto text-center">
					{/* Logo with glow effect */}
					<div className="mb-8 animate-fade-in">
						<img
							src={Logo}
							alt="BuildGrid UI Logo"
							className="w-32 h-32 mx-auto drop-shadow-[0_0_30px_rgba(147,51,234,0.5)] hover:drop-shadow-[0_0_50px_rgba(147,51,234,0.8)] transition-all duration-300 animate-float"
						/>
					</div>

					{/* Main heading with gradient text */}
					<h1 className="mb-6 text-6xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-gray-900 via-purple-700 to-blue-700 dark:from-white dark:via-purple-200 dark:to-purple-400 bg-clip-text text-transparent animate-fade-in-up animation-delay-300">
						{siteConfig.title}
					</h1>

					{/* Subtitle */}
					<p className="mb-4! text-xl md:text-2xl text-purple-700 dark:text-purple-200 font-light animate-fade-in-up animation-delay-600">
						A comprehensive UI component library
					</p>

					{/* Version Badge - Clickable link to NPM */}
					<div className="mb-6 animate-fade-in-up animation-delay-700">
						<a
							href="https://www.npmjs.com/package/buildgrid-ui"
							target="_blank"
							rel="noopener noreferrer"
							className="version-badge-link inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 border border-purple-200 dark:border-purple-700 hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors duration-200 no-underline hover:no-underline group"
							title="View buildgrid-ui on NPM"
						>
							<svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
									clipRule="evenodd"
								/>
							</svg>
							v{BUILDGRID_UI_VERSION}
							<svg
								className="w-3 h-3 ml-2 opacity-60 group-hover:opacity-100 transition-opacity duration-200"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
									clipRule="evenodd"
								/>
							</svg>
						</a>
					</div>

					<p className="mb-12! text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-fade-in-up animation-delay-900">
						Build modern, accessible, and beautiful React applications with our collection
						of components, blocks, and utility functions. Make your creation easier!
					</p>

					{/* CTA Buttons */}
					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-1200">
						<a
							href="/buildgrid-ui/docs/intro"
							className={cn(
								'border-2 border-purple-600 group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white!',
								'font-semibold rounded-full hover:from-purple-700 hover:to-blue-700 transform hover:scale-105',
								'transition-all duration-300 shadow-lg hover:shadow-purple-500/25',
							)}
						>
							<span className="relative z-10 text-white">Get Started</span>
							<div
								className={cn(
									'absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600',
									'opacity-0 group-hover:opacity-100 blur transition-opacity duration-300',
								)}
							></div>
						</a>

						<a
							href="/buildgrid-ui/docs/components/button"
							className={cn(
								'px-8 py-4 border-2 border-purple-600 dark:border-purple-400 text-purple-700!  dark:text-purple-300',
								'font-semibold rounded-full hover:bg-purple-600 dark:hover:bg-purple-400 hover:text-white! transform hover:scale-105 transition-all duration-300',
								'animate-fade-in-up animation-delay-1500',
							)}
						>
							View Components
						</a>

						<a
							href="https://main--6944355833ad98d1ee729cd0.chromatic.com/"
							target="_blank"
							rel="noopener noreferrer"
							className={cn(
								'px-8 py-4 border-2 border-orange-500 dark:border-orange-400 text-orange-600! dark:text-orange-300',
								'font-semibold rounded-full hover:bg-orange-500 dark:hover:bg-orange-400 hover:text-white! transform hover:scale-105 transition-all duration-300',
								'animate-fade-in-up animation-delay-1800',
							)}
						>
							View Storybook
						</a>
					</div>
				</div>
			</div>

			{/* Scroll indicator */}
			<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
				<div className="w-6 h-10 border-2 border-purple-600 dark:border-purple-400 rounded-full flex justify-center">
					<div className="w-1 h-3 bg-purple-600 dark:bg-purple-400 rounded-full mt-2 animate-pulse"></div>
				</div>
			</div>
		</section>
	)
}
