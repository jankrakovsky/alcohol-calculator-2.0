/** @type {import('next').NextConfig} */
const nextConfig = {
	/* TODO: Find a way to use image optimization with Firebase Hosting */
	reactStrictMode: true,
	images: {
		unoptimized: true,
		domains: ['*.googleapis.com', '*.googleusercontent.com'],
	},
};

module.exports = nextConfig;
