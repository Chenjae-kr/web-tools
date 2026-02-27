import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { ThumbnailMakerPage } from './features/thumbnail-maker/ThumbnailMakerPage'
import { HomePage } from './pages/HomePage'
import { getRouteFromHash, toHash, type AppRoute } from './routes'

function App() {
  const [route, setRoute] = useState<AppRoute>(() => getRouteFromHash(window.location.hash))

  useEffect(() => {
    const onHashChange = () => setRoute(getRouteFromHash(window.location.hash))
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const title = useMemo(() => (route === 'thumbnail-maker' ? 'Thumbnail Maker' : 'Home'), [route])

  return (
    <main className="container">
      <nav className="card" style={{ display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'space-between' }}>
        <strong>web-tools</strong>
        <div style={{ display: 'flex', gap: 8 }}>
          <a href={toHash('home')}>Home</a>
          <a href={toHash('thumbnail-maker')}>Thumbnail Maker</a>
        </div>
      </nav>

      <p className="subtitle" style={{ marginTop: 8 }}>Current Route: {title}</p>

      {route === 'home' ? <HomePage /> : <ThumbnailMakerPage />}
    </main>
  )
}

export default App
