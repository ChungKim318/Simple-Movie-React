import React from 'react'
import MovieList from '~/components/movies/MovieList'
import useSWR from 'swr'
import { fetcher } from '~/config'
import MovieCard from '~/components/movies/MovieCard'
import CustomSearch from '~/components/customSearch/CustomSearch'

const MoviePage = () => {
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,
    fetcher
  )

  const movies = data?.results || []

  return (
    <div className="py-10 page-container">
      <CustomSearch />
      <div className="grid grid-cols-4 gap-10">
        {movies.length > 0 &&
          movies.map((item, index) => (
            <MovieCard key={item.id + index.toString()} item={item} />
          ))}
      </div>
    </div>
  )
}

export default MoviePage
