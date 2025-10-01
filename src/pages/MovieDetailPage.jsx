import React, { Fragment } from 'react'
import { useParams } from 'react-router'
import useSWR from 'swr'
import { Swiper, SwiperSlide } from 'swiper/react'
import { fetcher, tmdbAPI } from '~/config'
import MovieCard from '~/components/movies/MovieCard'
import { withErrorBoundary } from 'react-error-boundary'

const MovieDetailPage = () => {
  const { movieId } = useParams()

  const { data } = useSWR(tmdbAPI.getMovieDetail(movieId), fetcher)

  if (!data) return null

  return (
    <div className="py-10">
      <div className="w-full h-[600px] relative">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div
          className="w-full h-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${tmdbAPI.imageOriginal(
              data.backdrop_path
            )})`,
          }}></div>
      </div>
      <div className="w-full h-[300px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10">
        <img
          src={tmdbAPI.imageOriginal(data.poster_path)}
          alt=""
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <h1 className="text-center text-4xl font-bold mb-10">{data.title}</h1>
      {data?.genres.length > 0 && (
        <div className="flex items-center justify-center gap-x-5 mb-10">
          {data.genres.map((item, index) => (
            <span
              key={item.id + index.toString()}
              className="px-4 py-2 border border-primary text-primary rounded-md ">
              {item.name}
            </span>
          ))}
        </div>
      )}
      <p className="text-center leading-relaxed max-w-[600px] mx-auto mb-10">
        {data?.overview}
      </p>
      <MovieMeta type="credits" />
      <MovieMeta type="videos" />
      <MovieMeta type="similar" />
    </div>
  )
}

function MovieMeta({ type = 'videos' }) {
  const { movieId } = useParams()

  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, type), fetcher)
  if (!data) return null

  if (type === 'credits') {
    const { cast } = data

    if (!cast || cast.length <= 0) return null
    return (
      <div className="py-10">
        <h2 className="text-center text-2xl mb-10">Cast</h2>
        <div className="grid grid-cols-7 gap-5">
          {cast.slice(0, 7).map((item, index) => (
            <div className="cast-item" key={item.id + index.toString()}>
              <img
                src={tmdbAPI.imageOriginal(item.profile_path)}
                alt=""
                className="w-auto h-[350px] object-cover rounded-lg"
              />
              <h3 className="text-2xl font-medium">{item.name}</h3>
            </div>
          ))}
        </div>
      </div>
    )
  } else {
    const { results } = data
    if (!results || results.length <= 0) return null
    if (type === 'videos')
      return (
        <div className="py-10">
          <div className="flex flex-col gap-10">
            {results.slice(0, 3).map((item, index) => (
              <div key={item.id + index.toString()}>
                <h3 className="mb-5 text-xl font-medium p-3 bg-secondary inline-block">
                  {item.name}
                </h3>
                <div className="w-full aspect-video">
                  <iframe
                    width="1236"
                    height="695"
                    src={`https://www.youtube.com/embed/${item.key}`}
                    // title={item.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full object-fill"></iframe>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    if (type === 'similar')
      return (
        <div className="py-10">
          <h2 className="text-3xl font-medium mb-10">Similar Movies</h2>
          <div className="movie-list">
            <Swiper grabCursor={true} spaceBetween={40} slidesPerView={'auto'}>
              {results.length > 0 &&
                results.map(item => (
                  <SwiperSlide key={item.id}>
                    <MovieCard item={item} />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      )
  }
  return null
}

function MovieCredits() {
  const { movieId } = useParams()

  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, 'credits'), fetcher)

  const cast = data?.cast || []

  if (!cast || cast.length <= 0) return null

  return (
    <div className="py-10">
      <h2 className="text-center text-2xl mb-10">Cast</h2>
      <div className="grid grid-cols-7 gap-5">
        {cast.slice(0, 7).map((item, index) => (
          <div className="cast-item" key={item.id + index.toString()}>
            <img
              src={tmdbAPI.imageOriginal(item.profile_path)}
              alt=""
              className="w-auto h-[350px] object-cover rounded-lg"
            />
            <h3 className="text-2xl font-medium">{item.name}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

function MovieVideos() {
  const { movieId } = useParams()

  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, 'videos'), fetcher)

  const videos = data?.results || []

  if (!videos || videos.length <= 0) return null

  return (
    <div className="py-10">
      <div className="flex flex-col gap-10">
        {videos.slice(0, 3).map((item, index) => (
          <div key={item.id + index.toString()}>
            <h3 className="mb-5 text-xl font-medium p-3 bg-secondary inline-block">
              {item.name}
            </h3>
            <div className="w-full aspect-video">
              <iframe
                width="1236"
                height="695"
                src={`https://www.youtube.com/embed/${item.key}`}
                // title={item.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full object-fill"></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function MovieSimilar() {
  const { movieId } = useParams()

  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, 'similar'), fetcher)

  const similar = data?.results || []

  if (!similar || similar.length <= 0) return null

  return (
    <div className="py-10">
      <h2 className="text-3xl font-medium mb-10">Similar Movies</h2>
      <div className="movie-list">
        <Swiper grabCursor={true} spaceBetween={40} slidesPerView={'auto'}>
          {similar.length > 0 &&
            similar.map(item => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  )
}

const FallbackComponent = () => {
  return (
    <p className="bg-red-50 text-red-400">
      Something went wrong with this Component
    </p>
  )
}

export default withErrorBoundary(React.memo(MovieDetailPage), {
  fallback: <FallbackComponent />,
})
