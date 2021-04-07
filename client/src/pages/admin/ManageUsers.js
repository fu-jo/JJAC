import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import UserList from './UserList/UserList'

export default class ManageUsers extends Component {
  render() {
    return (
      <div>
        <UserList />
      </div>
    );
  }
}
