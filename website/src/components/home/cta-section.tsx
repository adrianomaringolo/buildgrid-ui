import React from 'react'

export const CTASection: React.FC = () => {
	return (
		<section className="py-20 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 relative overflow-hidden">
			{/* Background effects */}
			<div className="absolute inset-0">
				<div className="absolute top-1/2 left-1/4 w-64 h-64 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
				<div className="absolute top-1/3 right-1/4 w-64 h-64 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-2000"></div>
			</div>

			<div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
				<h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
					Ready to build something amazing?
				</h2>
				<p className="text-xl text-purple-100 mb-8! max-w-2xl mx-auto! text-balance">
					Start using BuildGrid UI to create beautiful, accessible, and performant
					applications.
				</p>

				<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
					<a
						href="/buildgrid-ui/docs/intro"
						className="group relative px-8 py-4 bg-white text-purple-600 font-bold rounded-full hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
					>
						<span className="relative z-10 text-purple-600">Start Building Now</span>
					</a>

					<a
						href="https://github.com/adrianomaringolo/buildgrid-ui"
						target="_blank"
						rel="noopener noreferrer"
						className="px-8 py-4 border-2 border-white text-white! font-semibold rounded-full hover:bg-white hover:text-purple-600! transform hover:scale-105 transition-all duration-300"
					>
						View on GitHub
					</a>
				</div>

				{/* Trust indicators */}
				<div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-purple-100">
					<div className="flex items-center gap-2">
						<span className="text-2xl">⚡</span>
						<span>Lightning Fast</span>
					</div>
					<div className="flex items-center gap-2">
						<span className="text-2xl">🔒</span>
						<span>Type Safe</span>
					</div>
					<div className="flex items-center gap-2">
						<span className="text-2xl">♿</span>
						<span>Accessible</span>
					</div>
					<div className="flex items-center gap-2">
						<span className="text-2xl">🎨</span>
						<span>Customizable</span>
					</div>
				</div>
			</div>
		</section>
	)
}
