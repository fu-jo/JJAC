import React, { Component, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Form, Alert } from "react-bootstrap";
import Progress from '../../components/Progress'

import AdminSidebar from '../../components/AdminSidebar';

import { firestore } from '../../firebase'

function useArticle(id) {
  const [initVal, setInitVal] = useState();

  firestore.collection('posts').doc(id).get()
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

const ModifyArticle = () => {
  const [succ, setSucc] = useState();
  const [img, setImg] = useState(null);
  const [err, setErr] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const { id } = useParams();
  const initVal = useArticle(id);

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
      img: imgUrl,//e.target.img.value
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
          <Form.Control type="text" defaultValue={initVal ? initVal.title : ""}/>
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} defaultValue={initVal ? initVal.description : ""}/>
        </Form.Group>
        <Form.Group controlId="content">
          <Form.Label>Content</Form.Label>
          <Form.Control as="textarea" rows={3} defaultValue={initVal ? initVal.content : ""}/>
        </Form.Group>
        <Form.Group controlId="date">
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" defaultValue={initVal ? initVal.date : ""}/>
        </Form.Group>
        <Form.Group controlId="img">
          <Form.Label>Image</Form.Label>
          <Form.Control type="file" onChange={imgChange} />
        </Form.Group>
        {img &&<Progress file={img} setFile={setImg} setImgUrl={setImgUrl} /> }
        <Button variant="primary" type='submit'>Update</Button>
      </Form>
    </div>
  );
}

export default ModifyArticle;