import React, { Component } from "react";
import Button from "react-bootstrap/Button";

export default class ModifyArticle extends Component {
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
        <h2>ModifyArticle</h2>
        <h4>ID: {this.props.match.params.id}</h4>
        <Button variant="primary" onClick={this.buttonClicked}>
          {this.state.name}
        </Button>
      </div>
    );
  }
}
