import { useEffect, useRef, useState } from "react";
import { Container, Form, Button, Modal } from "react-bootstrap";
import { UserInterface } from "../../../Interfaces/user.types";
import { useAuth } from "../../../AuthContext";
import { Loader } from "@googlemaps/js-api-loader";
import "./CreateEventModal.css";
import DatePicker from "react-datepicker";

const CreateEventModal = () => {
  const { isLoggedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState(new Date());
  const [location, setLocation] = useState<string>("");
  // const[trail, setTrail] = useState<>();
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [invitees, setInvitees] = useState<UserInterface[]>([]);
  // const[participants, setParticipants] = useState<>();
  const [formMessage, setFormMessage] = useState<string>("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const apiKey = process.env.REACT_APP_Google_Maps_API_KEY;

  const handleClose = () => {
    setIsOpen(false);
    setCurrentStep(1);
    // TODO RESET FORM DATA
  };

  const handleNext = () => {
    setCurrentStep((currStep) => currStep + 1);
  };

  const handleBack = () => {
    setCurrentStep((currStep) => currStep - 1);
  };

  // useEffect(() => {
  //   fetch("http://localhost:3000/users", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => setInvitees(data));
  // });

  //Google AutoComplete code
  const autocompleteInputRef = useRef<HTMLInputElement | null>(null);

  if (!apiKey) {
    throw new Error(
      "API key is missing. Please check your .env file. (or send Chase your IP address)"
    );
  }

  const handleAutocomplete = () => {
    const loader = new Loader({
      apiKey,
      version: "weekly",
      libraries: ["places"],
    });

    loader.load().then(() => {
      console.log("in loader");
      if (autocompleteInputRef.current) {
        const autocomplete = new window.google.maps.places.Autocomplete(
          autocompleteInputRef.current,
          { types: ["address"] }
        );

        autocomplete.addListener("place_changed", () => {
          const selectedPlace = autocomplete.getPlace();
          console.log(selectedPlace);

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
  };

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

  const handleSubmit = async () => {
    const formData = {};

    try {
    } catch (error) {
      console.error("An error occured:", error);
    }
    handleClose();
  };

  return (
    <div>
      {isLoggedIn ? (
        <Button onClick={() => setIsOpen(true)}>Create Event</Button>
      ) : (
        <p>Users must be logged in to create events</p>
      )}
      <Modal show={isOpen} onHide={handleClose} onEntered={handleAutocomplete}>
        <Modal.Header>Step {currentStep} of 3</Modal.Header>
        <Modal.Body>
          {currentStep === 1 && (
            <div>
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
              <Form.Group controlId="formDate">
                <Form.Label>Date</Form.Label>
                <DatePicker
                  selected={date}
                  onChange={(date: Date) => setDate(date)}
                  customInput={<Form.Control as="input" />}
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
            </div>
          )}

          {currentStep === 2 && <p>Second Page</p>}
        </Modal.Body>
        <Modal.Footer>
          {currentStep > 1 && <Button onClick={handleBack}>Back</Button>}
          {currentStep < 3 ? (
            <Button onClick={handleNext}>Next</Button>
          ) : (
            <Button onClick={handleSubmit}>Submit</Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );

  // return (
  //   <Container className="vh-100 d-flex justify-content-center align-items-center">
  //     <div className="form">
  //       <div className="text-center mb-4">
  //         <h1>Create an Event</h1>
  //       </div>
  //       <Form onSubmit={handleSubmit} className="mt-4">
  //         <Form.Group controlId="formName">
  //           <Form.Label>Title</Form.Label>
  //           <Form.Control
  //             type="text"
  //             value={title}
  //             onChange={(e) => setTitle(e.target.value)}
  //           />
  //         </Form.Group>
  //         <Form.Group controlId="formDescription">
  //           <Form.Label>Description</Form.Label>
  //           <Form.Control
  //             as="textarea"
  //             rows={2}
  //             maxLength={300}
  //             value={description}
  //             onChange={(e) => setDescription(e.target.value)}
  //           />
  //         </Form.Group>
  //         <Form.Group>
  //           <Form.Label>Location</Form.Label>
  //           <Form.Control
  //             ref={autocompleteInputRef}
  //             type="text"
  //             value={location}
  //             onChange={(e) => setLocation(e.target.value)}
  //           />
  //         </Form.Group>
  //         {/* <Form.Group>
  //           <Form.Label>Invite Users</Form.Label>
  //           <Form.Control
  //             as="select"
  //             value={invitees}
  //             onChange={(e) => setInvitees(e.target.value)}
  //           />
  //         </Form.Group> */}
  //         <br></br>
  //         <div className="message">{formMessage}</div>
  //         <Button variant="primary" type="submit">
  //           Create Event
  //         </Button>
  //       </Form>
  //     </div>
  //     <div className="squares-background"></div>
  //   </Container>
  // );
};

export default CreateEventModal;
