import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import EventsList from "../EventsList";
import "../../styles/pages/AdminPage.css"

export default class ManageEvents extends Component {
  render() {
    return (
      <div>
        <Button className="user-view" href="/home">User View</Button>
        <h2 className="title">Events</h2>
        <EventsList className="events-title" onAdmin/>
        <Button href="/admin/create-event" variant="primary" style={{margin: 15}}>Create Event</Button>
      </div>
    );
  }
}
