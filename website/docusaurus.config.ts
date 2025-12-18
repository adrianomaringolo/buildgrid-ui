import type * as Preset from '@docusaurus/preset-classic'
import type { Config } from '@docusaurus/types'
import { themes as prismThemes } from 'prism-react-renderer'

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
	title: 'BuidgridUI',
	tagline: '',
	favicon: 'img/favicon.ico',

	// Set the production url of your site here
	url: 'https://adrianomaringolo.github.io',
	// Set the /<baseUrl>/ pathname under which your site is served
	// For GitHub pages deployment, it is often '/<projectName>/'
	baseUrl: '/buildgrid-ui/',

	// GitHub pages deployment config.
	// If you aren't using GitHub pages, you don't need these.
	organizationName: 'adrianomaringolo', // Usually your GitHub org/user name.
	projectName: 'buildgrid-ui', // Usually your repo name.

	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',

	plugins: [
		async function myPlugin(context, options) {
			return {
				name: 'docusaurus-tailwindcss',
				configurePostCss(postcssOptions) {
					// Appends TailwindCSS and AutoPrefixer.
					postcssOptions.plugins.push(require('@tailwindcss/postcss'))
					postcssOptions.plugins.push(require('autoprefixer'))
					return postcssOptions
				},
			}
		},
	],

	// Even if you don't use internationalization, you can use this field to set
	// useful metadata like html lang. For example, if your site is Chinese, you
	// may want to replace "en" with "zh-Hans".
	i18n: {
		defaultLocale: 'en',
		locales: ['en'],
	},

	presets: [
		[
			'classic',
			{
				docs: {
					sidebarPath: './sidebars.ts',
					// Edit URL for documentation
					editUrl: 'https://github.com/adrianomaringolo/buildgrid-ui/tree/main/website/',
				},
				blog: {
					showReadingTime: true,
					feedOptions: {
						type: ['rss', 'atom'],
						xslt: true,
					},
					// Edit URL for blog posts
					editUrl: 'https://github.com/adrianomaringolo/buildgrid-ui/tree/main/website/',
					// Useful options to enforce blogging best practices
					onInlineTags: 'warn',
					onInlineAuthors: 'warn',
					onUntruncatedBlogPosts: 'warn',
				},
				theme: {
					customCss: ['./src/css/custom.css', './src/css/reset.css'],
				},
			} satisfies Preset.Options,
		],
	],

	themes: [
		// ... Your other themes.
		[
			require.resolve('@easyops-cn/docusaurus-search-local'),
			/** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
			{
				// ... Your options.
				// `hashed` is recommended as long-term-cache of index file is possible.
				hashed: true,

				// For Docs using Chinese, it is recomended to set:
				// language: ["en", "zh"],

				// Customize the keyboard shortcut to focus search bar (default is "mod+k"):
				// searchBarShortcutKeymap: "s", // Use 'S' key
				// searchBarShortcutKeymap: "ctrl+shift+f", // Use Ctrl+Shift+F

				// If you're using `noIndex: true`, set `forceIgnoreNoIndex` to enable local index:
				// forceIgnoreNoIndex: true,
			},
		],
	],

	themeConfig: {
		// Replace with your project's social card
		image: 'img/docusaurus-social-card.jpg',
		colorMode: {
			defaultMode: 'dark',
			disableSwitch: false,
			respectPrefersColorScheme: true,
		},
		navbar: {
			title: 'BuildgridUI',
			logo: {
				alt: 'BuildgridUI Logo',
				src: 'img/buildgrid-ui-logo.png',
			},
			items: [
				{
					type: 'docSidebar',
					sidebarId: 'tutorialSidebar',
					position: 'left',
					label: 'Documentation',
				},
				{ to: '/blog', label: 'Blog', position: 'left' },
				{ to: '/storybook', label: 'Storybook', position: 'left' },
				{
					hreel: 'GitHub',
					position: 'right',
				},
			],
		},
		footer: {
			style: 'dark',
			links: [
				{
					title: 'Docs',
					items: [
						{
							label: 'Tutorial',
							to: '/docs/intro',
						},
					],
				},
				{
					title: 'Community',
					items: [
						{
							label: 'Issues',
							href: 'https://github.com/adrianomaringolo/buildgrid-ui/issues',
						},
						{
							label: 'Discussions',
							href: 'https://github.com/adrianomaringolo/buildgrid-ui/discussions',
						},
						{
							label: 'Contributing',
							href: 'https://github.com/adrianomaringolo/buildgrid-ui/blob/main/CONTRIBUTING.md',
						},
					],
				},
				{
					title: 'More',
					items: [
						{
							label: 'Blog',
							to: '/blog',
						},
						{
							label: 'GitHub',
							href: 'https://github.com/adrianomaringolo/buildgrid-ui',
						},
					],
				},
			],
			copyright: `${new Date().getFullYear()} | Made with ❤️ by <a href="https://adrianomaringolo.dev">adrianomaringolo.dev</a>. Built with Docusaurus.`,
		},
		prism: {
			theme: prismThemes.github,
			darkTheme: prismThemes.dracula,
		},
	} satisfies Preset.ThemeConfig,
}

export default config
