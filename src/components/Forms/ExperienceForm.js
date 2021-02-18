import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const ItemForm = ({ handleSubmit, handleInputChange, item }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group controlId="what">
      <Form.Label>What?</Form.Label>
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
      <Form.Label>Where?</Form.Label>
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
      <Form.Label>Notes</Form.Label>
      <Form.Control
        required
        name="notes"
        type="text"
        placeholder="What should we know?"
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

export default ItemForm
