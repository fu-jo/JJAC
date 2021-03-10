import React, { Component } from "react";
import Button from "react-bootstrap/Button";

import MemberNavbar from "../components/MemberNavbar";
import NonMemberNavbar from "../components/NonMemberNavbar";

export default class Announcements extends Component {
  render() {
    return (
      <div>
        {this.state.status === "Member" ? <MemberNavbar /> : <NonMemberNavbar /> }
        <h2>Announcements</h2>
      </div>
    );
  }
}
