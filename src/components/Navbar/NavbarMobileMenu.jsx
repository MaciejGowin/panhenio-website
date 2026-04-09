'use client'

import { useState } from 'react'
import styles from './Navbar.module.css'

export default function NavbarMobileMenu({ cities, navLinks }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [citiesOpen, setCitiesOpen] = useState(false)

  return (
    <>
      <button
        className={styles.menuButton}
        onClick={() => setMenuOpen(o => !o)}
        aria-label="Menu"
        aria-expanded={menuOpen}
      >
        <span className={`${styles.bar} ${menuOpen ? styles.barTop : ''}`} />
        <span className={`${styles.bar} ${menuOpen ? styles.barMid : ''}`} />
        <span className={`${styles.bar} ${menuOpen ? styles.barBot : ''}`} />
      </button>

      {menuOpen && (
        <ul className={styles.mobileMenu}>
          {cities.length > 0 && (
            <li>
              <button
                className={styles.mobileCitiesButton}
                onClick={() => setCitiesOpen(o => !o)}
              >
                Miasta
                <ChevronIcon open={citiesOpen} />
              </button>
              {citiesOpen && (
                <ul className={styles.mobileCitiesList}>
                  {cities.map(city => (
                    <li key={city.id}>
                      <a
                        href={`/${city.id}/wydarzenia-dla-seniorow`}
                        className={styles.mobileCitiesLink}
                        onClick={() => setMenuOpen(false)}
                      >
                        {city.name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )}
          {navLinks.map(link => (
            <li key={link.label}>
              <a
                href={link.href}
                className={`${styles.dropdownLink}${link.bold ? ` ${styles.linkBold}` : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

function ChevronIcon({ open }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.15s' }}
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}
