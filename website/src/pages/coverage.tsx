import Link from '@docusaurus/Link'
import Layout from '@theme/Layout'
import { useEffect, useState } from 'react'

const CoveragePage = () => {
	const [coverageExists, setCoverageExists] = useState<boolean | null>(null)

	useEffect(() => {
		// Check if coverage report exists
		fetch('/buildgrid-ui/coverage/index.html')
			.then((response) => {
				setCoverageExists(response.ok)
				if (response.ok) {
					// Redirect to coverage report
					window.location.href = '/buildgrid-ui/coverage/'
				}
			})
			.catch(() => {
				setCoverageExists(false)
			})
	}, [])

	if (coverageExists === null) {
		return (
			<Layout title="Test Coverage" description="BuildGrid UI Test Coverage Report">
				<div className="container margin-vert--lg">
					<div className="row">
						<div className="col col--8 col--offset-2">
							<div className="text--center">
								<div className="margin-bottom--lg">
									<div className="spinner"></div>
									<p>Loading coverage report...</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		)
	}

	if (coverageExists === false) {
		return (
			<Layout title="Test Coverage" description="BuildGrid UI Test Coverage Report">
				<div className="container margin-vert--lg">
					<div className="row">
						<div className="col col--8 col--offset-2">
							<div className="text--center">
								<h1>Test Coverage Report</h1>
								<div className="alert alert--warning margin-bottom--lg">
									<h4>Coverage Report Not Available</h4>
									<p>
										The test coverage report is not currently available. This usually
										happens when:
									</p>
									<ul className="text--left">
										<li>The website was built without running tests first</li>
										<li>The coverage report hasn't been generated yet</li>
										<li>The build process didn't include coverage generation</li>
									</ul>
								</div>

								<div className="margin-bottom--lg">
									<h3>How to Generate Coverage Report</h3>
									<p>To generate and view the coverage report, run these commands:</p>
									<div className="codeBlockContainer_node_modules-@docusaurus-theme-classic-lib-theme-CodeBlock-Container-styles-module margin-bottom--md">
										<div className="codeBlockContent_node_modules-@docusaurus-theme-classic-lib-theme-CodeBlock-Content-styles-module">
											<pre className="prism-code language-bash codeBlock_node_modules-@docusaurus-theme-classic-lib-theme-CodeBlock-styles-module thin-scrollbar">
												<code className="codeBlockLines_node_modules-@docusaurus-theme-classic-lib-theme-CodeBlock-styles-module">
													<span className="token-line">
														<span className="token comment">
															# Generate coverage report
														</span>
													</span>
													{'\n'}
													<span className="token-line">
														<span className="token function">npm</span> run test:coverage
													</span>
													{'\n'}
													<span className="token-line">
														<span className="token comment">
															# Copy coverage to website
														</span>
													</span>
													{'\n'}
													<span className="token-line">
														<span className="token function">npm</span> run copy-coverage
													</span>
													{'\n'}
													<span className="token-line">
														<span className="token comment"># Build website</span>
													</span>
													{'\n'}
													<span className="token-line">
														<span className="token function">npm</span> run build
													</span>
												</code>
											</pre>
										</div>
									</div>
								</div>

								<div className="margin-bottom--lg">
									<h3>Alternative: Run Pre-Push Hook</h3>
									<p>
										The pre-push hook automatically generates coverage and copies it to
										the website:
									</p>
									<div className="codeBlockContainer_node_modules-@docusaurus-theme-classic-lib-theme-CodeBlock-Container-styles-module margin-bottom--md">
										<div className="codeBlockContent_node_modules-@docusaurus-theme-classic-lib-theme-CodeBlock-Content-styles-module">
											<pre className="prism-code language-bash codeBlock_node_modules-@docusaurus-theme-classic-lib-theme-CodeBlock-styles-module thin-scrollbar">
												<code className="codeBlockLines_node_modules-@docusaurus-theme-classic-lib-theme-CodeBlock-styles-module">
													<span className="token-line">
														<span className="token function">npm</span> run pre-push
													</span>
												</code>
											</pre>
										</div>
									</div>
								</div>

								<div className="button-group">
									<Link
										className="button button--primary button--lg margin-right--md"
										to="/docs/intro"
									>
										View Documentation
									</Link>
									<Link className="button button--secondary button--lg" to="/">
										Back to Home
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		)
	}

	// This should not be reached as we redirect when coverage exists
	return null
}

export default CoveragePage
