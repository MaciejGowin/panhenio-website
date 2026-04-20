import styles from './Latest.module.css'
import EventCard from '../EventCard/EventCard'
import { cityAllEvents } from '../../config/cityTitles'

const BASE_URL = 'https://www.panhenio.pl'

async function fetchLatestEvents(cityId) {
  try {
    const url = new URL(`${BASE_URL}/api/events/latest`)
    if (cityId) url.searchParams.set('cityId', cityId)
    const res = await fetch(url.toString(), { cache: 'no-store' })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

export default async function Latest({ cityId }) {
  const events = await fetchLatestEvents(cityId)
  if (events.length === 0) return null

  const today = new Date().toISOString().split('T')[0]
  const cityHref = cityId ? `/${cityId}/wydarzenia-dla-seniorow?dzien=${today}` : '/szukaj-wydarzen'
  const cityLabel = (cityId && cityAllEvents[cityId]) ?? `Wszystkie w lokalizacji ${cityId}`

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.headingRow}>
          <h2 className={styles.heading}>Dziś</h2>
          <a href={cityHref} className={styles.seeAll}>
            {cityLabel}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </a>
        </div>
        <ul className={styles.list}>
          {events.map(event => (
            <li key={`${event.organizer.id}-${event.month}-${event.id}`}>
              <EventCard
                event={event}
                href={`/wydarzenie/${encodeURIComponent(event.organizer.id)}/${encodeURIComponent(event.month)}/${encodeURIComponent(event.id)}`}
                organizerHref={`/organizator/${encodeURIComponent(event.organizer.id)}/wydarzenia-dla-seniorow?miesiac=${event.month}`}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
