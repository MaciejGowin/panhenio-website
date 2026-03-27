import { useState } from 'react'
import styles from './Hero.module.css'

export default function Hero() {
  const [query, setQuery] = useState('')

  function handleSearch() {
    const phrase = query.trim()
    const hash = phrase ? `#szukaj?phrase=${encodeURIComponent(phrase)}` : '#szukaj'
    window.location.hash = hash
  }

  return (
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
      <a href="#szukaj" className={styles.browseAll}>
        lub przeglądaj wszystkie wydarzenia →
      </a>
    </section>
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
