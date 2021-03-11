import React, { Component } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import LinesEllipsis from "react-lines-ellipsis";

import "../styles/components/FeaturedArticles.css";
import tempImg from "../assets/temp.png";

export default class FeaturedArticles extends Component {
  render() {
    // Eventually we will map the featured articles to these cards.
    // Card content needs to be changed based on wireframes. -Amber
    return (
      <Container>
        <h4>Featured Articles</h4>
        <div className="cards-container">
          <Row>
            <Col className="d-flex" md={4} id="left-article">
              <a href="/article/42" className="article-card-link">
                <Card>
                  <Card.Img
                    variant="top"
                    src={tempImg}
                    className="article-card-img"
                  />
                  <Card.Body>
                    <Card.Title>Article Title</Card.Title>
                    {/* Really awesome module for setting the number of lines */}
                    <LinesEllipsis
                      text="The first few sentences or a description of the article should go here. Adding Lorem ipsum to others for length."
                      maxLine="3"
                      ellipsis="..."
                      basedOn="words"
                    />
                    {/* Do we like this format or should we use Month Day, Year only? */}
                    <Card.Text className="article-date">2 days ago</Card.Text>
                    {/* Not totally sure how to turn these into links since the card is a link */}
                    <Badge pill variant="primary" className="tag-badge">
                      Tag
                    </Badge>{" "}
                    <Badge pill variant="primary" className="tag-badge">
                      Tag
                    </Badge>
                  </Card.Body>
                </Card>
              </a>
            </Col>
            <Col className="d-flex" md={4} id="center-article">
              <a href="/article/50" className="article-card-link">
                <Card>
                  <Card.Img
                    variant="top"
                    src={tempImg}
                    className="article-card-img"
                  />
                  <Card.Body>
                    <Card.Title>Article Title</Card.Title>
                    {/* Really awesome module for setting the number of lines */}
                    <LinesEllipsis
                      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris venenatis felis accumsan, imperdiet ante blandit, facilisis massa. Maecenas eget magna magna."
                      maxLine="3"
                      ellipsis="..."
                      basedOn="words"
                    />
                    <Card.Text className="article-date">
                      December 15, 2020
                    </Card.Text>
                    <Badge pill variant="primary" className="tag-badge">
                      Tag
                    </Badge>{" "}
                    <Badge pill variant="primary" className="tag-badge">
                      Tag
                    </Badge>
                  </Card.Body>
                </Card>
              </a>
            </Col>
            <Col className="d-flex card-col" md={4} id="right-article">
              <a href="/article/82" className="article-card-link">
                <Card>
                  <Card.Img
                    variant="top"
                    src={tempImg}
                    className="article-card-img"
                  />
                  <Card.Body>
                    <Card.Title>Article Title</Card.Title>
                    {/* Really awesome module for setting the number of lines */}
                    <LinesEllipsis
                      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris venenatis felis accumsan, imperdiet ante blandit, facilisis massa. Maecenas eget magna magna."
                      maxLine="3"
                      ellipsis="..."
                      basedOn="words"
                    />
                    <Card.Text className="article-date">
                      November 18, 2020
                    </Card.Text>
                    <Badge pill variant="primary" className="tag-badge">
                      Tag
                    </Badge>{" "}
                    <Badge pill variant="primary" className="tag-badge">
                      Tag
                    </Badge>
                  </Card.Body>
                </Card>
              </a>
            </Col>
          </Row>
        </div>
        <div className="view-all-articles">
          <Link to="/articles-list">View All</Link>
        </div>
      </Container>
    );
  }
}
