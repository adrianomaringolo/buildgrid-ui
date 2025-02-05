import { Toaster as Sonner } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

/**
 * A toast notification component that uses `sonner` under the hood.
 *
 * It automatically uses the active theme and applies some sensible defaults.
 */
const Toaster = ({ ...props }: ToasterProps) => {
	return (
		<Sonner
			className="toaster group"
			toastOptions={{
				classNames: {
					toast:
						'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
					description: 'group-[.toast]:text-muted-foreground',
					actionButton:
						'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
					icon: 'group-data-[type=error]:text-red-500 group-data-[type=success]:text-green-500 group-data-[type=warning]:text-amber-500 group-data-[type=info]:text-blue-500',
					cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
				},
			}}
			{...props}
		/>
	)
}

export { Toaster }
