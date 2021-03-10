import React, { Component } from "react";
import Button from "react-bootstrap/Button";

import MemberNavbar from "../components/MemberNavbar";
import NonMemberNavbar from "../components/NonMemberNavbar";

export default class Settings extends Component {
  render() {
    return (
      <div>
        {this.props.status === "Member" ? <MemberNavbar /> : <NonMemberNavbar /> }
        <h2>Settings</h2>
      </div>
    );
  }
}
