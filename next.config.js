/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	async redirects() {
		return [
			{
				source: "/nabidky-new",
				destination: "/nabidky-new/3a0731d3-2102-4a7b-a5c4-096e0876f10b",
				permanent: true,
			},
		];
	},
};

module.exports = nextConfig;
