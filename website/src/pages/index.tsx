import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import type { ReactNode } from 'react'
import { CodePreviewSection } from '../components/home/code-preview-section'
import { CompatibilitySection } from '../components/home/compatibility-section'
import { CTASection } from '../components/home/cta-section'
import { FeaturesSection } from '../components/home/features-section'
import { IntroSection } from '../components/home/intro-section'
import { StatsSection } from '../components/home/stats-section'

export default function Home(): ReactNode {
	const { siteConfig } = useDocusaurusContext()
	return (
		<Layout
			title={`${siteConfig.title} - Modern React UI Components`}
			description="Build beautiful, accessible, and performant React applications with our comprehensive UI component library. 30+ components, TypeScript support, and Tailwind CSS integration."
		>
			<main>
				<IntroSection />
				<StatsSection />
				<FeaturesSection />
				<CodePreviewSection />
				<CompatibilitySection />
				<CTASection />
			</main>
		</Layout>
	)
}
