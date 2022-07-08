/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        // TODO: change to backend url
        domains: ['images.unsplash.com']
    }
}

module.exports = nextConfig
