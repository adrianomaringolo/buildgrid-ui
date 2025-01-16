import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Logo from '@site/static/img/buildgrid-ui-logo.png'
import { cn } from 'buildgrid-ui'

export const IntroSection = () => {
	const { siteConfig } = useDocusaurusContext()

	return (
		<section className="light:bg-gray-50 dark:bg-gray-900 light:text-gray-900 dark:text-white">
			<div
				className="absolute inset-x-0 top-1/4 -z-10 transform-gpu overflow-hidden blur-3xl"
				aria-hidden="true"
			>
				<div
					className="relative left-1/2 aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary to-secondary opacity-50"
					style={{
						clipPath:
							'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
					}}
				/>
			</div>

			<div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
				<div className="mx-auto max-w-3xl text-center">
					<img
						src={Logo}
						className="w-40 mx-auto drop-shadow-[0_0_50px_rgba(255,255,255,0.5)]"
					/>
					<h1 className="p-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-5xl font-extrabold text-transparent sm:text-5xl">
						{siteConfig.title}
					</h1>

					<p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
						A comprehensive UI component library for building modern web applications with
						React.js.
					</p>

					<div className="mt-8 flex flex-wrap justify-center gap-4">
						<a
							className={cn(
								'block w-full rounded border border-primary bg-primary px-12 py-3',
								'text-sm font-medium text-white hover:bg-transparent hover:text-primary',
								'focus:outline-none focus:ring active:text-opacity-75 sm:w-auto',
							)}
							href="#"
						>
							Get Started
						</a>

						<a
							className={cn(
								'block w-full rounded border border-primary px-12 py-3',
								'text-sm font-medium text-primary hover:bg-primary hover:text-white',
								'focus:outline-none focus:ring active:bg-primary sm:w-auto',
							)}
							href="#"
						>
							Learn More
						</a>
					</div>
				</div>
			</div>
		</section>
	)
}
