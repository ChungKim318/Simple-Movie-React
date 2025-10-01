import { Fragment, lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import 'swiper/css'
import Main from '~/components/layout/Main'
// import HomePage from '~/pages/HomePage'
// import MoviePage from '~/pages/MoviePage'
// import MovieDetailPage from './pages/MovieDetailPage'

const HomePage = lazy(() => import('~/pages/HomePage'))
const MovieDetailPage = lazy(() => import('~/pages/MovieDetailPage'))
const MoviePage = lazy(() => import('~/pages/MoviePage'))
const MoviePageV2 = lazy(() => import('~/pages/MoviePageV2'))

function App() {
  return (
    <Fragment>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<Main />}>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/movies" element={<MoviePage />}></Route>
            <Route
              path="/movies/:movieId"
              element={<MovieDetailPage />}></Route>
            <Route path="*" element={<>404</>}></Route>
          </Route>
        </Routes>
      </Suspense>
    </Fragment>
  )
}

export default App
