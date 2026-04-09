import { notFound } from 'next/navigation'
import styles from './page.module.css'

const BASE_URL = 'https://www.panhenio.pl'

async function fetchCities() {
  try {
    const res = await fetch(`${BASE_URL}/api/cities`, { cache: 'no-store' })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

async function fetchEvents(cityId) {
  try {
    const res = await fetch(
      `${BASE_URL}/api/events?cityId=${encodeURIComponent(cityId)}`,
      { cache: 'no-store' }
    )
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

function groupByDate(events) {
  const map = new Map()
  for (const event of events) {
    if (!map.has(event.date)) map.set(event.date, [])
    map.get(event.date).push(event)
  }
  return [...map.entries()]
}

function formatDate(dateStr) {
  const date = new Date(`${dateStr}T00:00:00`)
  return date.toLocaleDateString('pl-PL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}

export async function generateMetadata({ params }) {
  const { cityId } = await params
  const cities = await fetchCities()
  const city = cities.find(c => c.id === cityId)
  const cityName = city?.name ?? cityId

  return {
    title: `Wydarzenia dla seniorów – ${cityName} – Pan Henio`,
    description: `Aktualne wydarzenia, warsztaty i spotkania dla seniorów w ${cityName}. Znajdź coś dla siebie z Pan Henio.`,
    openGraph: {
      title: `Wydarzenia dla seniorów – ${cityName} – Pan Henio`,
      description: `Aktualne wydarzenia dla seniorów w ${cityName}.`,
      url: `${BASE_URL}/${cityId}/wydarzenia-dla-seniorow`,
    },
  }
}

export default async function CityEventsPage({ params }) {
  const { cityId } = await params
  const [cities, events] = await Promise.all([fetchCities(), fetchEvents(cityId)])
  const city = cities.find(c => c.id === cityId)
  if (!city) notFound()
  const cityName = city.name
  const backHref = `/${cityId}/wydarzenia-dla-seniorow`

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className={styles.inner}>
        <a href="/" className={styles.back}>← Strona główna</a>
        <h1 className={styles.title}>
          Wydarzenia dla seniorów
          <span className={styles.city}>{cityName}</span>
        </h1>

        {events.length === 0 ? (
          <p className={styles.empty}>Brak nadchodzących wydarzeń w tym mieście.</p>
        ) : (
          groupByDate(events).map(([date, group]) => (
            <section key={date} className={styles.dateGroup}>
              <h2 className={styles.dateHeading}>{formatDate(date)}</h2>
              <ul className={styles.cards}>
                {group.map((event, i) => (
                  <li key={i}>
                    <a
                      href={`/wydarzenie/${encodeURIComponent(event.organizer.id)}/${encodeURIComponent(event.month)}/${encodeURIComponent(event.id)}?back=${encodeURIComponent(backHref)}`}
                      className={styles.card}
                    >
                      <span className={styles.cardCategory}>
                        {event.categories?.map(c => c.name).join(', ')}
                      </span>
                      <span className={styles.cardName}>{event.title}</span>
                      <span className={styles.cardMeta}>{event.location}</span>
                      <span className={styles.cardMeta}>
                        {event.startTime ? event.startTime : ''}
                        {event.endTime ? `–${event.endTime}` : ''}
                      </span>
                      {event.entryCost && (
                        <span className={styles.cardCost}>{event.entryCost}</span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))
        )}
      </div>
    </div>
  )
}
