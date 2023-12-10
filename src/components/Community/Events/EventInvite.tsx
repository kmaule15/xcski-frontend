import { Button } from "react-bootstrap";
import { Params, useNavigate, useParams } from "react-router-dom";
import { EventInterface } from "../../../Interfaces/event.types";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserInterface } from "../../../Interfaces/user.types";

function EventInvite() {
  const { token } = useParams<Params>();
  const eventId = useParams<Params>();
  const userId = useParams<Params>();
  const [event, setEvent] = useState<EventInterface>();
  const [user, setUser] = useState<UserInterface>();
  const [participants, setParticipants] = useState<UserInterface[]>([]);
  const [invitees, setInvitees] = useState<UserInterface[]>([]);
  const [hasAcceptedInvite, setHasAcceptedInvite] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const eventResponse = await axios.get(
          `http://localhost:3000/events/${eventId.eventId}`
        );
        const userResponse = await axios.get(
          `http://localhost:3000/users/id/${userId.userId}`
        );

        setEvent(eventResponse.data);
        setUser(userResponse.data);

        const isParticipant = eventResponse.data.participants?.some(
          (participant: UserInterface) =>
            participant.id === userResponse.data.id
        );
        setHasAcceptedInvite(isParticipant);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }

    fetchData();
  }, [eventId.eventId, userId.userId]);

  async function acceptInvite() {
    if (!user || !event) {
      console.error("User or Event data is not available");
      return;
    }

    if (!event.invitees?.some((invitee) => invitee.id === user.id)) {
      alert("This user isn't in the invite list!");
      return;
    }

    if (event?.invitees) {
      for (let invitee of event.invitees) {
        console.log("invitee", invitee);
      }
    }

    const updatedParticipants = [...participants, user];
    const updatedInvitees = event.invitees.filter(
      (invitee) => invitee.id !== user.id
    );

    setParticipants(updatedParticipants);
    setInvitees(updatedInvitees);

    sendAcceptInviteRequest(updatedParticipants, updatedInvitees);
    setHasAcceptedInvite(true);
  }

  async function sendAcceptInviteRequest(
    participants: UserInterface[],
    invitees: UserInterface[]
  ) {
    const eventId = event?.id;
    console.log(invitees);
    const data = { token, eventId, participants, invitees };
    try {
      const response = await axios.post(
        `http://localhost:3000/auth/acceptinvite`,
        data
      );
      if (response) {
        alert(`You've accepted the invite to ${event?.title}`);
        navigate(`/events/${event?.id}`);
      }
    } catch (error) {
      console.error("Error adding participant to event");
    }
  }

  function declineInvite() {
    alert(`You've declined the invite to ${event?.title}`);
    navigate(`/`);
  }
  if (!event) return <div>Invite Loading...</div>;

  return (
    <div>
      <h2>You've Been Invited to {event?.title}</h2>
      <h3>Event Details</h3>
      {event.trail && (
        <div>
          <h3>Trail: {event.trail.name}</h3>
          <p>Address: {event.location}</p>
        </div>
      )}
      {!event.trail && (
        <div>
          <p>Address: {event.location}</p>
        </div>
      )}
      <p>Description: {event.description}</p>
      <p>Start Time: {new Date(event.startTime).toLocaleString()}</p>
      <p>End Time: {new Date(event.startTime).toLocaleString()}</p>
      {hasAcceptedInvite && (
        <div>
          <h2>You've Already Accepted This Invite!</h2>
        </div>
      )}
      {!hasAcceptedInvite && (
        <div>
          <Button onClick={acceptInvite}>Accept Invite</Button>
          <Button onClick={declineInvite}>Decline Invite</Button>
        </div>
      )}
    </div>
  );
}

export default EventInvite;
