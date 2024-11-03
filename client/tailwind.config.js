/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'selector',
	theme: {
		extend: {
			colors: {
				primaryBrandColor: '#00853D',
				darkMainBg: '#121212',
				darkCardBg: '#1E1E1E',
				darkTextIcons1: '#E0E0E0',
				darkTextIcons2: '#FFFFFF',
				lightMainBg: '#FFFFFF',
				lightCardBg: '#F7F7F7',
				lightTextIcons1: '#333333',
				lightTextIcons2: '#4F4F4F',
			},
		},
	},

	plugins: [],
};
