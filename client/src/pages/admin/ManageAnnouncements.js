import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Announcements from "../Announcements";
import "../../styles/pages/AdminPage.css"

export default class ManageAnnouncements extends Component {
  render() {
    return (
      <div>
        <Button className="logout" href="/home">Logout</Button>
        <h2 className="title">Announcements</h2>
        <Announcements status='Admin'/>
        <Button href="/admin/create-announcement" variant="primary" style={{margin: 15}}>Create Announcement</Button>
      </div>
    );
  }
}
