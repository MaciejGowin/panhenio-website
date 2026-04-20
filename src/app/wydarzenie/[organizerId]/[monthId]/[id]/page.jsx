import styles from '../../../../../components/EventPage/EventPage.module.css'
import { fetchEvent } from '../../../../../lib/api'

const BASE_URL = 'https://www.panhenio.pl'

export async function generateMetadata({ params, searchParams }) {
  const { organizerId, monthId, id } = await params
  const { previewAccessToken } = await searchParams
  const event = await fetchEvent(organizerId, monthId, id, previewAccessToken)
  if (!event) return { title: 'Wydarzenie – Pan Henio' }
  return {
    title: `${event.title} – Pan Henio`,
    description: event.description || `${event.date} · ${[event.location, event.city.name].filter(Boolean).join(', ')}`,
    alternates: { canonical: `${BASE_URL}/wydarzenie/${organizerId}/${monthId}/${id}` },
    openGraph: {
      title: `${event.title} – Pan Henio`,
      description: event.description,
      url: `${BASE_URL}/wydarzenie/${organizerId}/${monthId}/${id}`,
      type: 'article',
      publishedTime: event.createdAt,
    },
  }
}

function formatEventDate(dateStr, startTime, endTime) {
  const d = new Date(`${dateStr}T00:00:00`)
  const today = new Date().toISOString().split('T')[0]
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0]
  const date = d.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' })
  let dayLabel
  if (dateStr === today) dayLabel = 'dziś'
  else if (dateStr === tomorrow) dayLabel = 'jutro'
  else dayLabel = d.toLocaleDateString('pl-PL', { weekday: 'long' })
  let label = `${dayLabel}, ${date}`
  if (startTime) label += `, godz. ${startTime}`
  if (endTime) label += `–${endTime}`
  return label
}

function OrganizerIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function PersonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function CostIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  )
}

export default async function WydarzeniePage({ params, searchParams }) {
  const { organizerId, monthId, id } = await params
  const sp = await searchParams
  const backHref = sp.back || '/szukaj-wydarzen'
  const event = await fetchEvent(organizerId, monthId, id, sp.previewAccessToken)

  const breadcrumbLd = event
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Pan Henio', item: BASE_URL },
          { '@type': 'ListItem', position: 2, name: event.organizer.name, item: `${BASE_URL}/organizator/${organizerId}/wydarzenia-dla-seniorow` },
          { '@type': 'ListItem', position: 3, name: event.title, item: `${BASE_URL}/wydarzenie/${organizerId}/${monthId}/${id}` },
        ],
      }
    : null

  const jsonLd = event
    ? {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: event.title,
        description: event.description,
        startDate: event.startTime ? `${event.date}T${event.startTime}` : event.date,
        ...(event.endTime ? { endDate: `${event.date}T${event.endTime}` } : {}),
        location: {
          '@type': 'Place',
          name: event.location,
          address: {
            '@type': 'PostalAddress',
            addressLocality: event.city.name,
            addressCountry: 'PL',
          },
        },
        ...(event.facilitator ? { organizer: { '@type': 'Person', name: event.facilitator } } : {}),
        isAccessibleForFree: event.entryCost === 'bezpłatnie' || event.entryCost === 'bezpłatne',
        url: `${BASE_URL}/wydarzenie/${organizerId}/${monthId}/${id}`,
      }
    : null

  return (
    <div className={styles.page}>
      {breadcrumbLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <div className={styles.inner}>
{!event && <p className={styles.error}>Nie udało się załadować wydarzenia.</p>}
        {event && (
          <article className={styles.card}>
            <div className={styles.header}>
              <div className={styles.badges}>
                {event.categories?.map(c => (
                  <span key={c.id} className={styles.badge}>{c.name}</span>
                ))}
              </div>
              <a
                href={`/organizator/${encodeURIComponent(event.organizer.id)}/wydarzenia-dla-seniorow?miesiac=${event.month}`}
                className={styles.organizer}
              >
                <OrganizerIcon />
                <span>{event.organizer.name}</span>
              </a>
            </div>

            <h1 className={styles.title}>{event.title}</h1>

            <div className={styles.row}>
              <CalendarIcon />
              <strong className={styles.rowBold}>
                {formatEventDate(event.date, event.startTime, event.endTime)}
              </strong>
            </div>

            {(event.location || event.city?.name) && (
              <div className={styles.row}>
                <LocationIcon />
                <span>{[event.location, event.city?.name].filter(Boolean).join(', ')}</span>
              </div>
            )}

            {event.facilitator && (
              <div className={styles.row}>
                <PersonIcon />
                <span>{event.facilitator}</span>
              </div>
            )}

            {event.entryCost && (
              <div className={styles.row}>
                <CostIcon />
                <span>{event.entryCost}</span>
              </div>
            )}

            {(event.description || event.registration) && <hr className={styles.divider} />}

            {event.description && (
              <p className={styles.description}>{event.description}</p>
            )}

            {event.registration && (
              <p className={styles.registration}>{event.registration}</p>
            )}

            {event.sourceUrl && (
              <a href={event.sourceUrl} target="_blank" rel="noopener noreferrer" className={styles.sourceLink}>
                ŹRÓDŁO WYDARZENIA →
              </a>
            )}
          </article>
        )}
      </div>
    </div>
  )
}
