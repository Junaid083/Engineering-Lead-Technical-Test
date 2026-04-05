/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const apiHost = process.env.API_URL || 'http://localhost:3001';
    return [
      {
        source: '/api/:path*',
        destination: `${apiHost}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
