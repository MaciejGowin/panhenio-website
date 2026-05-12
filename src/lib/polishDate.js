// Genitive forms (for day URLs: "12-maja-2026")
const MONTHS_GENITIVE = ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'wrzesnia', 'pazdziernika', 'listopada', 'grudnia']

// Nominative forms (for month URLs: "maj-2026")
const MONTHS_NOMINATIVE = ['styczen', 'luty', 'marzec', 'kwiecien', 'maj', 'czerwiec', 'lipiec', 'sierpien', 'wrzesien', 'pazdziernik', 'listopad', 'grudzien']

export function toPolishUrl(iso) {
  const [year, month, day] = iso.split('-')
  return `${parseInt(day, 10)}-${MONTHS_GENITIVE[parseInt(month, 10) - 1]}-${year}`
}

export function fromPolishUrl(slug) {
  const parts = slug.split('-')
  if (parts.length !== 3) return null
  const [day, monthName, year] = parts
  const monthIdx = MONTHS_GENITIVE.indexOf(monthName)
  if (monthIdx === -1) return null
  const d = parseInt(day, 10)
  const y = parseInt(year, 10)
  if (isNaN(d) || isNaN(y) || d < 1 || d > 31) return null
  return `${y}-${String(monthIdx + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
}

export function toPolishMonthUrl(isoMonth) {
  const [year, month] = isoMonth.split('-')
  return `${MONTHS_NOMINATIVE[parseInt(month, 10) - 1]}-${year}`
}

export function fromPolishMonthUrl(slug) {
  const dashIdx = slug.lastIndexOf('-')
  if (dashIdx === -1) return null
  const monthName = slug.slice(0, dashIdx)
  const year = slug.slice(dashIdx + 1)
  const monthIdx = MONTHS_NOMINATIVE.indexOf(monthName)
  if (monthIdx === -1) return null
  const y = parseInt(year, 10)
  if (isNaN(y)) return null
  return `${y}-${String(monthIdx + 1).padStart(2, '0')}`
}
