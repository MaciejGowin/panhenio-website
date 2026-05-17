import styles from './page.module.css'
import OrganizersList from './OrganizersList'
import { organizerDescriptions } from '../../config/organizerConfigs'
import { fetchOrganizers } from '../../lib/api'

const BASE_URL = 'https://www.panhenio.pl'

export const metadata = {
  title: 'Organizatorzy zajęć dla seniorów w Polsce – Pan Henio',
  description: 'Domy kultury, centra aktywności, fundacje i stowarzyszenia organizujące zajęcia dla seniorów. Znajdź warsztaty i spotkania blisko siebie.',
  alternates: { canonical: `${BASE_URL}/organizatorzy` },
  openGraph: {
    title: 'Organizatorzy zajęć dla seniorów w Polsce – Pan Henio',
    description: 'Domy kultury, centra aktywności, fundacje i stowarzyszenia organizujące zajęcia dla seniorów w Polsce.',
    url: `${BASE_URL}/organizatorzy`,
  },
}

export default async function OrganizatorzyPage() {
  const organizers = await fetchOrganizers()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Organizatorzy wydarzeń dla seniorów',
    url: `${BASE_URL}/organizatorzy`,
    numberOfItems: organizers.length,
    itemListElement: organizers.map((org, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Organization',
        name: org.name,
        url: `${BASE_URL}/organizator/${org.id}/wydarzenia-dla-seniorow`,
      },
    })),
  }

  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className={styles.inner}>
        <h1 className={styles.title}>Organizatorzy wydarzeń</h1>
        {organizers.length === 0 ? (
          <p className={styles.empty}>Brak organizatorów.</p>
        ) : (
          <OrganizersList organizers={organizers} descriptions={organizerDescriptions} />
        )}
      </div>
    </div>
  )
}
