/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://d1lq7hwd1ek5lv.cloudfront.net/api/:path*',
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/wydarzenie/:path*',
        headers: [{ key: 'Cache-Control', value: 's-maxage=3600, stale-while-revalidate=86400' }],
      },
    ]
  },
}

export default nextConfig
