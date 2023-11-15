import React, { useState, useEffect } from 'react';
import { Container, Row, Col, InputGroup, FormControl, Card, ButtonGroup, Button } from 'react-bootstrap';
import MapComponent, { useTrails } from "../Trail";

const TrailSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { trails, isLoading, error } = useTrails();
  const [sortField, setSortField] = useState('name');
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, []);

  const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d * 0.621371; // Convert distance to miles
  }

  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
  }

  const sortedTrails = [...trails].sort((a, b) => {
    if (userLocation) {
      const distanceA = getDistance(userLocation.latitude, userLocation.longitude, a.latitude, a.longitude);
      const distanceB = getDistance(userLocation.latitude, userLocation.longitude, b.latitude, b.longitude);
      return distanceA - distanceB;
    }
    return 0;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Container fluid style={{ height: 'calc(100vh - 60px)', display: 'flex', flexDirection: 'column' }}>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search trails..."
          aria-label="Search trails"
          aria-describedby="basic-addon2"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </InputGroup>
      <ButtonGroup aria-label="Sort trails">
        <Button variant="secondary" onClick={() => setSortField('name')}>Sort by Name</Button>
        <Button variant="secondary" onClick={() => setSortField('difficulty')}>Sort by Difficulty</Button>
        <Button variant="secondary" onClick={() => setSortField('length')}>Sort by Length</Button>
        <Button variant="secondary" onClick={() => setSortField('distance')}>Sort by Distance</Button> {/* Add a button for sorting by distance */}
      </ButtonGroup>
      <Row style={{ flex: 1 }}>
        <Col md={3} style={{ overflowY: 'auto', paddingRight: 0 }}>
          {sortedTrails.map((trail, index) => (
            <Card key={index} style={{ width: '100%', marginBottom: '2px' }}>
              <Card.Body>
                <Card.Title>{trail.name}</Card.Title>
                <Card.Text>
                  <p>{trail.description}</p>
                  <p>Location: {trail.location}</p>
                  <p>Difficulty: {trail.difficulty}</p>
                  <p>Length: {trail.length} miles</p>
                  <p>Estimated Time: {trail.estimatedTime} hours</p>
                  <p>Types Allowed: {trail.typesAllowed.join(', ')}</p>
                  {userLocation && <p>Distance: {getDistance(userLocation.latitude, userLocation.longitude, trail.latitude, trail.longitude).toFixed(2)} miles</p>} {/* Display the distance to the trail */}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Col>
        <Col md={9}>
          <MapComponent />
        </Col>
      </Row>
    </Container>
  );
};

export default TrailSearch;
