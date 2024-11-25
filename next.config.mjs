/** @type {import('next').NextConfig} */
const nextConfig = {
    i18n: {
        defaultLocale: "ru",
        locales: ["en", "ru"],
    },
    images: {
        domains: ['staging-it-incubator.s3.eu-central-1.amazonaws.com'],
        remotePatterns: [
            {
            hostname: 'staging-it-incubator.s3.eu-central-1.amazonaws.com',
            pathname: '/trainee-instagram-api/**',
            port: '',
            protocol: 'https',
            },
        ],
    },
    reactStrictMode: true,
};


export default nextConfig;
