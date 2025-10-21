// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.themealdb.com',
        port: '',
        pathname: '/images/**', // <-- 'images' altındaki HER ŞEYE izin ver
      },
    ],
  },
};

export default nextConfig;