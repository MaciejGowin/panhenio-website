import styles from './Latest.module.css'
import EventCard from '../EventCard/EventCard'
import { cityInDeclination } from '../../config/cityConfigs'
import { toPolishMonthUrl } from '../../lib/polishDate'
import { fetchLatestEvents } from '../../lib/api'

export default async function Latest({ cityId }) {
  const events = await fetchLatestEvents(cityId)
  if (events.length === 0) return null

  const cityHref = cityId ? `/${cityId}/wydarzenia-dla-seniorow` : '/szukaj-wydarzen'
  const cityLabel = cityId ? `Wszystkie ${cityInDeclination[cityId] ?? `w mieście ${cityId}`}` : 'Wszystkie wydarzenia'

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
                organizerHref={`/organizator/${encodeURIComponent(event.organizer.id)}/wydarzenia-dla-seniorow/${toPolishMonthUrl(event.month)}`}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
