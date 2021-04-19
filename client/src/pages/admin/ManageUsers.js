import React, { Component } from "react";
import UserList from './UserList/UserList'

export default class ManageUsers extends Component {
  render() {
    return (
      <div>
        <h2>Users</h2>
        <UserList />
      </div>
    );
  }
}
