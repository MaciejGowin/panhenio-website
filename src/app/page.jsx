export const metadata = {
  alternates: { canonical: 'https://www.panhenio.pl/' },
}

import Hero from '../components/Hero/Hero'
import Categories from '../components/Categories/Categories'
import Latest from '../components/Latest/Latest'
import Promoted from '../components/Promoted/Promoted'
import styles from './page.module.css'
import { cityTitles } from '../config/cityTitles'
import { fetchCities } from '../lib/api'

export default async function HomePage() {
  const cities = await fetchCities()
  const city = cities.find(c => c.default) ?? cities[0] ?? null
  const cityTitle = city ? (cityTitles[city.id] ?? `Wydarzenia dla seniorów w ${city.name}`) : null

  return (
    <main className={styles.main}>
      <Hero cityTitle={cityTitle} />
      <Latest cityId={city?.id} />
      <Promoted cityId={city?.id} />
      <Categories />
    </main>
  )
}
