import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from './components/Home'
import Settings from './components/Settings'

import Posts from './components/Posts'

import firebase from './firebase'

firebase.firestore().collection('users').add({
	id: 'ajdklasjkl',
	title: 'example title',
  description: 'example description',
  articleText: 'dakljzxjckl lorem ipsum',
  date: 'March',
  tags: ['tag 1'],
  links: ['www.sase.com']
})

export default class App extends Component {
  render() {
    return (
      <Posts />
      /*
      <Router>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="/home">UF SASE</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/settings">Settings</Nav.Link>
            </Nav>
            <Nav>
              <Button variant="primary">Login</Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Switch>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/settings">
            <Settings />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </Switch>
      </Router>
      */
    );
  }
}
