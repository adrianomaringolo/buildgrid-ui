import { useColorMode } from '@docusaurus/theme-common'
import { cn } from 'buildgrid-ui'
import React, { useState } from 'react'
import { FaCode, FaDesktop, FaMobileAlt, FaTabletAlt } from 'react-icons/fa'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeBoxProps {
	code: string
	children: React.ReactNode
}

export const CodeBox: React.FC<CodeBoxProps> = ({ code, children }) => {
	const [viewMode, setViewMode] = useState('desktop') // 'desktop', 'tablet', 'mobile', 'code'
	const { colorMode } = useColorMode()
	const syntaxTheme = colorMode === 'dark' ? oneDark : oneLight

	const isCodeView = viewMode === 'code'

	const getPreviewWidthClass = () => {
		switch (viewMode) {
			case 'tablet':
				return 'w-[768px]'
			case 'mobile':
				return 'w-[375px]'
			case 'desktop':
			default:
				return 'w-full'
		}
	}

	const handleCodeButtonClick = () => {
		setViewMode(prevMode => (prevMode === 'code' ? 'desktop' : 'code'))
	}

	return (
		<div className="border border-gray-300 rounded-md p-4 dark:border-gray-700">
			<div className="flex justify-end mb-2 space-x-2">
				<button
					onClick={() => setViewMode('desktop')}
					className={cn(
						'light:bg-gray-200 dark:bg-gray-800 dark:text-white px-3 py-1 rounded text-sm font-medium',
						'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary',
						'dark:focus-visible:ring-offset-gray-900',
						viewMode === 'desktop' && 'bg-primary text-white dark:bg-primary',
					)}
				>
					<span className="flex items-center gap-2">
						<FaDesktop />
						Desktop
					</span>
				</button>
				<button
					onClick={() => setViewMode('tablet')}
					className={cn(
						'light:bg-gray-200 dark:bg-gray-800 dark:text-white px-3 py-1 rounded text-sm font-medium',
						'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary',
						'dark:focus-visible:ring-offset-gray-900',
						viewMode === 'tablet' && 'bg-primary text-white dark:bg-primary',
					)}
				>
					<span className="flex items-center gap-2">
						<FaTabletAlt />
						Tablet
					</span>
				</button>
				<button
					onClick={() => setViewMode('mobile')}
					className={cn(
						'light:bg-gray-200 dark:bg-gray-800 dark:text-white px-3 py-1 rounded text-sm font-medium',
						'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary',
						'dark:focus-visible:ring-offset-gray-900',
						viewMode === 'mobile' && 'bg-primary text-white dark:bg-primary',
					)}
				>
					<span className="flex items-center gap-2">
						<FaMobileAlt />
						Mobile
					</span>
				</button>
				<button
					onClick={handleCodeButtonClick}
					className={cn(
						'light:bg-gray-200 dark:bg-gray-800 dark:text-white px-3 py-1 rounded text-sm font-medium',
						'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary',
						'dark:focus-visible:ring-offset-gray-900',
						isCodeView && 'bg-primary text-white dark:bg-primary',
					)}
				>
					<span className="flex items-center gap-2">
						{isCodeView ? (
							<>
								<FaDesktop />
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

			{isCodeView ? (
				<SyntaxHighlighter
					language="jsx"
					style={syntaxTheme}
					customStyle={{
						background: colorMode === 'dark' ? '#282c34' : '#f6f8fa',
						margin: 0,
						padding: '16px',
					}}
				>
					{code}
				</SyntaxHighlighter>
			) : (
				<div
					className={cn(
						'p-4 light:bg-gray-100 dark:bg-gray-900 rounded-md overflow-auto mx-auto',
						getPreviewWidthClass()
					)}
				>
					{children}
				</div>
			)}
		</div>
	)
}
