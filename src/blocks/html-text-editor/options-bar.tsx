import {
	Button,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components'
import {
	Bold,
	Code,
	ImageIcon,
	Italic,
	LinkIcon,
	List,
	ListOrdered,
	Quote,
	Underline,
} from 'lucide-react'

type OptionsBarProps = {
	execCommand: (command: string, value?: string) => void
	isHtmlMode: boolean
	toggleHtmlMode: () => void
}

export const OptionsBar = (props: OptionsBarProps) => {
	const { execCommand, isHtmlMode, toggleHtmlMode } = props

	const insertImage = () => {
		const input = document.createElement('input')
		input.type = 'file'
		input.accept = 'image/*'
		input.onchange = async (event) => {
			const file = (event.target as HTMLInputElement).files?.[0]
			if (file) {
				const reader = new FileReader()
				reader.onload = () => {
					execCommand('insertImage', reader.result as string)
				}
				reader.readAsDataURL(file)
			}
		}
		input.click()
	}

	const insertLink = () => {
		const url = prompt('Enter the URL:')
		if (url) {
			execCommand('createLink', url)
		}
	}

	const changeFontSize = (size: string) => {
		execCommand('fontSize', size)
	}

	return (
		<div className="flex flex-wrap gap-2 border-b pb-2 mb-2">
			<Button
				variant="outline"
				size="icon"
				onClick={() => execCommand('bold')}
				disabled={isHtmlMode}
			>
				<Bold size={16} />
			</Button>
			<Button
				variant="outline"
				size="icon"
				onClick={() => execCommand('italic')}
				disabled={isHtmlMode}
			>
				<Italic size={16} />
			</Button>
			<Button
				variant="outline"
				size="icon"
				onClick={() => execCommand('underline')}
				disabled={isHtmlMode}
			>
				<Underline size={16} />
			</Button>
			<Select
				disabled={isHtmlMode}
				onValueChange={(value) => changeFontSize(value)}
				defaultValue="3"
			>
				<SelectTrigger className="w-[80px]">
					<SelectValue placeholder="Size" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="1">
						<div>Small</div>
					</SelectItem>
					<SelectItem value="3">
						<div>Medium</div>
					</SelectItem>
					<SelectItem value="5">
						<div>Large</div>
					</SelectItem>
					<SelectItem value="7">
						<div>Extra Large</div>
					</SelectItem>
				</SelectContent>
			</Select>
			<Button
				variant="outline"
				size="icon"
				onClick={() => execCommand('insertUnorderedList')}
				disabled={isHtmlMode}
			>
				<List size={16} />
			</Button>
			<Button
				variant="outline"
				size="icon"
				onClick={() => execCommand('insertOrderedList')}
				disabled={isHtmlMode}
			>
				<ListOrdered size={16} />
			</Button>
			<Button
				variant="outline"
				size="icon"
				onClick={() => execCommand('formatBlock', 'blockquote')}
				disabled={isHtmlMode}
			>
				<Quote size={16} />
			</Button>
			<Button variant="outline" size="icon" onClick={insertImage} disabled={isHtmlMode}>
				<ImageIcon size={16} />
			</Button>
			<Button variant="outline" size="icon" onClick={insertLink} disabled={isHtmlMode}>
				<LinkIcon size={16} />
			</Button>
			<Button
				variant={isHtmlMode ? 'default' : 'outline'}
				size="icon"
				onClick={toggleHtmlMode}
				className="ml-auto"
			>
				<Code size={16} />
			</Button>
		</div>
	)
}
