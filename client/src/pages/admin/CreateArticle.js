import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import { Card, Form, Button, Alert } from "react-bootstrap";
import Progress from '../../components/Progress'
import "../../styles/pages/AdminPage.css"

import { firestore } from "../../firebase";

const CreateArticle = () => {
  const [img, setImg] = useState(null);
  const [err, setErr] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);

  const imgFormats = ['image/png', 'image/jpeg'];

  const imgChange = (e) => {
    const selected = e.target.files[0];

    if (selected && imgFormats.includes(selected.type)) {
      //console.log(selected)
      setImg(selected);
      setErr('')
    } else {
      setImg(null);
      setErr('Please use an image file (png) or (jpeg)')
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    e.persist();
    firestore.collection("posts").add({
        title: e.target.title.value,
        content: e.target.content.value,
        description: e.target.description.value,
        date: e.target.date.value,
        tags: [],
        links: [],
        img: imgUrl,//e.target.img.value,
      })
      .then(() => {
        //clears form on submit
        e.target.title.value = "";
        e.target.content.value = "";
        e.target.description.value = "";
        e.target.date.value = "";
        e.target.img.value = null;
        window.history.back();
      });
  }

  // missing links & tags fields
  return (
    <div>
     <Button className="logout" href="/home">Logout</Button>
     <h2 className="title">Create Article</h2>
     <Container id="create-post">
      {err && <Alert variant='danger'>{err}</Alert>}
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
              <Form.Control type="file" onChange={imgChange} />
            </Form.Group>
            {img &&<Progress file={img} setFile={setImg} setImgUrl={setImgUrl} /> }
            <Button variant="primary" type="submit">
              Create Article
            </Button>
          </Form>
        </Card.Body>
       </Card>
      </Container>
    </div>
  );
};

export default CreateArticle;
