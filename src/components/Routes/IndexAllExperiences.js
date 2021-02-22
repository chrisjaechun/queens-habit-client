import React, { Component, Fragment } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
// import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'

class IndexAllExperiences extends Component {
  constructor (props) {
    super(props)

    this.state = {
      experiences: null
    }
  }

  componentDidMount () {
    const { user, msgAlert } = this.props
    axios({
      url: `${apiUrl}/experiences-all/`,
      method: 'GET',
      headers: {
        'Authorization': `Token ${user.token}`
      }
    })
      .then(res => {
        this.setState({ experiences: res.data })
        console.log(this.state.experiences)
      })
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
      experiencesJsx = <img className="mr-met-loading" src="https://media.giphy.com/media/qShKy3KNSkzVIxBSiI/giphy.gif" alt="mr-met-dancing-while-we-wait" />
    } else {
      const experiencesList = this.state.experiences.slice(0).reverse().map(experiences => (
        <Card key={experiences.id} className="card">
          <Card.Body>
            <Card.Title><h3>{experiences.what}</h3></Card.Title>
            <Card.Text>
              Where: {experiences.where}
            </Card.Text>
            <Card.Text>
              Notes: {experiences.notes}
            </Card.Text>
            <Card.Footer className="text-footer">Submitted by {experiences.owner}</Card.Footer>
          </Card.Body>
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
            <h1 className="text-center mx-auto">THE WORLD IS YOURS</h1>
            {experiencesJsx}
          </div>
        </div>
      </Fragment>
    )
  }
}

export default IndexAllExperiences
