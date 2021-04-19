import React, { Component } from "react";

import AdminNavbar from "../components/AdminNavbar";
import MemberNavbar from "../components/MemberNavbar";
import NonMemberNavbar from "../components/NonMemberNavbar";

import BottomBar from "../components/BottomBar";


const NotFound404 = ({ user }) => {
    return (
      <div>
        {
          user && (user.role === "user"
          ? <MemberNavbar/>
          : (user.role === "admin"
             ? <h2>Contact dev team: there is some error</h2>
             : <NonMemberNavbar/>
            )
          )
        }
        { !user && <NonMemberNavbar /> }
        <h2>401: Unauthorized User</h2>
        <BottomBar />
      </div>
    );
}

export default NotFound404;
