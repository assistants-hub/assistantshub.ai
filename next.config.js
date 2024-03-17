/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/privacy',
        destination: '/pages/privacy.html',
        permanent: false,
      },
      {
        source: '/terms',
        destination: '/pages/terms.html',
        permanent: false,
      },
    ];
  },
  images: {
    domains: ['flagcdn.com']
  },
};

module.exports = nextConfig;
