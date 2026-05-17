import { todayPL } from '../lib/dates'
import { toPolishUrl, toPolishMonthUrl } from '../lib/polishDate'
import { fetchCities, fetchOrganizers, fetchEvents } from '../lib/api'

const BASE_URL = 'https://www.panhenio.pl'

export default async function sitemap() {
  const [cities, organizers, events] = await Promise.all([
    fetchCities(),
    fetchOrganizers(),
    fetchEvents(),
  ])

  const today = todayPL()

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

  // One entry per unique (city, date) pair, excluding today (covered by root)
  const cityDayMap = new Map()
  for (const event of events) {
    if (!event.city?.id || event.date === today) continue
    const key = `${event.city.id}|${event.date}`
    if (!cityDayMap.has(key)) cityDayMap.set(key, { cityId: event.city.id, date: event.date })
  }
  const cityDayPages = [...cityDayMap.values()].map(({ cityId, date }) => ({
    url: `${BASE_URL}/${cityId}/wydarzenia-dla-seniorow/${toPolishUrl(date)}`,
    changeFrequency: 'daily',
    priority: 0.7,
  }))

  const organizerPages = organizers.map(org => ({
    url: `${BASE_URL}/organizator/${org.id}/wydarzenia-dla-seniorow`,
    changeFrequency: 'daily',
    priority: 0.7,
  }))

  // One entry per unique (organizer, month) pair
  const organizerMonthMap = new Map()
  for (const event of events) {
    const key = `${event.organizer.id}|${event.month}`
    if (!organizerMonthMap.has(key)) organizerMonthMap.set(key, { organizerId: event.organizer.id, month: event.month })
  }
  const organizerMonthPages = [...organizerMonthMap.values()].map(({ organizerId, month }) => ({
    url: `${BASE_URL}/organizator/${organizerId}/wydarzenia-dla-seniorow/${toPolishMonthUrl(month)}`,
    changeFrequency: 'daily',
    priority: 0.6,
  }))

  // One entry per unique (organizer, date) pair, excluding today (covered by root)
  const organizerDayMap = new Map()
  for (const event of events) {
    if (event.date === today) continue
    const key = `${event.organizer.id}|${event.date}`
    if (!organizerDayMap.has(key)) organizerDayMap.set(key, { organizerId: event.organizer.id, date: event.date })
  }
  const organizerDayPages = [...organizerDayMap.values()].map(({ organizerId, date }) => ({
    url: `${BASE_URL}/organizator/${organizerId}/wydarzenia-dla-seniorow/${toPolishUrl(date)}`,
    changeFrequency: 'daily',
    priority: 0.5,
  }))

  const eventPages = events.map(event => ({
    url: `${BASE_URL}/wydarzenie/${event.organizer.id}/${event.month}/${event.id}`,
    changeFrequency: 'weekly',
    priority: 0.6,
    ...(event.createdAt ? { lastModified: event.createdAt } : {}),
  }))

  return [...staticPages, ...cityPages, ...cityDayPages, ...organizerPages, ...organizerMonthPages, ...organizerDayPages, ...eventPages]
}
