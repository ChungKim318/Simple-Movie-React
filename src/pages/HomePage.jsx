import React, { Fragment } from 'react'
import Banner from '~/components/banner/Banner'
import MovieList from '~/components/movies/MovieList'

const HomePage = () => {
  return (
    <Fragment>
      <Banner />
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

export default HomePage
