import React from "react";

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
        <div style={{textAlign: "center", marginTop: 30}}>
          <h2>401: Unauthorized User</h2>
          <p>Please log in with an authorized account to access this page</p>
        </div>
      </div>
    );
}

export default NotFound404;
