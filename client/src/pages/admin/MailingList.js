import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import "../../styles/pages/AdminPage.css"
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";

import AdminSidebar from '../../components/AdminSidebar';

export default class MailingList extends Component {
  constructor(props) {
    super(props);

    this.buttonClicked = this.buttonClicked.bind(this);

    this.state = {
      name: "Click"
    };
  }

  buttonClicked() {
    this.setState({name: "Button Pressed"})
  }

  render() {
    return (
      <div>
        <AdminSidebar />
        <Button className="logout" href="/home">Logout</Button>
        <h2 className="title">Mailing List</h2>
        <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
            </tr>
          </thead>
        </Table>
        </Container>
      </div>
    );
  }
}
