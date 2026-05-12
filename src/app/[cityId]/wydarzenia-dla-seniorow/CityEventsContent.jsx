import styles from './page.module.css'
import EventCard from '../../../components/EventCard/EventCard'
import { cityTitles, cityDescriptions } from '../../../config/cityConfigs'
import { toPolishUrl } from '../../../lib/polishDate'

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

function dayUrl(cityId, day, today) {
  return day === today
    ? `/${cityId}/wydarzenia-dla-seniorow`
    : `/${cityId}/wydarzenia-dla-seniorow/${toPolishUrl(day)}`
}

export default function CityEventsContent({ cityId, cityName, effectiveDay, events, today, tomorrow }) {
  const prevDay = offsetDay(effectiveDay, -1)
  const nextDay = offsetDay(effectiveDay, 1)

  return (
    <div className={styles.inner}>
      <h1 className={styles.title}>
        {cityTitles[cityId] ?? `Wydarzenia dla seniorów w lokalizacji ${cityName}`}
      </h1>

      {cityDescriptions[cityId] && (
        <p className={styles.description}>{cityDescriptions[cityId]}</p>
      )}

      <div className={styles.dayNav}>
        {effectiveDay > today
          ? <a href={dayUrl(cityId, prevDay, today)} className={styles.dayNavArrow}>←</a>
          : <span className={styles.dayNavArrowDisabled}>←</span>
        }
        <span className={styles.dayNavLabel}>{formatDayLabel(effectiveDay, today, tomorrow)}</span>
        <a href={dayUrl(cityId, nextDay, today)} className={styles.dayNavArrow}>→</a>
        <a href={`/${cityId}/wydarzenia-dla-seniorow`} className={`${styles.dayNavQuick} ${effectiveDay === today ? styles.dayNavQuickActive : ''}`}>dziś</a>
        <a href={dayUrl(cityId, tomorrow, today)} className={`${styles.dayNavQuick} ${effectiveDay === tomorrow ? styles.dayNavQuickActive : ''}`}>jutro</a>
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
  )
}
