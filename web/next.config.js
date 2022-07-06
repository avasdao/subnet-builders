const withMarkdoc = require('@markdoc/next.js')

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    pageExtensions: ['js', 'jsx', 'md'],
    output: 'standalone',
}

module.exports = withMarkdoc()(nextConfig)
