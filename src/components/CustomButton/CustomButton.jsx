import React from 'react'
import PropTypes from 'prop-types'
import { withErrorBoundary } from 'react-error-boundary'

const CustomButton = ({
  onClick = () => {},
  className = '',
  children,
  type = 'button',
  bgColor = 'primary',
  full = false,
  ...props
}) => {
  let bgClassName = 'bg-primary'
  switch (bgColor) {
    case 'primary':
      bgClassName = 'bg-primary'
      break
    case 'secondary':
      bgClassName = 'bg-secondary'
      break
    default:
      break
  }
  return (
    <button
      type={type}
      className={`"${
        full ? 'w-full' : ''
      } px-6 py-3 capitalize rounded-lg cursor-pointer ${bgClassName} mt-auto" ${className}`}
      onClick={onClick}
      {...props}>
      {children}
    </button>
  )
}

CustomButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node,
  type: PropTypes.string,
  bgColor: PropTypes.string,
  full: PropTypes.bool,
}

const FallbackComponent = () => {
  return (
    <p className="bg-red-50 text-red-400">
      Something went wrong with this Component
    </p>
  )
}

export default withErrorBoundary(React.memo(CustomButton), {
  fallback: <FallbackComponent />,
})
