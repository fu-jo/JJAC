import React, { Component } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import LinesEllipsis from "react-lines-ellipsis";

import "../styles/components/FeaturedArticles.css";
import testArticle from "../assets/test-article";

export default class FeaturedArticles extends Component {
  constructor(props) {
    super(props);
    this.getFeaturedArticles = this.getFeaturedArticles.bind(this);
    this.getDate = this.getDate.bind(this);

    this.state = { articles: null }
  }

  componentDidMount() {
    this.setState({ articles: this.getFeaturedArticles()})
  }

  getFeaturedArticles() {
    return [testArticle, {...testArticle, "tags": ["tag"]}, {...testArticle, "tags": []}];
  }

  getDate(dateStr) {
    let date = new Date(dateStr).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
    return (date ? date : null)
  }

  render() {
    // Eventually we will map the featured articles to these cards.
    // Card content needs to be changed based on wireframes. -Amber
    return (
      <Container>
        <h4>Featured Articles</h4>
        <div className="cards-container">
          <Row>
            {this.state.articles && this.state.articles.map((article, idx) => {return (
              <Col className="d-flex" md={4} id="left-article" key={Math.random()}>
                <a href={`/article/${article.id}`} className="article-card-link">
                  <Card>
                    {article.img && (
                      <Card.Img
                        variant="top"
                        src={article.img}
                        className="article-card-img"
                      />
                    )}
                    <Card.Body>
                      <Card.Title>{article.title}</Card.Title>
                      {/* Really awesome module for setting the number of lines */}
                      <LinesEllipsis
                        text={article.body}
                        maxLine={article.tags && article.tags.length > 0 ? "3" : "4"}
                        ellipsis="..."
                        basedOn="words"
                      />
                      {/* Do we like this format or should we use Month Day, Year only? */}
                      <Card.Text className="article-date">{this.getDate(article.date)}</Card.Text>
                      {/* Not totally sure how to turn these into links since the card is a link */}
                      <div>
                        {article.tags && article.tags.map((tag) => (
                          <Badge pill variant="primary" key={Math.random()} className="tag-badge" >{tag}</Badge>
                        ))}
                      </div>
                    </Card.Body>
                  </Card>
                </a>
              </Col>
            )})}
          </Row>
        </div>
        <div className="view-all-articles">
          <Link to="/articles-list">View All</Link>
        </div>
      </Container>
    );
  }
}
