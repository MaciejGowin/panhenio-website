import styles from './Hero.module.css'

export default function Hero({ cityTitle }) {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <h1 className={styles.title}>{cityTitle ?? 'Wydarzenia dla seniorów'}</h1>
        <p className={styles.subtitle}>
          Sprawdź, co się dzieje dziś i w najbliższych dniach
        </p>
        <a href="/szukaj-wydarzen" className={styles.cta}>
          Zobacz wydarzenia
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </a>
      </div>
    </section>
  )
}
