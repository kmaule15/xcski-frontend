import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../../AuthContext";
import { UserInterface } from "../../../Interfaces/user.types";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

function MyEvents() {
  const [user, setUser] = useState<UserInterface>();
  const { AuthUsername } = useAuth();

  useEffect(() => {
    fetchUser();
  });

  async function fetchUser() {
    try {
      const response = await axios.get(
        `http://localhost:3000/users/username/${AuthUsername}`
      );
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user: ", error);
    }
  }

  return (
    <div>
      <h2>Attending Events</h2>

      <Card style={{ margin: "15px 0 15px 0" }}>
        <Card.Header className="bg-dark">
          <Card.Title className="text-light center">
            Confirmed Invites
          </Card.Title>
        </Card.Header>
        {user?.participatedEvents.length === 0 && (
          <p>You haven't confirmed any invites</p>
        )}
        {user?.participatedEvents.map((event) => (
          <div key={event.id}>
            <Link to={`/events/${event.id}`}>
              <p>{event.title}</p>
            </Link>
          </div>
        ))}
      </Card>
      <Card>
        <Card.Header className="bg-dark">
          <Card.Title className="text-light center">Pending Invites</Card.Title>
        </Card.Header>
        {user?.invitedEvents.length === 0 && <p>No invites at the moment</p>}
        {user?.invitedEvents.map((event) => (
          <div key={event.id}>
            <p>{event.title}</p>
          </div>
        ))}
      </Card>
    </div>
  );
}

export default MyEvents;
