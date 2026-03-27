import { useState, useEffect } from 'react'
import styles from './Categories.module.css'

export default function Categories() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch('/api/categories').then(r => r.json()).then(setCategories).catch(() => {})
  }, [])

  if (categories.length === 0) return null

  return (
    <nav className={styles.categories} aria-label="Kategorie">
      {categories.map((cat, i) => (
        <span key={cat.id} className={styles.item}>
          <a href={`#szukaj?categoryId=${encodeURIComponent(cat.id)}`} className={styles.link}>{cat.name}</a>
          {i < categories.length - 1 && (
            <span className={styles.dot} aria-hidden="true">·</span>
          )}
        </span>
      ))}
    </nav>
  )
}
