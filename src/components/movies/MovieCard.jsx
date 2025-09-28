import React from 'react'
import PropTypes from 'prop-types'
const MovieCard = ({ item }) => {
  const { title, vote_average, release_date, poster_path } = item
  return (
    <div className="p-3 rounded-lg movie-card bg-slate-800 h-full flex flex-col select-none">
      <img
        src={`https://image.tmdb.org/t/p/original/${poster_path}`}
        alt=""
        className="w-full h-[250px] rounded-lg object-cover mb-5"
      />
      <div className="flex flex-col flex-1">
        <h3 className="mb-5 text-xl font-bold">{title}</h3>
        <div className="flex items-center justify-between mb-10 text-sm opacity-50">
          <span>{new Date(release_date).getFullYear()}</span>
          <span>{vote_average}</span>
        </div>
        <button className="w-full px-6 py-3 capitalize rounded-lg bg-primary mt-auto">
          Watch now
        </button>
      </div>
    </div>
  )
}

MovieCard.propTypes = {
  item: PropTypes.object,
}

export default MovieCard
