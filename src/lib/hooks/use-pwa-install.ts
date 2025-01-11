/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'

interface UsePWAInstallResult {
	isPromptReady: boolean
	isInstalled: boolean
	showInstallPrompt: () => void
}

export const usePWAInstall = (): UsePWAInstallResult => {
	const [installPromptEvent, setInstallPromptEvent] = useState<any | null>(null)
	const [isInstalled, setIsInstalled] = useState(false)

	useEffect(() => {
		// Check if the app is already installed
		const checkIfInstalled = () => {
			const isStandalone =
				window.matchMedia('(display-mode: standalone)').matches ||
				(window.navigator as any).standalone
			setIsInstalled(isStandalone)
		}

		checkIfInstalled() // Initial check
		window.addEventListener('beforeinstallprompt', (event) => {
			event.preventDefault() // Prevent the browser's default install prompt
			setInstallPromptEvent(event)
		})

		// Listen for changes in display mode
		window.addEventListener('appinstalled', () => {
			setIsInstalled(true) // Update when the app is installed
		})

		// Cleanup
		return () => {
			window.removeEventListener('appinstalled', () => setIsInstalled(true))
		}
	}, [])

	const showInstallPrompt = () => {
		if (installPromptEvent) {
			installPromptEvent.prompt()
			installPromptEvent.userChoice.then((choiceResult: any) => {
				console.log(`User choice: ${choiceResult.outcome}`)
				setInstallPromptEvent(null) // Reset after the prompt is used
			})
		}
	}

	return {
		isPromptReady: !!installPromptEvent,
		isInstalled,
		showInstallPrompt,
	}
}
