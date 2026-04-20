import styles from './page.module.css'
import { fetchCities } from '../../lib/api'

const BASE_URL = 'https://www.panhenio.pl'

export const metadata = {
  title: 'Miasta – wydarzenia dla seniorów – Pan Henio',
  description: 'Lista miast z wydarzeniami dla seniorów w Polsce. Znajdź warsztaty, spacery i spotkania w swoim mieście.',
  alternates: { canonical: `${BASE_URL}/miasta` },
  openGraph: {
    title: 'Miasta – wydarzenia dla seniorów – Pan Henio',
    description: 'Lista miast z wydarzeniami dla seniorów w Polsce.',
    url: `${BASE_URL}/miasta`,
  },
}

export default async function MiastaPage() {
  const cities = await fetchCities()

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Miasta</h1>
        {cities.length === 0 ? (
          <p className={styles.empty}>Brak miast.</p>
        ) : (
          <ul className={styles.list}>
            {cities.map(city => (
              <li key={city.id}>
                <a
                  href={`/${encodeURIComponent(city.id)}/wydarzenia-dla-seniorow`}
                  className={styles.card}
                >
                  <span className={styles.name}>{city.name}</span>
                  <span className={styles.arrow}>→</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
