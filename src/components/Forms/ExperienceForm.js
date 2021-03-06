import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const ExperienceForm = ({ handleSubmit, handleInputChange, experience }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group controlId="what">
      <Form.Label>Experience:</Form.Label>
      <Form.Control
        required
        name="what"
        type="text"
        placeholder="What's the experience?"
        value={experience.what}
        onChange={handleInputChange}
      />
    </Form.Group>
    <Form.Group controlId="where">
      <Form.Label>Location:</Form.Label>
      <Form.Control
        required
        name="where"
        type="text"
        placeholder="Where should I go?"
        value={experience.where}
        onChange={handleInputChange}
      />
    </Form.Group>
    <Form.Group controlId="notes">
      <Form.Label>Notes:</Form.Label>
      <Form.Control
        required
        name="notes"
        as="textarea"
        placeholder="What should we know? (500 character limit)"
        value={experience.notes}
        onChange={handleInputChange}
      />
    </Form.Group>
    <Button
      variant="primary"
      type="submit"
    >
      Submit
    </Button>
  </Form>
)

export default ExperienceForm
