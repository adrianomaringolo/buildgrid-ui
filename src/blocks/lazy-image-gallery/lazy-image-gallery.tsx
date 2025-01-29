import { cn } from '@/lib/utils'
import React, { useEffect, useRef, useState } from 'react'

interface LazyImageGalleryProps {
	images: string[]
	observerOptions?: IntersectionObserverInit
	classNames?: {
		imageGallery?: string
		imageCell?: string
		image?: string
	}
}

export const LazyImageGallery: React.FC<LazyImageGalleryProps> = (props) => {
	const { observerOptions, images, classNames } = props
	const [visibleImages, setVisibleImages] = useState<number[]>([])
	const observer = useRef<IntersectionObserver | null>(null)

	useEffect(() => {
		const observerConfig = {
			root: document.querySelector('.image-gallery'),
			rootMargin: '0px',
			threshold: 1,
			...observerOptions,
		}

		observer.current = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting && entry.target instanceof HTMLDivElement) {
					const index = Number(entry.target.dataset.index)
					setVisibleImages((prev) => [...new Set([...prev, index])])
				}
			})
		}, observerConfig)

		return () => observer.current?.disconnect()
	}, [])

	useEffect(() => {
		const imageDivs = document.querySelectorAll('.image-cell')
		imageDivs.forEach((div) => observer.current?.observe(div as Element))
	}, [images])

	return (
		<div
			className={cn(
				'image-gallery overflow-auto grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))]',
				'gap-2 justify-center h-full',
				classNames?.imageGallery,
			)}
		>
			{images.map((src, index) => (
				<div
					key={index}
					data-index={index}
					className={cn('image-cell w-full h-52', classNames?.imageCell)}
				>
					{visibleImages.includes(index) && (
						<img
							src={src}
							alt={`Gallery Image ${index + 1}`}
							className={cn(
								'animate-fade-up animate-duration-[400ms] animate-ease-linear w-full h-full object-cover',
								classNames?.image,
							)}
						/>
					)}
				</div>
			))}
		</div>
	)
}
