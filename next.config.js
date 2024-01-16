/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "aiimagegeneratorapprusta.blob.core.windows.net",
      },
    ],
  },
};

module.exports = nextConfig;
