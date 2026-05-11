const BASE_URL = 'https://www.panhenio.pl'

async function fetchAll(path) {
  try {
    const res = await fetch(`${BASE_URL}${path}`, { cache: 'no-store' })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

export default async function sitemap() {
  const [cities, organizers, events] = await Promise.all([
    fetchAll('/api/cities'),
    fetchAll('/api/organizers'),
    fetchAll('/api/events'),
  ])

  const staticPages = [
    { url: `${BASE_URL}/`, changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/o-projekcie`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/cyfrowy-henio`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/dla-organizatorow`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/polityka-prywatnosci`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/organizatorzy`, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${BASE_URL}/miasta`, changeFrequency: 'weekly', priority: 0.6 },
  ]

  const cityPages = cities.map(city => ({
    url: `${BASE_URL}/${city.id}/wydarzenia-dla-seniorow`,
    changeFrequency: 'daily',
    priority: 0.8,
  }))

  const organizerPages = organizers.map(org => ({
    url: `${BASE_URL}/organizator/${org.id}/wydarzenia-dla-seniorow`,
    changeFrequency: 'daily',
    priority: 0.7,
  }))

  const eventPages = events.map(event => ({
    url: `${BASE_URL}/wydarzenie/${event.organizer.id}/${event.month}/${event.id}`,
    changeFrequency: 'weekly',
    priority: 0.6,
    ...(event.createdAt ? { lastModified: event.createdAt } : {}),
  }))

  return [...staticPages, ...cityPages, ...organizerPages, ...eventPages]
}
