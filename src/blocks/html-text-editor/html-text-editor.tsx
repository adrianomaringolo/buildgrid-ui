import { cn } from '@/lib/utils'
import React, { useEffect, useRef } from 'react'
import { OptionsBar } from './options-bar'
import './unreset.css'

interface TextEditorProps {
	initialValue?: string
	onChange?: (value: string) => void
	className?: string
}

export const HtmlTextEditor: React.FC<TextEditorProps> = ({
	initialValue = '',
	onChange,
	className,
}) => {
	const editorRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const observer = new MutationObserver(() => {
			onChange?.(editorRef.current ? editorRef.current.innerHTML : '')
		})

		if (editorRef.current) {
			observer.observe(editorRef.current, { childList: true })
		}
	}, [])

	useEffect(() => {
		if (editorRef.current) {
			editorRef.current.innerHTML = initialValue
		}
	}, [])

	const handleInput = () => {
		if (editorRef.current) {
			onChange?.(editorRef.current.innerHTML)
		}
	}

	const execCommand = (command: string, value?: string) => {
		if (editorRef.current) {
			document.execCommand(command, false, value)
			handleInput()
		}
	}

	return (
		<div className={cn('w-full p-4 border rounded-lg shadow-md', className)}>
			<OptionsBar execCommand={execCommand} />

			{/* <pre
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
			</pre> */}

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
				className="w-full h-48 p-2 border rounded overflow-y-auto focus:outline-none min-h-20 resize-y unreset"
				onInput={handleInput}
			/>
		</div>
	)
}
