import React from "react";

import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import LinesEllipsis from "react-lines-ellipsis";


import "../styles/components/FeaturedArticles.css";

const getDate = (dateStr) => {
  let date = new Date(dateStr).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
  return (date ? date : null)
}

const ArticleCard = ({ article, idx }) => {
    if (!article) {
      return null;
    }
    return (
      <Col className="d-flex" md={4} id={`article-${idx}`} key={Math.random()}>
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
                text={article.content}
                maxLine={article.tags && article.tags.length > 0 ? "3" : "4"}
                ellipsis="..."
                basedOn="words"
              />
              {/* Do we like this format or should we use Month Day, Year only? */}
              <Card.Text className="article-date">{getDate(article.date)}</Card.Text>
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
    )
}

export default ArticleCard
