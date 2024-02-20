/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                pathname: '/account123/**',
            },
            {
                protocol: 'https',
                hostname: '"images.unsplash.com"',
                port: '',
                // pathname: '/account123/**',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                // pathname: '/account123/**',
            },
            {
                protocol: 'https',
                hostname: 'files.edgestore.dev',
                port: '',
                // pathname: '/account123/**',
            },
        ]

    }
};

export default nextConfig;
