import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Form, Alert } from "react-bootstrap";

import { firestore } from '../../firebase'

import "../../styles/pages/AdminPage.css"

function useEvent(id) {
  const [val, setVal] = useState();

  firestore.collection('events').doc(id).get()
  .then((doc) => {
    if (doc.exists) {
        setVal(doc.data())
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
  })

  return val
}

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

const ModifyEvent = () => {
  const [loading, setLoading] = useState();
  const { id } = useParams();
  const val = useEvent(id);

  function updateEvent(e) {
    setLoading('Loading...')
    e.preventDefault()
    e.persist()
    const object = {
      event: e.target.event.value,
      date: e.target.date.value + " " + convertTime12to24(e.target.time.value),
    }
    Object.keys(object).forEach(k => (!object[k] && object[k] !== undefined) && delete object[k]); //remove blank keys

    firestore.collection('events').doc(id).update(object)
    .then(() => {       //clears form on submit
        window.history.back(); //return to previous page
    })
  }

  return (
    <div>
    <Button className="user-view" href="/home">User View</Button>
    <h2 className="title">Modify Event</h2>
      {loading ? <Alert className='alert-loading' variant="primary">{loading}</Alert> : ''}
      <Form className="title" onSubmit={updateEvent}>
        <Form.Group controlId="event">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" defaultValue={val ? val.event : ""}/>
        </Form.Group>
        <Form.Group controlId="date">
          <Form.Label>Date</Form.Label>
          <Form.Control type="date"/>
        </Form.Group>
        <Form.Group controlId="time">
          <Form.Label>Time</Form.Label>
          <Form.Control type="time"/>
        </Form.Group>
        <Button variant="primary" type='submit'>Update</Button>
      </Form>
    </div>
  );
}

export default ModifyEvent;
