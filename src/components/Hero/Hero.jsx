import { useState } from 'react'
import styles from './Hero.module.css'

export default function Hero() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(null)

  async function handleSearch() {
    const res = await fetch('/data/events.json')
    const events = await res.json()
    const q = query.trim().toLowerCase()
    setResults(q ? events.filter(e =>
      e.name.toLowerCase().includes(q) ||
      e.location.toLowerCase().includes(q) ||
      e.city.toLowerCase().includes(q)
    ) : events)
  }

  return (
    <>
      <section className={styles.hero}>
        <h1 className={styles.title}>Pan Henio</h1>
        <p className={styles.subtitle}>
          Znajdź ciekawe wydarzenia dla seniorów w mieście
        </p>
        <div className={styles.searchRow}>
          <input
            type="text"
            className={styles.input}
            placeholder="Szukaj wydarzeń, zajęć lub miejsca"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
          />
          <button className={styles.button} onClick={handleSearch}>
            <SearchIcon />
            Szukaj
          </button>
        </div>
      </section>

      {results !== null && (
        <div className={styles.results}>
          {results.length === 0 ? (
            <p className={styles.noResults}>Brak wyników.</p>
          ) : (
            <ul className={styles.cards}>
              {results.map((event, i) => (
                <li key={i} className={styles.card}>
                  <span className={styles.cardName}>{event.name}</span>
                  <span className={styles.cardMeta}>{event.location}, {event.city}</span>
                  <span className={styles.cardMeta}>{event.date} · {event.time}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
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
