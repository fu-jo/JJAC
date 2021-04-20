import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { firestore } from '../firebase'
import firebase from '../firebase'

import MemberNavbar from "../components/MemberNavbar";
import NonMemberNavbar from "../components/NonMemberNavbar";
import AdminNavbar from "../components/AdminNavbar";
import AboutSASE from "../components/AboutSASE";
import HomeAnnouncementsList from "../components/HomeAnnouncementsList";
import HomeEventsList from "../components/HomeEventsList";
import FeaturedArticles from "../components/FeaturedArticles";
import ContactForm from "../components/ContactForm";
import BottomBar from "../components/BottomBar";

import "../styles/pages/Home.css";
import img from "../assets/temp2.png";

const Home = ({ user }) => {
  return (
    <div>
      {
        user && (user.role === "user"
        ? <MemberNavbar/>
        : (user.role === "admin"
           ? <AdminNavbar />
           : <NonMemberNavbar/>
          )
        )
      }
      { !user && <NonMemberNavbar /> }
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
    </div>
  );
}

export default Home;