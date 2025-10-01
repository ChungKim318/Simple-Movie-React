import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import useSWR from 'swr'
import { fetcher, tmdbAPI } from '~/config'
import MovieList from '~/components/movies/MovieList'
import MovieCard from '~/components/movies/MovieCard'
import CustomSearch from '~/components/customSearch/CustomSearch'
import useDebounce from '~/hooks/useDebounce'
import ReactDOM from 'react-dom'

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

  const { data, error } = useSWR(url, fetcher)
  const loading = !data && !error

  const movies = data?.results || []

  useEffect(() => {
    if (!data || !data.total_results) return
    setPageCount(Math.ceil(data.total_results / itemsPerPage))
  }, [itemOffset, data])

  const handlePageClick = event => {
    const newOffset = (event.selected * itemsPerPage) % data.total_results
    setItemOffset(newOffset)
    setNextPage(event.selected + 1)
  }

  useEffect(() => {
    if (filterDebounce) {
      setUrl(tmdbAPI.searchMovie(filterDebounce, nextPage))
    } else {
      setUrl(tmdbAPI.getMovieWithPage('popular', nextPage))
    }
  }, [filterDebounce, nextPage])

  if (!data) return null
  // const { page, total_pages } = data

  return (
    <div className="py-10 page-container">
      <CustomSearch onChange={handleFilterChange} />
      {loading && (
        <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent border-t-4 mx-auto animate-spin"></div>
      )}
      <div className="grid grid-cols-4 gap-10">
        {!loading &&
          movies.length > 0 &&
          movies.map((item, index) => (
            <MovieCard key={item.id + index.toString()} item={item} />
          ))}
      </div>
      <div className="mt-10">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="pagination"
        />
      </div>
    </div>
  )
}

export default MoviePage
