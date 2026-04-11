import { notFound } from 'next/navigation'
import styles from './page.module.css'
import CalendarGrid from './CalendarGrid'

const BASE_URL = 'https://www.panhenio.pl'

async function fetchOrganizers() {
  try {
    const res = await fetch(`${BASE_URL}/api/organizers`, { cache: 'no-store' })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

async function fetchMonths(organizerId) {
  try {
    const res = await fetch(
      `${BASE_URL}/api/organizers/${encodeURIComponent(organizerId)}/months`,
      { cache: 'no-store' }
    )
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

async function fetchEvents(organizerId, month) {
  try {
    const url = new URL(`${BASE_URL}/api/events`)
    url.searchParams.set('organizerId', organizerId)
    if (month) url.searchParams.set('month', month)
    const res = await fetch(url.toString(), { cache: 'no-store' })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
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
  const { organizerId } = await params
  const organizers = await fetchOrganizers()
  const organizer = organizers.find(o => o.id === organizerId)
  const organizerName = organizer?.name ?? organizerId

  return {
    title: `Wydarzenia dla seniorów – ${organizerName} – Pan Henio`,
    description: `Aktualne wydarzenia, warsztaty i spotkania dla seniorów organizowane przez ${organizerName}. Znajdź coś dla siebie z Pan Henio.`,
    alternates: { canonical: `${BASE_URL}/organizator/${organizerId}/wydarzenia-dla-seniorow` },
    openGraph: {
      title: `Wydarzenia dla seniorów – ${organizerName} – Pan Henio`,
      description: `Aktualne wydarzenia dla seniorów organizowane przez ${organizerName}.`,
      url: `${BASE_URL}/organizator/${organizerId}/wydarzenia-dla-seniorow`,
    },
  }
}

export default async function OrganizerEventsPage({ params, searchParams }) {
  const { organizerId } = await params
  const { miesiac: month, widok } = await searchParams
  const isCalendar = widok === 'kalendarz'
  const [organizers, months, events] = await Promise.all([
    fetchOrganizers(),
    fetchMonths(organizerId),
    fetchEvents(organizerId, month),
  ])
  const organizer = organizers.find(o => o.id === organizerId)
  if (!organizer) notFound()
  const organizerName = organizer.name
  const backHref = `/organizator/${organizerId}/wydarzenia-dla-seniorow`

  // Calendar requires a month — default to first available when none selected
  const calendarMonth = month ?? months[0] ?? null

  function buildUrl(overrides) {
    const p = new URLSearchParams()
    const merged = { miesiac: month, widok, ...overrides }
    if (merged.miesiac) p.set('miesiac', merged.miesiac)
    if (merged.widok && merged.widok !== 'lista') p.set('widok', merged.widok)
    const qs = p.toString()
    return `/organizator/${organizerId}/wydarzenia-dla-seniorow${qs ? `?${qs}` : ''}`
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Pan Henio', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: organizerName, item: `${BASE_URL}/organizator/${organizerId}/wydarzenia-dla-seniorow` },
    ],
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Wydarzenia dla seniorów – ${organizerName}`,
    url: `${BASE_URL}/organizator/${organizerId}/wydarzenia-dla-seniorow`,
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
            addressLocality: event.city?.name,
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
        <a href="/" className={styles.back}>← Strona główna</a>
        <h1 className={styles.title}>
          Wydarzenia dla seniorów
          <span className={styles.organizer}>{organizerName}</span>
        </h1>

        <div className={styles.toolbar}>
          {months.length > 0 && (
            <div className={styles.monthTabs}>
              {months.map(m => (
                <a
                  key={m}
                  href={buildUrl({ miesiac: m })}
                  className={`${styles.monthTab} ${(month ?? months[0]) === m ? styles.monthTabActive : ''}`}
                >
                  {formatMonth(m)}
                </a>
              ))}
            </div>
          )}

          <div className={styles.viewToggle}>
            <a
              href={buildUrl({ widok: 'lista' })}
              className={`${styles.viewTab} ${!isCalendar ? styles.viewTabActive : ''}`}
            >
              Lista
            </a>
            <a
              href={buildUrl({ widok: 'kalendarz' })}
              className={`${styles.viewTab} ${isCalendar ? styles.viewTabActive : ''}`}
            >
              Kalendarz
            </a>
          </div>
        </div>

        {isCalendar && calendarMonth ? (
          <CalendarGrid
            month={calendarMonth}
            events={events}
            organizerId={organizerId}
            backHref={backHref}
          />
        ) : events.length === 0 ? (
          <p className={styles.empty}>Brak nadchodzących wydarzeń tego organizatora.</p>
        ) : (
          groupByDate(events).map(([date, group]) => (
            <section key={date} className={styles.dateGroup}>
              <h2 className={styles.dateHeading}>{formatDate(date)}</h2>
              <ul className={styles.cards}>
                {group.map((event, i) => (
                  <li key={i}>
                    <div className={styles.card}>
                      <span className={styles.cardCategory}>
                        {event.categories?.map(c => c.name).join(', ')}
                      </span>
                      <a
                        href={`/wydarzenie/${encodeURIComponent(event.organizer.id)}/${encodeURIComponent(event.month)}/${encodeURIComponent(event.id)}?back=${encodeURIComponent(backHref)}`}
                        className={styles.cardName}
                      >
                        {event.title}
                      </a>
                      <a
                        href={`/organizator/${encodeURIComponent(event.organizer.id)}/wydarzenia-dla-seniorow?miesiac=${event.month}`}
                        className={styles.cardOrganizer}
                      >
                        {organizerName}
                      </a>
                      <span className={styles.cardMeta}>{[event.location, event.city?.name].filter(Boolean).join(', ')}</span>
                      <span className={styles.cardMeta}>
                        {event.startTime ? event.startTime : ''}
                        {event.endTime ? `–${event.endTime}` : ''}
                      </span>
                      {event.entryCost && (
                        <span className={styles.cardCost}>{event.entryCost}</span>
                      )}
                    </div>
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
