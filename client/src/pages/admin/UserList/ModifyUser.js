import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Form, Alert } from "react-bootstrap";

import { firestore } from '../../../firebase'

import "../../../styles/pages/AdminPage.css"

function useUser(id) {
  const [initVal, setInitVal] = useState();

  firestore.collection('users').doc(id).get()
  .then((doc) => {
    if (doc.exists) {
        setInitVal(doc.data())
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
  })

  return initVal
}

const ModifyAnnouncement = () => {
  const [succ, setSucc] = useState();
  const { id } = useParams();
  const initVal = useUser(id);

  function updateUser(e) {
    e.preventDefault()
    e.persist()

    const object = {
      name: e.target.name.value,
      email: e.target.email.value,
      role: e.target.role.value
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
      <Button className="user-view" href="/home">User View</Button>
      <h2 className="title">Modify User</h2>
      {succ ? <Alert className='alert-success'>{succ}</Alert> : ''}
      <Form className="title" onSubmit={updateUser}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" defaultValue={initVal ? initVal.name : ""}/>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control as="textarea" defaultValue={initVal ? initVal.email : ""}/>
        </Form.Group>
        <Form.Group controlId="role">
          <Form.Label>User role</Form.Label>
          <Form.Check label="user" name="role" value="user" type="radio" id="user-role" />
          <Form.Check label="admin" name="role" value="admin" type="radio" id="admin-role" />
        </Form.Group>
        <Button variant="primary" type='submit'>Update</Button>
      </Form>
    </div>
  );
}

export default ModifyAnnouncement;
