import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";

import { firestore } from "../../../firebase";
//import "../../styles/pages/ArticlesList.css";

import User from './User'

const SORT_OPTIONS = {
  NAME_ASC: { column: "name", direction: "asc" },
  NAME_DESC: { column: "name", direction: "desc" },
  ROLE_ASC: { column: "role", direction: "asc" },
  ROLE_DESC: { column: "role", direction: "desc" }
};

function useUsers(sortBy = "NAME_ASC") {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore //drop subscription to firestore
      .collection("users")
      .orderBy(SORT_OPTIONS[sortBy].column, SORT_OPTIONS[sortBy].direction)
      .onSnapshot((snapshot) => {
        const newUsers = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setUsers(newUsers);
      });

    return () => unsubscribe(); //callback when unmounted
  }, [sortBy]);

  return users;
}

const UserList = (props) => {
  const [sortBy, setSortBy] = useState("NAME_ASC"); //default
  const users = useUsers(sortBy);

  return (
    <div>
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>
                User's Name
                { sortBy === "NAME_ASC"
                  ? (<FontAwesomeIcon icon={faSortUp} style={{float: "right", marginTop: 8, marginRight: 10}} onClick={() => setSortBy("NAME_DESC")}/>)
                  : (<FontAwesomeIcon icon={faSortDown} style={{float: "right", marginBottom: 8, marginRight: 10}} onClick={() => setSortBy("NAME_ASC")}/>)
                }
              </th>
              <th>Email</th>
              <th>
                Role
                { sortBy === "ROLE_ASC"
                  ? (<FontAwesomeIcon icon={faSortUp} style={{float: "right", marginTop: 8, marginRight: 10}} onClick={() => setSortBy("ROLE_DESC")}/>)
                  : (<FontAwesomeIcon icon={faSortDown} style={{float: "right", marginBottom: 8, marginRight: 10}} onClick={() => setSortBy("ROLE_ASC")}/>)
                }
              </th>
              <th>Modify</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user,idx) => <User user={user} idx={idx} />)}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default UserList;
