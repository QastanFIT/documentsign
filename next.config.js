const createNextIntlPlugin = require('next-intl/plugin')
const i18nConfig = require('./src/i18nConfig')

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Specified "i18n" cannot be used with "output: export"
    // i18n: {
    //   locales: i18nConfig.locales,
    //   defaultLocale: i18nConfig.defaultLocale,
    // },
    
    distDir: 'build',
    trailingSlash: true,
    output: 'export',
    reactStrictMode: true,
    swcMinify: true,
    images: {
      unoptimized: true
    },
    webpack: (config, { isServer }) => {
        config.resolve.alias.canvas = false;
        config.resolve.alias.encoding = false;
        return config;
    }
    // Error: Specified "headers" cannot be used with "output: export"
    // async headers() {
    //     return [
    //       {
    //         source: "/api/:path*",
    //         headers: [
    //           {
    //             key: "Access-Control-Allow-Origin",
    //             value: "*", // Set your origin
    //           },
    //           {
    //             key: "Access-Control-Allow-Methods",
    //             value: "GET, POST, PUT, DELETE, OPTIONS",
    //           },
    //           {
    //             key: "Access-Control-Allow-Headers",
    //             value: "Content-Type, Authorization",
    //           },
    //         ],
    //       },
    //     ];
    // }
}

module.exports = nextConfig
