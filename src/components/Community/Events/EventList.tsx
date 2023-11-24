import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateEventModal from "./CreateEventModal";
import { Link } from "react-router-dom";

interface Event {
  id: number;
  author: {
    username: string;
    email: string;
  };
  title: string;
  description: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  location: string;
  trail?: {
    name: string;
    location: string;
    longitude: number;
    latitude: number;
  };
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  invitees?: {
    username: string;
    email: string;
  }[];
  participants?: {
    username: string;
    email: string;
  }[];
}

function EventsList() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    try {
      const response = await axios.get(`http://localhost:3000/events`);
      setEvents(response.data);
      console.log(events);
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
