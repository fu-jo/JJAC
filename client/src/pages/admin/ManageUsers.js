import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import UserList from './UserList/UserList'
import "../../styles/pages/AdminPage.css"

export default class ManageUsers extends Component {
  render() {
    return (
      <div>
        <Button className="logout" href="/home">Logout</Button>
        <h2 className="title">Users</h2>
        <UserList />
      </div>
    );
  }
}
