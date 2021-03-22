import React, { Component, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Form, Alert } from "react-bootstrap";

import AdminSidebar from '../../components/AdminSidebar';

import { firestore } from '../../firebase'

// export default class ModifyArticle extends Component {
//   constructor(props) {
//     super(props);

//     this.buttonClicked = this.buttonClicked.bind(this);

//     this.state = {
//       name: "Click"
//     };
//   }

//   buttonClicked() {
//     this.setState({name: "Button Pressed"})
//   }

//   render() {
//     return (
//       <div>
//         <AdminSidebar />
//         <h2>ModifyArticle</h2>
//         <h4>ID: {this.props.match.params.id}</h4>
//         <Button variant="primary" onClick={this.buttonClicked}>
//           {this.state.name}
//         </Button>
//       </div>
//     );
//   }
// }


const ModifyArticle = () => {
  const [succ, setSucc] = useState();
  const { id } = useParams();

  function updatePost(e) {
    e.preventDefault()
    e.persist()
    const object = {
      title: e.target.title.value,
      content: e.target.content.value,
      description: e.target.description.value,
      date: e.target.date.value,
      tags: [],
      links:[],
      img: e.target.img.value
    }
    Object.keys(object).forEach(k => (!object[k] && object[k] !== undefined) && delete object[k]); //remove blank keys
    console.log(object)  
  
    firestore.collection('posts').doc(id).update(object)
    .then(() => {       //clears form on submit
        setSucc('Successfully Modified')
        e.target.title.value = ''
        e.target.content.value = ''
        e.target.description.value = ''
        e.target.date.value = ''
        e.target.img.value = null
        window.history.back(); //return to previous page
    })
  }

  return (
    <div>
      <AdminSidebar />
      {succ ? <Alert className='alert-success'>{succ}</Alert> : ''}
      <h2>Modify Article</h2>
      <Form onSubmit={updatePost}>
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
          <Form.Control type="file"/>
        </Form.Group>
        <Button variant="primary" type='submit'>Update</Button>
      </Form>
    </div>
  );
}

export default ModifyArticle;