import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
	plugins: [react(), tailwindcss(), dts({ outDir: 'dist', insertTypesEntry: true })],
	test: {
		include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'], // Test files
		globals: true, // Use global APIs like `describe` and `it`
		environment: 'jsdom', // Simulates the browser environment
		setupFiles: './vitest.setup.ts', // Path to setup file
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html', 'lcov'],
			exclude: [
				'node_modules/',
				'dist/',
				'website/',
				'storybook-static/',
				'**/*.stories.{js,jsx,ts,tsx}',
				'**/*.config.{js,mjs,ts}',
				'**/*.d.ts',
				'src/index.ts',
				'src/**/index.ts',
				'vitest.setup.ts',
			],
			thresholds: {
				global: {
					branches: 80,
					functions: 80,
					lines: 80,
					statements: 80,
				},
			},
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	build: {
		cssCodeSplit: true,
		lib: {
			entry: 'src/index.ts',
			name: 'BuildgridUI',
			fileName: (format) => `buildgrid-ui.${format}.js`,
		},
		rollupOptions: {
			external: ['react', 'react-dom'],
			output: {
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM',
				},
				assetFileNames: (assetInfo) => {
					if (assetInfo.name === 'index.css') {
						return 'buildgrid-ui.css'
					}
					return assetInfo.name
				},
			},
		},
	},
})
