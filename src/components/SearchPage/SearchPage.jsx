'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styles from './SearchPage.module.css'
import EventCard from '../EventCard/EventCard'
import { todayPL } from '../../lib/dates'
import { toPolishMonthUrl } from '../../lib/polishDate'

export default function SearchPage({ initialCityId = '', initialCategoryId = '' }) {
  const [cityId, setCityId] = useState(initialCityId)
  const [categoryId, setCategoryId] = useState(initialCategoryId)
  const [cities, setCities] = useState([])
  const [categories, setCategories] = useState([])
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/cities')
      .then(r => r.json())
      .then(data => {
        setCities(data)
        if (!initialCityId) {
          const defaultCity = data.find(c => c.default)
          if (defaultCity) setCityId(defaultCity.id)
        }
      })
      .catch(() => {})
    fetch('/api/categories').then(r => r.json()).then(setCategories).catch(() => {})
  }, [])

  useEffect(() => {
    search(initialCityId, initialCategoryId)
  }, [])

  function buildUrl(c, cat) {
    const params = new URLSearchParams()
    if (c) params.set('miasto', c)
    if (cat) params.set('kategoria', cat)
    const qs = params.toString()
    return qs ? `/szukaj-wydarzen?${qs}` : '/szukaj-wydarzen'
  }

  function handleSearch(e) {
    e?.preventDefault()
    router.replace(buildUrl(cityId, categoryId))
    search(cityId, categoryId)
  }

  async function search(c, cat) {
    const params = new URLSearchParams()
    if (c) params.set('cityId', c)
    if (cat) params.set('categoryId', cat)
    params.set('dateFrom', todayPL())
    setLoading(true)
    try {
      const res = await fetch(`/api/events?${params.toString()}`)
      const data = await res.json()
      setResults(data)
    } catch {
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
<h1 className={styles.title}>Szukaj wszystkich wydarzeń dla seniorów</h1>
        <p className={styles.description}>Przeglądaj warsztaty, spacery, spotkania i inne aktywności dla seniorów w Polsce. Wybierz miasto i kategorię, aby znaleźć coś dla siebie.</p>

        <form className={styles.form} onSubmit={handleSearch}>
          <div className={styles.filterRow}>
            <select
              className={styles.select}
              value={cityId}
              onChange={e => setCityId(e.target.value)}
            >
              {cities.map(city => (
                <option key={city.id} value={city.id}>{city.name}</option>
              ))}
            </select>
            <select
              className={styles.select}
              value={categoryId}
              onChange={e => setCategoryId(e.target.value)}
            >
              <option value="">Wszystkie kategorie</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <button type="submit" className={styles.button}>
              <SearchIcon />
              Filtruj
            </button>
          </div>
        </form>

        {loading && (
          <div className={styles.loading}>
            <img src="/panhenio-logo.png" alt="" className={styles.spinner} />
            <p className={styles.loadingText}>Szukamy…</p>
          </div>
        )}

        {!loading && results !== null && (
          results.length === 0 ? (
            <p className={styles.status}>Brak wyników.</p>
          ) : (
            <ul className={styles.cards}>
              {results.map((event, i) => (
                <li key={i}>
                  <EventCard
                    event={event}
                    href={`/wydarzenie/${encodeURIComponent(event.organizer.id)}/${encodeURIComponent(event.month)}/${encodeURIComponent(event.id)}`}
                    organizerHref={`/organizator/${encodeURIComponent(event.organizer.id)}/wydarzenia-dla-seniorow/${toPolishMonthUrl(event.month)}`}
                  />
                </li>
              ))}
            </ul>
          )
        )}
      </div>
    </div>
  )
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}
