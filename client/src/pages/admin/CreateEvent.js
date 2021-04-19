import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { firestore } from "../../firebase";

const convertTime12to24 = (time12h) => {
  const [time, modifier] = time12h.split(' ');

  let [hours, minutes] = time.split(':');

  if (hours === '12') {
    hours = '00';
  }

  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }

  return `${hours}:${minutes}`;
}

const CreateEvent = () => {
  function onSubmit(e) {
    e.preventDefault();
    e.persist();
    firestore.collection("events").add({
        event: e.target.event.value,
        date: e.target.date.value + " " + convertTime12to24(e.target.time.value),
      })
      .then(() => {
        //clears form on submit
        e.target.event.value = "";
        e.target.date.value = "";
        window.history.back();
      });
  }

  // missing links field
  return (
    <Container id="create-event">
      <h2>Create Event</h2>
      <Card>
        <Card.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="event">
              <Form.Label>Event</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group controlId="date">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
            <Form.Group controlId="time">
              <Form.Label>Time</Form.Label>
              <Form.Control type="time" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Create Event
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CreateEvent;
