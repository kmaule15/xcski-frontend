import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Params } from "react-router-dom";
import "./TrailDetailPage.css";
import SimpleMapComponent from "../../Community/Events/SimpleMapComponent";
import { Col, Row, Tab, Tabs, Button } from "react-bootstrap";
import { useAuth } from "../../../AuthContext";
import axios from "axios";
import { TrailInterface } from "../../../Interfaces/trail.types";

const TrailDetailPage = () => {
  const trailId = useParams<Params>();
  const [trail, setTrail] = useState<TrailInterface>();
  const [zoom, setZoom] = useState(12);
  const { AuthUsername } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTrail();
  }, [trailId]);

  async function fetchTrail() {
    try {
      const response = await axios.get(
        `http://localhost:3000/trails/${trailId.trailId}`
      );
      setTrail(response.data);
    } catch (error) {
      console.error("Failed to fetch the trail:", error);
    }
  }

  function deleteTrail() {
    try {
      axios.delete(`http://localhost:3000/trails/${trailId.trailId}`);
      alert("Trail has been deleted");
      navigate(`/`);
    } catch (error) {
      console.error("Error deleting event: ", error);
    }
  }

  if (!trail) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Row style={{ flex: 1, display: "flex" }}>
        <Col md={4}>
          <div className="trail-details">
            <h1>{trail.name}</h1>
            <p>
              <strong>Location:</strong> {trail.location}
            </p>
            <p>
              <strong>Description:</strong> {trail.description}
            </p>
            <p>
              <strong>Latitude:</strong> {trail.latitude}
            </p>
            <p>
              <strong>Longitude:</strong> {trail.longitude}
            </p>
            <p>
              <strong>Difficulty:</strong> {trail.difficulty}
            </p>
            <p>
              <strong>Length:</strong> {trail.length} km
            </p>
            <h2>{AuthUsername}</h2>
            <p>
              <strong>Estimated Time:</strong> {trail.estimatedTime} hours
            </p>
            <p>
              <strong>Types Allowed:</strong> {trail.typesAllowed.join(", ")}
            </p>
          </div>
          {trail.author && AuthUsername === trail.author.username && (
            <Button onClick={deleteTrail}>Delete Trail</Button>
          )}
        </Col>
        <Col md={4}>
          <div>
            <SimpleMapComponent
              latitude={trail.latitude}
              longitude={trail.longitude}
              zoom={zoom}
              trail={trail}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default TrailDetailPage;
