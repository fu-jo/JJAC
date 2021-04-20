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
    const subscribeRef = useRef()
    const {signup} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e){
        e.preventDefault()

         //mailchimp POST request
         async function postData(url = '/api/subscribe', data = {}) {
            // Default options are marked with *
            const response = await fetch(url, {
              method: 'POST', // *GET, POST, PUT, DELETE, etc.
              mode: 'cors', // no-cors, *cors, same-origin
              cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
              credentials: 'same-origin', // include, *same-origin, omit
              headers: {
                'Content-Type': 'application/json'
              },
              redirect: 'follow', // manual, *follow, error
              referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
              body: JSON.stringify(data) // body data type must match "Content-Type" header
            });
            return response.text(); // parses JSON response into native JavaScript objects
          }

        if (passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Passwords do not match')
        }

        try{
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value, nameRef.current.value, subscribeRef.current.checked)

            var user = firebase.auth().currentUser;
            await firestore.collection("users").doc(user.uid).set({
                name : nameRef.current.value,
                email : user.email,
                role : "user",
                subscribed : subscribeRef.current.checked
            })
            await postData('/api/subscribe', { email: emailRef.current.value })
            .catch(error => console.log(error));
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
                    <Form.Group id="subscribe">
                        <Form.Check type="checkbox" ref={subscribeRef} label="Subscribe me to UF SASE's mailing list!"/>
                    </Form.Group>
                    <Button disabled={loading} type="submit">Sign Up</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}