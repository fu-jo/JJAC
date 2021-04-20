import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";

import AdminNavbar from "../components/AdminNavbar";
import MemberNavbar from "../components/MemberNavbar";
import NonMemberNavbar from "../components/NonMemberNavbar";
import BottomBar from "../components/BottomBar";

import "../styles/pages/SingleArticle.css";
import { firestore } from "../firebase";

function useArticle(id) {
  const [article, setArticle] = useState([]);

  firestore.collection("posts").doc(id).get()
    .then((snapshot) => setArticle(snapshot.data()));

  return article;
}

const getDate = (dateStr) => {
  let date = new Date(dateStr).toLocaleDateString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return date ? date : null;
};

const SingleArticle = ({ user }) => {
  const { id } = useParams();
  const article = useArticle(id);

  if (!article) {
    return <div></div>;
  }

  return (
    <div>
      {
        user && (user.role === "user"
        ? <MemberNavbar/>
        : (user.role === "admin"
           ? <AdminNavbar />
           : <NonMemberNavbar/>
          )
        )
      }
      { !user && <NonMemberNavbar /> }
      <Container>
        <div>
        <img className="text-wrap" src={article.img} alt=""/>
          <h1>{article.title}</h1>
          {article.author ? (
            <h6>
              By {article.author} • {getDate(article.date)}
            </h6>
          ) : (
            <h6>{getDate(article.date)}</h6>
          )}
          <br />
          <p>{article.content}</p>
          <p>
            {article.tags && article.tags.length > 0 && (
              <b>
                Tags:{" "}
                {article.tags.map((tag, idx) => (
                  <a href="/articles-list">
                    <Badge
                      pill
                      variant="primary"
                      key={idx}
                      className="tag-badge"
                    >
                      {tag}
                    </Badge>
                  </a>
                ))}
              </b>
            )}
          </p>
          <p>
            {article.links && article.links.length > 0 && (
              <b>
                Links:{" "}
                {article.links.map((link, idx) => {
                  const adjustedLink = link.includes("https://") || link.includes("http://") ? link : "https://" + link
                  return (
                    <a
                      href={adjustedLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ marginRight: 5 }}
                    >
                      {link}
                    </a>
                  );
                })}
              </b>
            )}
          </p>
        </div>
      </Container>
      <BottomBar />
    </div>
  );
};

export default SingleArticle;
