import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import "../styles/components/NonMemberNavbar.css";

export default class MemberNavbar extends Component {
  constructor(props) {
    super(props);
    this.callback = this.callback.bind(this);
  }

  callback() {
    if (this.props.sendNewStatus) {
      this.props.sendNewStatus("Member")
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
            {/* <Nav.Link href="/home">Home</Nav.Link> */}
            
          </Nav>
          <Nav className='ml-auto'>
            <Button href="/signup" variant="primary">Sign Up</Button>
            <Button href="/login" variant="primary">Login</Button>
            {/* <Button variant="primary" onClick={this.callback}>Login</Button> */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
