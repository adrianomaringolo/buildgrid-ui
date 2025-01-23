import Compressor from 'compressorjs'

export const useFileUtilities = () => {
	const formatFileSize = (size: number): string => {
		var i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024))
		return (
			+(size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i]
		)
	}

	const compressImage = async (
		file: File,
		options?: Compressor.Options,
	): Promise<File> => {
		return await new Promise((resolve, reject) => {
			new Compressor(
				file,
				options ?? {
					quality: 0.8, // Adjust the desired image quality (0.0 - 1.0)
					maxWidth: 2000, // Adjust the maximum width of the compressed image
					maxHeight: 2000, // Adjust the maximum height of the compressed image
					mimeType: 'image/jpeg', // Specify the output image format

					success(result: File) {
						resolve(result)
					},
					error(error: any) {
						reject(error)
					},
				},
			)
		})
	}

	return { compressImage, formatFileSize }
}
