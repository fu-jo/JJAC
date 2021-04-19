import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import firebase from "../firebase";
import "../styles/components/MemberNavbar.css";

export default class MemberNavbar extends Component {
  constructor(props) {
    super(props);
    this.callback = this.callback.bind(this);
  }

  callback() {
    if (this.props.sendNewStatus) {
      this.props.sendNewStatus("NonMember")
      firebase.auth().signOut()
    }
  }

  render() {
    return (
    // Original: <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar className="navbar">
        <Navbar.Brand href="/home">UF SASE</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/settings">Settings</Nav.Link>
          </Nav>
          <Nav>
            {/* Once auth is implemented with admin/user levels,
                want this button to show to only admins */}
            <Button href="/admin/dashboard" variant="primary">Admin</Button>
            <Button variant="primary" onClick={this.callback}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
