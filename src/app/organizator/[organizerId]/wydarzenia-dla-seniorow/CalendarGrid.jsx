import styles from './page.module.css'

const DAY_NAMES = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'Nd']

export default function CalendarGrid({ month, events, organizerId, backHref }) {
  const [year, monthNum] = month.split('-').map(Number)
  const firstDay = new Date(year, monthNum - 1, 1)
  const daysInMonth = new Date(year, monthNum, 0).getDate()

  // Monday-based offset (0=Mon … 6=Sun)
  const startOffset = (firstDay.getDay() + 6) % 7

  const eventsByDay = {}
  for (const event of events) {
    const day = parseInt(event.date.split('-')[2], 10)
    if (!eventsByDay[day]) eventsByDay[day] = []
    eventsByDay[day].push(event)
  }

  const cells = []
  for (let i = 0; i < startOffset; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  return (
    <div className={styles.calendar}>
      <div className={styles.calendarGrid}>
        {DAY_NAMES.map(name => (
          <div key={name} className={styles.calendarDayName}>{name}</div>
        ))}
        {cells.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} className={styles.calendarCell} />
          const dayEvents = eventsByDay[day] ?? []
          const dateStr = `${month}-${String(day).padStart(2, '0')}`
          return (
            <div key={day} className={`${styles.calendarCell} ${dayEvents.length > 0 ? styles.calendarCellHasEvents : ''}`}>
              <span className={styles.calendarDayNum}>{day}</span>
              {dayEvents.map((event, j) => (
                <a
                  key={j}
                  href={`/wydarzenie/${encodeURIComponent(event.organizer.id)}/${encodeURIComponent(event.month)}/${encodeURIComponent(event.id)}?back=${encodeURIComponent(backHref)}`}
                  className={styles.calendarEvent}
                  title={event.title}
                >
                  {event.startTime && <span className={styles.calendarEventTime}>{event.startTime}</span>}
                  <span className={styles.calendarEventTitle}>{event.title}</span>
                </a>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}
