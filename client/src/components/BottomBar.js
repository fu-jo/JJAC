import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";

import "../styles/components/BottomBar.css";

export default class MemberNavbar extends Component {
  render() {
    return (
      // Changed from Container to div because bottom bar wouldn't stretch all the way across with Container
      <div className="bottom-bar-cont">
        <Row className="bar-row">
          <Col xs={5} className="copyright">
            <b>© UF SASE 2021</b>
          </Col>
          <Col xs={{span: 2}} className="icons">
            <a href="https://www.facebook.com/ufsase/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} size="2x"/>
            </a>
            <a href="mailto:ufsase@gmail.com">
              <FontAwesomeIcon icon={faEnvelope} size="2x"/>
            </a>
          </Col>
        </Row>
      </div>
    );
  }
}
