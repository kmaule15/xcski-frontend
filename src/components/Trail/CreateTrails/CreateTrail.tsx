import React, { useState, useRef, useEffect } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { Loader } from "@googlemaps/js-api-loader";
import "./CreateTrail.css";
import "../../Login/BackgroundSquares.css";
import { useAuth } from "../../../AuthContext";
import DrawMapComponent from "./DrawMapComponent";
import axios from "axios";

const CreateTrail = () => {
  const { isLoggedIn } = useAuth();
  const apiKey = process.env.REACT_APP_Google_Maps_API_KEY;
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [difficulty, setDifficulty] = useState<string>("");
  const [length, setLength] = useState<number>(0);
  const [estimatedTime, setEstimatedTime] = useState<number>(0);
  const [estimatedHours, setEstimatedHours] = useState<number>(0);
  const [estimatedMinutes, setEstimatedMinutes] = useState<number>(0);
  const [typesAllowed, setTypesAllowed] = useState<string[]>([]);
  const [Nodes, setDrawnPath] = useState<{ id: number; coordinates: [number, number] }[]>([]);
  const [formMessage, setFormMessage] = useState<string>("");

  //Google AutoComplete code
  const autocompleteInputRef = useRef<HTMLInputElement | null>(null);

  if (!apiKey) {
    throw new Error(
      "API key is missing. Please check your .env file. (or send Chase your IP address)"
    );
  }

  useEffect(() => {
    const loader = new Loader({
      apiKey,
      version: "weekly",
      libraries: ["places", "drawing"],
    });

    loader.load().then(() => {
      if (autocompleteInputRef.current) {
        const autocomplete = new window.google.maps.places.Autocomplete(
          autocompleteInputRef.current,
          { types: ["address"] }
        );

        autocomplete.addListener("place_changed", () => {
          const selectedPlace = autocomplete.getPlace();
          if (selectedPlace.formatted_address) {
            setLocation(selectedPlace.formatted_address);
          }

          if (selectedPlace.geometry?.location) {
            setLatitude(selectedPlace.geometry.location.lat());
            setLongitude(selectedPlace.geometry.location.lng());
          } else {
            console.error(
              "No geometry data available for the selected address"
            );
          }
        });

        return () => {
          window.google.maps.event.clearInstanceListeners(autocomplete);
        };
      }
    });

    const totalMinutes = estimatedHours * 60 + estimatedMinutes;
    setEstimatedTime(totalMinutes);
  }, [estimatedHours, estimatedMinutes]);

  function clearForm(): void {
    setName("");
    setDescription("");
    setLocation("");
    setDifficulty("");
    setLength(0);
    setEstimatedMinutes(0);
    setEstimatedHours(0);
    setEstimatedTime(0);
    setTypesAllowed([]);

    setTimeout(() => {
      setFormMessage("");
    }, 2000);
  }

  const handleTypesAllowedChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    // add value to array if it's checked
    // otherise remove value
    if (event.target.checked) {
      setTypesAllowed((prevTypesAllowed) => [...prevTypesAllowed, value]);
    } else {
      setTypesAllowed((prevTypesAllowed) =>
        prevTypesAllowed.filter((item) => item !== value)
      );
    }
  };
  const handlePathSave = (pathArray: { id: number; coordinates: [number, number] }[]) => {
    setDrawnPath(pathArray);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !name.trim() ||
      !description.trim() ||
      !location ||
      !difficulty ||
      !length ||
      estimatedTime === 0 ||
      typesAllowed.length === 0 ||
      Nodes.length === 0
    ) {
      alert("All form fields are required!");
      return;
    }

    const accessToken = localStorage.getItem("accesstoken");

    if (!accessToken) {
      console.error("No access token found");
      return;
    }

    const formData = {
      name,
      description,
      location,
      latitude,
      longitude,
      difficulty,
      length,
      estimatedTime,
      typesAllowed,
      Nodes
    };

    try {
      const response = await axios.post(
        `http://localhost:3000/trails`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response) {
        setFormMessage("Trail Created Successfully!");
        clearForm();
      }
    } catch (error) {
      setFormMessage("Trail Unable to be Created");
      console.error("Error creating trail: ", error);
    }
  };

  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      
      <div className="squares-background"></div>

      <div className="form">
        <div className="text-center mb-4">
          <h1>Create a Trail</h1>
        </div>
        {isLoggedIn ? (
          <Form onSubmit={handleSubmit} className="mt-4">
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                maxLength={300}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Location</Form.Label>
              <Form.Control
                ref={autocompleteInputRef}
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Difficulty</Form.Label>
              <Form.Control
                as="select"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="">--Select--</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Difficult">Difficult</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Length (in miles)</Form.Label>
              <Form.Control
                type="number"
                value={length ?? ""}
                onChange={(e) => setLength(Number(e.target.value))}
                min={0}
                max={100}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Estimated Time</Form.Label>
              <Row>
                <Col>
                  <Form.Label>Hours</Form.Label>
                  <Form.Control
                    as="select"
                    value={String(estimatedHours)}
                    onChange={(e) => setEstimatedHours(Number(e.target.value))}
                  >
                    {Array.from({ length: 11 }, (_, hour) => (
                      <option key={hour} value={hour}>
                        {hour}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
                <Col>
                  <Form.Label>Minutes</Form.Label>
                  <Form.Control
                    as="select"
                    value={String(estimatedMinutes)}
                    onChange={(e) =>
                      setEstimatedMinutes(Number(e.target.value))
                    }
                  >
                    {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map(
                      (minute) => (
                        <option key={minute} value={minute}>
                          {minute}
                        </option>
                      )
                    )}
                  </Form.Control>
                </Col>
              </Row>
            </Form.Group>
            <p>Types of Skiing Allowed</p>
            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Classic"
                value="Classic"
                className="custom-check"
                checked={typesAllowed.includes("Classic")}
                onChange={handleTypesAllowedChange}
              />
              <Form.Check
                type="checkbox"
                label="Skate"
                value="Skate"
                className="custom-check"
                checked={typesAllowed.includes("Skate")}
                onChange={handleTypesAllowedChange}
              />
            </Form.Group>
            <br></br>
            <div className="message">{formMessage}</div>
            <Button variant="primary" type="submit">
              Create Trail
            </Button>
          </Form>
        ) : (
          <p>Users must be logged in to create trails</p>
        )}
      </div>
      <DrawMapComponent incomingAddress={location} onPathSave={handlePathSave} />
    </Container>
  );
};

export default CreateTrail;
