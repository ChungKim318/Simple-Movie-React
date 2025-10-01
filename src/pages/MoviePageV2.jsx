import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'
import { withErrorBoundary } from 'react-error-boundary'
import { v4 } from 'uuid'
import { fetcher, tmdbAPI } from '~/config'
import MovieList from '~/components/movies/MovieList'
import MovieCard, { MovieCardSkeleton } from '~/components/movies/MovieCard'
import CustomSearch, {
  CustomSearchSkeleton,
} from '~/components/customSearch/CustomSearch'
import useDebounce from '~/hooks/useDebounce'
import CustomButton from '~/components/CustomButton/CustomButton'

const itemsPerPage = 20

const MoviePage = () => {
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const [filter, setFilter] = useState('')
  const [nextPage, setNextPage] = useState(1)
  const [url, setUrl] = useState(tmdbAPI.getMovieWithPage('popular', nextPage))

  const { debounceValue: filterDebounce } = useDebounce(filter, 500)

  const handleFilterChange = e => {
    setFilter(e.target.value)
  }

  const { data, error, size, setSize } = useSWRInfinite(
    index => url.replace('page=1', `page=${index + 1}`),
    fetcher
  )
  const movies = data ? data.reduce((a, b) => a.concat(b.results), []) : []
  const isLoading = !data && !error

  const isEmpty = data?.[0]?.results.length === 0
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.results.length < itemsPerPage)

  useEffect(() => {
    if (filterDebounce) {
      setUrl(tmdbAPI.searchMovie(filterDebounce, nextPage))
    } else {
      setUrl(tmdbAPI.getMovieWithPage('popular', nextPage))
    }
  }, [filterDebounce, nextPage])

  useEffect(() => {
    if (!data || !data.total_results) return
    setPageCount(Math.ceil(data.total_results / itemsPerPage))
  }, [itemOffset, data])

  const handlePageClick = event => {
    const newOffset = (event.selected * itemsPerPage) % data.total_results
    setItemOffset(newOffset)
    setNextPage(event.selected + 1)
  }

  return (
    <div className="py-10 page-container">
      <CustomSearch onChange={handleFilterChange} />
      {/* {isLoading && (
        <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent border-t-4 mx-auto animate-spin"></div>
      )} */}
      {isLoading ? (
        <div className="grid grid-cols-4 gap-10">
          {new Array(itemsPerPage).fill(0).map(() => (
            <MovieCardSkeleton key={v4()} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-10">
          {movies.length > 0 &&
            movies.map((item, index) => (
              <MovieCard key={item.id + index.toString()} item={item} />
            ))}
        </div>
      )}
      <div className="mt-10 text-center">
        <CustomButton
          onClick={() => (isReachingEnd ? null : setSize(size + 1))}
          disabled={isReachingEnd}
          className={`${isReachingEnd ? 'bg-slate-300' : ''}`}>
          Load more
        </CustomButton>
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

export default withErrorBoundary(React.memo(MoviePage), {
  fallback: <FallbackComponent />,
})
