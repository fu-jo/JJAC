import React, { useRef, useState } from "react";
import { Button, Form, Card, Alert } from "react-bootstrap";
import { useAuth } from "../Contexts/AuthContext"

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const {login} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e){
        e.preventDefault()

        try{
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            alert("Logged In Successfully")
            window.history.back()
        } catch {
            setError('Failed to log in')
        }
        setLoading(false)
    }

    return(
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Login</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id="passord">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required />
                    </Form.Group>
                    <Button disabled={loading} type="submit">Log In</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}