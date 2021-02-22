import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link className="nav-link" href="#experiences-all">Home</Nav.Link>
    <Nav.Link className="nav-link" href="#submit-experience">Submit Experience</Nav.Link>
    <Nav.Link className="nav-link" href="#experiences">My Experiences</Nav.Link>
    <Nav.Link className="nav-link" href="#change-password">Change Password</Nav.Link>
    <Nav.Link className="nav-link" href="#sign-out">Sign Out</Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link className="nav-link" href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link className="nav-link" href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar bg="transparent" expand="md" fixed="top" className="navbar-header">
    <Navbar.Brand href="#" className="navbar">
      <img src="https://i.imgur.com/Ts5GwnS.png" width="60" height="60"/>
      <div className="logo">
        QUEENS HABIT
      </div>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        {/* { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>} */}
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
