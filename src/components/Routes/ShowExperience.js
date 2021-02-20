import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
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
    console.log(this.state)
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
        message: `${this.state.experience.what} has been terminated`,
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
      return <Redirect to="/experiences"/>
    }
    if (experience === null) {
      experienceJsx = <img src="https://media.giphy.com/media/qShKy3KNSkzVIxBSiI/giphy.gif" alt="mr-met-dancing-while-we-wait" />
    } else {
      const { user } = this.props
      experienceJsx = (
        <Card key ={experience.id} className="text-center">
          <Card.Header>Featured</Card.Header>
          <Card.Body>
            <Card.Title>{experience.what}</Card.Title>
            <Card.Text>
              Where: {experience.where}
            </Card.Text>
            <Card.Text>
              Notes: {experience.notes}
            </Card.Text>
            <Button onClick={this.deleteExperience}>Delete</Button>
          </Card.Body>
          <Card.Footer className="text-muted">Submitted by {user.email}</Card.Footer>
        </Card>
        // <Fragment>
        //   <h2>{experience.what}</h2>
        //   {/* <Button variant="outline-primary"><Link to={`/update-experience/${experience.id}`}>Update Experience</Link></Button> */}
        // </Fragment>
      )
    }
    return (
      <Fragment>
        <div className="row show-experience">
          <div className="col-sm-10 col-md-8 mx-auto mt-5">
            <h1 className="text-center">Your Experiences!</h1>
            {experienceJsx}
          </div>
        </div>
      </Fragment>
    )
  }
}

export default ShowExperience
