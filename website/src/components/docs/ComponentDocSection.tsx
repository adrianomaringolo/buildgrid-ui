import { Code2, Eye } from 'lucide-react'
import { useState } from 'react'

import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'

interface ComponentDocSectionProps {
	code: string
	language?: 'tsx' | 'jsx' | 'js' | 'ts' | 'html' | 'css'
	children: React.ReactNode
}

export const ComponentDocSection = ({
	code,
	children,
	language = 'tsx',
}: ComponentDocSectionProps) => {
	const [showCode, setShowCode] = useState(false)

	return (
		<div className="border rounded-md p-4 space-y-4 bg-white dark:bg-gray-900">
			<div className="flex justify-end">
				<button
					onClick={() => setShowCode(!showCode)}
					className="flex items-center gap-1 text-sm px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-800"
				>
					{showCode ? <Eye size={14} /> : <Code2 size={14} />}
					{showCode ? 'View render' : 'Code'}
				</button>
			</div>

			{showCode ? (
				<SyntaxHighlighter code={code.trim()} language={language} theme={docco}>
					{({ className, style, tokens, getLineProps, getTokenProps }) => (
						<pre
							className={`${className} text-sm rounded overflow-auto p-4`}
							style={style}
						>
							{tokens.map((line, i) => (
								<div key={i} {...getLineProps({ line })}>
									{line.map((token, key) => (
										<span key={key} {...getTokenProps({ token })} />
									))}
								</div>
							))}
						</pre>
					)}
				</SyntaxHighlighter>
			) : (
				<div className="reset-all">{children}</div>
			)}
		</div>
	)
}
