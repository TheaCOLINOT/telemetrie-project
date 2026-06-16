const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
const SESSION_KEY = 'utm_data'

export const SOCIAL_SOURCES = ['facebook', 'instagram', 'twitter', 'x', 'linkedin', 'tiktok', 'youtube', 'pinterest', 'snapchat']

export function captureUTM() {
  if (typeof window === 'undefined') return {}

  const params = new URLSearchParams(window.location.search)
  const utm = {}

  UTM_PARAMS.forEach((key) => {
    const val = params.get(key)
    if (val) utm[key] = val
  })

  if (Object.keys(utm).length > 0) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(utm))
  }

  return utm
}

export function getStoredUTM() {
  try {
    const stored = sessionStorage.getItem(SESSION_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

export function isSocialSource(utmSource = '') {
  return SOCIAL_SOURCES.includes(utmSource.toLowerCase())
}
