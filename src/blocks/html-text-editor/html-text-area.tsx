import { sanitizePresets, useSanitizedHtml } from '../../lib/hooks/use-sanitized-html'
import './unreset.css'

export interface HtmlTextAreaProps {
	children: string
	/**
	 * Predefined sanitization preset
	 * @default 'full'
	 */
	preset?: 'basic' | 'rich' | 'full' | 'comments'
	/**
	 * Custom DOMPurify configuration options (overrides preset)
	 */
	sanitizeOptions?: import('dompurify').Config
	/**
	 * Whether to allow all HTML tags and attributes (less secure)
	 * @default false
	 */
	allowAll?: boolean
	/**
	 * Additional CSS classes for the container
	 */
	className?: string
}

export const HtmlTextArea = ({
	children,
	preset = 'full',
	sanitizeOptions,
	allowAll = false,
	className = '',
}: HtmlTextAreaProps) => {
	// Use the preset if no custom sanitizeOptions provided
	const finalSanitizeOptions = sanitizeOptions || sanitizePresets[preset]

	// Use the hook to sanitize HTML content
	const sanitizedHtml = useSanitizedHtml(children, {
		sanitizeOptions: finalSanitizeOptions,
		allowAll,
	})

	return (
		<div
			className={`unreset ${className}`}
			dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
		/>
	)
}
