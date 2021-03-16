import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";

import MemberNavbar from "../components/MemberNavbar";
import NonMemberNavbar from "../components/NonMemberNavbar";
import BottomBar from "../components/BottomBar";

import { firestore } from "../firebase"
import testAnnouncements from "../assets/test-announcements";

const SORT_OPTIONS = {
    'DATE_ASC': {column:'date', direction:'asc'},
    'DATE_DESC': {column:'date', direction:'desc'},
    'TITLE_ASC': {column:'title', direction:'asc'},
    'TITLE_DESC': {column:'title', direction:'desc'},
}

function useAnns(sortBy='DATE_DESC') {
    const [anns, setAnns] = useState([])

    useEffect(() => {
        const unsubscribe = //drop subscription to firestore
            firestore.collection('announcements')
            .orderBy(SORT_OPTIONS[sortBy].column,SORT_OPTIONS[sortBy].direction)
            .onSnapshot((snapshot) => {
                const newAnnouncements = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))

                setAnns(newAnnouncements)
            })

        return () => unsubscribe()  //callback when unmounted
    },[sortBy])

    return anns
}

const getDate = (dateStr) => {
  let date = new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return date ? date : null;
}

const Announcements = (props) => {
    const [sortBy, setSortBy] = useState('DATE_DESC') //default
    const announcements = useAnns(sortBy)

    return (
      <div>
        {props.status === "Member" ? (<MemberNavbar />) : (<NonMemberNavbar />)}
        <Container>
          <h1>Latest Announcements</h1>
          {announcements && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th style={{width: "70%"}}>
                    Announcement
                    { sortBy === "TITLE_ASC"
                      ? (<FontAwesomeIcon icon={faSortUp} style={{float: "right", marginTop: 8, marginRight: 10}} onClick={() => setSortBy("TITLE_DESC")}/>)
                      : (<FontAwesomeIcon icon={faSortDown} style={{float: "right", marginBottom: 8, marginRight: 10}} onClick={() => setSortBy("TITLE_ASC")}/>)
                    }
                  </th>
                  <th>
                    Date
                    { sortBy === "DATE_ASC"
                      ? (<FontAwesomeIcon icon={faSortUp} style={{float: "right", marginTop: 8, marginRight: 10}} onClick={() => setSortBy("DATE_DESC")}/>)
                      : (<FontAwesomeIcon icon={faSortDown} style={{float: "right", marginBottom: 8, marginRight: 10}} onClick={() => setSortBy("DATE_ASC")}/>)
                    }
                  </th>
                </tr>
              </thead>
              <tbody>
                {announcements.map((ann, idx) => { return (
                  <tr>
                    <td style={{whiteSpace: "pre-wrap"}}>
                      <span>{ann.title}{"\n"}</span>
                      {ann.details && (
                        <div style={{paddingLeft: 20}}>
                          <small>{ann.details}{"\n"}
                          {ann.links && ann.links.length > 0 && (
                            <span>
                              <b>Links: </b>
                              {ann.links.map((link, idx) => {
                                const fixedLink = link.includes("https://") || link.includes("http://") ? link : "https://" + link
                                return (
                                  <span>
                                  <a href={fixedLink}>
                                    {link}
                                  </a>{' '}
                                  </span>
                              )})}
                            </span>
                          )}
                          </small>
                        </div>
                      )}
                    </td>
                    {ann.date ? (<td>{getDate(ann.date)}</td>) : <td></td>}
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

export default Announcements;