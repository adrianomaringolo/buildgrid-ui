'use client'

import { Button } from '@/components/button'
import { Progress } from '@/components/progress'
import { cn } from '@/lib/utils'
import { File, FileText, ImageIcon, Upload, X } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

export interface FileUploadConfig {
	maxFiles?: number
	maxSize?: number // em bytes
	acceptedFileTypes?: string[]
	multiple?: boolean
	disabled?: boolean
	showPreview?: boolean
	showProgress?: boolean
}

export interface UploadedFile extends File {
	id: string
	preview?: string
	progress?: number
	error?: string
}

interface FileUploadDropzoneProps {
	config?: FileUploadConfig
	onFilesChange?: (files: UploadedFile[]) => void
	onFileUpload?: (file: UploadedFile) => Promise<void>
	className?: string
	placeholder?: string
}

const defaultConfig: FileUploadConfig = {
	maxFiles: 5,
	maxSize: 10 * 1024 * 1024, // 10MB
	acceptedFileTypes: ['image/*', 'application/pdf', '.doc', '.docx'],
	multiple: true,
	disabled: false,
	showPreview: true,
	showProgress: true,
}

export function FileUploadDropzone({
	config = defaultConfig,
	onFilesChange,
	onFileUpload,
	className,
	placeholder = 'Drag files here or click to select',
}: FileUploadDropzoneProps) {
	const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
	const [isUploading, setIsUploading] = useState(false)

	const finalConfig = { ...defaultConfig, ...config }

	const onDrop = useCallback(
		async (acceptedFiles: File[]) => {
			const newFiles: UploadedFile[] = acceptedFiles.map((file) => {
				const uploadedFile = {
					...file,
					id: Math.random().toString(36).substring(7),
					preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
					progress: 0,
					name: file.name,
					size: file.size,
				}

				return uploadedFile
			})

			const updatedFiles = [...uploadedFiles, ...newFiles].slice(0, finalConfig.maxFiles)
			setUploadedFiles(updatedFiles)
			onFilesChange?.(updatedFiles)

			if (onFileUpload) {
				setIsUploading(true)
				for (const file of newFiles) {
					try {
						await onFileUpload(file)
						setUploadedFiles((prev) =>
							prev.map((f) => (f.id === file.id ? { ...f, progress: 100 } : f)),
						)
					} catch (error) {
						setUploadedFiles((prev) =>
							prev.map((f) => (f.id === file.id ? { ...f, error: 'Upload error' } : f)),
						)
					}
				}
				setIsUploading(false)
			}
		},
		[uploadedFiles, finalConfig.maxFiles, onFilesChange, onFileUpload],
	)

	const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
		onDrop,
		accept: finalConfig.acceptedFileTypes?.reduce(
			(acc, type) => {
				acc[type] = []
				return acc
			},
			{} as Record<string, string[]>,
		),
		maxSize: finalConfig.maxSize,
		maxFiles: finalConfig.maxFiles,
		multiple: finalConfig.multiple,
		disabled: finalConfig.disabled || isUploading,
	})

	const removeFile = (fileId: string) => {
		const updatedFiles = uploadedFiles.filter((file) => file.id !== fileId)
		setUploadedFiles(updatedFiles)
		onFilesChange?.(updatedFiles)
	}

	const getFileIcon = (file: UploadedFile) => {
		if (!file.type) return <File className="h-4 w-4" />
		if (file.type.startsWith('image/')) return <ImageIcon className="h-4 w-4" />
		if (file.type.includes('pdf') || file.type.includes('document'))
			return <FileText className="h-4 w-4" />
		return <File className="h-4 w-4" />
	}

	const formatFileSize = (size: number | undefined) => {
		if (!size || size === 0) return '0 B'

		const units = ['B', 'KB', 'MB', 'GB']
		let unitIndex = 0
		let fileSize = size

		while (fileSize >= 1024 && unitIndex < units.length - 1) {
			fileSize /= 1024
			unitIndex++
		}

		return `${fileSize.toFixed(unitIndex === 0 ? 0 : 2)} ${units[unitIndex]}`
	}

	return (
		<div className={cn('w-full space-y-4', className)}>
			{/* Dropzone */}
			<div
				{...getRootProps()}
				className={cn(
					'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
					'hover:border-primary/50 hover:bg-accent/50',
					isDragActive && 'border-primary bg-accent',
					finalConfig.disabled && 'cursor-not-allowed opacity-50',
					uploadedFiles.length >= (finalConfig.maxFiles || 0) &&
						'cursor-not-allowed opacity-50',
				)}
			>
				<input {...getInputProps()} />
				<Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
				<p className="text-lg font-medium mb-2">
					{isDragActive ? 'Drop files here' : placeholder}
				</p>
				<p className="text-sm text-muted-foreground">
					Maximum {finalConfig.maxFiles} file{finalConfig.maxFiles !== 1 ? 's' : ''} • Up
					to {Math.round((finalConfig.maxSize || 0) / 1024 / 1024)}MB each
				</p>
			</div>

			{/* Validation errors */}
			{fileRejections.length > 0 && (
				<div className="space-y-2">
					{fileRejections.map(({ file, errors }) => (
						<div
							key={file.name}
							className="text-sm text-destructive bg-destructive/10 p-2 rounded"
						>
							<strong>{file.name}:</strong> {errors.map((e) => e.message).join(', ')}
						</div>
					))}
				</div>
			)}

			{/* File list */}
			{uploadedFiles.length > 0 && (
				<div className="space-y-2">
					<h4 className="font-medium">Selected files:</h4>
					{uploadedFiles.map((file) => (
						<div key={file.id} className="flex items-center gap-3 p-3 border rounded-lg">
							{finalConfig.showPreview && file.preview ? (
								<img
									src={file.preview || '/placeholder.svg'}
									alt={file.name}
									className="h-10 w-10 object-cover rounded"
								/>
							) : (
								<div className="h-10 w-10 flex items-center justify-center bg-muted rounded">
									{getFileIcon(file)}
								</div>
							)}

							<div className="flex-1 min-w-0">
								<p className="text-sm font-medium truncate" title={file.name}>
									{file.name || 'Unnamed file'}
								</p>
								<p className="text-xs text-muted-foreground">
									{formatFileSize(file.size)}
								</p>

								{finalConfig.showProgress && file.progress !== undefined && (
									<Progress value={file.progress} className="mt-1 h-1" />
								)}

								{file.error && (
									<p className="text-xs text-destructive mt-1">{file.error}</p>
								)}
							</div>

							<Button
								variant="ghost"
								size="sm"
								onClick={() => removeFile(file.id)}
								disabled={isUploading}
							>
								<X className="h-4 w-4" />
							</Button>
						</div>
					))}
				</div>
			)}
		</div>
	)
}
