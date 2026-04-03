/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://www.panhenio.pl/api/:path*',
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/',
        headers: [{ key: 'Cache-Control', value: 's-maxage=300, stale-while-revalidate=600' }],
      },
      {
        source: '/o-projekcie',
        headers: [{ key: 'Cache-Control', value: 's-maxage=86400, stale-while-revalidate=86400' }],
      },
      {
        source: '/cyfrowy-henio',
        headers: [{ key: 'Cache-Control', value: 's-maxage=86400, stale-while-revalidate=86400' }],
      },
      {
        source: '/wydarzenie/:path*',
        headers: [{ key: 'Cache-Control', value: 's-maxage=3600, stale-while-revalidate=86400' }],
      },
    ]
  },
}

export default nextConfig
