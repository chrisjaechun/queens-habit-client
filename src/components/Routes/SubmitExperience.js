import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import ExperienceForm from '../Forms/ExperienceForm'

class SubmitExperience extends Component {
  constructor (props) {
    super(props)

    this.state = {
      experience: {
        what: '',
        where: '',
        notes: ''
      },
      createdId: null
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
  handleSubmit = (event) => {
    event.preventDefault()
    const { user, msgAlert } = this.props
    const { experience } = this.state
    axios({
      method: 'post',
      url: `${apiUrl}/experiences/`,
      headers: {
        'Authorization': `Token ${user.token}`
      },
      data: { experience }
    })
      .then((res) => {
        this.setState({ createdId: res.data.id })
        return res
      })
      .then(() => msgAlert({
        heading: 'Submitted Experience Successfully',
        message: `${experience.what} has been added!`,
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Oh boy',
          message: 'Your error is ' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    if (this.state.createdId) {
      return <Redirect to ={`/experiences/${this.state.createdId}`}/>
    }
    return (
      <Fragment>
        <div className="row">
          <div className="col-sm-10 col-md-8 mx-auto mt-5">
            <h1 className="text-center page-message">QUEENS GET THE MONEY</h1>
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
export default SubmitExperience
