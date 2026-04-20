import { notFound } from 'next/navigation'
import styles from './page.module.css'
import EventCard from '../../../components/EventCard/EventCard'
import { cityTitles } from '../../../config/cityTitles'
import { fetchCities } from '../../../lib/api'

const BASE_URL = 'https://www.panhenio.pl'

async function fetchEvents(cityId, month, day) {
  try {
    const url = new URL(`${BASE_URL}/api/events`)
    url.searchParams.set('cityId', cityId)
    if (day) {
      url.searchParams.set('dateFrom', day)
      url.searchParams.set('dateTo', day)
    } else if (month) {
      url.searchParams.set('month', month)
    }
    const res = await fetch(url.toString(), { cache: 'no-store' })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

function getAvailableMonths() {
  const now = new Date()
  const current = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  const next = new Date(now.getFullYear(), now.getMonth() + 1, 1)
  const nextMonth = `${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, '0')}`
  return [current, nextMonth]
}

function formatMonth(month) {
  const date = new Date(`${month}-01T00:00:00`)
  return date.toLocaleDateString('pl-PL', { month: 'long', year: 'numeric' })
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
    alternates: { canonical: `${BASE_URL}/${cityId}/wydarzenia-dla-seniorow` },
    openGraph: {
      title: `Wydarzenia dla seniorów – ${cityName} – Pan Henio`,
      description: `Aktualne wydarzenia dla seniorów w ${cityName}.`,
      url: `${BASE_URL}/${cityId}/wydarzenia-dla-seniorow`,
    },
  }
}

export default async function CityEventsPage({ params, searchParams }) {
  const { cityId } = await params
  const { miesiac: month, dzien: day } = await searchParams
  const months = getAvailableMonths()
  const activeMonth = month ?? months[0]
  const today = new Date().toISOString().split('T')[0]
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0]
  const [cities, events] = await Promise.all([fetchCities(), fetchEvents(cityId, activeMonth, day)])
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
      <div className={styles.inner}>
        <h1 className={styles.title}>
          {cityTitles[cityId] ?? `Wydarzenia dla seniorów w lokalizacji ${cityName}`}
        </h1>

        <div className={styles.monthTabs}>
          <a
            href={`/${cityId}/wydarzenia-dla-seniorow?dzien=${today}`}
            className={`${styles.monthTab} ${day === today ? styles.monthTabActive : ''}`}
          >
            dziś
          </a>
          <a
            href={`/${cityId}/wydarzenia-dla-seniorow?dzien=${tomorrow}`}
            className={`${styles.monthTab} ${day === tomorrow ? styles.monthTabActive : ''}`}
          >
            jutro
          </a>
          {months.map(m => (
            <a
              key={m}
              href={`/${cityId}/wydarzenia-dla-seniorow?miesiac=${m}`}
              className={`${styles.monthTab} ${!day && activeMonth === m ? styles.monthTabActive : ''}`}
            >
              {formatMonth(m)}
            </a>
          ))}
        </div>

        {events.length === 0 ? (
          <p className={styles.empty}>Brak nadchodzących wydarzeń w tym mieście.</p>
        ) : (
          groupByDate(events).map(([date, group]) => (
            <section key={date} className={styles.dateGroup}>
              <h2 className={styles.dateHeading}>{formatDate(date)}</h2>
              <ul className={styles.cards}>
                {group.map((event, i) => (
                  <li key={i}>
                    <EventCard
                      event={event}
                      href={`/wydarzenie/${encodeURIComponent(event.organizer.id)}/${encodeURIComponent(event.month)}/${encodeURIComponent(event.id)}`}
                      organizerHref={`/organizator/${encodeURIComponent(event.organizer.id)}/wydarzenia-dla-seniorow?miesiac=${event.month}`}
                    />
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
