import React, { useState, useRef, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import "./CreateTrail.css";
import "../../Login/BackgroundSquares.css";

const CreateTrail = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [difficulty, setDifficulty] = useState<string>("");
  const [length, setLength] = useState<number | null>(null);
  const [estimatedTime, setEstimatedTime] = useState<number | null>(null);
  const [typesAllowed, setTypesAllowed] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  //Google AutoComplete code
  const autocompleteInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!window.google) {
      console.error("Google Maps API isn't loaded");
      return;
    }

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
          console.error("No geometry data available for the selected address");
        }
      });

      return () => {
        window.google.maps.event.clearInstanceListeners(autocomplete);
      };
    }
  }, []);

  const clearForm = () => {
    setName("");
    setDescription("");
    setLocation("");
    setDifficulty("");
    setLength(null);
    setEstimatedTime(null);
    setTypesAllowed([]);
  };

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
    };

    console.log(formData);
    try {
      const response = await fetch("http://localhost:3000/trails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Trail successfully created!");
        setIsSuccess(true);
        clearForm();
        setTimeout(() => setIsSuccess(false), 4000);
      } else {
        console.error("Trail creation failed.");
      }
    } catch (error) {
      console.error("An error occured:", error);
    }
  };

  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      <div className="form">
        <div className="text-center mb-4">
          <h1>Create a Trail</h1>
        </div>
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
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Estimated Time (in minutes)</Form.Label>
            <Form.Control
              type="number"
              value={estimatedTime ?? ""}
              onChange={(e) => setEstimatedTime(Number(e.target.value))}
            />
          </Form.Group>

          <p>Types of Skiing Allowed</p>

          <Form.Group>
            <Form.Check
              type="checkbox"
              label="Classic"
              value="Classic"
              checked={typesAllowed.includes("Classic")}
              onChange={handleTypesAllowedChange}
            />
            <Form.Check
              type="checkbox"
              label="Skate"
              value="Skate"
              checked={typesAllowed.includes("Skate")}
              onChange={handleTypesAllowedChange}
            />
          </Form.Group>
          {isSuccess && (
            <div className="alert alert-success">
              Trail successfully created!
            </div>
          )}
          <Button variant="primary" type="submit">
            Create Trail
          </Button>
        </Form>
      </div>
      <div className="squares-background"></div>
    </Container>
  );
};

export default CreateTrail;
