import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";

import MemberNavbar from "../components/MemberNavbar";
import NonMemberNavbar from "../components/NonMemberNavbar";
import BottomBar from "../components/BottomBar";

import { firestore } from "../firebase"

const SORT_OPTIONS = {
    'DATE_ASC': {column:'date', direction:'asc'},
    'DATE_DESC': {column:'date', direction:'desc'},
}

function useEvents(sortBy='DATE_ASC') {
    const [events, setEvents] = useState([])

    useEffect(() => {
        const unsubscribe = //drop subscription to firestore
            firestore.collection('events')
            .orderBy(SORT_OPTIONS[sortBy].column,SORT_OPTIONS[sortBy].direction)
            .onSnapshot((snapshot) => {
                const newEvents = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))

                setEvents(newEvents)
            })

        return () => unsubscribe()  //callback when unmounted
    },[sortBy])

    return events
}

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

  return date ? (time ? `${date} at ${time}` : date) : null;
};

const EventsList = (props) => {
    const [sortBy, setSortBy] = useState('DATE_ASC') //default
    const events = useEvents(sortBy)

    async function deleteEvent(evt) {
      console.log(evt.id)
      await firestore.collection('events').doc(evt.id).delete();
    }

    return (
      <div>
        {props.status === 'Admin' ? '' : props.status === "Member" ? <MemberNavbar /> : <NonMemberNavbar />}
        <Container>
          <h2>Events</h2>
          {events && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>
                    Event
                  </th>
                  <th>
                    Date
                    { sortBy === "DATE_ASC"
                      ? (<FontAwesomeIcon icon={faSortUp} style={{float: "right", marginTop: 8, marginRight: 10}} onClick={() => setSortBy("DATE_DESC")}/>)
                      : (<FontAwesomeIcon icon={faSortDown} style={{float: "right", marginBottom: 8, marginRight: 10}} onClick={() => setSortBy("DATE_ASC")}/>)
                    }
                  </th>
                    {props.status === 'Admin' ?
                      <th>Modify</th>
                    :
                    ''
                    }
                </tr>
              </thead>
              <tbody>
                {events.map((evt, idx) => { return (
                  <tr key={evt.id}>
                    <td style={{whiteSpace: "pre-wrap"}}>
                      {evt.event}
                    </td>
                    {evt.date ? (<td>{getDate(evt.date)}</td>) : <td></td>}
                    {props.status === 'Admin' ? <th>
                      <Button variant='success' href={`/admin/modify-event/${evt.id}`}>Edit</Button>
                      <Button variant='danger' onClick={() => deleteEvent(evt)}>Delete</Button>
                    </th>
                    :
                      ''
                    }
                  </tr>
                )})}
              </tbody>
            </Table>
          )}
        </Container>
        {props.status === 'Admin' ? '' : <BottomBar />}
      </div>
    );

}

export default EventsList;
