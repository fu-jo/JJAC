import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import EventsList from "../EventsList";

export default class ManageEvents extends Component {
  render() {
    return (
      <div>
        <EventsList status='Admin'/>
        <Button href="/admin/create-event" variant="primary" style={{margin: 15}}>Create event</Button>
      </div>
    );
  }
}
