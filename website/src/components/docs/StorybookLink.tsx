import { SiStorybook } from '@icons-pack/react-simple-icons'

interface StorybookLinkProps {
	path: string
	label?: string
}

export const StorybookLink = ({
	path,
	label = 'View in Storybook',
}: StorybookLinkProps) => {
	return (
		<div className="mb-6 p-4 border border-orange-200 dark:border-orange-800 rounded-lg bg-orange-50 dark:bg-orange-900/10">
			<a
				href={`https://main--6944355833ad98d1ee729cd0.chromatic.com/?path=/story/${path}`}
				target="_blank"
				rel="noopener noreferrer"
				className="inline-flex items-center gap-2 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium transition-colors"
			>
				<SiStorybook size={18} />
				{label}
			</a>
			<p className="mt-2 text-sm text-gray-600 dark:text-gray-400 mb-0!">
				Explore interactive examples and all component variations in our Storybook.
			</p>
		</div>
	)
}
