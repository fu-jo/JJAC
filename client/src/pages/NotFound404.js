import React, { Component } from "react";

import MemberNavbar from "../components/MemberNavbar";
import NonMemberNavbar from "../components/NonMemberNavbar";

import BottomBar from "../components/BottomBar";


export default class NotFound404 extends Component {
  render() {
    return (
      <div>
        {this.props.status === "Member" ? <MemberNavbar /> : <NonMemberNavbar /> }
        <h2>404: Not Found</h2>
        <BottomBar />
      </div>
    );
  }
}
