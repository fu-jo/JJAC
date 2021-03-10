import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

export default class MemberNavbar extends Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/home">UF SASE</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/settings">Settings</Nav.Link>
          </Nav>
          <Nav>
            <Button variant="primary" onClick={() => this.props.sendNewStatus("NonMember")}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
