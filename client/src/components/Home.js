import React, { Component } from "react";
import Button from "react-bootstrap/Button";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.buttonClicked = this.buttonClicked.bind(this);

    this.state = {
      name: "Click",
    };
  }

  buttonClicked() {
    this.setState({ name: "Button Pressed" });
  }

  render() {
    return (
      <div>
        <h2>Home</h2>
        <Button variant="primary" onClick={this.buttonClicked}>
          {this.state.name}
        </Button>
      </div>
    );
  }
}