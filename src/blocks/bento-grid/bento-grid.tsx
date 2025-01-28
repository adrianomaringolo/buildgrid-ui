// based on https://magicui.design/docs/components/bento-grid
import { cn } from '@/lib/utils'
import { ComponentPropsWithoutRef, ReactNode } from 'react'

interface BentoGridProps extends ComponentPropsWithoutRef<'div'> {
	children: ReactNode
	className?: string
}

interface BentoCardProps extends ComponentPropsWithoutRef<'div'> {
	children: ReactNode
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
	return (
		<div
			className={cn('grid w-full auto-rows-[22rem] grid-cols-3 gap-4', className)}
			{...props}
		>
			{children}
		</div>
	)
}

const BentoCard = ({ children, className, ...props }: BentoCardProps) => (
	<div
		className={cn(
			'group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl',
			// light styles
			'bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]',
			// dark styles
			'transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]',
			className,
		)}
		{...props}
	>
		{children}
	</div>
)

export { BentoCard, BentoGrid }
