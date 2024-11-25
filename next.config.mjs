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
                protocol: 'https',
                hostname: 'placehold.co',
            },
        ],
    },
    reactStrictMode: true,

};


export default nextConfig;
