import { useEffect, useRef, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { UserInterface } from "../../Interfaces/user.types";

const CreateEvent = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<Date>();
  const [location, setLocation] = useState<string>("");
  // const[trail, setTrail] = useState<>();
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [invitees, setInvitees] = useState<UserInterface[]>([]);
  // const[participants, setParticipants] = useState<>();
  const [formMessage, setFormMessage] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:3000/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setInvitees(data));
  });

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
    // setTitle("");
    // setDescription("");
    // setDate(undefined);
    // setLocation("");
    // setTrail();
    // setIsPublic(null);
    // setInvitees();
    // setParticipants();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = {};

    try {
    } catch (error) {
      console.error("An error occured:", error);
    }
  };

  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      <div className="form">
        <div className="text-center mb-4">
          <h1>Create an Event</h1>
        </div>
        <Form onSubmit={handleSubmit} className="mt-4">
          <Form.Group controlId="formName">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
            <Form.Label>Invite Users</Form.Label>
            <Form.Control
              as="select"
              value={invitees}
              onChange={(e) => setInvitees(e.target.value)}
            />
          </Form.Group>
          <br></br>
          <div className="message">{formMessage}</div>
          <Button variant="primary" type="submit">
            Create Event
          </Button>
        </Form>
      </div>
      <div className="squares-background"></div>
    </Container>
  );
};

export default CreateEvent;
