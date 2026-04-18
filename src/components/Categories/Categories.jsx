'use client'

import { useState, useEffect } from 'react'
import styles from './Categories.module.css'

export default function Categories() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch('/api/categories').then(r => r.json()).then(setCategories).catch(() => {})
  }, [])

  if (categories.length === 0) return null

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>Wszystkie kategorie</h2>
        <nav className={styles.categories} aria-label="Kategorie">
          {categories.map(cat => (
            <a key={cat.id} href={`/szukaj-wydarzen?kategoria=${encodeURIComponent(cat.id)}`} className={styles.link}>
              {cat.name}
            </a>
          ))}
        </nav>
      </div>
    </section>
  )
}
