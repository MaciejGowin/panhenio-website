import styles from './Navbar.module.css'
import logo from '/panhenio-logo.png'

const navLinks = [
  { label: 'O projekcie', href: '#o-projekcie' },
]

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        <a href="/" className={styles.logoLink}>
          <img src={logo} alt="Pan Henio" className={styles.logo} />
        </a>
        <ul className={styles.links}>
          {navLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href} className={styles.link}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
