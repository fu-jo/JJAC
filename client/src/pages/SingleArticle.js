import React, { Component, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";

import MemberNavbar from "../components/MemberNavbar";
import NonMemberNavbar from "../components/NonMemberNavbar";
import BottomBar from "../components/BottomBar";

import "../styles/pages/SingleArticle.css";
import testArticle from "../assets/test-article";
import { firestore } from "../firebase";

function useArticle(id) {
  const [article, setArticle] = useState([]);

  firestore.collection("posts").doc(id).get()
    .then((snapshot) => setArticle(snapshot.data()));

  return article;
}

const getDate = (dateStr) => {
  let date = new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return date ? date : null;
};

const SingleArticle = (props) => {
  const { id } = useParams();
  const article = useArticle(id);

  if (!article) {
    return <div></div>;
  }

  return (
    <div>
      {props.status === "Member" ? <MemberNavbar /> : <NonMemberNavbar />}
      <Container className="article">
        <div>
          {article.img && <img className="text-wrap" src={article.img} />}
          <h1>{article.title}</h1>
          { article.author
          ? (
            <h6>
            By {article.author} • {getDate(article.date)}
          </h6>
          )
          : (
            <h6>
              {getDate(article.date)}
            </h6>
          )}
          <br />
          <p>{article.content}</p>
          {article.tags && (
            <b>
              Tags:{" "}
              {article.tags.map((tag, idx) => (
                <a href="/articles-list">
                  <Badge pill variant="primary" key={idx} className="tag-badge">
                    {tag}
                  </Badge>
                </a>
              ))}
            </b>
          )}
        </div>
      </Container>
      <BottomBar />
    </div>
  );
};

export default SingleArticle;
