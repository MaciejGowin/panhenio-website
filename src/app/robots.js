export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/szukaj-wydarzen'] },
    sitemap: 'https://www.panhenio.pl/sitemap.xml',
  }
}
