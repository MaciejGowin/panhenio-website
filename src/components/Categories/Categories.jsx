import styles from './Categories.module.css'

const categories = ['Spacer', 'Warsztaty', 'Taniec', 'Komputer', 'Wykład']

export default function Categories() {
  return (
    <nav className={styles.categories} aria-label="Kategorie">
      {categories.map((cat, i) => (
        <span key={cat} className={styles.item}>
          <a href="#" className={styles.link}>{cat}</a>
          {i < categories.length - 1 && (
            <span className={styles.dot} aria-hidden="true">·</span>
          )}
        </span>
      ))}
    </nav>
  )
}
