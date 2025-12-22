import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import { cn } from 'buildgrid-ui'
import type { ReactNode } from 'react'

interface ComponentItem {
	name: string
	title: string
	description: string
	category: 'component' | 'block'
	path: string
	tags?: string[]
}

const components: ComponentItem[] = [
	// Components
	{
		name: 'accordion',
		title: 'Accordion',
		description: 'Collapsible content sections with smooth animations',
		category: 'component',
		path: '/docs/components/accordion',
		tags: ['layout', 'navigation'],
	},
	{
		name: 'adaptive-input',
		title: 'Adaptive Input',
		description: 'Smart input that adapts to different data types',
		category: 'component',
		path: '/docs/components/adaptive-input',
		tags: ['form', 'input'],
	},
	{
		name: 'alert',
		title: 'Alert',
		description: 'Display important messages and notifications',
		category: 'component',
		path: '/docs/components/alert',
		tags: ['feedback', 'notification'],
	},
	{
		name: 'alert-dialog',
		title: 'Alert Dialog',
		description: 'Modal dialogs for confirmations and alerts',
		category: 'component',
		path: '/docs/components/alert-dialog',
		tags: ['overlay', 'modal'],
	},
	{
		name: 'autocomplete',
		title: 'Autocomplete',
		description: 'Input with intelligent suggestions and completion',
		category: 'component',
		path: '/docs/components/autocomplete',
		tags: ['form', 'search'],
	},
	{
		name: 'avatar',
		title: 'Avatar',
		description: 'User profile pictures with fallback options',
		category: 'component',
		path: '/docs/components/avatar',
		tags: ['display', 'user'],
	},
	{
		name: 'badge',
		title: 'Badge',
		description: 'Small status indicators and labels',
		category: 'component',
		path: '/docs/components/badge',
		tags: ['display', 'status'],
	},
	{
		name: 'button',
		title: 'Button',
		description: 'Interactive buttons with multiple variants and states',
		category: 'component',
		path: '/docs/components/button',
		tags: ['form', 'action'],
	},
	{
		name: 'calendar',
		title: 'Calendar',
		description: 'Date picker and calendar component',
		category: 'component',
		path: '/docs/components/calendar',
		tags: ['form', 'date'],
	},
	{
		name: 'card',
		title: 'Card',
		description: 'Flexible content containers with header and footer',
		category: 'component',
		path: '/docs/components/card',
		tags: ['layout', 'container'],
	},
	{
		name: 'carousel',
		title: 'Carousel',
		description: 'Image and content slider with navigation',
		category: 'component',
		path: '/docs/components/carousel',
		tags: ['display', 'media'],
	},
	{
		name: 'checkbox',
		title: 'Checkbox',
		description: 'Multi-selection input with indeterminate state',
		category: 'component',
		path: '/docs/components/checkbox',
		tags: ['form', 'selection'],
	},
	{
		name: 'collapsible',
		title: 'Collapsible',
		description: 'Expandable content sections',
		category: 'component',
		path: '/docs/components/collapsible',
		tags: ['layout', 'navigation'],
	},
	{
		name: 'command',
		title: 'Command',
		description: 'Command palette for quick actions and navigation',
		category: 'component',
		path: '/docs/components/command',
		tags: ['navigation', 'search'],
	},
	{
		name: 'currency-input',
		title: 'Currency Input',
		description: 'Formatted input for monetary values',
		category: 'component',
		path: '/docs/components/currency-input',
		tags: ['form', 'number'],
	},
	{
		name: 'dialog',
		title: 'Dialog',
		description: 'Modal dialogs and overlays',
		category: 'component',
		path: '/docs/components/dialog',
		tags: ['overlay', 'modal'],
	},
	{
		name: 'dropdown-menu',
		title: 'Dropdown Menu',
		description: 'Contextual menus and action lists',
		category: 'component',
		path: '/docs/components/dropdown-menu',
		tags: ['navigation', 'menu'],
	},
	{
		name: 'html-text-area',
		title: 'HTML Text Area',
		description: 'Rich text area with HTML support',
		category: 'component',
		path: '/docs/components/html-text-area',
		tags: ['form', 'editor'],
	},
	{
		name: 'input',
		title: 'Input',
		description: 'Text input fields with multiple sizes and types',
		category: 'component',
		path: '/docs/components/input',
		tags: ['form', 'text'],
	},
	{
		name: 'label',
		title: 'Label',
		description: 'Form labels with accessibility features',
		category: 'component',
		path: '/docs/components/label',
		tags: ['form', 'accessibility'],
	},
	{
		name: 'multi-select',
		title: 'Multi Select',
		description: 'Multiple selection dropdown with search',
		category: 'component',
		path: '/docs/components/multi-select',
		tags: ['form', 'selection'],
	},
	{
		name: 'navigation-menu',
		title: 'Navigation Menu',
		description: 'Hierarchical navigation with dropdowns',
		category: 'component',
		path: '/docs/components/navigation-menu',
		tags: ['navigation', 'menu'],
	},
	{
		name: 'number-stepper',
		title: 'Number Stepper',
		description: 'Numeric input with increment/decrement controls',
		category: 'component',
		path: '/docs/components/number-stepper',
		tags: ['form', 'number'],
	},
	{
		name: 'pagination',
		title: 'Pagination',
		description: 'Page navigation for large datasets',
		category: 'component',
		path: '/docs/components/pagination',
		tags: ['navigation', 'data'],
	},
	{
		name: 'password-input',
		title: 'Password Input',
		description: 'Secure password input with visibility toggle',
		category: 'component',
		path: '/docs/components/password-input',
		tags: ['form', 'security'],
	},
	{
		name: 'popover',
		title: 'Popover',
		description: 'Floating content containers',
		category: 'component',
		path: '/docs/components/popover',
		tags: ['overlay', 'tooltip'],
	},
	{
		name: 'progress',
		title: 'Progress',
		description: 'Progress bars and loading indicators',
		category: 'component',
		path: '/docs/components/progress',
		tags: ['feedback', 'loading'],
	},
	{
		name: 'radio-group',
		title: 'Radio Group',
		description: 'Single selection from multiple options',
		category: 'component',
		path: '/docs/components/radio-group',
		tags: ['form', 'selection'],
	},
	{
		name: 'search-bar',
		title: 'Search Bar',
		description: 'Enhanced search input with suggestions',
		category: 'component',
		path: '/docs/components/search-bar',
		tags: ['form', 'search'],
	},
	{
		name: 'select',
		title: 'Select',
		description: 'Dropdown selection with search and grouping',
		category: 'component',
		path: '/docs/components/select',
		tags: ['form', 'selection'],
	},
	{
		name: 'separator',
		title: 'Separator',
		description: 'Visual dividers for content sections',
		category: 'component',
		path: '/docs/components/separator',
		tags: ['layout', 'divider'],
	},
	{
		name: 'sheet',
		title: 'Sheet',
		description: 'Slide-out panels and drawers',
		category: 'component',
		path: '/docs/components/sheet',
		tags: ['overlay', 'panel'],
	},
	{
		name: 'skeleton',
		title: 'Skeleton',
		description: 'Loading placeholders for content',
		category: 'component',
		path: '/docs/components/skeleton',
		tags: ['loading', 'placeholder'],
	},
	{
		name: 'slider',
		title: 'Slider',
		description: 'Range input for numeric values',
		category: 'component',
		path: '/docs/components/slider',
		tags: ['form', 'range'],
	},
	{
		name: 'spinner',
		title: 'Spinner',
		description: 'Loading spinners and activity indicators',
		category: 'component',
		path: '/docs/components/spinner',
		tags: ['loading', 'feedback'],
	},
	{
		name: 'switch',
		title: 'Switch',
		description: 'Toggle switches for boolean values',
		category: 'component',
		path: '/docs/components/switch',
		tags: ['form', 'toggle'],
	},
	{
		name: 'table',
		title: 'Table',
		description: 'Data tables with sorting and styling',
		category: 'component',
		path: '/docs/components/table',
		tags: ['data', 'display'],
	},
	{
		name: 'tabs',
		title: 'Tabs',
		description: 'Tabbed content navigation',
		category: 'component',
		path: '/docs/components/tabs',
		tags: ['navigation', 'layout'],
	},
	{
		name: 'tag-input',
		title: 'Tag Input',
		description: 'Input for creating and managing tags',
		category: 'component',
		path: '/docs/components/tag-input',
		tags: ['form', 'tags'],
	},
	{
		name: 'textarea',
		title: 'Textarea',
		description: 'Multi-line text input with auto-resize',
		category: 'component',
		path: '/docs/components/textarea',
		tags: ['form', 'text'],
	},
	{
		name: 'toaster',
		title: 'Toaster',
		description: 'Toast notifications and alerts',
		category: 'component',
		path: '/docs/components/toaster',
		tags: ['feedback', 'notification'],
	},
	{
		name: 'toggle',
		title: 'Toggle',
		description: 'Toggle buttons for state changes',
		category: 'component',
		path: '/docs/components/toggle',
		tags: ['form', 'toggle'],
	},
	{
		name: 'toggle-group',
		title: 'Toggle Group',
		description: 'Grouped toggle buttons for multiple selections',
		category: 'component',
		path: '/docs/components/toggle-group',
		tags: ['form', 'selection'],
	},
	{
		name: 'tooltip',
		title: 'Tooltip',
		description: 'Contextual help and information overlays',
		category: 'component',
		path: '/docs/components/tooltip',
		tags: ['overlay', 'help'],
	},

	// Blocks
	{
		name: 'bento-grid',
		title: 'Bento Grid',
		description: 'Flexible masonry-style grid layout system',
		category: 'block',
		path: '/docs/blocks/bento-grid',
		tags: ['layout', 'grid'],
	},
	{
		name: 'data-table',
		title: 'Data Table',
		description: 'Advanced table with sorting, filtering, and pagination',
		category: 'block',
		path: '/docs/blocks/data-table',
		tags: ['data', 'table'],
	},
	{
		name: 'empty-message',
		title: 'Empty Message',
		description: 'Elegant empty state component with actions',
		category: 'block',
		path: '/docs/blocks/empty-message',
		tags: ['feedback', 'state'],
	},
	{
		name: 'file-upload-dropzone',
		title: 'File Upload Dropzone',
		description: 'Drag-and-drop file upload with progress tracking',
		category: 'block',
		path: '/docs/blocks/file-upload-dropzone',
		tags: ['form', 'upload'],
	},
	{
		name: 'help-carousel',
		title: 'Help Carousel',
		description: 'Interactive tutorial and help carousel',
		category: 'block',
		path: '/docs/blocks/help-carousel',
		tags: ['help', 'tutorial'],
	},
	{
		name: 'html-text-editor',
		title: 'HTML Text Editor',
		description: 'Rich text editor with formatting toolbar',
		category: 'block',
		path: '/docs/blocks/html-text-editor',
		tags: ['editor', 'rich-text'],
	},
	{
		name: 'lazy-image-gallery',
		title: 'Lazy Image Gallery',
		description: 'Performance-optimized image gallery with lazy loading',
		category: 'block',
		path: '/docs/blocks/lazy-image-gallery',
		tags: ['media', 'gallery'],
	},
	{
		name: 'month-navigator',
		title: 'Month Navigator',
		description: 'Calendar navigation for month-based data',
		category: 'block',
		path: '/docs/blocks/month-navigator',
		tags: ['calendar', 'navigation'],
	},
	{
		name: 'navigable-list',
		title: 'Navigable List',
		description: 'Keyboard-navigable list with selection',
		category: 'block',
		path: '/docs/blocks/navigable-list',
		tags: ['navigation', 'list'],
	},
	{
		name: 'paginated-items',
		title: 'Paginated Items',
		description: 'Pagination wrapper for any content type',
		category: 'block',
		path: '/docs/blocks/paginated-items',
		tags: ['pagination', 'data'],
	},
	{
		name: 'pagination-controls',
		title: 'Pagination Controls',
		description: 'Customizable pagination interface',
		category: 'block',
		path: '/docs/blocks/pagination-controls',
		tags: ['pagination', 'navigation'],
	},
	{
		name: 'sidebar',
		title: 'Sidebar',
		description: 'Flexible sidebar with multiple directions and states',
		category: 'block',
		path: '/docs/blocks/sidebar',
		tags: ['layout', 'navigation'],
	},
]

