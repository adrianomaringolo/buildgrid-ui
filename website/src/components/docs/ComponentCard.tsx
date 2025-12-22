import { cn } from 'buildgrid-ui'
import React from 'react'

interface ComponentCardProps {
	title: string
	description: string
	href: string
	tags?: string[]
	className?: string
}

export const ComponentCard: React.FC<ComponentCardProps> = ({
	title,
	description,
	href,
	tags = [],
	className,
}) => {
	return (
		<a
			href={href}
			className={cn(
				'group block p-4 rounded-lg border transition-all duration-200 hover:shadow-md hover:scale-[1.02] no-underline',
				'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700',
				'hover:border-blue-300 dark:hover:border-blue-600',
				className,
			)}
		>
			<div className="mb-2">
				<h4
					className={cn(
						'text-base font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors',
						'mb-0',
					)}
				>
					{title}
				</h4>
			</div>

			<p className="text-gray-600 dark:text-gray-300 text-sm mb-3 leading-relaxed">
				{description}
			</p>

			{tags.length > 0 && (
				<div className="flex flex-wrap gap-1">
					{tags.map((tag) => (
						<span
							key={tag}
							className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded"
						>
							{tag}
						</span>
					))}
				</div>
			)}
		</a>
	)
}
