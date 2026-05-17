import { notFound } from 'next/navigation'
import styles from '../page.module.css'
import OrganizerEventsContent from '../OrganizerEventsContent'
import { todayPL, tomorrowPL } from '../../../../../lib/dates'
import { fromPolishUrl, fromPolishMonthUrl, toPolishMonthUrl } from '../../../../../lib/polishDate'
import { fetchOrganizers, fetchOrganizerMonths, fetchEvents } from '../../../../../lib/api'

const BASE_URL = 'https://www.panhenio.pl'

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
      title: `Zajęcia dla seniorów – ${organizerName}, ${date} – Pan Henio`,
      description: `Warsztaty i spotkania dla seniorów od ${organizerName} w dniu ${date}. Sprawdź dostępną ofertę i zaplanuj swój dzień.`,
      alternates: { canonical: `${BASE_URL}/organizator/${organizerId}/wydarzenia-dla-seniorow/${segment}` },
    }
  }

  const monthLabel = new Date(`${isoMonth}-01T00:00:00`).toLocaleDateString('pl-PL', { month: 'long', year: 'numeric', timeZone: 'Europe/Warsaw' })
  return {
    title: `Zajęcia dla seniorów – ${organizerName}, ${monthLabel} – Pan Henio`,
    description: `Pełny program wydarzeń dla seniorów od ${organizerName} w ${monthLabel}. Warsztaty, spacery i spotkania – sprawdź harmonogram.`,
    alternates: { canonical: `${BASE_URL}/organizator/${organizerId}/wydarzenia-dla-seniorow/${segment}` },
    openGraph: {
      title: `Zajęcia dla seniorów – ${organizerName}, ${monthLabel} – Pan Henio`,
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

  const [organizers, months] = await Promise.all([fetchOrganizers(), fetchOrganizerMonths(organizerId)])
  const organizer = organizers.find(o => o.id === organizerId)
  if (!organizer) notFound()

  const events = await fetchEvents({ organizerId, month: isoMonth, dateFrom: isoDay, dateTo: isoDay })

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
