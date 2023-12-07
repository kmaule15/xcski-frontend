import axios from "axios";
import { useEffect, useState } from "react";
import { Params, useNavigate, useParams } from "react-router-dom";
import PostComments from "../Posts/PostComments";
import { Col, Row, Tab, Tabs, Button } from "react-bootstrap";
import { EventInterface } from "../../../Interfaces/event.types";
import EventMapComponent from "./EventMapComponent";
import "./EventDetails.css";
import { useAuth } from "../../../AuthContext";

function EventDetails() {
  const eventId = useParams<Params>();
  const [event, setEvent] = useState<EventInterface>();
  const [zoom, setZoom] = useState(12);
  const [key, setKey] = useState("comments");
  const navigate = useNavigate();
  const { AuthUsername } = useAuth();

  useEffect(() => {
    fetchEvent();
  }, [eventId]);

  async function fetchEvent() {
    try {
      const response = await axios.get(
        `http://localhost:3000/events/${eventId.eventId}`
      );
      setEvent(response.data);
    } catch (error) {
      console.error("Error fetching event: ", error);
    }
  }

  function deleteEvent() {
    try {
      axios.delete(`http://localhost:3000/events/${eventId.eventId}`);
      alert("Event has been deleted");
      navigate(`/community`);
    } catch (error) {
      console.error("Error deleting event: ", error);
    }
  }

  if (!event) return <div>Event Loading...</div>;
  return (
    <div>
      <div>
        <Row style={{ flex: 1, display: "flex" }}>
          <Col md={4}>
            <h1>{event.title}</h1>
            <p>
              Posted by {event.author?.username} on{" "}
              {new Date(event.createdAt).toLocaleString()}
            </p>
            {event.trail && (
              <div>
                <h3>Trail Name: {event.trail.name}</h3>
                <p>Address: {event.location}</p>
              </div>
            )}
            {!event.trail && (
              <div>
                <p>
                  <strong>Address: </strong>
                  {event.location}
                </p>
              </div>
            )}
            <p>
              <strong>Description: </strong>
              {event.description}
            </p>
            <p>
              <strong>Start Time:</strong>{" "}
              {new Date(event.startTime).toLocaleString()}
            </p>
            <p>
              <strong>End Time:</strong>
              {new Date(event.startTime).toLocaleString()}
            </p>
            {AuthUsername === event.author.username && (
              <Button onClick={deleteEvent}>Delete Event</Button>
            )}

            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k as string)}
              className="mb-3"
            >
              <Tab eventKey="comments" title="Comments">
                <PostComments postId={Number(eventId.eventId)} />
                ...
              </Tab>
              <Tab eventKey="invited" title="Invited">
                {event.invitees?.map((invitee) => (
                  <div key={invitee.email}>
                    <ul>
                      <li className="no-bullets">{invitee.username}</li>
                    </ul>
                  </div>
                ))}
                ...
              </Tab>
              <Tab eventKey="confirmed" title="Confirmed">
                {event.participants?.map((participant) => (
                  <div key={participant.email}>
                    <ul>
                      <li className="no-bullets">{participant.username}</li>
                    </ul>
                  </div>
                ))}
                ...
              </Tab>
            </Tabs>
          </Col>
          <Col md={4}>
            {event.trail && (
              <div>
                <EventMapComponent
                  latitude={event.trail.latitude}
                  longitude={event.trail.longitude}
                  zoom={zoom}
                  trail={event.trail}
                />
              </div>
            )}
            {!event.trail && (
              <div>
                <EventMapComponent
                  latitude={event.latitude}
                  longitude={event.longitude}
                  zoom={zoom}
                />
              </div>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default EventDetails;
