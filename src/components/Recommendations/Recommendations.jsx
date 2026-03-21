import styles from './Recommendations.module.css'

const items = [
  'Spacer nordic waking',
  'Biblioteka – Klub Książki',
  'Warsztaty smartfona',
]

export default function Recommendations() {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>
        <StarIcon filled className={styles.headingStar} />
        Pan Henio poleca dziś
      </h2>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item} className={styles.item}>
            <StarIcon className={styles.star} />
            <span>{item}</span>
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
