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
            Serwis Pan Henio nie wymaga rejestracji ani logowania. Przeglądanie wydarzeń odbywa się anonimowo. Jedynym przypadkiem, w którym zbieramy dane osobowe, jest dobrowolny zapis na newsletter.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Newsletter</h2>
          <p>
            Jeżeli zdecydujesz się zapisać do newslettera, przetwarzamy Twój adres e-mail oraz wybrane miasto w celu wysyłania powiadomień o nowych wydarzeniach dla seniorów.
          </p>
          <p style={{ marginTop: '12px' }}>
            <strong>Podstawa prawna:</strong> art. 6 ust. 1 lit. a RODO – Twoja dobrowolna zgoda wyrażona poprzez zapis i kliknięcie linku aktywacyjnego w e-mailu potwierdzającym.
          </p>
          <p style={{ marginTop: '12px' }}>
            <strong>Okres przechowywania:</strong> dane przechowywane są do momentu rezygnacji z subskrypcji.
          </p>
          <p style={{ marginTop: '12px' }}>
            <strong>Rezygnacja:</strong> możesz w każdej chwili zrezygnować z newslettera, klikając link wypisania zawarty w każdej wiadomości lub kontaktując się z nami pod adresem <a href="mailto:kontakt@panhenio.pl" className={styles.link}>kontakt@panhenio.pl</a>.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Twoje prawa (RODO)</h2>
          <p>
            Na podstawie Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 (RODO) przysługują Ci następujące prawa:
          </p>
          <ul style={{ marginTop: '12px', paddingLeft: '20px', lineHeight: '2' }}>
            <li><strong>Prawo dostępu</strong> – możesz zażądać informacji o przetwarzanych danych osobowych.</li>
            <li><strong>Prawo do sprostowania</strong> – możesz żądać poprawienia nieprawidłowych danych.</li>
            <li><strong>Prawo do usunięcia</strong> – możesz zażądać usunięcia swoich danych („prawo do bycia zapomnianym").</li>
            <li><strong>Prawo do ograniczenia przetwarzania</strong> – możesz zażądać ograniczenia przetwarzania swoich danych.</li>
            <li><strong>Prawo do przenoszenia danych</strong> – możesz otrzymać swoje dane w ustrukturyzowanym formacie.</li>
            <li><strong>Prawo do cofnięcia zgody</strong> – możesz w każdej chwili cofnąć zgodę na przetwarzanie danych bez wpływu na zgodność z prawem wcześniejszego przetwarzania.</li>
            <li><strong>Prawo do skargi</strong> – masz prawo wnieść skargę do Prezesa Urzędu Ochrony Danych Osobowych (UODO), ul. Stawki 2, 00-193 Warszawa.</li>
          </ul>
          <p style={{ marginTop: '12px' }}>
            Aby skorzystać z powyższych praw, skontaktuj się z nami pod adresem: <a href="mailto:kontakt@panhenio.pl" className={styles.link}>kontakt@panhenio.pl</a>.
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
