import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router'
import { withErrorBoundary } from 'react-error-boundary'
import CustomButton from '../CustomButton/CustomButton'
import LoadingSkeleton from '../loading/LoadingSkeleton'

const BannerItem = ({ item }) => {
  const { title, backdrop_path, id } = item
  const navigate = useNavigate()
  return (
    <div className="relative w-full h-full rounded-lg">
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
      <img
        src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
        alt=""
        className="object-contain w-full h-full rounded-lg"
      />
      <div className="absolute w-full text-white left-5 bottom-5">
        <h2 className="mb-5 text-3xl font-bold">{title}</h2>
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
        <CustomButton onClick={() => navigate(`/movies/${id}`)}>
          Watch now
        </CustomButton>
      </div>
    </div>
  )
}

export const BannerItemSkeleton = () => {
  return (
    <div className="relative w-full h-full rounded-lg">
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
      <LoadingSkeleton width="100%" height="100%" borderRadius="8px" />
      <div className="absolute w-full text-white left-5 bottom-5">
        <h2 className="mb-5 text-3xl font-bold">
          <LoadingSkeleton width="500px" height="30px" className="mb-5" />
        </h2>
        <div className="flex items-center mb-8 gap-x-3">
          <span className="px-4 py-2 rounded-md">
            <LoadingSkeleton width="100px" height="45px" borderRadius="6px" />
          </span>
          <span className="px-4 py-2 rounded-md">
            <LoadingSkeleton width="100px" height="45px" borderRadius="6px" />
          </span>
          <span className="px-4 py-2 rounded-md">
            <LoadingSkeleton width="100px" height="45px" borderRadius="6px" />
          </span>
        </div>
        <LoadingSkeleton width="150px" height="45px" borderRadius="6px" />
      </div>
    </div>
  )
}

BannerItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    backdrop_path: PropTypes.string,
    id: PropTypes.number,
  }),
}

const FallbackComponent = () => {
  return (
    <p className="bg-red-50 text-red-400">
      Something went wrong with this Component
    </p>
  )
}

export default withErrorBoundary(React.memo(BannerItem), {
  fallback: <FallbackComponent />,
})
