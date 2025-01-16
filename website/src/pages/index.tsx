import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import HomepageFeatures from '@site/src/components/HomepageFeatures'
import Layout from '@theme/Layout'
import type { ReactNode } from 'react'
import { IntroSection } from '../components/home/intro-section'

export default function Home(): ReactNode {
	const { siteConfig } = useDocusaurusContext()
	return (
		<Layout
			title={`Hello from ${siteConfig.title}`}
			description="Description will go into a meta tag in <head />"
		>
			<IntroSection />
			<main>
				<HomepageFeatures />
			</main>
		</Layout>
	)
}
