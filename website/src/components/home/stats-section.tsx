const stats = [
	{
		title: 'Components',
		value: '41',
		subtitle: 'ready to use',
	},
	{
		title: 'Blocks',
		value: '13',
		subtitle: 'complex layouts',
	},
	{
		title: 'Utilities',
		value: '18',
		subtitle: 'hooks & formatters',
	},
]

export const StatsSection = () => {
	return (
		<section className="py-20 bg-gradient-to-r from-purple-100 via-blue-100 to-purple-100 dark:from-purple-900 dark:via-blue-900 dark:to-purple-900 relative overflow-hidden">
			{/* Animated background */}
			<div className="absolute inset-0">
				<div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-20 animate-pulse"></div>
				<div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-20 animate-pulse animation-delay-2000"></div>
			</div>

			<div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
						BuildgridUI in numbers
					</h2>
					<p className="text-xl text-purple-700 dark:text-purple-200 max-w-2xl mx-auto! text-balance">
						See how many items you can add to your project and start building your UI with
						confidence.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
					{stats.map((stat, index) => (
						<div
							key={stat.title}
							className="group relative bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-gray-200 dark:border-white/20 rounded-2xl p-8 text-center hover:bg-white dark:hover:bg-white/20 transition-all duration-500 hover:scale-105 shadow-lg dark:shadow-none"
						>
							{/* Glow effect on hover */}
							<div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>

							<div className="relative z-10">
								<div className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-200 transition-colors duration-300">
									{stat.value}
								</div>
								<div className="text-xl font-semibold text-purple-700 dark:text-purple-200 mb-1">
									{stat.title}
								</div>
								<div className="text-sm text-gray-600 dark:text-purple-300">
									{stat.subtitle}
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Development notice */}
				<div className="text-center">
					<div className="inline-flex items-center gap-2 px-6 py-3 bg-white/60 dark:bg-white/10 backdrop-blur-sm border border-purple-200 dark:border-purple-700 rounded-full">
						<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
						<p className="text-sm font-medium text-purple-800 dark:text-purple-200">
							🚀 Library in active development - these numbers are growing!
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}
