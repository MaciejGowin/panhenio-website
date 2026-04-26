import styles from './page.module.css'
import OrganizersList from './OrganizersList'

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

export const metadata = {
  title: 'Organizatorzy wydarzeń dla seniorów – Pan Henio',
  description: 'Lista organizatorów wydarzeń dla seniorów w Polsce. Znajdź warsztaty, spacery i spotkania w swoim mieście.',
  alternates: { canonical: `${BASE_URL}/organizatorzy` },
  openGraph: {
    title: 'Organizatorzy wydarzeń dla seniorów – Pan Henio',
    description: 'Lista organizatorów wydarzeń dla seniorów w Polsce.',
    url: `${BASE_URL}/organizatorzy`,
  },
}

export default async function OrganizatorzyPage() {
  const organizers = await fetchOrganizers()

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Organizatorzy wydarzeń</h1>
        {organizers.length === 0 ? (
          <p className={styles.empty}>Brak organizatorów.</p>
        ) : (
          <OrganizersList organizers={organizers} />
        )}
      </div>
    </div>
  )
}
