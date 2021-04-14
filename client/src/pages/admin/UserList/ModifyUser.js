import React, { Component, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Form, Alert } from "react-bootstrap";

import { firestore } from '../../../firebase'

const ModifyAnnouncement = () => {
  const [succ, setSucc] = useState();
  const [err, setErr] = useState(null);
  const { id } = useParams();

  function updateUser(e) {
    e.preventDefault()
    e.persist()
    const object = {
      displayName: e.target.name.value,
      email: e.target.email.value,
    }
    Object.keys(object).forEach(k => (!object[k] && object[k] !== undefined) && delete object[k]); //remove blank keys
    console.log(object)

    firestore.collection('users').doc(id).update(object)
    .then(() => {       //clears form on submit
        setSucc('Successfully Modified')
        e.target.name.value = ''
        e.target.email.value = ''
        window.history.back(); //return to previous page
    })
  }

  return (
    <div>
      {succ ? <Alert className='alert-success'>{succ}</Alert> : ''}
      <h2>Modify User</h2>
      <Form onSubmit={updateUser}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control as="textarea"/>
        </Form.Group>
        <Button variant="primary" type='submit'>Update</Button>
      </Form>
    </div>
  );
}

export default ModifyAnnouncement;