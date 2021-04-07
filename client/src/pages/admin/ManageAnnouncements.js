import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Announcements from "../Announcements";

export default class ManageAnnouncements extends Component {
  render() {
    return (
      <div>
        <Announcements status='Admin'/>
        <Button href="/admin/create-announcement" variant="primary" style={{margin: 15}}>Create announcement</Button>
      </div>
    );
  }
}
