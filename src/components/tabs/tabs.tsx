'use client'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

const tabsListVariants = cva('', {
	variants: {
		size: {
			sm: 'h-8',
			md: 'h-9',
			lg: 'h-10',
			xl: 'h-12',
		},
		variant: {
			default:
				'bg-muted text-muted-foreground inline-flex w-fit items-center justify-center rounded-lg p-[3px]',
			outline:
				'flex w-full items-end gap-0.5 border-b border-border bg-transparent p-0 rounded-none',
		},
	},
	compoundVariants: [{ variant: 'outline', class: 'h-auto' }],
	defaultVariants: {
		size: 'md',
		variant: 'default',
	},
})

const tabsTriggerVariants = cva(
	"focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring inline-flex items-center justify-center gap-1.5 font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
	{
		variants: {
			size: {
				sm: 'px-2 py-1 text-xs',
				md: 'px-2.5 py-1.5 text-sm',
				lg: 'px-3 py-2 text-base',
				xl: 'px-3.5 py-2.5 text-lg',
			},
			variant: {
				default: [
					'flex-1 h-[calc(100%-1px)] rounded-md border border-transparent',
					'text-foreground dark:text-muted-foreground',
					'data-[state=active]:bg-background data-[state=active]:shadow-sm',
					'dark:data-[state=active]:text-foreground dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30',
				].join(' '),
				outline: [
					'rounded-t-md border border-transparent bg-transparent',
					'text-muted-foreground',
					'hover:bg-muted/50 hover:text-foreground',
					'data-[state=active]:bg-background data-[state=active]:border-border data-[state=active]:border-b-background',
					'data-[state=active]:-mb-px data-[state=active]:text-foreground',
					'dark:hover:bg-muted/30',
					'dark:data-[state=active]:bg-background dark:data-[state=active]:border-border dark:data-[state=active]:border-b-background',
				].join(' '),
			},
		},
		compoundVariants: [
			{ variant: 'outline', size: 'sm', class: 'h-8' },
			{ variant: 'outline', size: 'md', class: 'h-9' },
			{ variant: 'outline', size: 'lg', class: 'h-10' },
			{ variant: 'outline', size: 'xl', class: 'h-12' },
		],
		defaultVariants: {
			size: 'md',
			variant: 'default',
		},
	},
)

export interface TabsListVariantProps
	extends Omit<VariantProps<typeof tabsListVariants>, 'variant'> {}
export interface TabsTriggerVariantProps
	extends Omit<VariantProps<typeof tabsTriggerVariants>, 'variant'> {}
export interface TabsVariantProps {
	variant?: 'default' | 'outline'
}

type TabsContextValue = {
	value: string
	onValueChange: (value: string) => void
	orientation: 'horizontal' | 'vertical'
	instanceId: string
	variant: 'default' | 'outline'
}

const TabsContext = React.createContext<TabsContextValue | null>(null)

function useTabsContext() {
	const ctx = React.useContext(TabsContext)
	if (!ctx) throw new Error('Tabs components must be used within <Tabs>')
	return ctx
}

type TabsProps = React.HTMLAttributes<HTMLDivElement> &
	TabsVariantProps & {
		value?: string
		defaultValue?: string
		onValueChange?: (value: string) => void
		orientation?: 'horizontal' | 'vertical'
		activationMode?: 'automatic' | 'manual'
		dir?: 'ltr' | 'rtl'
	}

type TabsListProps = React.HTMLAttributes<HTMLDivElement> & TabsListVariantProps & { loop?: boolean }

type TabsTriggerProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value'> &
	TabsTriggerVariantProps & {
		value: string
		collapseLabel?: boolean
	}

type TabsContentProps = React.HTMLAttributes<HTMLDivElement> & {
	value: string
	forceMount?: boolean
}

