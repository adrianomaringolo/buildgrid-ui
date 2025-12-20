import DOMPurify from 'dompurify'
import { useMemo } from 'react'

export interface UseSanitizedHtmlOptions {
	/**
	 * Custom DOMPurify configuration options
	 */
	sanitizeOptions?: DOMPurify.Config
	/**
	 * Whether to allow all HTML tags and attributes (less secure)
	 * @default false
	 */
	allowAll?: boolean
}

const defaultSanitizeOptions: DOMPurify.Config = {
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

		return allowAll
			? DOMPurify.sanitize(htmlContent)
			: DOMPurify.sanitize(htmlContent, sanitizeOptions)
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
	} as DOMPurify.Config,

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
	} as DOMPurify.Config,

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
	} as DOMPurify.Config,

	/**
	 * Comments and user-generated content (very restrictive)
	 */
	comments: {
		ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'a'],
		ALLOWED_ATTR: ['href'],
		FORBID_ATTR: ['style', 'class'],
	} as DOMPurify.Config,
}
