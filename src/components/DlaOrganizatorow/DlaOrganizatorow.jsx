import styles from './DlaOrganizatorow.module.css'

const faqItems = [
  {
    q: 'Jak dodać swoje wydarzenia do Pan Henio?',
    a: 'Wyślij do nas wiadomość na adres kontakt@panhenio.pl. Po krótkim kontakcie i weryfikacji organizacji przyznamy Ci dostęp do portalu organizatora, gdzie samodzielnie dodasz i zaktualizujesz swoje wydarzenia.',
  },
  {
    q: 'Czy dodawanie wydarzeń jest płatne?',
    a: 'Nie – współpraca z Pan Henio jest całkowicie bezpłatna. Wierzymy, że seniorzy powinni mieć łatwy dostęp do aktywności, dlatego nie pobieramy opłat od organizatorów.',
  },
  {
    q: 'Kto może zostać organizatorem na Pan Henio?',
    a: 'Przyjmujemy instytucje i organizacje działające na rzecz seniorów: domy kultury, centra aktywności, fundacje, stowarzyszenia, parafie oraz inne podmioty regularnie organizujące zajęcia dla osób 60+. Warunkiem jest prowadzenie cyklicznych lub jednorazowych wydarzeń skierowanych do tej grupy wiekowej.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(item => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
}

export default function DlaOrganizatorow() {
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
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

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Najczęstsze pytania organizatorów</h2>
          <dl className={styles.faqList}>
            {faqItems.map((item, i) => (
              <div key={i} className={styles.faqItem}>
                <dt className={styles.faqQuestion}>{item.q}</dt>
                <dd className={styles.faqAnswer}>{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </main>
  )
}
