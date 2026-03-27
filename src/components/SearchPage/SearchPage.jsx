import { useState, useEffect } from 'react'
import styles from './SearchPage.module.css'

export default function SearchPage({ initialPhrase = '', initialCityId = '', initialCategoryId = '' }) {
  const [phrase, setPhrase] = useState(initialPhrase)
  const [cityId, setCityId] = useState(initialCityId)
  const [categoryId, setCategoryId] = useState(initialCategoryId)
  const [cities, setCities] = useState([])
  const [categories, setCategories] = useState([])
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('/api/cities').then(r => r.json()).then(setCities).catch(() => {})
    fetch('/api/categories').then(r => r.json()).then(setCategories).catch(() => {})
  }, [])

  useEffect(() => {
    search(initialPhrase, initialCityId, initialCategoryId)
  }, [])

  function buildHash(p, c, cat) {
    const params = new URLSearchParams()
    if (p) params.set('phrase', p)
    if (c) params.set('cityId', c)
    if (cat) params.set('categoryId', cat)
    const qs = params.toString()
    return qs ? `#szukaj?${qs}` : '#szukaj'
  }

  function handleSearch(e) {
    e?.preventDefault()
    window.history.replaceState(null, '', buildHash(phrase, cityId, categoryId))
    search(phrase, cityId, categoryId)
  }

  async function search(p, c, cat) {
    const params = new URLSearchParams()
    if (p) params.set('phrase', p)
    if (c) params.set('cityId', c)
    if (cat) params.set('categoryId', cat)
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
        <a href="#" className={styles.back}>← Strona główna</a>
        <h1 className={styles.title}>Szukaj wydarzeń</h1>

        <form className={styles.form} onSubmit={handleSearch}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              className={styles.input}
              placeholder="Szukaj wydarzeń, zajęć lub miejsca"
              value={phrase}
              onChange={e => setPhrase(e.target.value)}
            />
            {phrase && (
              <button
                type="button"
                className={styles.clearButton}
                onClick={() => setPhrase('')}
                aria-label="Wyczyść frazę"
              >
                ×
              </button>
            )}
          </div>
          <div className={styles.selects}>
            <select
              className={styles.select}
              value={cityId}
              onChange={e => setCityId(e.target.value)}
            >
              <option value="">Wszystkie miasta</option>
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
          </div>
          <button type="submit" className={styles.button}>
            <SearchIcon />
            Szukaj
          </button>
        </form>

        {loading && (
          <div className={styles.loading}>
            <img src="/panhenio-favicon.png" alt="" className={styles.spinner} />
            <p className={styles.loadingText}>Szukamy…</p>
          </div>
        )}

        {!loading && results !== null && (
          results.length === 0 ? (
            <p className={styles.status}>Brak wyników.</p>
          ) : (
            <ul className={styles.cards}>
              {results.map((event, i) => (
                <li key={i} className={styles.card}>
                  <span className={styles.cardCategory}>{event.category.name}</span>
                  <span className={styles.cardName}>{event.name}</span>
                  <span className={styles.cardMeta}>{event.location}, {event.city.name}</span>
                  <span className={styles.cardMeta}>{event.date}{event.time ? ` · ${event.time}` : ''}</span>
                  <a
                    href={`#wydarzenie/${encodeURIComponent(event.source.id)}/${encodeURIComponent(event.id)}?back=${encodeURIComponent(buildHash(phrase, cityId, categoryId))}`}
                    className={styles.cardLink}
                  >
                    Zobacz szczegóły →
                  </a>
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
