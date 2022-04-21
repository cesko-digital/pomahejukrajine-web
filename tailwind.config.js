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
				"ua-blue-dark": "#004495",
				"footer-grey": "#EDEDED",
				"footer-grey-dark": "#4F4F4F",
			},
			fontFamily: {
				nuckle: ["Nuckle", "sans-serif"],
			},
			fontSize: {
				footer: "0.8125rem",
			},
		},
	},
	plugins: [require("@tailwindcss/forms")],
};
