import styles from '../OProjekcie/OProjekcie.module.css'

export default function CyfrowyHenio() {
  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Cyfrowy Henio</h1>
        <p className={styles.lead}>
          Warsztaty technologiczne dla seniorów — uczymy, jak bezpiecznie i pewnie korzystać z nowoczesnych urządzeń i internetu.
        </p>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>O warsztatach</h2>
          <p>
            Cyfrowy Henio to cykl bezpłatnych warsztatów skierowanych do seniorów, którzy chcą oswoić się z technologią. Zajęcia prowadzone są w małych grupach, w przyjaznym tempie — bez pośpiechu i zbędnego żargonu.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Smartfon krok po kroku</h2>
          <p>
            Pokażemy, jak obsługiwać smartfon od podstaw: wykonywanie połączeń, wysyłanie wiadomości, robienie zdjęć, regulowanie głośności i jasności ekranu. Żaden temat nie jest zbyt prosty — pytaj o wszystko!
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Bankowość internetowa</h2>
          <p>
            Nauczymy, jak bezpiecznie logować się do konta bankowego przez telefon lub komputer, sprawdzać saldo, robić przelewy i rozpoznawać próby oszustwa. Bezpieczeństwo to nasz priorytet.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Zagrożenia w sieci</h2>
          <p>
            Omówimy najczęstsze cyberzagrożenia: phishing, fałszywe SMS-y, podejrzane linki i oszustów podszywających się pod banki lub wnuków. Dowiesz się, jak je rozpoznać i co zrobić, gdy coś wzbudzi Twoje wątpliwości.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>WhatsApp i wideorozmowy</h2>
          <p>
            Pomagamy skonfigurować WhatsApp, prowadzić czaty i rozmowy wideo z rodziną i znajomymi. Nauczymy też, jak wysyłać zdjęcia i korzystać z grup rodzinnych.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>YouTube i rozrywka online</h2>
          <p>
            Pokazujemy, jak znaleźć ulubione audycje, filmy, muzykę i porady na YouTube. Nauczymy wyszukiwać treści, zapisywać ulubione filmy i dostosowywać napisy.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Zapisz się</h2>
          <p>
            Chcesz wziąć udział w warsztatach lub dowiedzieć się więcej? Napisz do nas: <a href="mailto:kontakt@panhenio.pl" className={styles.link}>kontakt@panhenio.pl</a>
          </p>
        </section>
      </div>
    </main>
  )
}
