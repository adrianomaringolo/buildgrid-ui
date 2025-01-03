// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { CurrencyInput } from './currency-input'
import { DollarSign } from 'lucide-react'

const meta: Meta<typeof CurrencyInput> = {
	title: 'Components/input/currency',
	component: CurrencyInput,
}

export default meta
type Story = StoryObj<typeof CurrencyInput>

const Template = () => {
	const [value, setValue] = React.useState(0)
	return (
		<div className="w-96">
			<CurrencyInput value={value} onValueChange={(number) => setValue(number)} />
		</div>
	)
}

export const Default: Story = {
	render: Template.bind({}),
	args: {},
}
