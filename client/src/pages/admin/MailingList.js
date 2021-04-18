import React, { Component, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import "../../styles/pages/AdminPage.css"
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";

const MailingList = () => { 
  //get initial users
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    fetch("/api/getList")
      .then((res) => {
        res.json()
        console.log(res)
      })
      .then((data) => {
        // setEmails(data.message)
        console.log(data)
      });
  }, []);

  // console.log(emails)
  return (
    <div>
      <Button className="logout" href="/home">Logout</Button>
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
          {/*emails.map((email, idx) => (
            <tr id={`email${idx}`}>
              <th>email</th>
              <th>Status</th>
            </tr>
          ))*/}
        </tbody>
      </Table>
      </Container>
    </div>
  );
}

export default MailingList;