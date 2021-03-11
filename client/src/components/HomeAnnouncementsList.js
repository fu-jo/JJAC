import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";

import "../styles/components/HomeAnnouncementsList.css";

export default class HomeAnnouncementsList extends Component {
  render() {
    // Eventually we will map the announcements data
    // into this table.
    // Would ideally like to set column width on tables
    // Margin between header and table isn't right -Amber
    return (
      <div className="announcements">
        <h4>Latest Announcements</h4>
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>Announcement</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Announcement #1</td>
              <td>03/10/2021</td>
            </tr>
            <tr>
              <td>Announcement #2</td>
              <td>03/10/2021</td>
            </tr>
            <tr>
              <td>Announcement #3</td>
              <td>03/10/2021</td>
            </tr>
            <tr>
              <td>Announcement #4</td>
              <td>03/10/2021</td>
            </tr>
          </tbody>
        </Table>
        <div className="view-all-link">
          <Link to="/announcements">View All</Link>
        </div>
      </div>
    );
  }
}
