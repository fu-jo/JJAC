import React, { Component } from "react";
import Container from "react-bootstrap/Container";

export default class AboutSASE extends Component {
  render() {
    // We can change this stuff in the future to allow
    // them to change these values without changing the code.
    // Margin between header and paragraphs isn't right -Amber
    return (
      <Container>
        <h1>UF SASE</h1>
        <p>
          The Society of Asian Scientists & Engineers is a young organization
          at the University of Florida. We welcome companies and individuals to
          support our efforts to connect across cultures, and companies to enable
          Asian heritage scientific and engineering professionals to achieve their
          full potential.
        </p>
        <p>
          Through our meetings and events, we help shape skills and provide
          knowledge that will our members to succeed in the professional world.
          No matter what major you are, we provide a friendly atmosphere to help
          you land that internship or job.
        </p>
      </Container>
    );
  }
}
