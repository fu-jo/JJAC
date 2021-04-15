import React, { Component } from "react";

import AdminNavbar from "../components/AdminNavbar";
import MemberNavbar from "../components/MemberNavbar";
import NonMemberNavbar from "../components/NonMemberNavbar";

import BottomBar from "../components/BottomBar";

const EventsCalendar = ({ user }) => {
  return (
    <div>
      {
        user && (user.role === "user"
        ? <MemberNavbar/>
        : (user.role === "admin"
           ? <AdminNavbar />
           : <NonMemberNavbar/>
          )
        )
      }
      <h2>EventsCalendar</h2>
      <BottomBar />
    </div>
  );
}

export default EventsCalendar
