import { notFound } from 'next/navigation'
import styles from './page.module.css'
import CityEventsContent from './CityEventsContent'
import { fetchCities } from '../../../lib/api'
import { todayPL, tomorrowPL } from '../../../lib/dates'

const BASE_URL = 'https://www.panhenio.pl'

async function fetchEvents(cityId, day) {
  try {
    const url = new URL(`${BASE_URL}/api/events`)
    url.searchParams.set('cityId', cityId)
    url.searchParams.set('dateFrom', day)
    url.searchParams.set('dateTo', day)
    const res = await fetch(url.toString(), { cache: 'no-store' })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

export async function generateMetadata({ params }) {
  const { cityId } = await params
  const cities = await fetchCities()
  const city = cities.find(c => c.id === cityId)
  const cityName = city?.name ?? cityId

  return {
    title: `Wydarzenia dla seniorów – ${cityName} – Pan Henio`,
    description: `Aktualne wydarzenia, warsztaty i spotkania dla seniorów w ${cityName}. Znajdź coś dla siebie z Pan Henio.`,
    alternates: { canonical: `${BASE_URL}/${cityId}/wydarzenia-dla-seniorow` },
    openGraph: {
      title: `Wydarzenia dla seniorów – ${cityName} – Pan Henio`,
      description: `Aktualne wydarzenia dla seniorów w ${cityName}.`,
      url: `${BASE_URL}/${cityId}/wydarzenia-dla-seniorow`,
    },
  }
}

export default async function CityEventsPage({ params }) {
  const { cityId } = await params
  const today = todayPL()
  const tomorrow = tomorrowPL()
  const [cities, events] = await Promise.all([fetchCities(), fetchEvents(cityId, today)])
  const city = cities.find(c => c.id === cityId)
  if (!city) notFound()
  const cityName = city.name

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Pan Henio', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: cityName, item: `${BASE_URL}/${cityId}/wydarzenia-dla-seniorow` },
    ],
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Wydarzenia dla seniorów – ${cityName}`,
    url: `${BASE_URL}/${cityId}/wydarzenia-dla-seniorow`,
    numberOfItems: events.length,
    itemListElement: events.map((event, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Event',
        name: event.title,
        startDate: event.startTime ? `${event.date}T${event.startTime}` : event.date,
        location: {
          '@type': 'Place',
          name: event.location,
          address: {
            '@type': 'PostalAddress',
            addressLocality: cityName,
            addressCountry: 'PL',
          },
        },
        url: `${BASE_URL}/wydarzenie/${event.organizer.id}/${event.month}/${event.id}`,
      },
    })),
  }

  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CityEventsContent
        cityId={cityId}
        cityName={cityName}
        effectiveDay={today}
        events={events}
        today={today}
        tomorrow={tomorrow}
      />
    </div>
  )
}
