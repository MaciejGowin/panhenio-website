import styles from './Footer.module.css'

const links = [
  { label: 'Cyfrowy Henio', href: '/cyfrowy-henio' },
  { label: 'O projekcie', href: '/o-projekcie' },
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
      </nav>
    </footer>
  )
}
