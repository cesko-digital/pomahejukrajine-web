module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				"ua-blue": "#005BBB",
				"ua-yellow": "#FFD500",
			},
			fontFamily: {
				nuckle: ["Nuckle", "sans-serif"],
			},
		},
	},
	plugins: [require("@tailwindcss/forms")],
};
