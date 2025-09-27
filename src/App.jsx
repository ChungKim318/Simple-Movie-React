import { Fragment } from 'react'
import MovieList from '~components/movies/MovieList'
import MovieCard from '~components/movies/MovieCard'

function App() {
  return (
    <Fragment>
      <header className="flex items-center justify-center py-10 mb-5 header gap-x-5">
        <span className="text-3xl text-primary font-display">Home</span>
        <span>Movies</span>
      </header>
      <section className="banner h-[500px] page-container mb-20">
        <div className="relative w-full h-full rounded-lg">
          <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
          <img
            src="https://photo.znews.vn/w660/Uploaded/xbhunku/2019_03_28/avengersendgamepostertophalf.jpg"
            alt=""
            className="object-cover w-full h-full rounded-lg"
          />
          <div className="absolute w-full text-white left-5 bottom-5">
            <h2 className="mb-5 text-3xl font-bold">Avengers: Endgame</h2>
            <div className="flex items-center mb-8 gap-x-3">
              <span className="px-4 py-2 border border-white rounded-md">
                Adventure
              </span>
              <span className="px-4 py-2 border border-white rounded-md">
                Adventure
              </span>
              <span className="px-4 py-2 border border-white rounded-md">
                Adventure
              </span>
            </div>
            <button className="px-6 py-3 font-medium text-white rounded-lg bg-primary">
              Watch now
            </button>
          </div>
        </div>
      </section>
      <section className="pb-20 movies-layout page-container">
        <h2 className="mb-10 text-3xl font-bold capitalize">Now playing</h2>
        <MovieList />
      </section>
      <section className="pb-20 movies-layout page-container">
        <h2 className="mb-10 text-3xl font-bold capitalize">Top rated</h2>
        <MovieList type="top_rated" />
      </section>
      <section className="pb-20 movies-layout page-container">
        <h2 className="mb-10 text-3xl font-bold capitalize">Trending</h2>
        <MovieList type="popular" />
      </section>
    </Fragment>
  )
}

export default App
