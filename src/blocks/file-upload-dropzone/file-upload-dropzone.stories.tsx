import type { Meta, StoryObj } from '@storybook/react'
import { FileUploadDropzone, UploadedFile } from './file-upload-dropzone'

const meta: Meta<typeof FileUploadDropzone> = {
	component: FileUploadDropzone,
	title: 'blocks/FileUploadDropzone',
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof FileUploadDropzone>

export const Default: Story = {
	args: {},
}

const mockFile = (name: string, type: string, size: number): File => {
	const file = new Blob([''], { type })
	return new File([file], name, { type })
}
const handleFileUpload = async (file: UploadedFile) => {
	// Simula um upload com progresso
	return new Promise<void>((resolve) => {
		let progress = 0
		const interval = setInterval(() => {
			progress += 20
			if (progress >= 100) {
				clearInterval(interval)
				resolve()
			}
		}, 200)
	})
}

const files: UploadedFile[] = [
	{
		...mockFile('document.pdf', 'application/pdf', 123456),
		id: '1',
		progress: 100,
	},
	{
		...mockFile('image.png', 'image/png', 234567),
		id: '2',
		preview: 'https://via.placeholder.com/40',
		progress: 100,
	},
]

export const WithFiles: Story = {
	args: {
		onFilesChange: (files) => console.log(files),
	},
	render: (args) => {
		return <FileUploadDropzone onFileUpload={handleFileUpload} {...args} />
	},
	parameters: {
		docs: {
			description: {
				story:
					'This story demonstrates the component with pre-existing files. Note: The files are mocked and the `onFilesChange` callback is logged to the console.',
			},
		},
	},
}

export const Disabled: Story = {
	args: {
		config: {
			disabled: true,
		},
	},
}

export const WithUploadProgress: Story = {
	args: {
		...WithFiles.args,
	},
	render: (args) => {
		const filesWithProgress: UploadedFile[] = files.map((file, index) => ({
			...file,
			progress: index === 0 ? 50 : 100,
		}))
		return <FileUploadDropzone onFileUpload={handleFileUpload} {...args} />
	},
}

export const WithError: Story = {
	args: {
		...WithFiles.args,
	},
	render: (args) => {
		const filesWithError: UploadedFile[] = files.map((file, index) => ({
			...file,
			error: index === 0 ? 'Upload failed: Server error' : undefined,
		}))
		return <FileUploadDropzone onFileUpload={handleFileUpload} {...args} />
	},
}
