import React, { Component } from "react";
import Image from "react-bootstrap/Image";
import "bootstrap/dist/css/bootstrap.min.css";

import "../styles/components/AdminSidebar.css";
import img from "../assets/temp2.png";

export default class AdminSidebar extends Component {
  render() {
    return (
      <div className="sidenav">
        <a href="/home" style={{textAlign: "center"}}>
          <Image src={img} style={{width : "100%"}}/>
          <h1 style={{marginTop: 10}}>UF SASE</h1>
        </a>
        <a href="/admin/dashboard">Home</a>
        <a href="/admin/mailing-list">Mailing List</a>
        <a href="/admin/manage-articles">Articles</a>
        <a href="/admin/manage-announcements">Announcements</a>
        <a href="/admin/manage-users">Users</a>
        <a href="/admin/manage-events">Events</a>
      </div>
    );
  }
}
