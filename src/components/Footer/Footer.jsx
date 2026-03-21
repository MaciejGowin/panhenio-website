import styles from './Footer.module.css'
import logo from '/panhenio-logo.png'

const links = [
  { label: 'Kontakt', href: '#kontakt' },
  { label: 'O projekcie', href: '#o-projekcie' },
  { label: 'Partnerzy', href: '#partnerzy' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <img src={logo} alt="Pan Henio" className={styles.logo} />
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
