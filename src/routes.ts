export type AppRoute = 'home' | 'thumbnail-maker' | 'table-chart-maker'

export function getRouteFromHash(hash: string): AppRoute {
  const normalized = hash.replace(/^#/, '').trim()
  if (normalized === '/thumbnail-maker' || normalized === 'thumbnail-maker') return 'thumbnail-maker'
  if (normalized === '/table-chart-maker' || normalized === 'table-chart-maker') return 'table-chart-maker'
  return 'home'
}

export function toHash(route: AppRoute): string {
  if (route === 'thumbnail-maker') return '#/thumbnail-maker'
  if (route === 'table-chart-maker') return '#/table-chart-maker'
  return '#/'
}
