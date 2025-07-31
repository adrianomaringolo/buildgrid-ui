/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class', '[data-theme="dark"]'],
	content: [
		'./src/**/*.{js,jsx,ts,tsx,mdx}',
		'./node_modules/buildgrid-ui/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#0097b2',
					foreground: '#e4fbff',
				},
				secondary: '#63ad40',
			},
			animation: {
				'fade-in': 'fadeIn .5s ease-in-out',
			},
			keyframes: {
				fadeIn: {
					from: { opacity: 0 },
					to: { opacity: 1 },
				},
			},
		},
	},
	plugins: [],
}
