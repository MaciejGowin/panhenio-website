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
        headers: [{ key: 'Cache-Control', value: 's-maxage=1800, stale-while-revalidate=3600' }],
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
        source: '/dla-organizatorow',
        headers: [{ key: 'Cache-Control', value: 's-maxage=86400, stale-while-revalidate=86400' }],
      },
      {
        source: '/:cityId/wydarzenia-dla-seniorow',
        headers: [{ key: 'Cache-Control', value: 's-maxage=1800, stale-while-revalidate=3600' }],
      },
      {
        source: '/:cityId/wydarzenia-dla-seniorow/:day',
        headers: [{ key: 'Cache-Control', value: 's-maxage=1800, stale-while-revalidate=3600' }],
      },
      {
        source: '/organizator/:organizerId/wydarzenia-dla-seniorow',
        headers: [{ key: 'Cache-Control', value: 's-maxage=1800, stale-while-revalidate=3600' }],
      },
      {
        source: '/organizator/:organizerId/wydarzenia-dla-seniorow/:segment',
        headers: [{ key: 'Cache-Control', value: 's-maxage=1800, stale-while-revalidate=3600' }],
      },
      {
        source: '/wydarzenie/:path*',
        headers: [{ key: 'Cache-Control', value: 's-maxage=3600, stale-while-revalidate=86400' }],
      },
      {
        source: '/czesto-zadawane-pytania',
        headers: [{ key: 'Cache-Control', value: 's-maxage=86400, stale-while-revalidate=86400' }],
      },
      {
        source: '/polityka-prywatnosci',
        headers: [{ key: 'Cache-Control', value: 's-maxage=86400, stale-while-revalidate=86400' }],
      },
      {
        source: '/miasta',
        headers: [{ key: 'Cache-Control', value: 's-maxage=86400, stale-while-revalidate=86400' }],
      },
      {
        source: '/organizatorzy',
        headers: [{ key: 'Cache-Control', value: 's-maxage=86400, stale-while-revalidate=86400' }],
      },
      {
        source: '/sitemap.xml',
        headers: [{ key: 'Cache-Control', value: 's-maxage=86400, stale-while-revalidate=86400' }],
      },
      {
        source: '/robots.txt',
        headers: [{ key: 'Cache-Control', value: 's-maxage=86400, stale-while-revalidate=86400' }],
      },
    ]
  },
}

export default nextConfig
