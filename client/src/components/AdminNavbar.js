import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import "../styles/components/MemberNavbar.css";

export default class AdminNavbar extends Component {
  constructor(props) {
    super(props);
    this.callback = this.callback.bind(this);
  }

  callback() {
    if (this.props.sendNewStatus) {
      this.props.sendNewStatus("NonMember")
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
            {/* Future dev: Settings page for users */}
            {/* <Nav.Link href="/settings">Settings</Nav.Link> */}
          </Nav>
          <Nav>
            <Button href="/admin/dashboard" variant="primary">Admin</Button>
            <Button variant="primary" onClick={this.callback}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
