import { useState } from 'react'
import styles from './Navbar.module.css'
import logo from '/panhenio-logo.png'

const navLinks = [
  { label: 'Cyfrowy Henio', href: '#cyfrowy-henio', bold: true },
  { label: 'O projekcie', href: '#o-projekcie' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        <a href="/" className={styles.logoLink}>
          <img src={logo} alt="Pan Henio" className={styles.logo} />
        </a>
        <ul className={styles.links}>
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={`${styles.link}${link.bold ? ` ${styles.linkBold}` : ''}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          className={styles.menuButton}
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
          aria-expanded={open}
        >
          <span className={`${styles.bar} ${open ? styles.barTop : ''}`} />
          <span className={`${styles.bar} ${open ? styles.barMid : ''}`} />
          <span className={`${styles.bar} ${open ? styles.barBot : ''}`} />
        </button>
      </div>
      {open && (
        <ul className={styles.dropdown}>
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={`${styles.dropdownLink}${link.bold ? ` ${styles.linkBold}` : ''}`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}
