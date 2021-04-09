import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import "../../styles/pages/AdminPage.css"

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
        <Button className="logout" href="/home">Logout</Button>
        <h2 className="title">Admin Dashboard</h2>
        <h5 className="title">Welcome back!</h5>
      </div>
    );
  }
}
