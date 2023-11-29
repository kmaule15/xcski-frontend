import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateEventModal from "./CreateEventModal";
import { Link } from "react-router-dom";
import { EventInterface } from "../../../Interfaces/event.types";

function EventsList() {
  const [events, setEvents] = useState<EventInterface[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/events`
      );
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
        <div key={event.id}>
          <Link to={`/events/${event.id}`}>
            <h3>{event.title}</h3>
          </Link>
          <p>
            Posted by {event.author?.username} on{" "}
            {new Date(event.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}

export default EventsList;
