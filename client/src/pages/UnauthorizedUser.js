import React, { Component } from "react";

import MemberNavbar from "../components/MemberNavbar";
import NonMemberNavbar from "../components/NonMemberNavbar";

import BottomBar from "../components/BottomBar";


export default class UnauthorizedUser extends Component {
  render() {
    return (
      <div>
        {this.props.status === "Member" ? <MemberNavbar /> : <NonMemberNavbar /> }
        <h2>401: Unauthorized User</h2>
        <BottomBar />
      </div>
    );
  }
}
