// organize-imports-ignore
import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './../card'
import { NumberInput } from './number-input'
import { Label } from '../label'

const meta: Meta<typeof NumberInput> = {
	component: NumberInput,
}

export default meta
type Story = StoryObj<typeof NumberInput>

const Template = () => {
	const [controlledValue, setControlledValue] = useState(5)
	const [quantity, setQuantity] = useState(1)
	const [price, setPrice] = useState(9.99)
	const [percentage, setPercentage] = useState(50)
	const [weight, setWeight] = useState(75)
	const [temperature, setTemperature] = useState(22)

	return (
		<div className="max-w-4xl mx-auto p-6 space-y-8">
			<div className="text-center space-y-2">
				<h1 className="text-3xl font-bold">Number Input Component</h1>
				<p className="text-muted-foreground">
					A flexible number input with increment/decrement buttons, multiple size
					variants, and configurable symbols
				</p>
			</div>

			<div className="grid gap-6 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Size Variants</CardTitle>
						<CardDescription>Different sizes: sm, md, lg, xl</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="space-y-2">
							<Label>Small (sm)</Label>
							<NumberInput size="sm" defaultValue={1} min={0} max={10} />
						</div>

						<div className="space-y-2">
							<Label>Medium (md) - Default</Label>
							<NumberInput size="md" defaultValue={5} min={0} max={20} />
						</div>

						<div className="space-y-2">
							<Label>Large (lg)</Label>
							<NumberInput size="lg" defaultValue={10} min={0} max={50} />
						</div>

						<div className="space-y-2">
							<Label>Extra Large (xl)</Label>
							<NumberInput size="xl" defaultValue={25} min={0} max={100} />
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Symbol Variants</CardTitle>
						<CardDescription>
							Left and right symbols for different use cases
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="space-y-2">
							<Label>Currency ($)</Label>
							<NumberInput
								value={price}
								onChange={setPrice}
								min={0}
								max={999.99}
								step={0.01}
								leftSymbol="$"
							/>
						</div>

						<div className="space-y-2">
							<Label>Percentage (%)</Label>
							<NumberInput
								value={percentage}
								onChange={setPercentage}
								min={0}
								max={100}
								step={5}
								rightSymbol="%"
							/>
						</div>

						<div className="space-y-2">
							<Label>Weight (kg)</Label>
							<NumberInput
								value={weight}
								onChange={setWeight}
								min={0}
								max={200}
								step={0.5}
								rightSymbol="kg"
							/>
						</div>

						<div className="space-y-2">
							<Label>Temperature (°C)</Label>
							<NumberInput
								value={temperature}
								onChange={setTemperature}
								min={-50}
								max={50}
								step={1}
								rightSymbol="°C"
							/>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Controlled Examples</CardTitle>
						<CardDescription>Components with external state management</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="space-y-2">
							<Label>Controlled Value: {controlledValue}</Label>
							<NumberInput
								value={controlledValue}
								onChange={setControlledValue}
								min={0}
								max={10}
								step={1}
							/>
						</div>

						<div className="space-y-2">
							<Label>Quantity: {quantity}</Label>
							<NumberInput
								value={quantity}
								onChange={setQuantity}
								min={1}
								max={99}
								step={1}
								size="sm"
							/>
						</div>

						<div className="space-y-2">
							<Label>Price: ${price.toFixed(2)}</Label>
							<NumberInput
								value={price}
								onChange={setPrice}
								min={0}
								max={999.99}
								step={0.01}
								leftSymbol="$"
							/>
						</div>

						<div className="space-y-2">
							<Label>Percentage: {percentage}%</Label>
							<NumberInput
								value={percentage}
								onChange={setPercentage}
								min={0}
								max={100}
								step={5}
								rightSymbol="%"
								size="lg"
							/>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Step Variations</CardTitle>
						<CardDescription>Different increment/decrement values</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="space-y-2">
							<Label>Step by 1 (integers)</Label>
							<NumberInput defaultValue={0} min={-10} max={10} step={1} />
						</div>

						<div className="space-y-2">
							<Label>Step by 0.1 (decimals)</Label>
							<NumberInput defaultValue={0} min={0} max={5} step={0.1} />
						</div>

						<div className="space-y-2">
							<Label>Step by 0.25 (quarters)</Label>
							<NumberInput defaultValue={0} min={0} max={10} step={0.25} leftSymbol="$" />
						</div>

						<div className="space-y-2">
							<Label>Step by 5 (multiples)</Label>
							<NumberInput defaultValue={0} min={0} max={100} step={5} rightSymbol="%" />
						</div>
					</CardContent>
				</Card>

				<Card className="md:col-span-2">
					<CardHeader>
						<CardTitle>Advanced Symbol Examples</CardTitle>
						<CardDescription>
							Creative uses of left and right symbols across different sizes
						</CardDescription>
					</CardHeader>
					<CardContent className="grid gap-6 md:grid-cols-3">
						<div className="space-y-4">
							<div className="space-y-2">
								<Label>Euro Currency (€)</Label>
								<NumberInput
									defaultValue={49.99}
									min={0}
									step={0.01}
									leftSymbol="€"
									size="sm"
								/>
							</div>

							<div className="space-y-2">
								<Label>British Pound (£)</Label>
								<NumberInput defaultValue={39.99} min={0} step={0.01} leftSymbol="£" />
							</div>

							<div className="space-y-2">
								<Label>Japanese Yen (¥)</Label>
								<NumberInput
									defaultValue={1500}
									min={0}
									step={1}
									leftSymbol="¥"
									size="lg"
								/>
							</div>
						</div>

						<div className="space-y-4">
							<div className="space-y-2">
								<Label>Distance (km)</Label>
								<NumberInput
									defaultValue={42.2}
									min={0}
									step={0.1}
									rightSymbol="km"
									size="sm"
								/>
							</div>

							<div className="space-y-2">
								<Label>Speed (mph)</Label>
								<NumberInput
									defaultValue={65}
									min={0}
									max={200}
									step={5}
									rightSymbol="mph"
								/>
							</div>

							<div className="space-y-2">
								<Label>Memory (GB)</Label>
								<NumberInput
									defaultValue={16}
									min={1}
									max={128}
									step={1}
									rightSymbol="GB"
									size="lg"
								/>
							</div>
						</div>

						<div className="space-y-4">
							<div className="space-y-2">
								<Label>Angle (degrees)</Label>
								<NumberInput
									defaultValue={90}
									min={0}
									max={360}
									step={15}
									rightSymbol="°"
									size="sm"
								/>
							</div>

							<div className="space-y-2">
								<Label>Time (min)</Label>
								<NumberInput
									defaultValue={30}
									min={0}
									max={120}
									step={5}
									rightSymbol="min"
								/>
							</div>

							<div className="space-y-2">
								<Label>Disabled with Symbol</Label>
								<NumberInput defaultValue={100} rightSymbol="%" disabled size="lg" />
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}

export const Default: Story = {
	render: Template.bind({}),
	args: {},
}
