import { useState, useEffect } from 'react'
import styles from './EventPage.module.css'

export default function EventPage({ sourceId, eventId, backHref = '#szukaj' }) {
  const [event, setEvent] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    setEvent(null)
    setError(false)
    fetch(`/api/events/${encodeURIComponent(sourceId)}/${encodeURIComponent(eventId)}`)
      .then(r => {
        if (!r.ok) throw new Error()
        return r.json()
      })
      .then(setEvent)
      .catch(() => setError(true))
  }, [sourceId, eventId])

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <a href={backHref} className={styles.back}>← Wróć</a>
        {error && <p className={styles.error}>Nie udało się załadować wydarzenia.</p>}
        {!event && !error && <p className={styles.loading}>Ładowanie...</p>}
        {event && (
          <article className={styles.card}>
            <p className={styles.category}>{event.category.name}</p>
            <h1 className={styles.title}>{event.name}</h1>
            <div className={styles.meta}>
              <span>{event.date}{event.time ? ` · ${event.time}` : ''}</span>
              <span>{event.location}, {event.city.name}</span>
              {event.cost && <span>{event.cost}</span>}
            </div>
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
