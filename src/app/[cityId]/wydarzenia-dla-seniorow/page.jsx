import { notFound } from 'next/navigation'
import styles from './page.module.css'
import EventCard from '../../../components/EventCard/EventCard'
import { cityTitles, cityDescriptions } from '../../../config/cityConfigs'
import { fetchCities } from '../../../lib/api'
import { todayPL, tomorrowPL } from '../../../lib/dates'

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

function offsetDay(dateStr, days) {
  const d = new Date(`${dateStr}T00:00:00`)
  d.setDate(d.getDate() + days)
  return d.toLocaleDateString('en-CA', { timeZone: 'Europe/Warsaw' })
}

function formatDayLabel(dateStr, today, tomorrow) {
  const date = new Date(`${dateStr}T00:00:00`)
  const datePart = date.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', timeZone: 'Europe/Warsaw' })
  if (dateStr === today) return `dziś, ${datePart}`
  if (dateStr === tomorrow) return `jutro, ${datePart}`
  return date.toLocaleDateString('pl-PL', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'Europe/Warsaw' }).toLowerCase()
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
  const { dzien: day } = await searchParams
  const today = todayPL()
  const tomorrow = tomorrowPL()
  const effectiveDay = day ?? today
  const prevDay = offsetDay(effectiveDay, -1)
  const nextDay = offsetDay(effectiveDay, 1)
  const [cities, events] = await Promise.all([fetchCities(), fetchEvents(cityId, null, effectiveDay)])
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

        {cityDescriptions[cityId] && (
          <p className={styles.description}>{cityDescriptions[cityId]}</p>
        )}

        <div className={styles.dayNav}>
          {effectiveDay > today
            ? <a href={`/${cityId}/wydarzenia-dla-seniorow?dzien=${prevDay}`} className={styles.dayNavArrow}>←</a>
            : <span className={styles.dayNavArrowDisabled}>←</span>
          }
          <span className={styles.dayNavLabel}>{formatDayLabel(effectiveDay, today, tomorrow)}</span>
          <a href={`/${cityId}/wydarzenia-dla-seniorow?dzien=${nextDay}`} className={styles.dayNavArrow}>→</a>
          <a href={`/${cityId}/wydarzenia-dla-seniorow`} className={`${styles.dayNavQuick} ${effectiveDay === today ? styles.dayNavQuickActive : ''}`}>dziś</a>
          <a href={`/${cityId}/wydarzenia-dla-seniorow?dzien=${tomorrow}`} className={`${styles.dayNavQuick} ${effectiveDay === tomorrow ? styles.dayNavQuickActive : ''}`}>jutro</a>
        </div>

        {events.length === 0 ? (
          <p className={styles.empty}>Brak nadchodzących wydarzeń w tym mieście.</p>
        ) : (
          <ul className={styles.cards}>
            {events.map((event, i) => (
              <li key={i}>
                <EventCard
                  event={event}
                  href={`/wydarzenie/${encodeURIComponent(event.organizer.id)}/${encodeURIComponent(event.month)}/${encodeURIComponent(event.id)}`}
                  organizerHref={`/organizator/${encodeURIComponent(event.organizer.id)}/wydarzenia-dla-seniorow?miesiac=${event.month}`}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
