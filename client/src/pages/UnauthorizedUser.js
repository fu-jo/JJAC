import React from "react";

import MemberNavbar from "../components/MemberNavbar";
import NonMemberNavbar from "../components/NonMemberNavbar";

const UnauthorizedUser = ({ user }) => {
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

export default UnauthorizedUser;
