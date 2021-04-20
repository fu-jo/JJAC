import React from "react";

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
        <div style={{textAlign: "center", marginTop: 30}}>
          <h2>404: Page Not Found</h2>
          <p>
          Please ensure the page link is correct. If so, contact
          the development team for help.
          </p>
        </div>
      </div>
    );
}

export default NotFound404;
