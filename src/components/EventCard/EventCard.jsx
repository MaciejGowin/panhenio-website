import styles from './EventCard.module.css'
import { todayPL, tomorrowPL } from '../../lib/dates'

function formatEventDate(dateStr, startTime) {
  const d = new Date(`${dateStr}T00:00:00`)
  const today = todayPL()
  const tomorrow = tomorrowPL()
  const date = d.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', timeZone: 'Europe/Warsaw' })
  let dayLabel
  if (dateStr === today) dayLabel = 'dziś'
  else if (dateStr === tomorrow) dayLabel = 'jutro'
  else dayLabel = d.toLocaleDateString('pl-PL', { weekday: 'long', timeZone: 'Europe/Warsaw' }).toLowerCase()
  let label = `${dayLabel}, ${date}`
  if (startTime) label += `, godz. ${startTime}`
  return label
}

function formatCreatedAt(dateStr) {
  if (!dateStr) return null
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'Dodano dziś'
  if (days === 1) return 'Dodano wczoraj'
  return `Dodano ${days} dni temu`
}

export default function EventCard({ event, href, organizerHref }) {
  const dateLabel = formatEventDate(event.date, event.startTime)
  const addedLabel = formatCreatedAt(event.createdAt)

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.badges}>
          {event.categories?.map(c => (
            <span key={c.id} className={styles.badge}>{c.name}</span>
          ))}
        </div>
        <a href={organizerHref} className={styles.organizer}>
          <OrganizerIcon />
          <span>{event.organizer.name}</span>
        </a>
      </div>

      <a href={href} className={styles.title}>{event.title}</a>

      <div className={styles.row}>
        <CalendarIcon />
        <strong className={styles.rowBold}>{dateLabel}</strong>
      </div>

      {(event.location || event.city?.name) && (
        <div className={styles.row}>
          <LocationIcon />
          <span>{[event.location, event.city?.name].filter(Boolean).join(', ')}</span>
        </div>
      )}

      {event.description && (
        <p className={styles.description}>{event.description}</p>
      )}

      <div className={styles.footer}>
        {addedLabel && (
          <span className={styles.added}>
            <ClockIcon />
            {addedLabel}
          </span>
        )}
        <a href={href} className={styles.cta}>ZOBACZ SZCZEGÓŁY</a>
      </div>
    </div>
  )
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
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}
