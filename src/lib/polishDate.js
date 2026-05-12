const MONTHS = ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'wrzesnia', 'pazdziernika', 'listopada', 'grudnia']

export function toPolishUrl(iso) {
  const [year, month, day] = iso.split('-')
  return `${parseInt(day, 10)}-${MONTHS[parseInt(month, 10) - 1]}-${year}`
}

export function fromPolishUrl(slug) {
  const parts = slug.split('-')
  if (parts.length !== 3) return null
  const [day, monthName, year] = parts
  const monthIdx = MONTHS.indexOf(monthName)
  if (monthIdx === -1) return null
  const d = parseInt(day, 10)
  const y = parseInt(year, 10)
  if (isNaN(d) || isNaN(y) || d < 1 || d > 31) return null
  return `${y}-${String(monthIdx + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
}
