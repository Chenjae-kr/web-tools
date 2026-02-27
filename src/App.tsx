import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { ThumbnailMakerPage } from './features/thumbnail-maker/ThumbnailMakerPage'
import { TableChartMakerPage } from './features/table-chart-maker/TableChartMakerPage'
import { HomePage } from './pages/HomePage'
import { getRouteFromHash, toHash, type AppRoute } from './routes'

function App() {
  const [route, setRoute] = useState<AppRoute>(() => getRouteFromHash(window.location.hash))

  useEffect(() => {
    const onHashChange = () => setRoute(getRouteFromHash(window.location.hash))
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const title = useMemo(() => {
    if (route === 'thumbnail-maker') return 'Thumbnail Maker'
    if (route === 'table-chart-maker') return 'Table Chart Maker'
    return 'Home'
  }, [route])

  return (
    <main className="container">
      <nav className="card" style={{ display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'space-between' }}>
        <strong>web-tools</strong>
        <div style={{ display: 'flex', gap: 8 }}>
          <a href={toHash('home')}>Home</a>
          <a href={toHash('thumbnail-maker')}>Thumbnail Maker</a>
          <a href={toHash('table-chart-maker')}>Table Chart Maker</a>
        </div>
      </nav>

      <p className="subtitle" style={{ marginTop: 8 }}>Current Route: {title}</p>

      {route === 'home' && <HomePage />}
      {route === 'thumbnail-maker' && <ThumbnailMakerPage />}
      {route === 'table-chart-maker' && <TableChartMakerPage />}
    </main>
  )
}

export default App
