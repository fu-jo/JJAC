import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faDiscord, faFacebook } from "@fortawesome/free-brands-svg-icons";

import "../styles/components/BottomBar.css";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export default class MemberNavbar extends Component {
  render() {
    return (
      <Navbar className="bottom-bar-cont">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Col xs={10} className="copyright">
              <b>© UF SASE 2021</b>
            </Col>
            <Nav.Link className="icons" href="https://www.facebook.com/ufsase/"><FontAwesomeIcon icon={faFacebook} size="2x"/></Nav.Link>
            <Nav.Link className="icons" href="mailto:ufsase@gmail.com"><FontAwesomeIcon icon={faEnvelope} size="2x"/></Nav.Link>
            <Nav.Link className="icons" href="http://discord.gg/q3HBeC5"><FontAwesomeIcon icon={faDiscord} size="2x"/></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
