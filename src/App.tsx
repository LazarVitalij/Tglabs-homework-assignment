import { JSX, Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from '@/routes/routes'
import Loader from './components/Loader'

const App = (): JSX.Element => {
  const routing = useRoutes(routes)
  return (
    <div id="app-container">
      <video autoPlay muted loop id="background-video">
        <source src="../src/assets/background.mp4" type="video/mp4" />
      </video>
      <div id="content">
        <Suspense fallback={<Loader />}>{routing}</Suspense>
      </div>
    </div>
  )
}

export default App
