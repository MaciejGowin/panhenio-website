import styles from '../../../../components/EventPage/EventPage.module.css'

const BASE_URL = 'https://www.panhenio.pl'

async function fetchEvent(sourceId, id) {
  try {
    const res = await fetch(
      `${BASE_URL}/api/events/${encodeURIComponent(sourceId)}/${encodeURIComponent(id)}`,
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export async function generateMetadata({ params }) {
  const { sourceId, id } = await params
  const event = await fetchEvent(sourceId, id)
  if (!event) return { title: 'Wydarzenie – Pan Henio' }
  return {
    title: `${event.title} – Pan Henio`,
    description: event.description || `${event.date} · ${event.location}, ${event.city.name}`,
    openGraph: {
      title: `${event.title} – Pan Henio`,
      description: event.description,
      url: `${BASE_URL}/wydarzenie/${sourceId}/${id}`,
    },
  }
}

export default async function WydarzeniePage({ params, searchParams }) {
  const { sourceId, id } = await params
  const sp = await searchParams
  const backHref = sp.back || '/szukaj-wydarzen'
  const event = await fetchEvent(sourceId, id)

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
        url: `${BASE_URL}/wydarzenie/${sourceId}/${id}`,
      }
    : null

  return (
    <div className={styles.page}>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <div className={styles.inner}>
        <a href={backHref} className={styles.back}>← Wróć</a>
        {!event && <p className={styles.error}>Nie udało się załadować wydarzenia.</p>}
        {event && (
          <article className={styles.card}>
            <p className={styles.category}>{event.category.name}</p>
            <h1 className={styles.title}>{event.title}</h1>
            <div className={styles.meta}>
              <span>{event.date}{event.startTime ? ` · ${event.startTime}` : ''}{event.endTime ? `–${event.endTime}` : ''}</span>
              <span>{event.location}, {event.city.name}</span>
              {event.entryCost && <span>{event.entryCost}</span>}
              {event.facilitator && <span>{event.facilitator}</span>}
            </div>
            {event.registration && (
              <p className={styles.registration}>{event.registration}</p>
            )}
            {event.description && (
              <p className={styles.description}>{event.description}</p>
            )}
            {event.source?.url && (
              <a href={event.source.url} target="_blank" rel="noopener noreferrer" className={styles.sourceLink}>
                Źródło wydarzenia →
              </a>
            )}
          </article>
        )}
      </div>
    </div>
  )
}
