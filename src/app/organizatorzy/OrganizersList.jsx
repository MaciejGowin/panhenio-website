'use client'

import { useState } from 'react'
import styles from './page.module.css'

export default function OrganizersList({ organizers, descriptions = {} }) {
  const [query, setQuery] = useState('')

  const filtered = query.trim()
    ? organizers.filter(org => org.name.toLowerCase().includes(query.toLowerCase()))
    : organizers

  return (
    <>
      <div className={styles.searchBox}>
        <SearchIcon />
        <input
          type="search"
          placeholder="Szukaj organizatora…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {filtered.length === 0 ? (
        <p className={styles.empty}>Brak wyników dla podanej frazy.</p>
      ) : (
        <ul className={styles.list}>
          {filtered.map(org => (
            <li key={org.id}>
              <a
                href={`/organizator/${encodeURIComponent(org.id)}/wydarzenia-dla-seniorow`}
                className={styles.card}
              >
                <span className={styles.cardBody}>
                  <span className={styles.name}>{org.name}</span>
                  {descriptions[org.id] && (
                    <span className={styles.description}>{descriptions[org.id]}</span>
                  )}
                </span>
                <span className={styles.arrow}>→</span>
              </a>
            </li>
          ))}
        </ul>
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
