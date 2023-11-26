import axios from "axios";
import { useEffect, useState } from "react";
import { Params, useParams } from "react-router-dom";
import PostComments from "../Posts/PostComments";
import { Col, Row } from "react-bootstrap";
import { EventInterface } from "../../../Interfaces/event.types";
import EventMapComponent from "./EventMapComponent";

function EventDetails() {
  const eventId = useParams<Params>();
  const [event, setEvent] = useState<EventInterface>();
  const [zoom, setZoom] = useState(12);

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
                <h3>{event.trail.name}</h3>
                <p>{event.location}</p>
              </div>
            )}
            {!event.trail && (
              <div>
                <p>{event.location}</p>
              </div>
            )}
            <p>{event.description}</p>
            <p>Start Time: {new Date(event.startTime).toLocaleString()}</p>
            <p>End Time: {new Date(event.startTime).toLocaleString()}</p>
            <h3>Invites</h3>
            {event.invitees?.map((invitee) => (
              <div key={invitee.email}>
                <ul>
                  <li>{invitee.username}</li>
                </ul>
              </div>
            ))}
            <h1>Comments</h1>
            <PostComments postId={Number(eventId.eventId)} />
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
