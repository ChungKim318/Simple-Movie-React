import React from 'react'
import { withErrorBoundary } from 'react-error-boundary'
import PropTypes from 'prop-types'

const LoadingSkeleton = props => {
  return (
    <div
      className={`skeleton ${props.className}`}
      style={{
        height: props.height,
        width: props.width || '100%',
        borderRadius: props.borderRadius,
      }}></div>
  )
}

const FallbackComponent = () => {
  return (
    <p className="bg-red-50 text-red-400">
      Something went wrong with LoadingSkeleton Component
    </p>
  )
}

LoadingSkeleton.propTypes = {
  props: PropTypes.object,
}

export default withErrorBoundary(React.memo(LoadingSkeleton), {
  fallback: <FallbackComponent />,
})
