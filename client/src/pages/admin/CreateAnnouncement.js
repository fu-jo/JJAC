import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { firestore } from "../../firebase";

const CreateAnnouncement = () => {
  function onSubmit(e) {
    e.preventDefault();
    e.persist();
    firestore.collection("announcements").add({
        title: e.target.title.value,
        content: e.target.content.value,
        description: e.target.description.value,
        date: e.target.date.value,
        tags: [],
        links: [],
        img: e.target.img.value,
      })
      .then(() => {
        //clears form on submit
        e.target.title.value = "";
        e.target.content.value = "";
        e.target.description.value = "";
        e.target.date.value = "";
        e.target.img.value = null;
      });
  }

  return (
    <Container id="create-post">
      <Card>
        <Card.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Form.Group controlId="date">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
            <Form.Group controlId="img">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Create Announcement
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CreateAnnouncement;
