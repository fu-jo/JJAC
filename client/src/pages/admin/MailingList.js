import React, { Component, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import "../../styles/pages/AdminPage.css"
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";

const MailingList = () => {
  //get initial users
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch("/api/getList", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        setEmails(result)
      })
      .catch(error => console.log(error));
  }, []);

  // console.log(emails)
  return (
    <div>
      <Button className="user-view" href="/home">User View</Button>
      <h2 className="title">Mailing List</h2>
      <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {emails.map((email, idx) => (
            <tr id={`email${idx}`}>
              <th>{email.email}</th>
              <th>{email.status}</th>
            </tr>
          ))}
        </tbody>
      </Table>
      </Container>
    </div>
  );
}

export default MailingList;
