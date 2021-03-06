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
				"grey-dark": "#4F4F4F",
				"blue-very-light": "#F4F9FF",
				"yellow-very-light": "#FFF5D2",
				"grey-light": "#F2F2F2",
			},
			boxShadow: {
				header: "0px 0px 14px rgba(0, 0, 0, 0.21)",
			},
			fontFamily: {
				ptsant: ["PTSans", "sans-serif"],
			},
			fontSize: {
				footer: "0.8125rem",
			},
		},
	},
	plugins: [require("@tailwindcss/forms")],
};
