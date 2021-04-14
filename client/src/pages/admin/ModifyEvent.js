import React, { Component, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Form, Alert } from "react-bootstrap";

import { firestore } from '../../firebase'

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

const ModifyEvent = () => {
  const [succ, setSucc] = useState();
  const [err, setErr] = useState(null);
  const { id } = useParams();
  const val = useEvent(id);

  function updateEvent(e) {
    e.preventDefault()
    e.persist()
    const object = {
      event: e.target.event.value,
      date: e.target.date.value,
    }
    Object.keys(object).forEach(k => (!object[k] && object[k] !== undefined) && delete object[k]); //remove blank keys
    console.log(object)

    firestore.collection('events').doc(id).update(object)
    .then(() => {       //clears form on submit
        setSucc('Successfully Modified')
        e.target.event.value = ''
        e.target.date.value = ''
        window.history.back(); //return to previous page
    })
  }

  return (
    <div>
      {succ ? <Alert className='alert-success'>{succ}</Alert> : ''}
      <h2>Modify Event</h2>
      <Form onSubmit={updateEvent}>
        <Form.Group controlId="event">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" defaultValue={val ? val.event : ""}/>
        </Form.Group>
        <Form.Group controlId="date">
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" defaultValue={val ? val.date : ""}/>
        </Form.Group>
        <Button variant="primary" type='submit'>Update</Button>
      </Form>
    </div>
  );
}

export default ModifyEvent;