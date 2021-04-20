import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";

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
        {onAdmin ? '' : <h1 className="articles-header">Articles</h1>}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="name">
                Article Name
                { sortBy === "TITLE_ASC"
                  ? (<FontAwesomeIcon icon={faSortUp} style={{float: "right", marginTop: 8, marginRight: 10}} onClick={() => setSortBy("TITLE_DESC")}/>)
                  : (<FontAwesomeIcon icon={faSortDown} style={{float: "right", marginBottom: 8, marginRight: 10}} onClick={() => setSortBy("TITLE_ASC")}/>)
                }
              </th>
              <th className="date">
                Date Published
                { sortBy === "DATE_ASC"
                  ? (<FontAwesomeIcon icon={faSortUp} style={{float: "right", marginTop: 8, marginRight: 10}} onClick={() => setSortBy("DATE_DESC")}/>)
                  : (<FontAwesomeIcon icon={faSortDown} style={{float: "right", marginBottom: 8, marginRight: 10}} onClick={() => setSortBy("DATE_ASC")}/>)
                }
              </th>
              {onAdmin ?
                <th className="modify">Modify</th>
              :
              null
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
