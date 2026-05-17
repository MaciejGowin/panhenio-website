import { cache } from 'react'

const BASE_URL = 'https://www.panhenio.pl'
const INTERNAL_HEADERS = { 'x-internal-token': 'e746f665-d31e-4530-b2eb-2d2356bc4c0b' }

export const fetchCities = cache(async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/cities`, { cache: 'no-store', headers: INTERNAL_HEADERS })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
})

export const fetchOrganizers = cache(async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/organizers`, { cache: 'no-store', headers: INTERNAL_HEADERS })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
})

export const fetchOrganizerMonths = cache(async (organizerId) => {
  try {
    const res = await fetch(
      `${BASE_URL}/api/organizers/${encodeURIComponent(organizerId)}/months`,
      { cache: 'no-store', headers: INTERNAL_HEADERS }
    )
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
})

// params: { organizerId, cityId, month, dateFrom, dateTo } — all optional
export async function fetchEvents({ organizerId, cityId, month, dateFrom, dateTo } = {}) {
  try {
    const url = new URL(`${BASE_URL}/api/events`)
    if (organizerId) url.searchParams.set('organizerId', organizerId)
    if (cityId) url.searchParams.set('cityId', cityId)
    if (dateFrom) {
      url.searchParams.set('dateFrom', dateFrom)
      if (dateTo) url.searchParams.set('dateTo', dateTo)
    } else if (month) {
      url.searchParams.set('month', month)
    }
    const res = await fetch(url.toString(), { cache: 'no-store', headers: INTERNAL_HEADERS })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

export async function fetchLatestEvents(cityId) {
  try {
    const url = new URL(`${BASE_URL}/api/events/latest`)
    if (cityId) url.searchParams.set('cityId', cityId)
    const res = await fetch(url.toString(), { cache: 'no-store', headers: INTERNAL_HEADERS })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

export async function fetchPromotedEvents(cityId) {
  try {
    const url = new URL(`${BASE_URL}/api/events/promoted`)
    if (cityId) url.searchParams.set('cityId', cityId)
    const res = await fetch(url.toString(), { cache: 'no-store', headers: INTERNAL_HEADERS })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

export const fetchEvent = cache(async (organizerId, monthId, id, previewAccessToken) => {
  try {
    const url = new URL(`${BASE_URL}/api/events/${encodeURIComponent(organizerId)}/${encodeURIComponent(monthId)}/${encodeURIComponent(id)}`)
    if (previewAccessToken) url.searchParams.set('previewAccessToken', previewAccessToken)
    const res = await fetch(url.toString(), { cache: 'no-store', headers: INTERNAL_HEADERS })
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
      headers: { 'Content-Type': 'application/json', ...INTERNAL_HEADERS },
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
