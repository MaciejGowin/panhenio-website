import styles from './page.module.css'
import { activateSubscriber } from '../../../lib/api'

export const metadata = {
  title: 'Aktywacja subskrypcji – Pan Henio',
  robots: { index: false },
}

export default async function AktywacjaPage({ params }) {
  const { activationCode } = await params
  const result = await activateSubscriber(activationCode)

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        {result === 'success' && (
          <>
            <div className={styles.icon}>✓</div>
            <h1 className={styles.title}>Subskrypcja aktywowana!</h1>
            <p className={styles.desc}>
              Twój adres e-mail został potwierdzony. Będziesz otrzymywać powiadomienia o nowych wydarzeniach dla seniorów w Twoim mieście.
            </p>
          </>
        )}
        {result === 'invalid' && (
          <>
            <div className={`${styles.icon} ${styles.iconError}`}>✕</div>
            <h1 className={styles.title}>Link nieważny</h1>
            <p className={styles.desc}>
              Ten link aktywacyjny jest nieprawidłowy lub już został użyty. Jeśli chcesz otrzymywać powiadomienia, zapisz się ponownie na stronie głównej.
            </p>
          </>
        )}
        {result === 'error' && (
          <>
            <div className={`${styles.icon} ${styles.iconError}`}>!</div>
            <h1 className={styles.title}>Coś poszło nie tak</h1>
            <p className={styles.desc}>
              Nie udało się aktywować subskrypcji. Spróbuj ponownie później lub skontaktuj się z nami.
            </p>
          </>
        )}
        <a href="/" className={styles.link}>Wróć na stronę główną</a>
      </div>
    </div>
  )
}
