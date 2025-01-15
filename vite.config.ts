import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [react()],
	test: {
		globals: true, // Use global APIs like `describe` and `it`
		environment: 'jsdom', // Simulates the browser environment
		setupFiles: './vitest.setup.ts', // Path to setup file
		coverage: {
			provider: 'c8', // Built-in coverage tool
			reporter: ['text', 'lcov'], // Coverage formats
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	css: {
		postcss: {
			plugins: [require('tailwindcss'), require('autoprefixer')],
		},
	},

	build: {
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
			},
		},
	},
})
