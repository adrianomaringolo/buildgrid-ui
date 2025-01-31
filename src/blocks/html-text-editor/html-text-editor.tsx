import { cn } from '@/lib/utils'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'
import parserHtml from 'prettier/plugins/html'
import prettier from 'prettier/standalone'
import React, { useEffect, useRef, useState } from 'react'
import { OptionsBar } from './options-bar'
import './unreset.css'

interface TextEditorProps {
	initialValue?: string
	onChange?: (value: string) => void
}

export const HtmlTextEditor: React.FC<TextEditorProps> = ({
	initialValue = '',
	onChange,
}) => {
	const editorRef = useRef<HTMLDivElement>(null)
	const editorHtmlRef = useRef<HTMLDivElement>(null)
	const [showHtml, setShowHtml] = useState(false)
	const [htmlContent, setHtmlContent] = useState(initialValue)
	const [formattedHtml, setFormattedHtml] = useState('')

	useEffect(() => {
		const observer = new MutationObserver(() => {
			onChange?.(editorRef.current ? editorRef.current.innerHTML : '')
		})

		if (editorRef.current) {
			observer.observe(editorRef.current, { childList: true })
		}
	}, [])

	useEffect(() => {
		if (showHtml) {
			try {
				prettier
					.format(htmlContent || '', { parser: 'html', plugins: [parserHtml] })
					.then((formatted) => {
						setFormattedHtml(hljs.highlight(formatted, { language: 'xml' }).value)
					})
			} catch (error) {
				console.error('Formatting error:', error)
			}
		}
	}, [showHtml, htmlContent])

	useEffect(() => {
		if (editorRef.current) {
			editorRef.current.innerHTML = initialValue
		}
	}, [initialValue])

	const handleInput = () => {
		if (editorRef.current) {
			setHtmlContent(editorRef.current.innerHTML)
			onChange?.(editorRef.current.innerHTML)
		}
	}

	const execCommand = (command: string, value?: string) => {
		if (!showHtml && editorRef.current) {
			document.execCommand(command, false, value)
			handleInput()
		}
	}

	const toggleShowHtml = () => {
		if (showHtml) {
			editorRef.current!.innerHTML = htmlContent
		}
		setShowHtml(!showHtml)
	}

	return (
		<div className="w-full p-4 border rounded-lg shadow-md">
			<OptionsBar
				execCommand={execCommand}
				isHtmlMode={showHtml}
				toggleHtmlMode={toggleShowHtml}
			/>

			<pre
				className={cn(
					'w-full p-2 border rounded overflow-auto bg-gray-900 text-white',
					!showHtml && 'hidden',
				)}
			>
				<div
					ref={editorHtmlRef}
					dangerouslySetInnerHTML={{ __html: formattedHtml }}
					className="focus:outline-none"
				/>
			</pre>

			{/* <textarea
				className={cn(
					'w-full h-48 p-2 border rounded overflow-auto bg-gray-900 text-white font-mono',
					!showHtml && 'hidden',
				)}
				value={htmlContent}
				onChange={(e) => {
					setHtmlContent(e.target.value)
					onChange?.(e.target.value)
				}}
			/> */}

			<div
				ref={editorRef}
				contentEditable
				className={cn(
					'w-full h-48 p-2 border rounded overflow-y-auto focus:outline-none unreset',
					showHtml && 'hidden',
				)}
				onInput={handleInput}
			/>
		</div>
	)
}
