import React, {useState} from "react";
import {Container,Alert} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { firestore } from "../../firebase";

import "../../styles/pages/AdminPage.css"

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
  const [loading, setLoading] = useState()

  function onSubmit(e) {
    setLoading("Loading...")
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
    <div>
    <Button className="user-view" href="/home">User View</Button>
    <h2 className="title">Create Event</h2>
    <Container id="create-event">
      {loading ? <Alert className='alert-loading' variant="primary">{loading}</Alert> : ''}
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
    </div>
  );
};

export default CreateEvent;
