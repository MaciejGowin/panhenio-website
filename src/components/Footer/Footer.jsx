import styles from './Footer.module.css'

const links = [
  { label: 'Miasta', href: '/miasta' },
  { label: 'Organizatorzy', href: '/organizatorzy' },
  { label: 'Cyfrowy Henio', href: '/cyfrowy-henio' },
  { label: 'O projekcie', href: '/o-projekcie' },
  { label: 'Dla organizatorów', href: '/dla-organizatorow' },
  { label: 'Polityka prywatności', href: '/polityka-prywatnosci' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <img src="/panhenio-logo.png" alt="Pan Henio" className={styles.logo} />
      <nav className={styles.links} aria-label="Stopka">
        {links.map((link, i) => (
          <span key={link.label} className={styles.item}>
            <a href={link.href} className={styles.link}>{link.label}</a>
            {i < links.length - 1 && (
              <span className={styles.dot} aria-hidden="true">·</span>
            )}
          </span>
        ))}
        <span className={styles.item}>
          <span className={styles.dot} aria-hidden="true">·</span>
          <a
            href="https://www.facebook.com/panheniopl"
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
        </span>
        <span className={styles.item}>
          <span className={styles.dot} aria-hidden="true">·</span>
          <a
            href="https://www.instagram.com/panheniopl"
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </span>
      </nav>
    </footer>
  )
}
