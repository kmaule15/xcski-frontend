import React, { useState } from "react";
import { Container, Row, Col, Card, ButtonGroup, Button } from 'react-bootstrap';
import MapComponent, { Trail, useTrails } from "../MapComponent";
import SearchBar from './SearchbarComponent';
import './TrailSearch.css';
import Rating, { RatingProps } from "@mui/material/Rating";
import { useAuth } from "../../../AuthContext";

const TrailSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { isLoggedIn, AuthUsername } = useAuth();
  const { trails, isLoading, error } = useTrails();
  const [sortField, setSortField] = useState('name');
  const [selectedTrail, setSelectedTrail] = useState<Trail | null>(null);
  const [center, setCenter] = useState<{ lat: number, lng: number }>({ lat: 44.5, lng: -89.5 });
  const [zoom, setZoom] = useState(7);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const sortedTrails = [...trails].sort((a, b) => {
    return a[sortField] > b[sortField] ? 1 : -1;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const handleSubmit = async (trail: any) => {
    let castTrail:Trail  =  trail;
    let id = castTrail.id;
    let rating = castTrail.rating;
    const formData = {
      id,
      rating,
      AuthUsername,
    };
    trail.rating = 0;
    (document.getElementsByName(trail.id + "")[0] as unknown  as RatingProps).value = 1;
    //doesn't work
    console.log(formData);
    try {
      const response = await fetch("http://localhost:3000/trailratings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("Trail successfully rated!");
        //setIsSuccess(true);
        //setTimeout(() => setIsSuccess(false), 4000);
      }
    } catch (error) {
    }
  };


  return (
    <Container fluid style={{ height: 'calc(100vh - 60px)', display: 'flex', flexDirection: 'column' }}>
      <SearchBar setCenter={setCenter} setZoom={setZoom} />
      <ButtonGroup aria-label="Sort trails">
        <Button variant="secondary" onClick={() => setSortField('name')}>Sort by Name</Button>
        <Button variant="secondary" onClick={() => setSortField('difficulty')}>Sort by Difficulty</Button>
        <Button variant="secondary" onClick={() => setSortField('length')}>Sort by Length</Button>
      </ButtonGroup>
      <Row style={{ flex: 1, display: 'flex' }}>
        <Col md={3} className="trail-search-col">
          <div className="trail-search-card-container">
            {sortedTrails.map((trail, index) => (
              <Card key={index} className={`trail-search-card ${trail.name === selectedTrail?.name ? 'selected' : ''}`} onClick={() => { 
                console.log(`Card clicked: ${trail.name}`); // Log the name of the trail when a card is clicked
                setSelectedTrail(trail); 
                setCenter({ lat: trail.latitude, lng: trail.longitude }); 
                setZoom(12); 
              }}>              
                <Card.Body>
                  <Card.Title>{trail.name}</Card.Title>
                  <Card.Text>
                    <div>{trail.description}</div>
                    <div>Location: {trail.location}</div>
                    <div>Difficulty: {trail.difficulty}</div>
                    <div>Length: {trail.length}</div>
                  </Card.Text>
                  {isLoggedIn ? <div><Rating name={trail.id+""} value={trail.rating} size="large"
      onChange={(event, rating) => {trail.rating = rating;}}/> 
    <button type="submit" className="btn btn-secondary btn-sm mt-0 pt-1 pb-1" onClick={(event) => {handleSubmit(trail);}}>
      Rate
    </button></div>: <div></div>}
                </Card.Body>
              </Card>
            ))}
          </div>
        </Col>
        <Col md={9}>
          <MapComponent latitude={center.lat} longitude={center.lng} zoom={zoom} setSelectedTrail={setSelectedTrail} />
        </Col>
      </Row>
    </Container>
  );
};

export default TrailSearch;
