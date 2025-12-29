import Link from '@docusaurus/Link'
import React from 'react'
import { LATEST_BLOG_POSTS } from '../../data/blog-posts'

export const BlogSection: React.FC = () => {
	// Get the latest blog posts from generated data
	const latestPosts = LATEST_BLOG_POSTS

	if (latestPosts.length === 0) {
		return null
	}

	const formatDate = (dateString: string) => {
		// Parse date as local date to avoid timezone conversion issues
		// If dateString is in YYYY-MM-DD format, parse it as local date
		let date: Date

		if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
			// For YYYY-MM-DD format, create date without timezone conversion
			const [year, month, day] = dateString.split('-').map(Number)
			date = new Date(year, month - 1, day)
		} else {
			// For other formats, parse normally
			date = new Date(dateString)
		}

		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		})
	}

	return (
		<section className="py-20 bg-gray-50 dark:bg-gray-900/50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
						Latest from our{' '}
						<span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
							Blog
						</span>
					</h2>
					<p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto!">
						Stay updated with the latest news, tutorials, and insights about BuildGrid UI
						and modern React development.
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-8 mb-12">
					{latestPosts.map((post) => (
						<article
							key={post.id}
							className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
						>
							{/* Blog post image */}
							{post.image && (
								<div className="aspect-video overflow-hidden">
									<img
										src={post.image}
										alt={post.title}
										className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
									/>
								</div>
							)}

							<div className="p-6">
								{/* Tags */}
								{post.tags.length > 0 && (
									<div className="flex flex-wrap gap-2 mb-3">
										{post.tags.slice(0, 2).map((tag) => (
											<span
												key={tag}
												className="px-2 py-1 text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full"
											>
												{tag}
											</span>
										))}
									</div>
								)}

								{/* Title */}
								<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
									<Link to={post.permalink} className="no-underline hover:no-underline">
										{post.title}
									</Link>
								</h3>

								{/* Description */}
								{post.description && (
									<p className="text-gray-600 dark:text-gray-300 mb-4! line-clamp-3">
										{post.description}
									</p>
								)}

								{/* Meta info */}
								<div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
									<div className="flex items-center gap-2">
										{post.author.imageURL && (
											<img
												src={post.author.imageURL}
												alt={post.author.name}
												className="w-6 h-6 rounded-full"
											/>
										)}
										<span>{post.author.name}</span>
									</div>
									<time dateTime={post.date}>{formatDate(post.date)}</time>
								</div>
							</div>
						</article>
					))}
				</div>

				{/* View all posts link */}
				<div className="text-center">
					<Link
						to="/blog"
						className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white! font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 hover:scale-105 no-underline hover:no-underline"
					>
						View All Posts
						<svg
							className="w-4 h-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</Link>
				</div>
			</div>
		</section>
	)
}
