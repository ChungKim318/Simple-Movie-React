import React from 'react'

const CustomButton = ({
  onClick = () => {},
  className,
  children,
  type = 'button',
  bgColor = 'primary',
  full = false,
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
      } px-6 py-3 capitalize rounded-lg ${bgClassName} mt-auto" ${className}`}
      onClick={onClick}>
      {children}
    </button>
  )
}

export default CustomButton
