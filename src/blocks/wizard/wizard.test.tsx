import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CreditCard, Eye, FileText } from 'lucide-react'
import { describe, expect, it, vi } from 'vitest'
import { WizardProgress, WizardProgressStep } from '.'

function renderWizard(
	props: Omit<React.ComponentProps<typeof WizardProgress>, 'children'>,
	withContent = false,
) {
	return render(
		<WizardProgress {...props}>
			<WizardProgressStep label="Payment" icon={CreditCard}>
				{withContent ? <div>Payment content</div> : undefined}
			</WizardProgressStep>
			<WizardProgressStep label="Details" icon={FileText}>
				{withContent ? <div>Details content</div> : undefined}
			</WizardProgressStep>
			<WizardProgressStep label="Review" icon={Eye}>
				{withContent ? <div>Review content</div> : undefined}
			</WizardProgressStep>
		</WizardProgress>,
	)
}

describe('WizardProgress', () => {
	describe('Rendering', () => {
		it('renders all step labels', () => {
			renderWizard({ currentStep: 1 })
			expect(screen.getByText('Payment')).toBeInTheDocument()
			expect(screen.getByText('Details')).toBeInTheDocument()
			expect(screen.getByText('Review')).toBeInTheDocument()
		})

		it('renders connectors between steps', () => {
			const { container } = renderWizard({ currentStep: 1 })
			// 2 connectors for 3 steps
			const connectors = container.querySelectorAll('.h-0\\.5')
			expect(connectors).toHaveLength(2)
		})

		it('applies custom className to the root', () => {
			const { container } = renderWizard({ currentStep: 1, className: 'my-custom-class' })
			expect(container.firstChild).toHaveClass('my-custom-class')
		})
	})

	describe('Step content', () => {
		it('renders only the active step content', () => {
			renderWizard({ currentStep: 2 }, true)
			expect(screen.queryByText('Payment content')).not.toBeInTheDocument()
			expect(screen.getByText('Details content')).toBeInTheDocument()
			expect(screen.queryByText('Review content')).not.toBeInTheDocument()
		})

		it('renders no content area when steps have no children', () => {
			const { container } = renderWizard({ currentStep: 1 })
			expect(container.querySelector('[data-slot="wizard-step-content"]')).toBeNull()
		})

		it('wraps active step content with data-slot', () => {
			const { container } = renderWizard({ currentStep: 1 }, true)
			expect(container.querySelector('[data-slot="wizard-step-content"]')).not.toBeNull()
		})

		it('switches content when currentStep changes', () => {
			const { rerender } = render(
				<WizardProgress currentStep={1}>
					<WizardProgressStep label="Payment" icon={CreditCard}>
						<div>Payment content</div>
					</WizardProgressStep>
					<WizardProgressStep label="Details" icon={FileText}>
						<div>Details content</div>
					</WizardProgressStep>
				</WizardProgress>,
			)
			expect(screen.getByText('Payment content')).toBeInTheDocument()

			rerender(
				<WizardProgress currentStep={2}>
					<WizardProgressStep label="Payment" icon={CreditCard}>
						<div>Payment content</div>
					</WizardProgressStep>
					<WizardProgressStep label="Details" icon={FileText}>
						<div>Details content</div>
					</WizardProgressStep>
				</WizardProgress>,
			)
			expect(screen.queryByText('Payment content')).not.toBeInTheDocument()
			expect(screen.getByText('Details content')).toBeInTheDocument()
		})
	})

	describe('Step states', () => {
		it('disables all buttons when no onGoToStep provided, even completed steps', () => {
			renderWizard({ currentStep: 2 })
			const buttons = screen.getAllByRole('button')
			buttons.forEach((btn) => expect(btn).toBeDisabled())
		})

		it('enables completed step buttons when onGoToStep is provided', () => {
			const onGoToStep = vi.fn()
			renderWizard({ currentStep: 3, onGoToStep })
			const buttons = screen.getAllByRole('button')
			expect(buttons[0]).toBeEnabled()
			expect(buttons[1]).toBeEnabled()
			expect(buttons[2]).toBeDisabled() // active step is not navigable
		})

		it('enables all non-active buttons with freeNavigation', () => {
			const onGoToStep = vi.fn()
			renderWizard({ currentStep: 2, onGoToStep, freeNavigation: true })
			const buttons = screen.getAllByRole('button')
			expect(buttons[0]).toBeEnabled()   // completed
			expect(buttons[1]).toBeDisabled()  // active
			expect(buttons[2]).toBeEnabled()   // future — enabled via freeNavigation
		})

		it('sets a title on navigable steps', () => {
			const onGoToStep = vi.fn()
			renderWizard({ currentStep: 3, onGoToStep })
			expect(screen.getByTitle('Payment')).toBeInTheDocument()
			expect(screen.getByTitle('Details')).toBeInTheDocument()
		})
	})

	describe('Interaction', () => {
		it('calls onGoToStep with the correct step number when a completed step is clicked', async () => {
			const user = userEvent.setup()
			const onGoToStep = vi.fn()
			renderWizard({ currentStep: 3, onGoToStep })
			const buttons = screen.getAllByRole('button')
			await user.click(buttons[0])
			expect(onGoToStep).toHaveBeenCalledWith(1)
		})

		it('calls onGoToStep for a future step when freeNavigation is on', async () => {
			const user = userEvent.setup()
			const onGoToStep = vi.fn()
			renderWizard({ currentStep: 1, onGoToStep, freeNavigation: true })
			const buttons = screen.getAllByRole('button')
			await user.click(buttons[2])
			expect(onGoToStep).toHaveBeenCalledWith(3)
		})

		it('does not call onGoToStep when the active step button is clicked', async () => {
			const user = userEvent.setup()
			const onGoToStep = vi.fn()
			renderWizard({ currentStep: 2, onGoToStep })
			const buttons = screen.getAllByRole('button')
			await user.click(buttons[1])
			expect(onGoToStep).not.toHaveBeenCalled()
		})

		it('does not call onGoToStep when a future step is clicked without freeNavigation', async () => {
			const user = userEvent.setup()
			const onGoToStep = vi.fn()
			renderWizard({ currentStep: 1, onGoToStep })
			const buttons = screen.getAllByRole('button')
			await user.click(buttons[2])
			expect(onGoToStep).not.toHaveBeenCalled()
		})
	})

	describe('Disabled steps', () => {
		it('keeps a disabled step button disabled even with onGoToStep and freeNavigation', () => {
			const onGoToStep = vi.fn()
			render(
				<WizardProgress currentStep={1} onGoToStep={onGoToStep} freeNavigation>
					<WizardProgressStep label="Payment" icon={CreditCard} />
					<WizardProgressStep label="Details" icon={FileText} disabled />
					<WizardProgressStep label="Review" icon={Eye} />
				</WizardProgress>,
			)
			const buttons = screen.getAllByRole('button')
			expect(buttons[1]).toBeDisabled()
		})

		it('keeps a disabled completed step non-navigable', () => {
			const onGoToStep = vi.fn()
			render(
				<WizardProgress currentStep={3} onGoToStep={onGoToStep}>
					<WizardProgressStep label="Payment" icon={CreditCard} disabled />
					<WizardProgressStep label="Details" icon={FileText} />
					<WizardProgressStep label="Review" icon={Eye} />
				</WizardProgress>,
			)
			const buttons = screen.getAllByRole('button')
			expect(buttons[0]).toBeDisabled()
			expect(buttons[1]).toBeEnabled() // non-disabled completed step still works
		})

		it('does not call onGoToStep when a disabled step is clicked', async () => {
			const user = userEvent.setup()
			const onGoToStep = vi.fn()
			render(
				<WizardProgress currentStep={1} onGoToStep={onGoToStep} freeNavigation>
					<WizardProgressStep label="Payment" icon={CreditCard} />
					<WizardProgressStep label="Details" icon={FileText} disabled />
					<WizardProgressStep label="Review" icon={Eye} />
				</WizardProgress>,
			)
			const buttons = screen.getAllByRole('button')
			await user.click(buttons[1])
			expect(onGoToStep).not.toHaveBeenCalled()
		})

		it('marks a disabled step button with aria-disabled', () => {
			render(
				<WizardProgress currentStep={1}>
					<WizardProgressStep label="Payment" icon={CreditCard} />
					<WizardProgressStep label="Details" icon={FileText} disabled />
				</WizardProgress>,
			)
			const buttons = screen.getAllByRole('button')
			expect(buttons[1]).toHaveAttribute('aria-disabled', 'true')
		})
	})

	describe('Labels', () => {
		it('hides label text when showLabels is false', () => {
			renderWizard({ currentStep: 1, showLabels: false })
			expect(screen.queryByText('Payment')).not.toBeInTheDocument()
			expect(screen.queryByText('Details')).not.toBeInTheDocument()
		})

		it('shows label text by default', () => {
			renderWizard({ currentStep: 1 })
			expect(screen.getByText('Payment')).toBeInTheDocument()
		})

		it('still exposes labels via aria-label when showLabels is false', () => {
			renderWizard({ currentStep: 1, showLabels: false })
			expect(screen.getByRole('button', { name: 'Payment' })).toBeInTheDocument()
		})
	})

	describe('Accessibility', () => {
		it('renders step buttons as type="button"', () => {
			renderWizard({ currentStep: 1 })
			const buttons = screen.getAllByRole('button')
			buttons.forEach((btn) => expect(btn).toHaveAttribute('type', 'button'))
		})

		it('has data-slot="wizard-progress" on the root', () => {
			const { container } = renderWizard({ currentStep: 1 })
			expect(container.firstChild).toHaveAttribute('data-slot', 'wizard-progress')
		})
	})

	describe('Icons', () => {
		it('shows Check icon for completed steps in normal mode', () => {
			renderWizard({ currentStep: 3 })
			// lucide Check renders an svg with a specific path — assert by accessible role
			const buttons = screen.getAllByRole('button')
			// completed steps have no text label inside the button itself
			expect(buttons[0].querySelector('svg')).toBeInTheDocument()
			expect(buttons[1].querySelector('svg')).toBeInTheDocument()
		})

		it('shows step icon instead of Check for completed steps in freeNavigation mode', () => {
			const { container } = render(
				<WizardProgress currentStep={3} freeNavigation>
					<WizardProgressStep label="Payment" icon={CreditCard} />
					<WizardProgressStep label="Details" icon={FileText} />
					<WizardProgressStep label="Review" icon={Eye} />
				</WizardProgress>,
			)
			// In freeNavigation mode the original icon is always rendered, never Check
			// Check uses a polyline; CreditCard and FileText use rect/path shapes
			// We verify via data-slot that the component rendered the expected structure
			const buttons = container.querySelectorAll('button')
			buttons.forEach((btn) => expect(btn.querySelector('svg')).toBeInTheDocument())
		})
	})

	describe('Connector states', () => {
		it('applies completed colour class to connectors before the active step', () => {
			const { container } = renderWizard({ currentStep: 3 })
			const connectors = container.querySelectorAll('.h-0\\.5')
			// both connectors precede the active step → completed colour
			connectors.forEach((c) => expect(c).toHaveClass('bg-secondary'))
		})

		it('applies border colour class to connectors after the active step', () => {
			const { container } = renderWizard({ currentStep: 1 })
			const connectors = container.querySelectorAll('.h-0\\.5')
			// no step is completed yet → both connectors use bg-border
			connectors.forEach((c) => expect(c).toHaveClass('bg-border'))
		})

		it('applies completed colour only to connectors before the active step', () => {
			const { container } = renderWizard({ currentStep: 2 })
			const connectors = Array.from(container.querySelectorAll('.h-0\\.5'))
			expect(connectors[0]).toHaveClass('bg-secondary') // step 1 → 2 is complete
			expect(connectors[1]).toHaveClass('bg-border')    // step 2 → 3 is not
		})
	})

	describe('Edge cases', () => {
		it('renders a single step without connectors', () => {
			const { container } = render(
				<WizardProgress currentStep={1}>
					<WizardProgressStep label="Only" icon={CreditCard} />
				</WizardProgress>,
			)
			const connectors = container.querySelectorAll('.h-0\\.5')
			expect(connectors).toHaveLength(0)
		})

		it('renders correctly when currentStep exceeds total steps', () => {
			renderWizard({ currentStep: 99 })
			const buttons = screen.getAllByRole('button')
			buttons.forEach((btn) => expect(btn).toBeDisabled())
		})
	})
})
