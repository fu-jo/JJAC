import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import LinesEllipsis from "react-lines-ellipsis";

import { firestore } from "../firebase";
import MemberNavbar from "../components/MemberNavbar";
import NonMemberNavbar from "../components/NonMemberNavbar";
import BottomBar from "../components/BottomBar";
import "../styles/pages/ArticlesList.css";

const SORT_OPTIONS = {
  DATE_ASC: { column: "date", direction: "asc" },
  DATE_DESC: { column: "date", direction: "desc" },
  TITLE_ASC: { column: "title", direction: "asc" },
  TITLE_DESC: { column: "title", direction: "desc" },
};

function usePosts(sortBy = "DATE_DESC") {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore //drop subscription to firestore
      .collection("posts")
      .orderBy(SORT_OPTIONS[sortBy].column, SORT_OPTIONS[sortBy].direction)
      .onSnapshot((snapshot) => {
        const newPosts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPosts(newPosts);
      });

    return () => unsubscribe(); //callback when unmounted
  }, [sortBy]);

  return posts;
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

const ArticlesList = (props) => {
  const [sortBy, setSortBy] = useState("DATE_DESC"); //default
  const posts = usePosts(sortBy);

  return (
    <div>
      {props.status === "Member" ? <MemberNavbar /> : <NonMemberNavbar />}
      <Container>
        <h1 className="articles-header">Articles</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Article Name</th>
              <th>Date Published</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((article, idx) => (
              <tr key={idx}>
                <td>
                  <a href={`article/${article.id}`} className="article-link">
                    <div className="article-box full-width">
                      <span>
                        {article.title}
                        {"\n"}
                      </span>
                      {article.content && (
                        <LinesEllipsis
                          text={article.content}
                          maxLine="2"
                          ellipsis="..."
                          basedOn="words"
                          className="article-content"
                        />
                      )}
                    </div>
                  </a>
                </td>
                {article.date ? (
                  <td>
                    <a href={`article/${article.id}`} className="article-link">
                      <div className="full-width">{getDate(article.date)}</div>
                    </a>
                  </td>
                ) : (
                  <td>
                    <a href={`article/${article.id}`} className="article-link">
                      <div className="full-width"></div>
                    </a>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <BottomBar />
    </div>
  );
};

export default ArticlesList;
