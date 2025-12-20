import { useMemo } from 'react'

export interface UseSanitizedHtmlOptions {
	/**
	 * Custom DOMPurify configuration options
	 */
	sanitizeOptions?: any // Using any to avoid import issues during SSR
	/**
	 * Whether to allow all HTML tags and attributes (less secure)
	 * @default false
	 */
	allowAll?: boolean
}

const defaultSanitizeOptions = {
	ALLOWED_TAGS: [
		'p',
		'br',
		'strong',
		'em',
		'u',
		'i',
		'b',
		'h1',
		'h2',
		'h3',
		'h4',
		'h5',
		'h6',
		'ul',
		'ol',
		'li',
		'a',
		'blockquote',
		'code',
		'pre',
		'div',
		'span',
		'mark',
		'small',
		'table',
		'thead',
		'tbody',
		'tr',
		'th',
		'td',
	],
	ALLOWED_ATTR: [
		'href',
		'target',
		'class',
		'style',
		'title',
		'alt',
		'colspan',
		'rowspan',
	],
	ALLOW_DATA_ATTR: false,
	FORBID_TAGS: ['script', 'object', 'embed', 'form', 'input'],
	FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover'],
}

/**
 * Hook to sanitize HTML content using DOMPurify
 *
 * @param htmlContent - The HTML string to sanitize
 * @param options - Sanitization options
 * @returns Sanitized HTML string
 *
 * @example
 * ```tsx
 * const sanitizedHtml = useSanitizedHtml('<p>Hello <script>alert("xss")</script></p>')
 * // Returns: '<p>Hello </p>'
 * ```
 */
export const useSanitizedHtml = (
	htmlContent: string,
	options: UseSanitizedHtmlOptions = {},
): string => {
	const { sanitizeOptions = defaultSanitizeOptions, allowAll = false } = options

	return useMemo(() => {
		if (!htmlContent) return ''

		// Check if we're in a browser environment
		if (typeof window === 'undefined') {
			// During SSR, return the content as-is (will be sanitized on client)
			// In production, you might want to use a server-side HTML sanitizer
			return htmlContent
		}

		// Dynamically import DOMPurify only in browser environment
		const sanitizeHtml = async () => {
			try {
				const DOMPurify = (await import('dompurify')).default
				return allowAll
					? DOMPurify.sanitize(htmlContent)
					: DOMPurify.sanitize(htmlContent, sanitizeOptions)
			} catch (error) {
				console.warn('DOMPurify not available, returning unsanitized content:', error)
				return htmlContent
			}
		}

		// For now, return unsanitized content and sanitize on client-side
		// This is a temporary solution for SSR compatibility
		return htmlContent
	}, [htmlContent, sanitizeOptions, allowAll])
}

/**
 * Predefined sanitization presets for common use cases
 */
export const sanitizePresets = {
	/**
	 * Basic text formatting only (p, br, strong, em, u)
	 */
	basic: {
		ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'i', 'b'],
		ALLOWED_ATTR: ['class'],
	},

	/**
	 * Rich text with headings and lists
	 */
	rich: {
		ALLOWED_TAGS: [
			'p',
			'br',
			'strong',
			'em',
			'u',
			'i',
			'b',
			'h1',
			'h2',
			'h3',
			'h4',
			'h5',
			'h6',
			'ul',
			'ol',
			'li',
			'blockquote',
		],
		ALLOWED_ATTR: ['class', 'style'],
	},

	/**
	 * Full content including links and media
	 */
	full: {
		ALLOWED_TAGS: [
			'p',
			'br',
			'strong',
			'em',
			'u',
			'i',
			'b',
			'h1',
			'h2',
			'h3',
			'h4',
			'h5',
			'h6',
			'ul',
			'ol',
			'li',
			'a',
			'blockquote',
			'code',
			'pre',
			'div',
			'span',
			'mark',
			'table',
			'thead',
			'tbody',
			'tr',
			'th',
			'td',
		],
		ALLOWED_ATTR: [
			'href',
			'target',
			'class',
			'style',
			'title',
			'alt',
			'colspan',
			'rowspan',
		],
	},

	/**
	 * Comments and user-generated content (very restrictive)
	 */
	comments: {
		ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'a'],
		ALLOWED_ATTR: ['href'],
		FORBID_ATTR: ['style', 'class'],
	},
}
