import React, { Component } from "react";
import Button from "react-bootstrap/Button";

import AdminSidebar from '../../components/AdminSidebar';

import UserList from './UserList/UserList'

export default class ManageUsers extends Component {
  constructor(props) {
    super(props);

    this.buttonClicked = this.buttonClicked.bind(this);

    this.state = {
      name: "Click"
    };
  }

  buttonClicked() {
    this.setState({name: "Button Pressed"})
  }

  render() {
    return (
      <div>
        <AdminSidebar />
        <h2>ManageUsers</h2>
        <UserList />
        <Button variant="primary" onClick={this.buttonClicked}>
          {this.state.name}
        </Button>
      </div>
    );
  }
}
