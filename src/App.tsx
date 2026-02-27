import { Suspense, lazy, useEffect, useMemo, useState } from 'react'
import './App.css'
import { HomePage } from './pages/HomePage'
import { getRouteFromHash, toHash, type AppRoute } from './routes'

const ThumbnailMakerPage = lazy(() => import('./features/thumbnail-maker/ThumbnailMakerPage').then((m) => ({ default: m.ThumbnailMakerPage })))
const TableChartMakerPage = lazy(() => import('./features/table-chart-maker/TableChartMakerPage').then((m) => ({ default: m.TableChartMakerPage })))
const DataConverterPage = lazy(() => import('./features/data-converter/DataConverterPage').then((m) => ({ default: m.DataConverterPage })))

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
    if (route === 'data-converter') return 'Data Converter'
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
          <a href={toHash('data-converter')}>Data Converter</a>
        </div>
      </nav>

      <p className="subtitle" style={{ marginTop: 8 }}>Current Route: {title}</p>

      {route === 'home' && <HomePage />}
      <Suspense fallback={<section className="card">로딩 중...</section>}>
        {route === 'thumbnail-maker' && <ThumbnailMakerPage />}
        {route === 'table-chart-maker' && <TableChartMakerPage />}
        {route === 'data-converter' && <DataConverterPage />}
      </Suspense>
    </main>
  )
}

export default App
