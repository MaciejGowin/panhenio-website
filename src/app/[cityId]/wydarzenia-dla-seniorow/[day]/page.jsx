import { notFound, redirect } from 'next/navigation'
import styles from '../page.module.css'
import CityEventsContent from '../CityEventsContent'
import { fetchCities } from '../../../../lib/api'
import { todayPL, tomorrowPL } from '../../../../lib/dates'
import { fromPolishUrl } from '../../../../lib/polishDate'
import { cityInDeclination } from '../../../../config/cityConfigs'

const BASE_URL = 'https://www.panhenio.pl'

async function fetchEvents(cityId, iso) {
  try {
    const url = new URL(`${BASE_URL}/api/events`)
    url.searchParams.set('cityId', cityId)
    url.searchParams.set('dateFrom', iso)
    url.searchParams.set('dateTo', iso)
    const res = await fetch(url.toString(), { cache: 'no-store' })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

export async function generateMetadata({ params }) {
  const { cityId, day } = await params
  const iso = fromPolishUrl(day)
  if (!iso) return {}
  const cities = await fetchCities()
  const city = cities.find(c => c.id === cityId)
  const cityName = city?.name ?? cityId
  const date = new Date(`${iso}T00:00:00`).toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Warsaw' })

  return {
    title: `Wydarzenia dla seniorów w ${cityName}, ${date} – Pan Henio`,
    description: `Warsztaty, spacery i spotkania dla seniorów ${cityInDeclination[cityId] ?? `w mieście ${cityName}`} w dniu ${date}. Sprawdź dostępne aktywności i zaplanuj swój dzień.`,
    alternates: { canonical: `${BASE_URL}/${cityId}/wydarzenia-dla-seniorow/${day}` },
  }
}

export default async function CityDayPage({ params }) {
  const { cityId, day } = await params
  const iso = fromPolishUrl(day)
  if (!iso) notFound()

  const today = todayPL()
  if (iso === today) redirect(`/${cityId}/wydarzenia-dla-seniorow`)

  const tomorrow = tomorrowPL()
  const [cities, events] = await Promise.all([fetchCities(), fetchEvents(cityId, iso)])
  const city = cities.find(c => c.id === cityId)
  if (!city) notFound()

  return (
    <div className={styles.page}>
      <CityEventsContent
        cityId={cityId}
        cityName={city.name}
        effectiveDay={iso}
        events={events}
        today={today}
        tomorrow={tomorrow}
      />
    </div>
  )
}
