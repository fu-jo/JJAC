import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import UserList from './UserList/UserList'
import "../../styles/pages/AdminPage.css"

export default class ManageUsers extends Component {
  render() {
    return (
      <div>
        <UserList />
      </div>
    );
  }
}
