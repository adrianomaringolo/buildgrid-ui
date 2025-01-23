const stats = [
	{
		title: 'Components',
		value: '30',
		subtitle: 'and growing',
	},
	{
		title: 'Blocks',
		value: '4',
		subtitle: 'and growing',
	},
	{
		title: 'Utilities',
		value: '10',
		subtitle: 'hooks, formmaters and more',
	},
]

export const StatsSection = () => {
	return (
		<section className="mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8 light:bg-gray-100 dark:bg-gray-600">
			<div className="mx-auto max-w-3xl text-center">
				<h2 className="text-3xl font-bold light:text-gray-900 dark:text-white sm:text-4xl">
					BuildgridUI in numbers
				</h2>

				<p className="mt-4 text-gray-500 dark:text-gray-200 sm:text-xl">
					See how many items you can add to your project and start build your UI.
				</p>
			</div>

			<dl className="mg-6 grid grid-cols-1 gap-4 divide-y divide-gray-200 sm:mt-8 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-3">
				{stats.map((stat) => (
					<div key={stat.title} className="flex flex-col px-4 py-8 text-center">
						<dt className="order-last text-lg font-medium text-gray-500 dark:text-gray-200">
							{stat.title}
							<span className="text-sm block text-gray-400">{stat.subtitle}</span>
						</dt>

						<dd className="text-4xl font-extrabold text-primary md:text-5xl">
							{stat.value}
						</dd>
					</div>
				))}
			</dl>
		</section>
	)
}
