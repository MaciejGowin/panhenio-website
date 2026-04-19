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
