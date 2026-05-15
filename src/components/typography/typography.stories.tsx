// organize-imports-ignore
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyP,
  TypographyLead,
  TypographyLarge,
  TypographySmall,
  TypographyMuted,
  TypographyBlockquote,
  TypographyCode,
  TypographyList,
} from './typography'

const meta: Meta = {
  component: TypographyH1,
}

export default meta
type Story = StoryObj

export const Heading1: Story = {
  render: () => (
    <div className="max-w-2xl p-6 space-y-4">
      <TypographyH1>The Art of Distributed Systems</TypographyH1>
    </div>
  ),
}

export const Heading2: Story = {
  render: () => (
    <div className="max-w-2xl p-6 space-y-4">
      <TypographyH2>Consistency and Availability</TypographyH2>
    </div>
  ),
}

export const Heading3: Story = {
  render: () => (
    <div className="max-w-2xl p-6 space-y-4">
      <TypographyH3>The CAP Theorem Explained</TypographyH3>
    </div>
  ),
}

export const Heading4: Story = {
  render: () => (
    <div className="max-w-2xl p-6 space-y-4">
      <TypographyH4>Practical Implications</TypographyH4>
    </div>
  ),
}

export const Paragraph: Story = {
  render: () => (
    <div className="max-w-2xl p-6 space-y-4">
      <TypographyP>
        Building reliable software means embracing failure as a first-class concern. Network
        partitions happen, nodes crash, and clocks drift — designing for these realities rather than
        ignoring them is what separates production-grade systems from prototypes.
      </TypographyP>
      <TypographyP>
        Event sourcing and CQRS can help you reason about state changes over time, making it easier
        to reconstruct system state and debug issues in production.
      </TypographyP>
    </div>
  ),
}

export const Lead: Story = {
  render: () => (
    <div className="max-w-2xl p-6 space-y-4">
      <TypographyLead>
        A visual typography system that scales from small mobile screens to large desktop displays,
        maintaining readability at every breakpoint.
      </TypographyLead>
    </div>
  ),
}

export const Large: Story = {
  render: () => (
    <div className="max-w-2xl p-6 space-y-4">
      <TypographyLarge>Are you sure you want to deploy to production?</TypographyLarge>
    </div>
  ),
}

export const Small: Story = {
  render: () => (
    <div className="max-w-2xl p-6 space-y-4">
      <TypographySmall>Last updated: 3 minutes ago</TypographySmall>
    </div>
  ),
}

export const Muted: Story = {
  render: () => (
    <div className="max-w-2xl p-6 space-y-4">
      <TypographyMuted>
        Your trial expires in 7 days. Upgrade to keep your data and unlock premium features.
      </TypographyMuted>
    </div>
  ),
}

export const Blockquote: Story = {
  render: () => (
    <div className="max-w-2xl p-6 space-y-4">
      <TypographyBlockquote>
        "Any sufficiently advanced technology is indistinguishable from magic." — Arthur C. Clarke
      </TypographyBlockquote>
    </div>
  ),
}

export const Code: Story = {
  render: () => (
    <div className="max-w-2xl p-6 space-y-4">
      <TypographyP>
        Use the <TypographyCode>useEffect</TypographyCode> hook to synchronize with external
        systems. Always return a cleanup function to prevent memory leaks when the component
        unmounts.
      </TypographyP>
    </div>
  ),
}

export const List: Story = {
  render: () => (
    <div className="max-w-2xl p-6 space-y-4">
      <TypographyH3>Engineering Best Practices</TypographyH3>
      <TypographyList>
        <li>Write tests before submitting a pull request</li>
        <li>Keep functions small and focused on a single responsibility</li>
        <li>Document public APIs with JSDoc comments</li>
        <li>Use semantic versioning for all published packages</li>
        <li>Review performance implications of new dependencies</li>
      </TypographyList>
    </div>
  ),
}

export const Default: Story = {
  render: () => (
    <div className="max-w-2xl p-6 space-y-4">
      <TypographyH1>Designing for Scale</TypographyH1>

      <TypographyLead>
        Modern applications must handle traffic spikes, global audiences, and continuous
        deployments — all without downtime.
      </TypographyLead>

      <TypographyH2>Understanding the Problem Space</TypographyH2>

      <TypographyP>
        Before optimising anything, measure what matters. Premature optimisation remains the root
        of many evils in engineering. Start with clear business metrics, instrument your system, and
        let data drive your decisions.
      </TypographyP>

      <TypographyH3>The Three Pillars</TypographyH3>

      <TypographyList>
        <li>
          <strong>Observability</strong> — logs, metrics, and distributed traces
        </li>
        <li>
          <strong>Reliability</strong> — circuit breakers, retries, and graceful degradation
        </li>
        <li>
          <strong>Deployability</strong> — feature flags, canary releases, and rollbacks
        </li>
      </TypographyList>

      <TypographyH4>Caching Strategies</TypographyH4>

      <TypographyP>
        A well-placed cache can reduce database load by orders of magnitude. Consider using{' '}
        <TypographyCode>stale-while-revalidate</TypographyCode> semantics for content that changes
        infrequently — users receive fast responses while fresh data is fetched in the background.
      </TypographyP>

      <TypographyBlockquote>
        "Make it work, make it right, make it fast — in that order." — Kent Beck
      </TypographyBlockquote>

      <TypographyP>
        Performance is a feature. A 100ms improvement in response time can meaningfully increase
        conversion rates, particularly on mobile networks in emerging markets.
      </TypographyP>

      <TypographyLarge>Start measuring today.</TypographyLarge>

      <TypographyMuted>
        This guide was last updated on 14 May 2026. Benchmarks may vary across environments.
      </TypographyMuted>

      <TypographySmall>Version 2.4.1 — MIT License</TypographySmall>
    </div>
  ),
}
