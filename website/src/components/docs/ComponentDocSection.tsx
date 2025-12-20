import { Code2, ExternalLink, Eye } from 'lucide-react'
import { useState } from 'react'

import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'

interface ComponentDocSectionProps {
	code: string
	language?: 'tsx' | 'jsx' | 'js' | 'ts' | 'html' | 'css'
	children: React.ReactNode
	storybookPath?: string
}

export const ComponentDocSection = ({
	code,
	children,
	language = 'tsx',
	storybookPath,
}: ComponentDocSectionProps) => {
	const [showCode, setShowCode] = useState(false)

	return (
		<div className="border rounded-md p-4 space-y-4 bg-white dark:bg-gray-900">
			<div className="flex justify-between items-center">
				{storybookPath && (
					<a
						href={`https://main--6944355833ad98d1ee729cd0.chromatic.com/?path=/story/${storybookPath}`}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-1 text-sm px-3 py-1 border rounded hover:bg-orange-50 dark:hover:bg-orange-900/20 text-orange-600 border-orange-200 dark:border-orange-800"
					>
						<ExternalLink size={14} />
						View in Storybook
					</a>
				)}
				<button
					onClick={() => setShowCode(!showCode)}
					className="flex items-center gap-1 text-sm px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-800 ml-auto"
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
