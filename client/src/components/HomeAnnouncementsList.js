import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { firestore } from "../firebase";

import "../styles/components/HomeAnnouncementsList.css";

const SORT_OPTIONS = {
  DATE_ASC: { column: "date", direction: "asc" },
  DATE_DESC: { column: "date", direction: "desc" },
  TITLE_ASC: { column: "title", direction: "asc" },
  TITLE_DESC: { column: "title", direction: "desc" },
};

const getDate = (dateStr) => {
  let date = new Date(dateStr).toLocaleDateString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return date ? date : null;
};

function useAnnouncements(sortBy = "DATE_DESC") {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore //drop subscription to firestore
      .collection("announcements")
      .orderBy(SORT_OPTIONS[sortBy].column, SORT_OPTIONS[sortBy].direction)
      .onSnapshot((snapshot) => {
        const newAnnouncements = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAnnouncements(newAnnouncements);
      });

    return () => unsubscribe(); //callback when unmounted
  }, [sortBy]);

  return announcements;
}

const HomeAnnouncementsList = () => {
  const [sortBy] = useState("DATE_DESC"); //default
  const announcements = useAnnouncements(sortBy).slice(0, 3);

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
          {announcements.map((ann, idx) => {
            return (
              <tr key={ann.id}>
                <td style={{ whiteSpace: "pre-wrap" }}>
                  <span>
                    {ann.title}{"\n"}
                  </span>
                  {ann.details && (
                    <div style={{ paddingLeft: 20 }}>
                      <small>
                        {ann.details}{"\n"}
                        {ann.links && ann.links.length > 0 && (
                          <span>
                            <b>Links: </b>
                            {ann.links.map((link, idx) => {
                              const fixedLink = link.includes("https://") || link.includes("http://") ? link : "https://" + link;
                              return (
                                <span>
                                  <a href={fixedLink} target="_blank" rel="noopener noreferrer" style={{ marginRight: 3 }}>{link}</a>
                                </span>
                              );
                            })}
                          </span>
                        )}
                      </small>
                    </div>
                  )}
                  {!ann.details && ann.links && ann.links.length > 0 && (
                    <div style={{ paddingLeft: 20 }}>
                      <small>
                        <b>Links: </b>
                        {ann.links.map((link, idx) => {
                          const fixedLink = link.includes("https://") || link.includes("http://") ? link : "https://" + link;
                          return (
                            <span>
                              <a href={fixedLink} target="_blank" rel="noopener noreferrer" style={{ marginRight: 3 }}>{link}</a>
                            </span>
                          );
                        })}
                      </small>
                    </div>
                  )}
                </td>
                {ann.date ? <td>{getDate(ann.date)}</td> : <td></td>}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default HomeAnnouncementsList;
