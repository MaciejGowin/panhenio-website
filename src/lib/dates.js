const TZ = 'Europe/Warsaw'

export function todayPL() {
  return new Date().toLocaleDateString('en-CA', { timeZone: TZ })
}

export function tomorrowPL() {
  return new Date(Date.now() + 86400000).toLocaleDateString('en-CA', { timeZone: TZ })
}
