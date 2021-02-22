import React, { Component, Fragment } from 'react'
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
      url: `${apiUrl}/experiences/`,
      method: 'GET',
      headers: {
        'Authorization': `Token ${user.token}`
      }
    })
      .then(res => this.setState({ experiences: res.data }))
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
      experiencesJsx = <h3 className="text-center">Yeah, fine, a magician never reveals their secrets.</h3>
    } else {
      const experiencesList = this.state.experiences.map(experience => (
        <Card key={experience.id} className="card">
          <Link to={`/experiences/${experience.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Card.Body>
              <Card.Title><h3>{experience.what}</h3></Card.Title>
              <Card.Text>
              Where: {experience.where}
              </Card.Text>
            </Card.Body>
          </Link>
        </Card>
      ))
      experiencesJsx = (
        <div>
          { experiencesList }
        </div>
      )
    }
    return (
      <Fragment>
        <div className="row">
          <div className="col-sm-10 col-md-8 mx-auto mt-5">
            <h1 className="text-center">MEMORY LANE</h1>
            {experiencesJsx}
          </div>
        </div>
      </Fragment>
    )
  }
}

export default IndexExperiences
