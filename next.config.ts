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
};

export default nextConfig;
