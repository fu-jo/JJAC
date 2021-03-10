import React, { Component } from "react";
import Button from "react-bootstrap/Button";

import MemberNavbar from "../components/MemberNavbar";
import NonMemberNavbar from "../components/NonMemberNavbar";

export default class ArticlesList extends Component {
  render() {
    return (
      <div>
        {this.state.status === "Member" ? <MemberNavbar /> : <NonMemberNavbar /> }
        <h2>ArticlesList</h2>
      </div>
    );
  }
}
