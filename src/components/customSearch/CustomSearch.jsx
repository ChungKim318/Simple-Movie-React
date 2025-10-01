import React from 'react'
import PropTypes from 'prop-types'
import { withErrorBoundary } from 'react-error-boundary'
import LoadingSkeleton from '../loading/LoadingSkeleton'

const CustomSearch = ({ onChange = () => {} }) => {
  return (
    <div className="flex mb-10">
      <div className="flex-1">
        <input
          type="text"
          className="w-full p-4 bg-slate-800 outline-none text-white"
          placeholder="Type here to search..."
          onChange={onChange}
        />
      </div>
      <button className="p-4 bg-primary text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </button>
    </div>
  )
}

export const CustomSearchSkeleton = () => {
  return (
    <div className="flex mb-10">
      <div className="flex-1">
        <LoadingSkeleton width="100%" height="45px" className="p-4" />
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

CustomSearch.propTypes = {
  onChange: PropTypes.func,
}

export default withErrorBoundary(React.memo(CustomSearch), {
  fallback: <FallbackComponent />,
})
