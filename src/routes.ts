export type AppRoute = 'home' | 'thumbnail-maker'

export function getRouteFromHash(hash: string): AppRoute {
  const normalized = hash.replace(/^#/, '').trim()
  if (normalized === '/thumbnail-maker' || normalized === 'thumbnail-maker') return 'thumbnail-maker'
  return 'home'
}

export function toHash(route: AppRoute): string {
  if (route === 'thumbnail-maker') return '#/thumbnail-maker'
  return '#/'
}
