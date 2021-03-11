import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// import "../styles/components/ContactForm.css";

// need to implement Submit button functionality (grabbing/sending values, etc)
// Margin between header and card isn't right -Amber
export default class ContactForm extends Component {
  render() {
    return (
      <div>
        <h4>Contact Us</h4>
        <Card>
          <Card.Body>
            <Form>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
              <Button variant="primary">Send</Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
