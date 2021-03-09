import React, { Component } from "react";
import Button from "react-bootstrap/Button";

import MemberNavbar from "../components/MemberNavbar";
import NonMemberNavbar from "../components/NonMemberNavbar";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.buttonClicked = this.buttonClicked.bind(this);

    this.state = {
      status: this.props.status
    };
  }

  buttonClicked() {
    this.setState({ status: this.state.status === "NonMember" ? "Member" : "NonMember" });
  }

  render() {
    return (
      <div>
        {this.state.status === "Member" ? <MemberNavbar /> : <NonMemberNavbar /> }
        <h2>Home</h2>
        <Button variant="primary" onClick={this.buttonClicked}>
          {this.state.status === "Member" ? "Switch to NonMember" : "Switch to Member"}
        </Button>
      </div>
    );
  }
}
