import { Button, ButtonThemeProps } from 'buildgrid-ui'

export const CustomThemeButtom = () => {
	const customTheme: ButtonThemeProps = {
		base: 'border-2 shadow-lg rounded p-3',
		variants: {
			variant: {
				default: 'bg-black text-white hover:bg-gray-600',
			},
			size: {
				md: 'h-auto py-2 px-4',
			},
		},
	}

	return <Button theme={customTheme}>Custom button</Button>
}
