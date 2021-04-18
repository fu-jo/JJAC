import React, { useRef, useState } from "react";
import {Button, Form, Card, Alert} from "react-bootstrap";
import{ useAuth } from "../Contexts/AuthContext"
import { firestore } from "../firebase";
import firebase from "../firebase"

export default function Signup() {
    const emailRef = useRef()
    const nameRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {signup} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e){
        e.preventDefault()

        //mailchimp POST request
        async function postData(url = '', data = {}) {
            // Default options are marked with *
            const response = await fetch(url, {
              method: 'POST', // *GET, POST, PUT, DELETE, etc.
              mode: 'cors', // no-cors, *cors, same-origin
              cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
              credentials: 'same-origin', // include, *same-origin, omit
              headers: {
                'Content-Type': 'application/json'
              },
            //   redirect: 'follow', // manual, *follow, error
            //   referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
              body: JSON.stringify(data) // body data type must match "Content-Type" header
            });
            return response.json(); // parses JSON response into native JavaScript objects
          }

          postData('http://localhost:5000/subscribe', { email: emailRef.current.value })
            .then(data => {
            console.log(data); // JSON data parsed by `data.json()` call
         });
        
        if (passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Passwords do not match')
        }

        try{
            setError('')
            setLoading(true)
            
            await signup(emailRef.current.value, passwordRef.current.value, nameRef.current.value)
            var user = firebase.auth().currentUser;
            await firestore.collection("users").doc(user.uid).set({
                name : nameRef.current.value,
                email : user.email,
                role : "user"
            })
            alert('Signup Successful')
            window.history.back()
        } catch {
            setError('Failed to create an account')
        }
        setLoading(false)
    }

    return(
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Sign Up</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id="email">
                        <Form.Label>Name (First and Last)</Form.Label>
                        <Form.Control type="name" ref={nameRef} required />
                    </Form.Group>
                    <Form.Group id="passord">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required />
                    </Form.Group>
                    <Form.Group id="password-confirm">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type="password" ref={passwordConfirmRef} required />
                    </Form.Group>
                    <Button disabled={loading} type="submit">Sign Up</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}