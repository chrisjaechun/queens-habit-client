import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'

class IndexExperiences extends Component {
  constructor (props) {
    super(props)
    this.state = {
      experiences: null
    }
  }

  componentDidMount () {
    const { user, msgAlert } = this.props
    axios({
      url: apiUrl + '/experiences/',
      method: 'get',
      headers: {
        'Authorization': `Token ${user.token}`
      }
    })
      .then(res => this.setState({ experiences: res.data.experiences }))
      .catch(error => {
        msgAlert({
          heading: 'What?',
          message: 'This?' + error.message,
          variant: 'danger'
        })
      })
  }
  render () {
    let experiencesJsx
    if (this.state.experiences === null) {
      experiencesJsx = <img src="https://media.giphy.com/media/qShKy3KNSkzVIxBSiI/giphy.gif" alt="mr-met-dancing-while-we-wait" />
    } else if (this.state.experiences.length === 0) {
      experiencesJsx = 'You should share some experiences!'
    } else {
      const experiencesList = this.state.experiences.map(experience => (
        <Card key={experience._id} className = "d-inline-flex" style={{ width: '50rem' }}>
          <Link to={'/experiences/'} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Card.Body>
              <Card.Title>{experience.what}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Where: {experience.where}</Card.Subtitle>
            </Card.Body>
          </Link>
        </Card>
      ))
      experiencesJsx = (
        <ul>
          {experiencesList}
        </ul>
      )
    }
    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h2 style={{ textAlign: 'center' }}>Here are your submitted experiences!</h2>
          <div className="col-sm-4 col-md-8 col-lg-12 mx-auto mt-5">
            {experiencesJsx}
          </div>
        </div>
      </div>
    )
  }
}

export default IndexExperiences
