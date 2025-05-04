/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				background: "rgba(var(--background))",
				"card-background": "rgba(var(--card-background))",
				border: "rgba(var(--border))",
				"text-main": "rgba(var(--text-main))",
				"text-muted": "rgba(var(--text-muted))",
			},
			keyframes: {
                wave: {
                    "0%": { transform: "rotate(0.0deg)" },
                    "15%": { transform: "rotate(14.0deg)" },
                    "30%": { transform: "rotate(-8.0deg)" },
                    "40%": { transform: "rotate(14.0deg)" },
                    "50%": { transform: "rotate(-4.0deg)" },
                    "60%": { transform: "rotate(10.0deg)" },
                    "70%": { transform: "rotate(0.0deg)" },
                    "100%": { transform: "rotate(0.0deg)" },
                },
                scroll: {
                    "0%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(0.5rem)" },
                    "51%": { opacity: "1" },
                    "100%": { opacity: "0", transform: "translateY(0)" },
                },
            },
            animation: {
                wave: "wave 1.5s infinite",
                scroll: "scroll 2.5s ease infinite"
            }
		},
	},
	plugins: [],
}
