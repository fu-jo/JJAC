import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";

import { firestore } from "../../../firebase";
//import "../../styles/pages/ArticlesList.css";

import User from './User'

const SORT_OPTIONS = {
  NAME_ASC: { column: "displayName", direction: "asc" },
  NAME_DESC: { column: "displayName", direction: "desc" },
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
        <label>Sort By</label>{' '}
        <select value={sortBy} onChange={e => setSortBy(e.currentTarget.value)}>
            <option value='NAME_ASC'>Name (a-z)</option>
            <option value='NAME_DESC'>Name (z-a)</option>
        </select>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
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
