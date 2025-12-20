// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { HtmlTextArea } from './html-text-area'

const meta: Meta<typeof HtmlTextArea> = {
	component: HtmlTextArea,
	title: 'Blocks/HtmlTextArea',
	parameters: {
		status: {
			type: 'stable', // Updated to stable since it now has security features
		},
	},
	argTypes: {
		preset: {
			control: 'select',
			options: ['basic', 'rich', 'full', 'comments'],
			description: 'Predefined sanitization preset',
		},
		allowAll: {
			control: 'boolean',
			description: 'Whether to allow all HTML tags and attributes (less secure)',
		},
		className: {
			control: 'text',
			description: 'Additional CSS classes for the container',
		},
	},
}

export default meta
type Story = StoryObj<typeof HtmlTextArea>

const basicContent = `
<h2>Welcome to Our Platform</h2>
<p>This is a <strong>bold</strong> statement with <em>emphasis</em>.</p>
<ul>
	<li>Feature one</li>
	<li>Feature two</li>
	<li>Feature three</li>
</ul>
`

const richContent = `
<h1>Article Title</h1>
<p>This is a lead paragraph that introduces the main topic.</p>

<h2>Section Heading</h2>
<p>Regular paragraph with <a href="#" onclick="return false;">links</a>, 
<strong>bold text</strong>, <em>italic text</em>, and 
<code>inline code</code>.</p>

<blockquote>
	<p>"This is an inspiring quote that adds value to the content."</p>
	<footer>— Author Name</footer>
</blockquote>

<h3>Lists and More</h3>
<ol>
	<li>First ordered item</li>
	<li>Second ordered item with <strong>emphasis</strong></li>
	<li>Third item</li>
</ol>

<table>
	<thead>
		<tr>
			<th>Feature</th>
			<th>Status</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Security</td>
			<td>✅ Enabled</td>
		</tr>
		<tr>
			<td>Performance</td>
			<td>✅ Optimized</td>
		</tr>
	</tbody>
</table>
`

const maliciousContent = `
<h3>Test Content with Potential XSS</h3>
<p>This content contains <strong>safe formatting</strong> and potentially dangerous elements:</p>
<script>alert('XSS attempt - this should be removed')</script>
<img src="x" onerror="alert('XSS via onerror - this should be sanitized')" alt="Test image" />
<a href="javascript:alert('XSS via javascript URL')">Malicious link (should be sanitized)</a>
<div onclick="alert('XSS via onclick')">Clickable div (onclick should be removed)</div>
<p>Only the safe content above should remain after sanitization.</p>
`

export const Default: Story = {
	render: (args) => (
		<div className="h-96 border rounded p-4">
			<HtmlTextArea {...args}>{basicContent}</HtmlTextArea>
		</div>
	),
	args: {
		preset: 'full',
	},
}

export const BasicPreset: Story = {
	render: (args) => (
		<div className="space-y-4">
			<div className="text-sm text-gray-600 bg-blue-50 p-3 rounded">
				<strong>Basic Preset:</strong> Only allows basic text formatting (p, br, strong,
				em, u, i, b)
			</div>
			<div className="border rounded p-4">
				<HtmlTextArea {...args}>{richContent}</HtmlTextArea>
			</div>
		</div>
	),
	args: {
		preset: 'basic',
	},
}

export const RichPreset: Story = {
	render: (args) => (
		<div className="space-y-4">
			<div className="text-sm text-gray-600 bg-purple-50 p-3 rounded">
				<strong>Rich Preset:</strong> Allows rich text with headings, lists, and
				blockquotes
			</div>
			<div className="border rounded p-4">
				<HtmlTextArea {...args}>{richContent}</HtmlTextArea>
			</div>
		</div>
	),
	args: {
		preset: 'rich',
	},
}

export const FullPreset: Story = {
	render: (args) => (
		<div className="space-y-4">
			<div className="text-sm text-gray-600 bg-orange-50 p-3 rounded">
				<strong>Full Preset:</strong> Supports full content including links, code, tables,
				and media
			</div>
			<div className="border rounded p-4">
				<HtmlTextArea {...args}>{richContent}</HtmlTextArea>
			</div>
		</div>
	),
	args: {
		preset: 'full',
	},
}

export const CommentsPreset: Story = {
	render: (args) => (
		<div className="space-y-4">
			<div className="text-sm text-gray-600 bg-green-50 p-3 rounded">
				<strong>Comments Preset:</strong> Most restrictive - only p, br, strong, em, and
				safe links
			</div>
			<div className="border rounded p-4">
				<HtmlTextArea {...args}>{richContent}</HtmlTextArea>
			</div>
		</div>
	),
	args: {
		preset: 'comments',
	},
}

export const SecurityDemo: Story = {
	render: (args) => (
		<div className="space-y-4">
			<div className="text-sm text-red-600 bg-red-50 p-3 rounded border border-red-200">
				<strong>Security Demo:</strong> The content below contains malicious scripts and
				event handlers. Notice how DOMPurify automatically removes dangerous elements
				while preserving safe content.
			</div>
			<div className="border rounded p-4">
				<HtmlTextArea {...args}>{maliciousContent}</HtmlTextArea>
			</div>
			<details className="text-sm">
				<summary className="cursor-pointer font-medium">
					View original unsafe content
				</summary>
				<pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-x-auto">
					{maliciousContent}
				</pre>
			</details>
		</div>
	),
	args: {
		preset: 'full',
	},
}

export const CustomSanitization: Story = {
	render: (args) => (
		<div className="space-y-4">
			<div className="text-sm text-gray-600 bg-yellow-50 p-3 rounded">
				<strong>Custom Sanitization:</strong> Using custom DOMPurify options to allow only
				specific tags
			</div>
			<div className="border rounded p-4">
				<HtmlTextArea {...args}>{richContent}</HtmlTextArea>
			</div>
		</div>
	),
	args: {
		sanitizeOptions: {
			ALLOWED_TAGS: ['h1', 'h2', 'h3', 'p', 'strong', 'em', 'ul', 'ol', 'li'],
			ALLOWED_ATTR: ['class'],
		},
	},
}

export const EmailTemplate: Story = {
	render: (args) => (
		<div className="space-y-4">
			<div className="text-sm text-gray-600 bg-blue-50 p-3 rounded">
				<strong>Email Template:</strong> Perfect for previewing HTML email content
			</div>
			<div className="border rounded p-4 bg-gray-50">
				<HtmlTextArea {...args}>
					{`
					<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
						<header style="background: #f8f9fa; padding: 20px; text-align: center;">
							<h1 style="color: #333; margin: 0;">Welcome to Our Service!</h1>
						</header>
						
						<main style="padding: 20px;">
							<p>Dear <strong>John Doe</strong>,</p>
							
							<p>Thank you for joining our platform. We're excited to have you on board!</p>
							
							<div style="background: #e3f2fd; padding: 15px; border-radius: 5px; margin: 20px 0;">
								<h3 style="margin-top: 0; color: #1976d2;">Getting Started</h3>
								<ul style="margin-bottom: 0;">
									<li>Complete your profile</li>
									<li>Explore our features</li>
									<li>Connect with other users</li>
								</ul>
							</div>
							
							<p>Best regards,<br><strong>The Team</strong></p>
						</main>
						
						<footer style="background: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; color: #666;">
							<p>© 2024 Our Company. All rights reserved.</p>
						</footer>
					</div>
					`}
				</HtmlTextArea>
			</div>
		</div>
	),
	args: {
		preset: 'full',
	},
}
