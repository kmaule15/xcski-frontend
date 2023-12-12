import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateEventModal from "./CreateEventModal";
import { Link } from "react-router-dom";
import { EventInterface } from "../../../Interfaces/event.types";
import { Card } from "react-bootstrap";

function EventsList() {
  const [events, setEvents] = useState<EventInterface[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    try {
      const response = await axios.get(`http://localhost:3000/events`);
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  function handleEventCreated() {
    fetchEvents();
  }

  return (
    <div>
      <CreateEventModal onEventCreated={handleEventCreated} />

      {events.map((event) => (
        <Card style={{ marginBottom: "15px" }}>
          <div key={event.id}>
            <Card.Header className="bg-secondary">
              <Link style={{ color: "white" }} to={`/events/${event.id}`}>
                <Card.Title className="text-light center">
                  {event.title}
                </Card.Title>
              </Link>
            </Card.Header>
            <p>
              Posted by {event.author?.username} on{" "}
              {new Date(event.createdAt).toLocaleString()}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default EventsList;
