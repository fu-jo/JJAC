import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

import MemberNavbar from "../components/MemberNavbar";
import NonMemberNavbar from "../components/NonMemberNavbar";
import AboutSASE from "../components/AboutSASE";
import HomeAnnouncementsList from "../components/HomeAnnouncementsList";
import HomeEventsList from "../components/HomeEventsList";
import FeaturedArticles from "../components/FeaturedArticles";
import ContactForm from "../components/ContactForm";
import BottomBar from "../components/BottomBar";

import "../styles/pages/Home.css";
import img from "../assets/temp2.png";

// Question: do we like where the View All buttons are currently or
// should they be moved to the same line as the header?

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
        {/* update: made an entire class just for the image */}
        <Image src={img} className="img"/>
        <AboutSASE />
        <Container>
          <Row>
            <Col sm={8} className="col">
              <HomeAnnouncementsList />
            </Col>
            <Col sm={4} className="col">
              <HomeEventsList className="col"/>
            </Col>
          </Row>
        </Container>
        <FeaturedArticles />
        <ContactForm />
        <BottomBar />
        {/*
        <Container>
          <Link to="/announcements" className="btn btn-primary">Announcements</Link>
          <Link to="/articles-list" className="btn btn-primary">List of All Articles</Link>
          <Link to="/events-calendar" className="btn btn-primary">Calendar with Events</Link>
          <Link to="/article/42" className="btn btn-primary">Specific Article</Link>
        </Container>
        <Container>
          <Link to="/admin/dashboard" className="btn btn-primary">Admin Dashboard</Link>
          <Link to="/admin/mailing-list" className="btn btn-primary">Mailing List</Link>
          <Link to="/admin/manage-announcements" className="btn btn-primary">Manage Announcements</Link>
          <Link to="/admin/manage-articles" className="btn btn-primary">Manage Articles</Link>
          <Link to="/admin/manage-users" className="btn btn-primary">Manage Users</Link>
          <Link to="/admin/modify-article/42" className="btn btn-primary">Modify Article</Link>
        </Container>
        */}
      </div>
    );
  }
}
