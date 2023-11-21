import { useEffect, useRef, useState } from "react";
import { Container, Form, Button, Modal } from "react-bootstrap";
import { UserInterface } from "../../../Interfaces/user.types";
import { useAuth } from "../../../AuthContext";
import { Loader } from "@googlemaps/js-api-loader";
import "./CreateEventModal.css";
import DatePicker from "react-datepicker";
import axios from "axios";
import SearchBar from "../../SearchBar/SearchBar";

interface CreateEventModalProps {
  onEventCreated?: () => void;
}

function CreateEventModal({ onEventCreated }: CreateEventModalProps) {
  const { isLoggedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [trails, setTrails] = useState<
    {
      name: string;
      location: string;
      longitude: number;
      latitude: number;
    }[]
  >();
  const [trailResults, setTrailResults] = useState<
    {
      name: string;
      location: string;
      longitude: number;
      latitude: number;
    }[]
  >();
  const [users, setUsers] = useState<
    {
      username: string;
      email: string;
    }[]
  >();
  const [userResults, setUserResults] = useState<
    {
      username: string;
      email: string;
    }[]
  >();
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const apiKey = process.env.REACT_APP_Google_Maps_API_KEY;

  // Form variables
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [location, setLocation] = useState<string>("");
  const [invitees, setInvitees] = useState<UserInterface[]>([]);
  const [userEvent, setUserEvent] = useState<{
    username: string;
    email: string;
  }>();
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const [isAtTrail, setIsAtTrail] = useState<boolean>(true);
  const [trailEvent, setTrailEvent] = useState<{
    name: string;
    location: string;
  }>();

  if (!apiKey) {
    throw new Error(
      "API key is missing. Please check your .env file. (or send Chase your IP address)"
    );
  }

  // set up autocomplete ref
  const autocompleteInputRef = useRef<HTMLInputElement | null>(null);

  const handleClose = () => {
    setIsOpen(false);
    setCurrentStep(1);
    clearForm();
  };

  const handleNext = () => {
    setCurrentStep((currStep) => currStep + 1);
  };

  const handleBack = () => {
    setCurrentStep((currStep) => currStep - 1);
  };

  const handleSubmit = async () => {
    const accessToken = localStorage.getItem("accesstoken");

    if (!isLoggedIn) {
      console.error("No access token found");
      return;
    }

    const formData = {
      title,
      description,
      date,
      startTime,
      endTime,
      location,
      invitees,
      isPublic,
      trailEvent,
    };

    try {
      await axios.post(`http://localhost:3000/events`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (onEventCreated) {
        onEventCreated();
      }
    } catch (error) {
      console.error("An error occured:", error);
    }
    handleClose();
  };

  useEffect(() => {
    onLoad();
    const loader = new Loader({
      apiKey,
      version: "weekly",
      libraries: ["places"],
    });

    loader.load().then(() => {
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
  }, [isOpen, isAtTrail, apiKey]);

  async function onLoad() {
    try {
      const response = await axios.get(`http://localhost:3000/trails`);
      setTrails(response.data);
    } catch (error) {
      console.error("Error fetching trails", error);
    }

    try {
      const response = await axios.get(`http://localhost:3000/users`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  }

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setDate(new Date());
    setStartTime(new Date());
    setEndTime(new Date());
    setLocation("");
    setInvitees([]);
    setIsPublic(true);
    setIsAtTrail(true);
    setTrailEvent({
      name: "",
      location: "",
    });
  };

  type changeHandler = React.ChangeEventHandler<HTMLInputElement>;

  const handleUserChange: changeHandler = (e) => {
    const { target } = e;
    if (!target.value.trim()) return setUserResults([]);
    //improve filtering later
    var targetValue = target.value.toLowerCase();
    const filteredValue =
      users &&
      users.filter(
        (user: { username: string; email: string }) =>
          user.username.toLowerCase().includes(targetValue) ||
          user.email.toLowerCase().includes(targetValue)
      );
    setUserResults(filteredValue);
  };

  const handleUserSelect = (user: any) => {
    setUserEvent(user);

    const emailOptions = {
      from: "XCSadm@gmail.com",
      to: user.email,
      subject: "You are invited to an event!",
    };

    try {
      axios.post(`http://localhost:3000/email/send`, emailOptions);
    } catch (error) {
      console.error("An error occured:", error);
    }
  };

  const handleTrailChange: changeHandler = (e) => {
    const { target } = e;
    if (!target.value.trim()) return setTrailResults([]);
    //improve filtering later
    var targetValue = target.value.toLowerCase();
    const filteredValue =
      trails &&
      trails.filter(
        (trail: { name: string; location: string }) =>
          trail.name.toLowerCase().includes(targetValue) ||
          trail.location.toLowerCase().includes(targetValue)
      );
    setTrailResults(filteredValue);
  };

  const handleTrailSelect = (trail: any) => {
    setTrailEvent(trail);
    setLocation(trail.location);
  };

  return (
    <div>
      {isLoggedIn ? (
        <Button onClick={() => setIsOpen(true)}>Create Event</Button>
      ) : (
        <p>Users must be logged in to create events</p>
      )}
      <Modal show={isOpen} onHide={handleClose}>
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
              <Form.Group controlId="formStartTime">
                <Form.Label>Start Time</Form.Label>
                <DatePicker
                  selected={startTime}
                  onChange={(startTime: Date) => setStartTime(startTime)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  dateFormat="h:mm aa"
                  customInput={<Form.Control as="input" />}
                />
              </Form.Group>
              <Form.Group controlId="formEndTime">
                <Form.Label>End Time</Form.Label>
                <DatePicker
                  selected={endTime}
                  onChange={(endTime: Date) => setEndTime(endTime)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  dateFormat="h:mm aa"
                  customInput={<Form.Control as="input" />}
                />
              </Form.Group>
            </div>
          )}
          {currentStep === 2 && (
            <div>
              <Form.Group controlId="formLocation">
                <Form.Label>Is Event Located At a Trail?</Form.Label>
                <Form.Check
                  inline
                  type="radio"
                  label="Yes"
                  name="trailLocationOptions"
                  checked={isAtTrail}
                  onChange={() => {
                    setIsAtTrail(true);
                    setTrailEvent({
                      name: "",
                      location: "",
                    });
                  }}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="No"
                  name="trailLocationOptions"
                  checked={!isAtTrail}
                  onChange={() => {
                    setIsAtTrail(false);
                    setLocation("");
                  }}
                />
              </Form.Group>
              {isAtTrail && (
                <Form.Group controlId="formLocation">
                  <br></br>
                  <Form.Label>Please enter the Name of the Trail</Form.Label>
                  <SearchBar
                    results={trailResults}
                    value={trailEvent?.name}
                    renderItem={(trail: any) => (
                      <div>
                        <p>{trail.name}</p>
                        <p>{trail.location}</p>
                      </div>
                    )}
                    onChange={handleTrailChange}
                    onSelect={handleTrailSelect}
                  />
                  <br></br>
                  <div>
                    <p>{trailEvent?.location}</p>
                  </div>
                </Form.Group>
              )}
              {!isAtTrail && (
                <Form.Group controlId="formLocation">
                  <Form.Label>Please enter the Address of the Event</Form.Label>
                  <Form.Control
                    ref={autocompleteInputRef}
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </Form.Group>
              )}
            </div>
          )}
          {currentStep === 3 && (
            <div>
              <Form.Group>
                <Form.Label>What Type of Event?</Form.Label>
                <Form.Check
                  inline
                  type="radio"
                  label="Public"
                  name="trailTypeOptions"
                  checked={isPublic}
                  onChange={() => {
                    setIsPublic(true);
                  }}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Private"
                  name="trailTypeOptions"
                  checked={!isPublic}
                  onChange={() => {
                    setIsPublic(false);
                  }}
                />
              </Form.Group>
              <br></br>
              <Form.Group>
                <Form.Label>Invite Users</Form.Label>
                <SearchBar
                  results={userResults}
                  value={userEvent?.username}
                  renderItem={(user: any) => (
                    <div>
                      <p>{user.username}</p>
                    </div>
                  )}
                  onChange={handleUserChange}
                  onSelect={handleUserSelect}
                />
              </Form.Group>
            </div>
          )}
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
}

export default CreateEventModal;
