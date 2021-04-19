import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LinesEllipsis from "react-lines-ellipsis";

import { firestore } from "../firebase";

const SORT_OPTIONS = {
  DATE_ASC: { column: "date", direction: "asc" },
  DATE_DESC: { column: "date", direction: "desc" },
};

const getDate = (dateStr) => {
  let date, time = null

  if (dateStr.length > 10) {
    date = new Date(dateStr).toLocaleDateString("en-US", {
      timeZone: "UTC",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    time = new Date(dateStr).toLocaleTimeString("en-US", {
      hour: 'numeric',
      minute: '2-digit'
    })
  }
  else {
    date = new Date(dateStr).toLocaleDateString("en-US", {
      timeZone: "UTC",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return date ? (time ? `${date}\nat ${time}` : date) : null;
};


function useEvents(sortBy = "DATE_ASC") {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore //drop subscription to firestore
      .collection("events")
      .orderBy(SORT_OPTIONS[sortBy].column, SORT_OPTIONS[sortBy].direction)
      .onSnapshot((snapshot) => {
        const newEvents = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setEvents(newEvents);
      });

    return () => unsubscribe(); //callback when unmounted
  }, [sortBy]);

  return events;
}

const HomeEventsList = () => {
  const [sortBy, setSortBy] = useState("DATE_ASC"); //default
  const events = useEvents(sortBy).slice(0, 3);
  console.log(events)
  return (
    <div>
      <Row>
        <Col>
          <h4>Events</h4>
        </Col>
        <Col className="view-all-link">
          <Link to="/events-calendar">View All</Link>
        </Col>
      </Row>
      <Table responsive striped bordered hover>
      <thead>
        <tr>
          <th style={{width: "53%"}}>Event</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
      {events.map((evt, idx) => {
        return (
          <tr key={evt.id}>
            <td style={{ whiteSpace: "pre-wrap" }}>
              {evt.event}
            </td>
            {evt.date ? <td>{getDate(evt.date)}</td> : <td></td>}
          </tr>
        );
      })}
      </tbody>
      </Table>
    </div>
  );
};

export default HomeEventsList;
