import { useEffect, useState } from "react";
import MapComponent, { Trail } from "../MapComponent";
import { useAuth } from "../../../AuthContext";
import axios from "axios";
import { UserInterface } from "../../../Interfaces/user.types";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const MyTrails = () => {
  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: 44.5,
    lng: -89.5,
  });
  const [zoom, setZoom] = useState(7);
  const { AuthUsername } = useAuth();
  const [user, setUser] = useState<UserInterface>();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    fetchUser();
  }, []);

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
    <>
      <p>My Favorite Trails</p>
      {user?.myTrails.map((trail) => (
        <Card>
          <div key={trail.id}>
            <Card.Body>
              <Link to={`/trails/${trail.id}`}>
                <Card.Title>{trail.name}</Card.Title>
              </Link>
            </Card.Body>
          </div>
        </Card>
      ))}
    </>
  );
};

export default MyTrails;
