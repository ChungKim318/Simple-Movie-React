import React from 'react'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'
import useSWR from 'swr'
import { fetcher, tmdbAPI } from '~/config'
import MovieCard from './MovieCard'

const MovieList = ({ type = 'now_playing' }) => {
  // const [movies, setMovies] = useState([])

  const { data } = useSWR(tmdbAPI.getMovieList(type), fetcher)

  const movies = data?.results || []

  // useEffect(() => {
  //   if (data && data.results) {
  //     setMovies(data.results)
  //   }
  // }, [data])

  // useEffect(() => {
  //   if (!data) return
  //   setMovies(data.results)
  // }, [data])

  return (
    <div className="movie-list">
      <Swiper grabCursor={true} spaceBetween={40} slidesPerView={'auto'}>
        {movies.length > 0 &&
          movies.map(item => (
            <SwiperSlide key={item.id}>
              <MovieCard item={item} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  )
}

export default MovieList
