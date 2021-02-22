import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import ExperienceForm from '../Forms/ExperienceForm'

class UpdateExperience extends Component {
  constructor (props) {
    super(props)

    this.state = {
      experience: {
        what: '',
        where: '',
        notes: ''
      },
      updated: false
    }
  }
  handleInputChange = (event) => {
    event.persist()
    const updatedField = {
      [event.target.name]: event.target.value
    }
    this.setState(() => {
      const newExperience = Object.assign({}, this.state.experience, updatedField)
      return { experience: newExperience }
    })
  }
  handleSubmit = event => {
    event.preventDefault()
    const { user, msgAlert } = this.props
    const { experience } = this.state
    axios({
      method: 'PATCH',
      url: `${apiUrl}/experiences/${this.props.match.params.id}/`,
      headers: {
        'Authorization': `Token ${user.token}`
      },
      data: { experience }
    })
      .then(() => this.setState({ updated: true }))
      .then(() => msgAlert({
        heading: 'Updated!',
        message: `${experience.what} looks a bit different!`,
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Uh-oh!',
          message: 'Peep this error: ' + error.message,
          variant: 'danger'
        })
      })
  }
  render () {
    if (this.state.updated) {
      return <Redirect to ={`/experiences/${this.props.match.params.id}/`}/>
    }
    return (
      <Fragment>
        <div className="row">
          <div className="col-sm-10 col-md-8 mx-auto mt-5">
            <h1 className="text-center">REWIND</h1>
            <ExperienceForm
              experience={this.state.experience}
              handleSubmit={this.handleSubmit}
              handleInputChange={this.handleInputChange}
            />
          </div>
        </div>
      </Fragment>
    )
  }
}
export default UpdateExperience
