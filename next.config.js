/** @type {import('next').NextConfig} */
/* FIXME: Find a way to use image optimization with Firebase Hosting */
const nextConfig = {
	reactStrictMode: true,
	images: {
		unoptimized: true,
	},
}

module.exports = nextConfig;
