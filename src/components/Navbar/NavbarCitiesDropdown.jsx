'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './Navbar.module.css'

export default function NavbarCitiesDropdown({ cities }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  if (!cities.length) return null

  return (
    <li ref={ref} className={styles.citiesItem}>
      <button
        className={styles.citiesButton}
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        Miasta
        <ChevronIcon open={open} />
      </button>
      {open && (
        <ul className={styles.citiesDropdown}>
          {cities.map(city => (
            <li key={city.id}>
              <a
                href={`/${city.id}/wydarzenia-dla-seniorow`}
                className={styles.citiesDropdownLink}
                onClick={() => setOpen(false)}
              >
                {city.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
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
