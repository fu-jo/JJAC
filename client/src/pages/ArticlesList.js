import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";

import { firestore } from "../firebase";
import AdminNavbar from "../components/AdminNavbar";
import MemberNavbar from "../components/MemberNavbar";
import NonMemberNavbar from "../components/NonMemberNavbar";
import BottomBar from "../components/BottomBar";
import "../styles/pages/ArticlesList.css";
import "../styles/components/ArticleTable.css"

import Article from './Article'

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
const ArticlesList = ({ user, onAdmin }) => {
  const [sortBy, setSortBy] = useState("DATE_DESC"); //default
  const posts = usePosts(sortBy);

  return (
    <div>
      { onAdmin ? '' :
        (user && (user.role === "user"
        ? <MemberNavbar/>
        : (user.role === "admin"
           ? <AdminNavbar />
           : <NonMemberNavbar/>
          )
        ))
      }
      { !onAdmin && !user && <NonMemberNavbar /> }
      <Container>
        <h1 className="articles-header">Articles</h1>
        <label>Sort By</label>{' '}
        <select value={sortBy} onChange={e => setSortBy(e.currentTarget.value)}>
            <option value='TITLE_ASC'>Title (a-z)</option>
            <option value='TITLE_DESC'>Title (z-a)</option>
            <option disabled>---</option>
            <option value='DATE_ASC'>Date (earliest)</option>
            <option value='DATE_DESC'>Date (latest)</option>
        </select>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th class="name">Article Name</th>
              <th class="date">Date Published</th>
              {onAdmin ?
                <th class="modify">Modify</th>
              :
              ''
              }
            </tr>
          </thead>
          <tbody>
            {posts.map((article, idx) => <Article article={article} key={`article-${idx}`} idx={idx} access={onAdmin ? "Admin" : ""}/>)}
          </tbody>
        </Table>
      </Container>
      {onAdmin ? '' : <BottomBar />}
    </div>
  );
};

export default ArticlesList;
