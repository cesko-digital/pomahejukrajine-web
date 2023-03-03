const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		screens: {
			xs: "360px",
			...defaultTheme.screens,
		},
		extend: {
			colors: {
				"ua-blue": "#005BBB",
				"ua-yellow": "#FFD500",
				"ua-blue-dark": "#004495",
				"footer-grey": "#EDEDED",
				"grey-dark": "#4F4F4F",
				"blue-very-light": "#F4F9FF",
				"yellow-very-light": "#FFF5D2",
				"yellow-lightest": "#FFF9E3",
				"grey-light": "#F2F2F2",
				"grey-text": "#828282",
				"grey-ligth2": "#F4F4F4",
			},
			boxShadow: {
				header: "0px 0px 14px rgba(0, 0, 0, 0.21)",
			},
			fontFamily: {
				ptsant: ["PTSans", "sans-serif"],
			},
			fontSize: {
				footer: "0.8125rem",
				smaller: "0.9rem",
			},
			backgroundImage: {
				gradient:
					"linear-gradient(180deg, #E1EFFF 0%, rgba(244, 249, 255, 0) 100%)",
			},
		},
	},
	plugins: [require("@tailwindcss/forms")],
};
