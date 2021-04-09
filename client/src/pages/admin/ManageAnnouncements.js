import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import "../../styles/pages/AdminPage.css"

import AdminSidebar from '../../components/AdminSidebar';
import Announcements from '../Announcements'

export default class ManageAnnouncements extends Component {
  constructor(props) {
    super(props);

    this.buttonClicked = this.buttonClicked.bind(this);

    this.state = {
      name: "Click"
    };
  }

  buttonClicked() {
    this.setState({name: "Button Pressed"})
  }

  render() {
    return (
      <div>
        <AdminSidebar />
        <Button className="logout" href="/home">Logout</Button>
        <h2 className="title">Announcements</h2>
        <Announcements status='Admin'/>
        <Button href="/admin/create-announcement" variant="primary">Create Announcement</Button>
      </div>
    );
  }
}
