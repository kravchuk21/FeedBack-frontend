/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        // TODO: change to backend url
        domains: ['images.unsplash.com']
    },
    webpack(config) {
        config.module.rules.push({
            loader: '@svgr/webpack',
            issuer: /\.[jt]sx?$/,
            options: {
                prettier: false,
                svgo: true,
                svgoConfig: {
                    // plugins: [{removeViewBox: false}]
                    plugins: [{
                        name: 'preset-default',
                        params: {
                            override: {
                                removeViewBox: false
                            }
                        }
                    }]
                },
                titleProp: true
            },
            test: /\.svg$/
        })

        return config
    }
}

module.exports = nextConfig