const ComponentCard = ({ component }: { component: ComponentItem }) => {
	const isBlock = component.category === 'block'

	return (
		<a
			href={component.path}
			className={cn(
				'group block p-6 rounded-lg border transition-all duration-200 hover:shadow-lg hover:scale-[1.02] no-underline',
				'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700',
				'hover:border-purple-300 dark:hover:border-purple-600',
				isBlock && 'ring-2 ring-purple-100 dark:ring-purple-900',
			)}
		>
			<div className="flex items-start justify-between mb-3">
				<div className="flex items-center gap-2">
					<h3
						className={cn(
							'text-lg font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors',
							'mb-0',
						)}
					>
						{component.title}
					</h3>
					<span
						className={cn(
							'px-2 py-1 text-xs font-medium rounded-full',
							isBlock
								? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
								: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
						)}
					>
						{isBlock ? 'Block' : 'Component'}
					</span>
				</div>
			</div>

			<p className="text-gray-600 dark:text-gray-300 text-sm mb-3 leading-relaxed">
				{component.description}
			</p>

			{component.tags && (
				<div className="flex flex-wrap gap-1">
					{component.tags.map((tag) => (
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

export default function ComponentsGrid(): ReactNode {
	const { siteConfig } = useDocusaurusContext()

	const componentItems = components.filter((c) => c.category === 'component')
	const blockItems = components.filter((c) => c.category === 'block')

	return (
		<Layout
			title="Components & Blocks"
			description="Explore all BuildGrid UI components and blocks - from basic UI elements to complex composed components for modern React applications."
		>
			<main className="container mx-auto px-4 py-12">
				{/* Header */}
				<div className="text-center mb-12">
					<h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-purple-700 to-blue-700 dark:from-white dark:via-purple-200 dark:to-purple-400 bg-clip-text text-transparent mb-4">
						Components & Blocks
					</h1>
					<p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
						Explore our comprehensive collection of {components.length} React components
						and blocks. From basic UI elements to complex composed components for modern
						applications.
					</p>
				</div>

				{/* Stats */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
					<div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
						<div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
							{componentItems.length}
						</div>
						<div className="text-sm text-blue-700 dark:text-blue-300 font-medium">
							Components
						</div>
						<div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
							Basic UI elements
						</div>
					</div>

					<div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
						<div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
							{blockItems.length}
						</div>
						<div className="text-sm text-purple-700 dark:text-purple-300 font-medium">
							Blocks
						</div>
						<div className="text-xs text-purple-600 dark:text-purple-400 mt-1">
							Complex components
						</div>
					</div>

					<div className="text-center p-6 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg border border-green-200 dark:border-green-800">
						<div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
							{components.length}
						</div>
						<div className="text-sm text-green-700 dark:text-green-300 font-medium">
							Total
						</div>
						<div className="text-xs text-green-600 dark:text-green-400 mt-1">
							Ready to use
						</div>
					</div>
				</div>

				{/* Components Section */}
				<section className="mb-16">
					<div className="flex items-center gap-3 mb-8">
						<h2 className="text-3xl font-bold text-gray-900 dark:text-white">
							Components
						</h2>
						<span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-full">
							{componentItems.length} items
						</span>
					</div>
					<p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
						Basic UI elements that form the foundation of your application. These
						components are designed to be flexible, accessible, and easy to customize.
					</p>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{componentItems.map((component) => (
							<ComponentCard key={component.name} component={component} />
						))}
					</div>
				</section>

				{/* Blocks Section */}
				<section>
					<div className="flex items-center gap-3 mb-8">
						<h2 className="text-3xl font-bold text-gray-900 dark:text-white">Blocks</h2>
						<span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-sm font-medium rounded-full">
							{blockItems.length} items
						</span>
					</div>
					<p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
						Complex, composed components that solve specific use cases. These blocks
						combine multiple components to provide advanced functionality out of the box.
					</p>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{blockItems.map((component) => (
							<ComponentCard key={component.name} component={component} />
						))}
					</div>
				</section>

				{/* Footer CTA */}
				<div className="mt-16 text-center p-8 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
					<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
						Ready to get started?
					</h3>
					<p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
						Install BuildGrid UI and start building beautiful, accessible React
						applications with our comprehensive component library.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<a
							href="/buildgrid-ui/docs/intro"
							className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors no-underline hover:no-underline"
						>
							Get Started
						</a>
						<a
							href="https://www.npmjs.com/package/buildgrid-ui"
							target="_blank"
							rel="noopener noreferrer"
							className="px-6 py-3 border border-purple-600 text-purple-600 dark:text-purple-400 font-semibold rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors no-underline hover:no-underline"
						>
							View on NPM
						</a>
					</div>
				</div>
			</main>
		</Layout>
	)
}
