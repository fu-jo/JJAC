import React, { Component } from "react";
import Button from "react-bootstrap/Button";

export default class AdminDashboard extends Component {
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
        <h1>Admin Dashboard</h1>
      </div>
    );
  }
}
