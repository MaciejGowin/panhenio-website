import styles from './Faq.module.css'

const faqItems = [
  {
    q: 'Czy udział w wydarzeniach jest bezpłatny?',
    a: 'Pan Henio nie organizuje wydarzeń. Zbieramy informacje o nich ze stron organizatorów. Przy każdym wydarzeniu podajemy informację o ewentualnych kosztach wstępu – jeśli nie ma takiej adnotacji, sprawdź stronę organizatora.',
  },
  {
    q: 'Jak się zapisać na wydarzenie?',
    a: 'Sposób zapisów zależy od organizatora. Na stronie każdego wydarzenia znajdziesz szczegółowe informacje o rejestracji – może to być numer telefonu, adres e-mail lub link do formularza. Wystarczy kliknąć „Zobacz szczegóły" przy wybranym wydarzeniu.',
  },
  {
    q: 'Dla kogo są wydarzenia na Pan Henio?',
    a: 'Serwis jest skierowany przede wszystkim do seniorów – osób w wieku 60 i więcej lat. Wiele wydarzeń jest otwartych również dla ich rodzin i bliskich, w tym wnuków. Szczegóły dotyczące grupy docelowej znajdziesz w opisie każdego wydarzenia.',
  },
  {
    q: 'Czy muszę być mieszkańcem danego miasta, żeby uczestniczyć?',
    a: 'Zazwyczaj nie – większość wydarzeń jest otwarta dla wszystkich chętnych, niezależnie od miejsca zamieszkania. Wyjątkiem mogą być zajęcia finansowane przez konkretną gminę lub dzielnicę, o czym organizator poinformuje w opisie.',
  },
  {
    q: 'Skąd pochodzą informacje o wydarzeniach?',
    a: 'Samodzielnie przeszukujemy strony organizatorów – domów kultury, fundacji, stowarzyszeń i innych instytucji działających na rzecz seniorów. Jesteśmy otwarci na współpracę z organizatorami ale nie jesteśmy przez nich finansowani.',
  },
  {
    q: 'Jak często aktualizujecie ofertę wydarzeń?',
    a: 'Staramy się aktualizować ofertę kilka razy w tygodniu. Samodzielnie zbieramy informacje ze stron organizatorów – to żmudny proces, który wymaga czasu. Tylko niewielka część organizatorów samodzielnie zarządza swoją ofertą w serwisie.',
  },
  {
    q: 'Czy mogę otrzymywać powiadomienia o nowych wydarzeniach?',
    a: 'Tak! Możesz zapisać się do newslettera Pan Henio i otrzymywać regularne zestawienie wydarzeń w swoim mieście. Formularz zapisu znajdziesz na każdej stronie serwisu.',
  },
  {
    q: 'Jak znaleźć wydarzenie blisko domu?',
    a: (<>Wybierz swoje miasto w górnym menu lub skorzystaj z <a href="/szukaj-wydarzen">wyszukiwarki wydarzeń</a>, gdzie możesz filtrować wyniki według miasta i kategorii. Możesz też przeglądać ofertę konkretnego organizatora działającego w Twojej okolicy.</>),
  },
]

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(item => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: typeof item.a === 'string' ? item.a : 'Wybierz swoje miasto w górnym menu lub skorzystaj z wyszukiwarki wydarzeń, gdzie możesz filtrować wyniki według miasta i kategorii.',
    },
  })),
}

export default function Faq() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>Często zadawane pytania</h2>
        <dl className={styles.list}>
          {faqItems.map((item, i) => (
            <div key={i} className={styles.item}>
              <dt className={styles.question}>{item.q}</dt>
              <dd className={styles.answer}>{item.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
