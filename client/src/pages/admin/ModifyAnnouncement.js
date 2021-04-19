import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Form, Alert } from "react-bootstrap";

import { firestore } from '../../firebase'

import "../../styles/pages/AdminPage.css"

function useAnnouncement(id) {
  const [val, setVal] = useState();

  firestore.collection('announcements').doc(id).get()
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

const ModifyAnnouncement = () => {
  const [succ, setSucc] = useState();
  const { id } = useParams();
  const val = useAnnouncement(id);

  function updateAnnouncement(e) {
    e.preventDefault()
    e.persist()
    const object = {
      title: e.target.title.value,
      details: e.target.details.value,
      date: e.target.date.value,
      links:[],
    }
    Object.keys(object).forEach(k => (!object[k] && object[k] !== undefined) && delete object[k]); //remove blank keys
    console.log(object)

    firestore.collection('announcements').doc(id).update(object)
    .then(() => {       //clears form on submit
        setSucc('Successfully Modified')
        e.target.title.value = ''
        e.target.details.value = ''
        e.target.date.value = ''
        window.history.back(); //return to previous page
    })
  }

  return (
    <div>
      <Button className="logout" href="/home">Logout</Button>
      {succ ? <Alert className='alert-success'>{succ}</Alert> : ''}
      <h2 className="title">Modify Announcement</h2>
      <Form className="title" onSubmit={updateAnnouncement}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" defaultValue={val ? val.title : ""}/>
        </Form.Group>
        <Form.Group controlId="details">
          <Form.Label>Details</Form.Label>
          <Form.Control as="textarea" rows={3} defaultValue={val ? val.details : ""}/>
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

export default ModifyAnnouncement;
