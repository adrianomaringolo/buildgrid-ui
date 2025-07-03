import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import type { ReactNode } from 'react'
import { FeaturesSection } from '../components/home/features-section'
import { IntroSection } from '../components/home/intro-section'
import { StatsSection } from '../components/home/stats-section'

export default function Home(): ReactNode {
	const { siteConfig } = useDocusaurusContext()
	return (
		<Layout
			title={`Hello from ${siteConfig.title}`}
			description="Description will go into a meta tag in <head />"
		>
			<main>
				<IntroSection className="text-red-500" />
				<StatsSection />
				<FeaturesSection />
			</main>
		</Layout>
	)
}
