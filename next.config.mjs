/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "t7gx1q7p-5001.inc1.devtunnels.ms",
      },
      {
        protocol: "https",
        hostname: "z34dr4pd-5001.inc1.devtunnels.ms",
      },
      {
        protocol: "https",
        hostname: "api.thevedicstory.in",
      },

      {
        protocol: "https",
        hostname: "www.facebook.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
