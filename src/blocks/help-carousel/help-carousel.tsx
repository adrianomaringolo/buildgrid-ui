import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

interface HelpCarouselProps {
	triggerElement: React.ReactNode
	steps: {
		title: string
		description: string | React.ReactNode
	}[]
}

export function HelpCarousel(props: HelpCarouselProps) {
	const { triggerElement, steps } = props

	const [open, setOpen] = useState(false)
	const [currentStep, setCurrentStep] = useState(0)

	const handleNext = () => {
		setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev))
	}

	const handlePrevious = () => {
		setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev))
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{triggerElement}</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader className={cn(steps[currentStep].title === '' && 'sr-only')}>
					<DialogTitle>{steps[currentStep].title}</DialogTitle>
					<DialogDescription className="sr-only">
						{steps[currentStep].title}
					</DialogDescription>
				</DialogHeader>
				<div>{steps[currentStep].description}</div>
				<div className="flex items-center justify-between mt-4">
					<Button
						variant="ghost"
						size="icon"
						onClick={handlePrevious}
						disabled={currentStep === 0}
					>
						<ChevronLeft className="h-4 w-4" />
					</Button>
					<div className="flex justify-center gap-1">
						{steps.map((_, index) => (
							<div
								key={index}
								className={cn(
									'h-3 w-3 rounded-full',
									index === currentStep ? 'bg-primary' : 'bg-gray-200',
								)}
							/>
						))}
					</div>
					<Button
						variant="ghost"
						size="icon"
						onClick={handleNext}
						disabled={currentStep === steps.length - 1}
					>
						<ChevronRight className="h-4 w-4" />
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
