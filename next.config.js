/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");
const nextConfig = {
	reactStrictMode: true,
	async redirects() {
		return [
			{
				source: "/nabidky",
				destination: "/nabidky/3a0731d3-2102-4a7b-a5c4-096e0876f10b",
				permanent: true,
			},
		];
	},
	i18n,
};

module.exports = nextConfig;
