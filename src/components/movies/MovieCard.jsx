import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router'
import CustomButton from '../CustomButton/CustomButton'
import { tmdbAPI } from '~/config'

const MovieCard = ({ item }) => {
  const { title, vote_average, release_date, poster_path, id } = item

  const navigate = useNavigate()

  return (
    <div className="p-3 rounded-lg movie-card bg-slate-800 h-full flex flex-col select-none">
      <img
        src={tmdbAPI.image500(poster_path)}
        alt=""
        className="w-full h-[250px] rounded-lg object-cover mb-5"
      />
      <div className="flex flex-col flex-1">
        <h3 className="mb-3 text-lg font-bold line-clamp-1">{title}</h3>
        <div className="flex items-center justify-between mb-10 text-sm opacity-50">
          <span>{new Date(release_date).getFullYear()}</span>
          <span>{vote_average}</span>
        </div>
        <CustomButton
          bgColor="secondary"
          onClick={() => navigate(`/movies/${id}`)}>
          Watch now
        </CustomButton>
      </div>
    </div>
  )
}

MovieCard.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    vote_average: PropTypes.number,
    release_date: PropTypes.string,
    poster_path: PropTypes.string,
    id: PropTypes.number,
  }),
}

export default MovieCard
