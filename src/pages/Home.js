import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";

import MemberNavbar from "../components/MemberNavbar";
import NonMemberNavbar from "../components/NonMemberNavbar";

import "../styles/pages/Home.css"

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.navbarCallback = this.navbarCallback.bind(this);

    this.state = {
      status: this.props.status
    };
  }

  navbarCallback = (newStatus) => {
    this.setState({ status: newStatus })
  }

  render() {
    return (
      <div>
        {
          this.state.status === "Member"
          ? <MemberNavbar sendNewStatus={this.navbarCallback} />
          : <NonMemberNavbar sendNewStatus={this.navbarCallback}/>
        }
        <h2>Home</h2>
        <Row className="row">
          <Link to="/announcements" className="btn btn-primary">Announcements</Link>
          <Link to="/articles-list" className="btn btn-primary">List of All Articles</Link>
          <Link to="/events-calendar" className="btn btn-primary">Calendar with Events</Link>
          <Link to="/article/42" className="btn btn-primary">Specific Article</Link>
        </Row>
        <Row className="row">
          <Link to="/admin/dashboard" className="btn btn-primary">Admin Dashboard</Link>
          <Link to="/admin/mailing-list" className="btn btn-primary">Mailing List</Link>
          <Link to="/admin/manage-announcements" className="btn btn-primary">Manage Announcements</Link>
          <Link to="/admin/manage-articles" className="btn btn-primary">Manage Articles</Link>
          <Link to="/admin/manage-users" className="btn btn-primary">Manage Users</Link>
          <Link to="/admin/modify-articles" className="btn btn-primary">Modify Articles</Link>
        </Row>
      </div>
    );
  }
}