function Tabs({
	className,
	value: controlledValue,
	defaultValue = '',
	onValueChange,
	orientation = 'horizontal',
	activationMode: _activationMode,
	dir,
	variant = 'default',
	...props
}: TabsProps) {
	const instanceId = React.useId()
	const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)
	const isControlled = controlledValue !== undefined
	const value = isControlled ? controlledValue : uncontrolledValue

	const handleValueChange = React.useCallback(
		(newValue: string) => {
			if (!isControlled) setUncontrolledValue(newValue)
			onValueChange?.(newValue)
		},
		[isControlled, onValueChange],
	)

	return (
		<TabsContext.Provider
			value={{ value, onValueChange: handleValueChange, orientation, instanceId, variant }}
		>
			<div
				data-slot="tabs"
				data-orientation={orientation}
				data-variant={variant}
				dir={dir}
				className={cn('flex flex-col gap-2', className)}
				{...props}
			/>
		</TabsContext.Provider>
	)
}

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
	({ className, size, loop = true, ...props }, ref) => {
		const { orientation, variant } = useTabsContext()

		const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
			const triggers = Array.from(
				e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])'),
			)
			const currentIndex = triggers.indexOf(document.activeElement as HTMLButtonElement)

			const isHorizontal = orientation === 'horizontal'
			const prevKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp'
			const nextKey = isHorizontal ? 'ArrowRight' : 'ArrowDown'

			let newIndex = currentIndex
			if (e.key === prevKey) {
				newIndex = loop
					? (currentIndex - 1 + triggers.length) % triggers.length
					: Math.max(0, currentIndex - 1)
			} else if (e.key === nextKey) {
				newIndex = loop
					? (currentIndex + 1) % triggers.length
					: Math.min(triggers.length - 1, currentIndex + 1)
			} else if (e.key === 'Home') {
				newIndex = 0
			} else if (e.key === 'End') {
				newIndex = triggers.length - 1
			} else {
				return
			}

			e.preventDefault()
			triggers[newIndex]?.focus()
			triggers[newIndex]?.click()
		}

		return (
			<div
				ref={ref}
				role="tablist"
				data-slot="tabs-list"
				data-orientation={orientation}
				aria-orientation={orientation}
				className={cn(tabsListVariants({ size, variant }), className)}
				onKeyDown={handleKeyDown}
				{...props}
			/>
		)
	},
)
TabsList.displayName = 'TabsList'

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
	({ className, size, value, disabled, onClick, collapseLabel, children, ...props }, ref) => {
		const { value: activeValue, onValueChange, instanceId, variant } = useTabsContext()
		const isActive = value === activeValue

		const renderedChildren = collapseLabel
			? React.Children.map(children, (child) =>
					typeof child === 'string' || typeof child === 'number' ? (
						<span className={cn('transition-opacity', !isActive && 'sr-only')}>{child}</span>
					) : (
						child
					),
				)
			: children

		return (
			<button
				ref={ref}
				type="button"
				role="tab"
				id={`${instanceId}-trigger-${value}`}
				aria-controls={`${instanceId}-content-${value}`}
				data-slot="tabs-trigger"
				data-state={isActive ? 'active' : 'inactive'}
				data-disabled={disabled ? '' : undefined}
				aria-selected={isActive}
				disabled={disabled}
				tabIndex={isActive ? 0 : -1}
				className={cn(tabsTriggerVariants({ size, variant }), className)}
				onClick={(e) => {
					onValueChange(value)
					onClick?.(e)
				}}
				{...props}
			>
				{renderedChildren}
			</button>
		)
	},
)
TabsTrigger.displayName = 'TabsTrigger'

function TabsContent({ className, value, forceMount, ...props }: TabsContentProps) {
	const { value: activeValue, instanceId } = useTabsContext()
	const isActive = value === activeValue

	if (!isActive && !forceMount) return null

	return (
		<div
			role="tabpanel"
			id={`${instanceId}-content-${value}`}
			aria-labelledby={`${instanceId}-trigger-${value}`}
			data-slot="tabs-content"
			data-state={isActive ? 'active' : 'inactive'}
			hidden={!isActive}
			className={cn('flex-1 outline-none', className)}
			tabIndex={0}
			{...props}
		/>
	)
}

export { Tabs, TabsContent, TabsList, TabsTrigger }
