/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				background: "rgba(var(--background))",
				border: "rgba(var(--border))",
				"card-background": "rgba(var(--card-background))",
				"text-main": "rgba(var(--text-main))",
				"text-muted": "rgba(var(--text-muted))",
			},
		},
	},
	plugins: [],
}
