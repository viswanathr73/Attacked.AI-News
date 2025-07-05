/** @type {import('next').NextConfig} */
const nextConfig = {

  reactStrictMode: true,

  images: {
    domains: ['images.unsplash.com', 'source.unsplash.com'],
  },
  env: {
    MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN,
  },
}

module.exports = nextConfig