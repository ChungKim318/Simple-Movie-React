import { Fragment } from 'react'
import { Route, Routes } from 'react-router'
import 'swiper/css'
import Main from '~/components/layout/Main'
import HomePage from '~/pages/HomePage'
import MoviePage from '~/pages/MoviePage'

function App() {
  return (
    <Fragment>
      <Routes>
        <Route element={<Main />}>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/movies" element={<MoviePage />}></Route>
        </Route>
      </Routes>
    </Fragment>
  )
}

export default App
