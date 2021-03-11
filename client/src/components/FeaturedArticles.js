import React, { Component } from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import "../styles/components/FeaturedArticles.css";

export default class FeaturedArticles extends Component {
  render() {
    // Eventually we will map the featured articles to these cards.
    // The cards margins/padding still isn't quite correct. Would prefer
    // for the left card to line up with the "Featured Articles" title and
    // the right card to line up with the tables above (basically want no
    // padding/margin on outer edges but padding/margin in between cards) -Amber
    return (
      <div>
        <h4>Featured Articles</h4>
        <div className="cards-container">
        <Row>
          <Col className="d-flex card-col" md={4}>
            <Card>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col className="d-flex card-col" md={4}>
            <Card>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col className="d-flex card-col" md={4}>
            <Card>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        </div>
        <div className="view-all-articles">
          <Link to="/articles-list">View All</Link>
        </div>
      </div>
    );
  }
}
