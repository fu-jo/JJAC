import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Announcements from "../Announcements";
import "../../styles/pages/AdminPage.css"

export default class ManageAnnouncements extends Component {
  render() {
    return (
      <div>
        <Button className="user-view" href="/home">User View</Button>
        <h2 className="title">Announcements</h2>
        <Announcements onAdmin/>
        <Button href="/admin/create-announcement" variant="primary" style={{margin: 15}}>Create Announcement</Button>
      </div>
    );
  }
}
