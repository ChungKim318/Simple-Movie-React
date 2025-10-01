import React, { Fragment } from 'react'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'
import useSWR from 'swr'
import { fetcher, tmdbAPI } from '~/config'
import MovieCard, { MovieCardSkeleton } from './MovieCard'
import PropTypes from 'prop-types'
import { withErrorBoundary } from 'react-error-boundary'

const MovieList = ({ type = 'now_playing' }) => {
  // const [movies, setMovies] = useState([])

  const { data, error } = useSWR(tmdbAPI.getMovieList(type), fetcher)
  const isLoading = !data && !error

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
      {isLoading && (
        <Fragment>
          <Swiper grabCursor={true} spaceBetween={40} slidesPerView={'auto'}>
            <SwiperSlide>
              <MovieCardSkeleton />
            </SwiperSlide>
            <SwiperSlide>
              <MovieCardSkeleton />
            </SwiperSlide>
            <SwiperSlide>
              <MovieCardSkeleton />
            </SwiperSlide>
            <SwiperSlide>
              <MovieCardSkeleton />
            </SwiperSlide>
          </Swiper>
        </Fragment>
      )}
      {!isLoading && (
        <Swiper grabCursor={true} spaceBetween={40} slidesPerView={'auto'}>
          {movies.length > 0 &&
            movies.map(item => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item} />
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </div>
  )
}

MovieList.propTypes = {
  type: PropTypes.string,
}

const FallbackComponent = () => {
  return (
    <p className="bg-red-50 text-red-400">
      Something went wrong with MovieList Component
    </p>
  )
}

export default withErrorBoundary(React.memo(MovieList), {
  fallback: <FallbackComponent />,
})
