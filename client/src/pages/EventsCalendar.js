import React, { Component } from "react";

import MemberNavbar from "../components/MemberNavbar";
import NonMemberNavbar from "../components/NonMemberNavbar";
import BottomBar from "../components/BottomBar";

export default class EventsCalendar extends Component {
  render() {
    return (
      <div>
        {this.props.status === "Member" ? <MemberNavbar /> : <NonMemberNavbar /> }
        <h2>EventsCalendar</h2>
        <BottomBar />
      </div>
    );
  }
}
