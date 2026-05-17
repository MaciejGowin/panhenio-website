import { notFound } from 'next/navigation'
import styles from './page.module.css'
import OrganizerEventsContent from './OrganizerEventsContent'
import { todayPL, tomorrowPL } from '../../../../lib/dates'
import { fetchOrganizers, fetchOrganizerMonths, fetchEvents } from '../../../../lib/api'

const BASE_URL = 'https://www.panhenio.pl'

export async function generateMetadata({ params }) {
  const { organizerId } = await params
  const organizers = await fetchOrganizers()
  const organizer = organizers.find(o => o.id === organizerId)
  const organizerName = organizer?.name ?? organizerId

  return {
    title: `Dzisiejsze zajęcia dla seniorów – ${organizerName} – Pan Henio`,
    description: `Sprawdź dzisiejszą ofertę dla seniorów od ${organizerName}. Warsztaty, spotkania i aktywności – wstęp często bezpłatny.`,
    alternates: { canonical: `${BASE_URL}/organizator/${organizerId}/wydarzenia-dla-seniorow` },
    openGraph: {
      title: `Dzisiejsze zajęcia dla seniorów – ${organizerName} – Pan Henio`,
      description: `Sprawdź dzisiejszą ofertę dla seniorów od ${organizerName}. Warsztaty, spotkania i aktywności – wstęp często bezpłatny.`,
      url: `${BASE_URL}/organizator/${organizerId}/wydarzenia-dla-seniorow`,
    },
  }
}

export default async function OrganizerEventsPage({ params }) {
  const { organizerId } = await params
  const today = todayPL()
  const tomorrow = tomorrowPL()

  const [organizers, months] = await Promise.all([fetchOrganizers(), fetchOrganizerMonths(organizerId)])
  const organizer = organizers.find(o => o.id === organizerId)
  if (!organizer) notFound()

  const events = await fetchEvents({ organizerId, dateFrom: today, dateTo: today })

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Pan Henio', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: organizer.name, item: `${BASE_URL}/organizator/${organizerId}/wydarzenia-dla-seniorow` },
    ],
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Wydarzenia dla seniorów – ${organizer.name}`,
    url: `${BASE_URL}/organizator/${organizerId}/wydarzenia-dla-seniorow`,
    numberOfItems: events.length,
    itemListElement: events.map((event, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Event',
        name: event.title,
        startDate: event.startTime ? `${event.date}T${event.startTime}` : event.date,
        location: {
          '@type': 'Place',
          name: event.location,
          address: {
            '@type': 'PostalAddress',
            addressLocality: event.city?.name,
            addressCountry: 'PL',
          },
        },
        url: `${BASE_URL}/wydarzenie/${event.organizer.id}/${event.month}/${event.id}`,
      },
    })),
  }

  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <OrganizerEventsContent
        organizerId={organizerId}
        organizerName={organizer.name}
        months={months}
        effectiveMonth={null}
        effectiveDay={today}
        events={events}
        today={today}
        tomorrow={tomorrow}
        isCalendar={false}
      />
    </div>
  )
}
