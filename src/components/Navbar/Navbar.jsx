import styles from './Navbar.module.css'
import NavbarCitiesDropdown from './NavbarCitiesDropdown'
import NavbarMobileMenu from './NavbarMobileMenu'

const navLinks = [
  { label: 'Cyfrowy Henio', href: '/cyfrowy-henio', bold: true },
  { label: 'O projekcie', href: '/o-projekcie' },
]

async function fetchCities() {
  try {
    const res = await fetch('https://www.panhenio.pl/api/cities', { cache: 'no-store' })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

export default async function Navbar() {
  const cities = await fetchCities()

  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        <a href="/" className={styles.logoLink}>
          <img src="/panhenio-logo.png" alt="Pan Henio" className={styles.logo} />
        </a>
        <ul className={styles.links}>
          <NavbarCitiesDropdown cities={cities} />
          {navLinks.map(link => (
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
        <NavbarMobileMenu cities={cities} navLinks={navLinks} />
      </div>
    </nav>
  )
}
