import React, { Fragment } from 'react'

const authenticatedUser = (
  <div className="landing-page">
    <h1 className="text-center page-message">IT AIN&apos;T HARD TO TELL</h1>
    <p className="text-center">Queens attracts clientele.</p>
  </div>
)

const unauthenticatedUser = (
  <div className="landing-page">
    <h1 className="text-center page-message">WELCOME TO QUEENS</h1>
    <p className="text-center">Explore the whole world in our beautiful borough. Sign-up or sign-in to get started.</p>
  </div>
)

const LandingPage = ({ user }) => (
  <Fragment>
    { user ? authenticatedUser : unauthenticatedUser }
  </Fragment>
)

export default LandingPage
