import { cache } from 'react'

const BASE_URL = 'https://www.panhenio.pl'

export const fetchCities = cache(async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/cities`, { cache: 'no-store' })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
})

export const fetchEvent = cache(async (organizerId, monthId, id, previewAccessToken) => {
  try {
    const url = new URL(`${BASE_URL}/api/events/${encodeURIComponent(organizerId)}/${encodeURIComponent(monthId)}/${encodeURIComponent(id)}`)
    if (previewAccessToken) url.searchParams.set('previewAccessToken', previewAccessToken)
    const res = await fetch(url.toString(), { cache: 'no-store' })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
})

export async function activateSubscriber(activationCode) {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/subscribers/activations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ activationCode }),
      cache: 'no-store',
    })
    if (res.ok) return 'success'
    if (res.status >= 400 && res.status < 500) return 'invalid'
    return 'error'
  } catch {
    return 'error'
  }
}
