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
             ? <AdminNavbar />
             : <NonMemberNavbar/>
            )
          )
        }
        { !user && <NonMemberNavbar /> }
        <h2>404: Not Found</h2>
        <BottomBar />
      </div>
    );
}

export default NotFound404;
