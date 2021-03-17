import React, { useState } from 'react'
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import firebase from '../../firebase'
import "../../styles/components/FeaturedArticles.css"

const PostEntry = () => {
    //const [title, setTitle] = useState(' ') for react hooks
    //const [content, setContent] = useState(' ')
    //const [description, setDescription] = useState(' ')

    function onSubmit(e) {
        e.preventDefault()
        firebase.firestore().collection('posts').add({
            title: e.target.title.value,
            content: e.target.content.value,
            description: e.target.description.value,
            date: e.target.date.value,
            tags: [],
            links:[]
        })
        .then(() => {       //clears form on submit
            e.target.title.value = ''   
            e.target.content.value = ''
            e.target.description.value = ''
            e.target.date.value = ''
        })
    }

    return (
        <Container id="create-post">
        <Card>
          <Card.Body>
            <Form onSubmit={onSubmit}>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Content</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" />
              </Form.Group>
              <Button variant="primary">Create Post</Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    )
}

export default PostEntry

/*
Not sure if above works when actually submitting the posts so here's the original just in case:
    <form onSubmit={onSubmit}>
        <div>
            <label for="title">Title</label>
            <input name="title" type="text" />
        </div>
        <div>
            <label for="description">Description</label>
            <input name="description" type="text" />
        </div>
        <div>
            <label for="content">Content</label>
            <input name="content" type="text" />
        </div>
        <div>
            <label for="date">Date</label>
            <input name="date" type="date" />
        </div>
        
        {//FIXME need tags and links
        /*<div> //for react hooks
            <label for="content">Content</label>
            <input id="content" type="text" value={content} onChange={e => setContent(e.currentTarget.value)} />
        </div>}
        <button type='submit'>Create Post</button>
    </form>
*/
