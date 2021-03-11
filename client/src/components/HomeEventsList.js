import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";

import "../styles/components/HomeEventsList.css";

export default class HomeEventsList extends Component {
  render() {
    // Eventually we will map the events data
    // into this table.
    // Would ideally like to set column width on tables
    // Margin between header and table isn't right -Amber
    return (
      <div>
        <h4>Upcoming Events</h4>
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>Event</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Event #1</td>
              <td>03/10/2021</td>
            </tr>
            <tr>
              <td>Event #2</td>
              <td>03/10/2021</td>
            </tr>
            <tr>
              <td>Event #3</td>
              <td>03/10/2021</td>
            </tr>
            <tr>
              <td>Event #4</td>
              <td>03/10/2021</td>
            </tr>
          </tbody>
        </Table>
        <div className="view-all-link">
          <Link to="/events-calendar">View All</Link>
        </div>
      </div>
    );
  }
}
