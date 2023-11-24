import axios from "axios";
import { useEffect, useState } from "react";
import { Params, useParams } from "react-router-dom";
import PostComments from "../Posts/PostComments";

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

function EventDetails() {
  const eventId = useParams<Params>();
  const [event, setEvent] = useState<Event>();

  useEffect(() => {
    console.log(eventId);
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
    fetchEvent();
  }, [eventId]);

  if (!event) return <div>Event Loading...</div>;

  return (
    <div>
      <h1>{event.title}</h1>
      <p>
        Posted by {event.author?.username} on{" "}
        {new Date(event.createdAt).toLocaleString()}
      </p>
      <p>{event.location}</p>
      <p>{event.description}</p>
      <p>Start Time: {new Date(event.startTime).toLocaleString()}</p>
      <p>End Time: {new Date(event.startTime).toLocaleString()}</p>
      <PostComments postId={Number(eventId.eventId)} />
    </div>
  );
}

export default EventDetails;
