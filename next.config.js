/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

// const id = "3a0731d3-2102-4a7b-a5c4-096e0876f10b";

const nextConfig = {
	reactStrictMode: true,
	async redirects() {
		return [
			{
				source: "/:path+",
				destination: "/",
				permanent: true,
			},
			// {
			// 	source: "/nabidky",
			// 	destination: `/nabidky/${id}`,
			// 	permanent: true,
			// },
			// {
			// 	source: "/neverejne-nabidky",
			// 	destination: `/neverejne-nabidky/${id}`,
			// 	permanent: true,
			// },
		];
	},
	i18n,
};

module.exports = nextConfig;
