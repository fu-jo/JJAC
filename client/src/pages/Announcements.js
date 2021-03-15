import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";

import MemberNavbar from "../components/MemberNavbar";
import NonMemberNavbar from "../components/NonMemberNavbar";
import BottomBar from "../components/BottomBar";

import testAnnouncements from "../assets/test-announcements";

export default class Announcements extends Component {
  constructor(props) {
    super(props);
    this.getAnnouncementData = this.getAnnouncementData.bind(this);
    this.getDate = this.getDate.bind(this);

    this.state = { data: null, loading: true };
  }

  componentDidMount() {
    this.getAnnouncementData();
  }

  // this will need to call to the backend when it gets connected
  getAnnouncementData() {
    try {
      const data = testAnnouncements;
      this.setState({ data: data, loading: false });
    } catch (e) {
      console.log(e);
    }
  }

  getDate(dateStr) {
    let date = new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return date ? date : null;
  }

  render() {
    return (
      <div>
        {this.props.status === "Member" ? (
          <MemberNavbar />
        ) : (
          <NonMemberNavbar />
        )}
        <Container>
          <h1>Announcements</h1>
          {!this.state.loading && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th style={{width: "70%"}}>Announcement</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.map((ann, idx) => { return (
                  <tr>
                    <td style={{whiteSpace: "pre-wrap"}}>
                      <span>{ann.title}{"\n"}</span>
                      {ann.details && (
                        <div style={{paddingLeft: 20}}>
                          <small>{ann.details}</small>
                        </div>
                      )}
                    </td>
                    {ann.date ? (<td>{this.getDate(ann.date)}</td>) : <td></td>}
                  </tr>
                )})}
              </tbody>
            </Table>
          )}
        </Container>
        <BottomBar />
      </div>
    );
  }
}
