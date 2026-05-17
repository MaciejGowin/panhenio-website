export const metadata = {
  alternates: { canonical: 'https://www.panhenio.pl/' },
}

import Hero from '../components/Hero/Hero'
import Categories from '../components/Categories/Categories'
import Latest from '../components/Latest/Latest'
import Promoted from '../components/Promoted/Promoted'
import Newsletter from '../components/Newsletter/Newsletter'
import styles from './page.module.css'
import { cityInDeclination } from '../config/cityConfigs'
import { fetchCities } from '../lib/api'

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Pan Henio',
  url: 'https://www.panhenio.pl',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://www.panhenio.pl/szukaj-wydarzen?miasto={city}',
    'query-input': 'required name=city',
  },
}

export default async function HomePage() {
  const cities = await fetchCities()
  const city = cities.find(c => c.default) ?? cities[0] ?? null
  const cityTitle = city ? `Wydarzenia dla seniorów ${cityInDeclination[city.id] ?? `w mieście ${city.name}`}` : null

  return (
    <main className={styles.main}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
<Hero cityTitle={cityTitle} />
      <Latest cityId={city?.id} />
      <Newsletter cities={cities} defaultCityId={city?.id ?? null} />
      <Promoted cityId={city?.id} />
      <Categories />
    </main>
  )
}
