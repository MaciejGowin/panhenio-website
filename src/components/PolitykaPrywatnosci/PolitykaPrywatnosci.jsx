import styles from '../OProjekcie/OProjekcie.module.css'

export default function PolitykaPrywatnosci() {
  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Polityka prywatności</h1>
        <p className={styles.lead}>
          Niniejsza polityka prywatności opisuje, w jaki sposób serwis Pan Henio przetwarza dane użytkowników.
        </p>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Administrator danych</h2>
          <p>
            Administratorem serwisu Pan Henio jest zespół projektowy Pan Henio. W razie pytań dotyczących przetwarzania danych prosimy o kontakt: <a href="mailto:kontakt@panhenio.pl" className={styles.link}>kontakt@panhenio.pl</a>
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Zakres przetwarzania danych</h2>
          <p>
            Serwis Pan Henio jest aplikacją wyłącznie po stronie klienta i nie zbiera ani nie przechowuje żadnych danych osobowych użytkowników. Nie wymagamy rejestracji ani logowania. Wyszukiwania wykonywane przez użytkownika nie są przesyłane do żadnego serwera.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Pliki cookie</h2>
          <p>
            Serwis nie korzysta z plików cookie ani innych mechanizmów śledzenia użytkownika.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Zewnętrzne zasoby</h2>
          <p>
            Serwis może ładować czcionki lub inne zasoby statyczne z zewnętrznych dostawców (np. Google Fonts). Dostawcy ci mogą rejestrować adres IP urządzenia zgodnie z własną polityką prywatności.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Zmiany polityki</h2>
          <p>
            Zastrzegamy sobie prawo do wprowadzania zmian w niniejszej polityce prywatności. Wszelkie zmiany będą publikowane na tej stronie.
          </p>
        </section>
      </div>
    </main>
  )
}
