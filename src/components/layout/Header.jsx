import React from 'react'
import { NavLink } from 'react-router'
const Header = () => {
  return (
    <header className="flex items-center justify-center py-10 mb-5 header gap-x-5">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? 'text-primary text-2xl' : '')}>
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={({ isActive }) => (isActive ? 'text-primary text-2xl' : '')}>
        Movies
      </NavLink>
    </header>
  )
}

export default Header
