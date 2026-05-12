import { notFound } from 'next/navigation'
import styles from '../page.module.css'
import OrganizerEventsContent from '../OrganizerEventsContent'
import { todayPL, tomorrowPL } from '../../../../../lib/dates'
import { fromPolishUrl, fromPolishMonthUrl, toPolishMonthUrl } from '../../../../../lib/polishDate'

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

async function fetchEvents(organizerId, { month, day }) {
  try {
    const url = new URL(`${BASE_URL}/api/events`)
    url.searchParams.set('organizerId', organizerId)
    if (day) {
      url.searchParams.set('dateFrom', day)
      url.searchParams.set('dateTo', day)
    } else if (month) {
      url.searchParams.set('month', month)
    }
    const res = await fetch(url.toString(), { cache: 'no-store' })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

export async function generateMetadata({ params }) {
  const { organizerId, segment } = await params
  const isoDay = fromPolishUrl(segment)
  const isoMonth = fromPolishMonthUrl(segment)
  if (!isoDay && !isoMonth) return {}

  const organizers = await fetchOrganizers()
  const organizer = organizers.find(o => o.id === organizerId)
  const organizerName = organizer?.name ?? organizerId

  if (isoDay) {
    const date = new Date(`${isoDay}T00:00:00`).toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Warsaw' })
    return {
      title: `${organizerName} – ${date} – Pan Henio`,
      description: `Wydarzenia dla seniorów organizowane przez ${organizerName} w dniu ${date}.`,
      alternates: { canonical: `${BASE_URL}/organizator/${organizerId}/wydarzenia-dla-seniorow/${segment}` },
    }
  }

  const monthLabel = new Date(`${isoMonth}-01T00:00:00`).toLocaleDateString('pl-PL', { month: 'long', year: 'numeric', timeZone: 'Europe/Warsaw' })
  return {
    title: `${organizerName} – ${monthLabel} – Pan Henio`,
    description: `Wydarzenia dla seniorów organizowane przez ${organizerName} w ${monthLabel}.`,
    alternates: { canonical: `${BASE_URL}/organizator/${organizerId}/wydarzenia-dla-seniorow/${segment}` },
    openGraph: {
      title: `${organizerName} – ${monthLabel} – Pan Henio`,
      url: `${BASE_URL}/organizator/${organizerId}/wydarzenia-dla-seniorow/${segment}`,
    },
  }
}

export default async function OrganizerSegmentPage({ params, searchParams }) {
  const { organizerId, segment } = await params
  const { widok } = await searchParams

  const isoDay = fromPolishUrl(segment)
  const isoMonth = fromPolishMonthUrl(segment)
  if (!isoDay && !isoMonth) notFound()

  const isCalendar = !isoDay && widok === 'kalendarz'
  const today = todayPL()
  const tomorrow = tomorrowPL()

  const [organizers, months] = await Promise.all([fetchOrganizers(), fetchMonths(organizerId)])
  const organizer = organizers.find(o => o.id === organizerId)
  if (!organizer) notFound()

  const events = await fetchEvents(organizerId, { month: isoMonth, day: isoDay })

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Pan Henio', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: organizer.name, item: `${BASE_URL}/organizator/${organizerId}/wydarzenia-dla-seniorow` },
    ],
  }

  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <OrganizerEventsContent
        organizerId={organizerId}
        organizerName={organizer.name}
        months={months}
        effectiveMonth={isoDay ? null : isoMonth}
        effectiveDay={isoDay ?? null}
        events={events}
        today={today}
        tomorrow={tomorrow}
        isCalendar={isCalendar}
      />
    </div>
  )
}
