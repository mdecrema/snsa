import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.56.1"],
  async redirects() {
    return [
      {
        source: '/register',
        destination: '/',
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io', // Dominio principale di Uploadthing
      },
      {
        protocol: 'https',
        hostname: '*.ufs.sh', // Eventuale CDN secondaria di Uploadthing
      },
    ],
  },
};

export default nextConfig;
