import { useEffect, useState } from 'react'
import styles from './Recommendations.module.css'

export default function Recommendations() {
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch('/api/events/latest')
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch(() => {})
  }, [])

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>
        <StarIcon filled className={styles.headingStar} />
        Pan Henio poleca
      </h2>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.id} className={styles.item}>
            <StarIcon className={styles.star} />
            <a href={`#wydarzenie/${encodeURIComponent(item.source.id)}/${encodeURIComponent(item.id)}`} className={styles.link}>
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

function StarIcon({ className, filled }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
