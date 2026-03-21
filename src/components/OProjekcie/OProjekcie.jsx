import styles from './OProjekcie.module.css'

export default function OProjekcie() {
  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <h1 className={styles.title}>O projekcie</h1>
        <p className={styles.lead}>
          Pan Henio to projekt stworzony z myślą o seniorach, którzy chcą aktywnie spędzać czas i odkrywać ciekawe wydarzenia w swoim mieście.
        </p>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Nasz cel</h2>
          <p>
            Wierzymy, że aktywność społeczna i kulturalna ma ogromny wpływ na jakość życia osób starszych. Dlatego stworzyliśmy prostą i przyjazną platformę, która pomaga seniorom znaleźć spacery, warsztaty, spotkania i inne zajęcia w pobliżu.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Dla kogo?</h2>
          <p>
            Platforma jest skierowana do seniorów oraz ich rodzin i opiekunów, którzy szukają wartościowych propozycji spędzania czasu. Nie wymagamy zakładania konta – wystarczy wpisać interesującą frazę i kliknąć Szukaj.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Kontakt</h2>
          <p>
            Masz pytania lub chcesz dodać wydarzenie? Napisz do nas na adres: <a href="mailto:kontakt@panhenio.pl" className={styles.link}>kontakt@panhenio.pl</a>
          </p>
        </section>
      </div>
    </main>
  )
}
