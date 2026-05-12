import styles from './page.module.css'
import EventCard from '../../../../components/EventCard/EventCard'
import CalendarGrid from './CalendarGrid'
import { organizerDescriptions } from '../../../../config/organizerConfigs'
import { toPolishUrl, toPolishMonthUrl } from '../../../../lib/polishDate'

function formatMonth(isoMonth) {
  const date = new Date(`${isoMonth}-01T00:00:00`)
  return date.toLocaleDateString('pl-PL', { month: 'long', year: 'numeric', timeZone: 'Europe/Warsaw' })
}

function formatDate(dateStr) {
  const date = new Date(`${dateStr}T00:00:00`)
  return date.toLocaleDateString('pl-PL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Warsaw' })
}

function groupByDate(events) {
  const map = new Map()
  for (const event of events) {
    if (!map.has(event.date)) map.set(event.date, [])
    map.get(event.date).push(event)
  }
  return [...map.entries()]
}

function buildUrl(organizerId, { month, day, widok } = {}) {
  const base = `/organizator/${organizerId}/wydarzenia-dla-seniorow`
  const path = day ? `${base}/${toPolishUrl(day)}`
              : month ? `${base}/${toPolishMonthUrl(month)}`
              : base
  const qs = widok && widok !== 'lista' ? `?widok=${widok}` : ''
  return `${path}${qs}`
}

export default function OrganizerEventsContent({
  organizerId, organizerName, months, effectiveMonth, effectiveDay, events, today, tomorrow, isCalendar,
}) {
  return (
    <div className={styles.inner}>
      <h1 className={styles.title}>
        Wydarzenia dla seniorów organizowane przez {organizerName}
      </h1>

      {organizerDescriptions[organizerId] && (
        <p className={styles.description}>{organizerDescriptions[organizerId]}</p>
      )}

      <div className={styles.toolbar}>
        <div className={styles.monthTabs}>
          <a
            href={buildUrl(organizerId, { day: today })}
            className={`${styles.monthTab} ${effectiveDay === today ? styles.monthTabActive : ''}`}
          >
            dziś
          </a>
          <a
            href={buildUrl(organizerId, { day: tomorrow })}
            className={`${styles.monthTab} ${effectiveDay === tomorrow ? styles.monthTabActive : ''}`}
          >
            jutro
          </a>
          {months.map(m => (
            <a
              key={m}
              href={buildUrl(organizerId, { month: m })}
              className={`${styles.monthTab} ${!effectiveDay && effectiveMonth === m ? styles.monthTabActive : ''}`}
            >
              {formatMonth(m)}
            </a>
          ))}
        </div>

        {!effectiveDay && (
          <div className={styles.viewToggle}>
            <a
              href={buildUrl(organizerId, { month: effectiveMonth })}
              className={`${styles.viewTab} ${!isCalendar ? styles.viewTabActive : ''}`}
            >
              lista
            </a>
            <a
              href={buildUrl(organizerId, { month: effectiveMonth, widok: 'kalendarz' })}
              className={`${styles.viewTab} ${isCalendar ? styles.viewTabActive : ''}`}
            >
              kalendarz
            </a>
          </div>
        )}
      </div>

      {isCalendar && effectiveMonth && !effectiveDay ? (
        <CalendarGrid month={effectiveMonth} events={events} organizerId={organizerId} />
      ) : events.length === 0 ? (
        <p className={styles.empty}>Brak nadchodzących wydarzeń tego organizatora.</p>
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
                    organizerHref={buildUrl(event.organizer.id, { month: event.month })}
                  />
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
    </div>
  )
}
