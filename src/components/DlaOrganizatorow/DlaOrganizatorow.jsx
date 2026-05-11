import styles from './DlaOrganizatorow.module.css'

export default function DlaOrganizatorow() {
  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Dla organizatorów</h1>
        <p className={styles.lead}>
          Pan Henio to platforma, dzięki której Twoje wydarzenia dotrą do setek aktywnych seniorów w całej Polsce.
        </p>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Promuj swoje wydarzenia</h2>
          <p>
            Bezpłatnie dodawaj warsztaty, spacery, spotkania i inne zajęcia do naszego serwisu. Twoje oferty zobaczą seniorzy aktywnie szukający wydarzeń w swoim mieście.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Dziel się i docieraj szerzej</h2>
          <p>
            Każde wydarzenie ma własną stronę, którą możesz udostępniać w mediach społecznościowych, newsletterach lub na stronie swojej organizacji. Pomagamy Ci dotrzeć do osób, które naprawdę szukają tego, co oferujesz.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Jak dołączyć?</h2>
          <p>
            Dostęp do portalu organizatora uzyskasz po kontakcie z nami. Napisz na adres{' '}
            <a href="mailto:kontakt@panhenio.pl" className={styles.link}>kontakt@panhenio.pl</a>
            {' '}– odpiszemy i przeprowadzimy Cię przez cały proces.
          </p>
        </section>
      </div>
    </main>
  )
}
