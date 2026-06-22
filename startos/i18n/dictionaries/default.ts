export const DEFAULT_LANG = 'en_US'

const dict = {
  'Starting Joplin Server!': 0,
  'primary daemon': 1,
  'The server is ready': 2,
  'The server is not ready': 3,
  'Joplin Server API': 4,
  'Your Joplin Server web interface and sync API': 5,
} as const

export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
