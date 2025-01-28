import { cn } from 'buildgrid-ui'
import React, { useState } from 'react'
import { FaCode } from 'react-icons/fa'
import { MdOutlineScreenshot } from 'react-icons/md'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeBoxProps {
	code: string
	children: React.ReactNode
}

export const CodeBox: React.FC<CodeBoxProps> = ({ code, children }) => {
	const [showCode, setShowCode] = useState(false)

	return (
		<div className="border border-gray-300 rounded-md p-4 dark:border-gray-700">
			<div className="flex justify-end mb-2">
				<button
					onClick={() => setShowCode(!showCode)}
					className={cn(
						'bg-gray-200 dark:bg-gray-800 dark:text-white px-3 py-1 rounded text-sm font-medium',
						'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary',
						'dark:focus-visible:ring-offset-gray-900',
					)}
				>
					<span className="flex items-center gap-2">
						{showCode ? (
							<>
								<MdOutlineScreenshot />
								Preview
							</>
						) : (
							<>
								<FaCode />
								Code
							</>
						)}
					</span>
				</button>
			</div>

			{showCode ? (
				<SyntaxHighlighter
					language="jsx"
					style={oneDark}
					customStyle={{
						background: '#282c34',
						margin: 0,
						padding: '16px',
					}}
				>
					{code}
				</SyntaxHighlighter>
			) : (
				<div className="p-4 bg-gray-100 dark:bg-gray-900 rounded-md">{children}</div>
			)}
		</div>
	)
}
