import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../../styles/pages/AdminPage.css"

import { firestore } from "../../firebase";

const CreateAnnouncement = () => {
  function onSubmit(e) {
    e.preventDefault();
    e.persist();
    firestore.collection("announcements").add({
        title: e.target.title.value,
        details: e.target.details.value,
        date: e.target.date.value,
        links: []
      })
      .then(() => {
        //clears form on submit
        e.target.title.value = "";
        e.target.details.value = "";
        e.target.date.value = "";
        window.history.back();
      });
  }

  // missing links field
  return (
    <div>
     <Button className="user-view" href="/home">User View</Button>
     <h2 className="title">Create Annnouncement</h2>
     <Container id="create-announcement">
      <Card>
       <Card.Body>
         <Form onSubmit={onSubmit}>
           <Form.Group controlId="title">
             <Form.Label>Title</Form.Label>
             <Form.Control type="text" />
           </Form.Group>
           <Form.Group controlId="details">
             <Form.Label>Details</Form.Label>
             <Form.Control as="textarea" rows={3} />
           </Form.Group>
           <Form.Group controlId="date">
             <Form.Label>Date</Form.Label>
             <Form.Control type="date" />
           </Form.Group>
           <Button variant="primary" type="submit">
             Create Announcement
           </Button>
         </Form>
       </Card.Body>
      </Card>
     </Container>
    </div>
  );
};

export default CreateAnnouncement;
