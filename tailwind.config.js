/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
	important: '#__next',
	theme: {
		extend: {
			colors: {
				light: '#F2FAF7',
				dark: '#0A1411',
				accent: '#3CC8A0',
				'accent-light': '#BEFAEA',
				'accent-dark': '#042E23',
			},
		},
	},
	plugins: [require('tailwindcss-radix')],
};
