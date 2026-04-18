export const metadata = {
  alternates: { canonical: 'https://www.panhenio.pl/' },
}

import Hero from '../components/Hero/Hero'
import Categories from '../components/Categories/Categories'
import Latest from '../components/Latest/Latest'
import Promoted from '../components/Promoted/Promoted'
import styles from './page.module.css'
import { cityTitles } from '../config/cityTitles'

async function fetchDefaultCity() {
  try {
    const res = await fetch('https://www.panhenio.pl/api/cities', { cache: 'no-store' })
    if (!res.ok) return null
    const cities = await res.json()
    return cities.find(c => c.default) ?? cities[0] ?? null
  } catch {
    return null
  }
}

export default async function HomePage() {
  const city = await fetchDefaultCity()
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
