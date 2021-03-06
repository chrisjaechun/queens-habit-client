import React, { Component, Fragment } from 'react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

class ShowExperience extends Component {
  constructor (props) {
    super(props)

    this.state = {
      experience: null,
      deleted: false
    }
  }
  componentDidMount () {
    const { user, msgAlert } = this.props
    axios({
      url: `${apiUrl}/experiences/${this.props.match.params.id}/`,
      method: 'GET',
      headers: {
        'Authorization': `Token ${user.token}`
      }
    })
      .then(res => this.setState({ experience: res.data }))
      .catch(error => {
        msgAlert({
          heading: 'Whoops',
          message: 'Something went wrong: ' + error.message,
          variant: 'danger'
        })
      })
  }
  deleteExperience = () => {
    const { user, msgAlert } = this.props
    axios({
      url: `${apiUrl}/experiences/${this.state.experience.id}/`,
      method: 'delete',
      headers: {
        'Authorization': `Token ${user.token}`
      }
    })
      .then(() => this.setState({ deleted: true }))
      .then(() => msgAlert({
        heading: 'Destroyed!',
        message: `Sounds like ${this.state.experience.what} needs a rain check.`,
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'This one is stubborn!',
          message: 'Check this: ' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    let experienceJsx
    const { experience, deleted } = this.state
    if (deleted) {
      return <Redirect to="/experiences/"/>
    }
    if (experience === null) {
      experienceJsx = <h1 className="text-center page-message">Loading...</h1>
    } else {
      const { user } = this.props
      experienceJsx = (
        <Card key ={experience.id} className="card">
          <Card.Header>Featured</Card.Header>
          <Card.Body>
            <Card.Title><h3>{experience.what}</h3></Card.Title>
            <Card.Text>
              Where: {experience.where}
            </Card.Text>
            <Card.Text>
              Notes: {experience.notes}
            </Card.Text>
            <Button className="update-button">
              <Link to={{
                pathname: `/update-experience/${experience.id}/`,
                state: {
                  what: experience.what,
                  where: experience.where,
                  notes: experience.notes
                } }}
              style={{ textDecoration: 'none', color: '#ffffff' }}>
                Update Experience
              </Link>
            </Button>
            <Button variant="danger" style={{ textDecoration: 'none', color: '#ffffff' }} onClick={this.deleteExperience}>Delete</Button>
          </Card.Body>
          <Card.Footer className="text-footer">Submitted by {user.email}</Card.Footer>
        </Card>
      )
    }
    return (
      <Fragment>
        <div className="row">
          <div className="col-sm-10 col-md-8 mx-auto mt-5">
            <h1 className="text-center page-message">IT WAS WRITTEN</h1>
            {experienceJsx}
          </div>
        </div>
      </Fragment>
    )
  }
}

export default ShowExperience
