import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "../styles/components/HomeEventsList.css";

export default class HomeEventsList extends Component {
  render() {
    // Eventually we will map the events data
    // into this table.
    // Would ideally like to set column width on tables
    // Margin between header and table isn't right -Amber
    return (
      <div>
        <Row>
          <Col>
            <h4>Upcoming Events</h4>
          </Col>
          <Col className="view-all-link" xs={3}>
            <Link to="/events-calendar">View All</Link>
          </Col>
        </Row>
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th style={{width: "65%"}}>Event</th>
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
      </div>
    );
  }
}
