import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./TrailDetailPage.css";
import SimpleMapComponent from "../../Community/Events/SimpleMapComponent";
import { Col, Row, Tab, Tabs, Button } from "react-bootstrap";

type TrailParams = {
  trailId: number;
};

type Trail = {
  id: number;
  name: string;
  description: string;
  location: string;
  latitude: number;
  longitude: number;
  difficulty: string;
  length: number;
  estimatedTime: number;
  typesAllowed: string[];
};

const TrailDetailPage = () => {
  const { trailId } = useParams();
  const [trail, setTrail] = useState<Trail | null>(null);
  const [zoom, setZoom] = useState(12);

  const fetchTrail = async (trailId: number) => {
    try {
      const response = await fetch(`http://localhost:3000/trails/${trailId}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const trail = await response.json();
      return trail;
    } catch (error) {
      console.error("Failed to fetch the trail:", error);
      return null;
    }
  };

  useEffect(() => {
    const loadTrail = async () => {
      if (trailId !== undefined) {
        const id = parseInt(trailId, 10);
        if (!isNaN(id)) {
          const fetchedTrail = await fetchTrail(id);
          setTrail(fetchedTrail);
        }
      }
    };
    loadTrail();
  }, [trailId]);

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
            <p>
              <strong>Estimated Time:</strong> {trail.estimatedTime} hours
            </p>
            <p>
              <strong>Types Allowed:</strong> {trail.typesAllowed.join(", ")}
            </p>
          </div>
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
