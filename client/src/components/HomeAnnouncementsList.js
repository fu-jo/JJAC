import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LinesEllipsis from "react-lines-ellipsis";

import "../styles/components/HomeAnnouncementsList.css";
import testAnnouncements from "../assets/test-announcements";

export default class HomeAnnouncementsList extends Component {
  constructor(props) {
    super(props);
    this.getAnnouncementData = this.getAnnouncementData.bind(this);
    this.getDate = this.getDate.bind(this);

    this.state = { announcements: null, loading: true }
  }

  componentDidMount() {
    this.getAnnouncementData();
  }

  getAnnouncementData() {
    try {
      const data = testAnnouncements.slice(0, 3);
      this.setState({ announcements: data, loading: false });
    }
    catch (e) {
      console.log(e);
    }
  }

  getDate(dateStr) {
    let date = new Date(dateStr).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
    return (date ? date : null)
  }

  render() {
    return (
      <div className="announcements">
        <Row>
          <Col>
            <h4>Latest Announcements</h4>
          </Col>
          <Col className="view-all-link">
            <Link to="/announcements">View All</Link>
          </Col>
        </Row>
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th id="header-left">Announcement</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {!this.state.loading && this.state.announcements.map((ann, idx) => { return (
              <tr key={idx}>
                <td className="ann-box">
                  <span>{ann.title}{"\n"}</span>
                  {ann.details && (
                    <LinesEllipsis text={ann.details} maxLine="2" ellipsis="..." basedOn="words" className="ann-details"/>
                  )}
                </td>
                {ann.date ? (<td>{this.getDate(ann.date)}</td>) : <td></td>}
              </tr>
            )})}
          </tbody>
        </Table>
      </div>
    );
  }
}
