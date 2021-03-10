import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";

import MemberNavbar from "../components/MemberNavbar";
import NonMemberNavbar from "../components/NonMemberNavbar";

export default class SingleArticle extends Component {
  render() {
    return (
      <div>
        {this.props.status === "Member" ? <MemberNavbar /> : <NonMemberNavbar /> }
        <h2>SingleArticle</h2>
        <h4>ID: {this.props.match.params.id}</h4>
      </div>
    );
  }
}
