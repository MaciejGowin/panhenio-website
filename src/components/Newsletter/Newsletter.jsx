'use client'

import { useState } from 'react'
import styles from './Newsletter.module.css'

export default function Newsletter({ cities = [], defaultCityId = null }) {
  const [email, setEmail] = useState('')
  const [cityId, setCityId] = useState(defaultCityId ?? cities[0]?.id ?? '')
  const [status, setStatus] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/v1/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, preferredCityId: cityId }),
      })
      if (res.ok) setStatus('success')
      else if (res.status >= 400 && res.status < 500) setStatus('duplicate')
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>Bądź na bieżąco</h2>
        <p className={styles.desc}>
          Otrzymuj powiadomienia o nowych wydarzeniach dla seniorów w Twoim mieście.
        </p>
        {status === 'success' ? (
          <p className={styles.success}>Dziękujemy! Sprawdź swoją skrzynkę e-mail (również SPAM) i kliknij link aktywacyjny, aby potwierdzić zapis.</p>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <input
              className={styles.input}
              type="email"
              placeholder="Twój adres e-mail"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
              aria-label="Adres e-mail"
              disabled={status === 'loading'}
            />
            {cities.length > 0 && (
              <select
                className={styles.select}
                value={cityId}
                onChange={e => setCityId(e.target.value)}
                aria-label="Wybierz miasto"
                disabled={status === 'loading'}
              >
                {cities.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            )}
            <button
              className={styles.button}
              type="submit"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Zapisuję…' : 'Zapisz się'}
            </button>
            {status === 'duplicate' && (
              <p className={styles.error}>Już jesteś zapisany.</p>
            )}
            {status === 'error' && (
              <p className={styles.error}>Coś poszło nie tak. Spróbuj ponownie.</p>
            )}
          </form>
        )}
      </div>
    </section>
  )
}
