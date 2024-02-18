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
  }
};

module.exports = nextConfig;
