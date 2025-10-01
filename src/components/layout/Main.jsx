import React, { Fragment } from 'react'
import Header from './Header'
import { Outlet } from 'react-router'
const Main = () => {
  return (
    <Fragment>
      <Header />
      <Outlet> </Outlet>
    </Fragment>
  )
}

export default React.memo(Main)
