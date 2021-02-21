import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'
import SubmitExperience from './components/Routes/SubmitExperience'
import ShowExperience from './components/Routes/ShowExperience'
import IndexExperiences from './components/Routes/IndexExperiences'
import UpdateExperience from './components/Routes/UpdateExperience'
import IndexAllExperiences from './components/Routes/IndexAllExperiences'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map(msgAlert => (
          <AutoDismissAlert
            key={msgAlert.id}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute exact path='/experiences-all/' user={user} component={IndexAllExperiences} render={() => (
            <IndexAllExperiences msgAlert={this.msgAlert} user={user}/>
          )} />
          <AuthenticatedRoute path='/submit-experience' user={user} component={SubmitExperience} render={({ match }) => (
            <SubmitExperience msgAlert={this.msgAlert} user={user} match={match} />
          )} />
          <AuthenticatedRoute user={user} path='/update-experience/:id' render={({ match }) => (
            <UpdateExperience msgAlert={this.msgAlert} user={user} match={match}/>
          )} />
          <AuthenticatedRoute path='/experiences/:id/' user={user} render={({ match }) => (
            <ShowExperience msgAlert={this.msgAlert} user={user} match={match}/>
          )} />
          <AuthenticatedRoute exact path='/experiences/' user={user} component={IndexExperiences} render={() => (
            <IndexExperiences msgAlert={this.msgAlert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
