import React, { useState } from "react";
import { Container, Row, Col, Card, ButtonGroup, Button } from 'react-bootstrap';
import MapComponent, { Trail, useTrails } from "../MapComponent";
import SearchBar from './SearchbarComponent';
import './TrailSearch.css';
import SnowQuality from "../../refactor me/Snow";

const TrailSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { trails, isLoading, error } = useTrails();
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState(1);
  const [selectedTrail, setSelectedTrail] = useState<Trail | null>(null);
  const [center, setCenter] = useState<{ lat: number, lng: number }>({ lat: 44.5, lng: -89.5 });
  const [zoom, setZoom] = useState(7);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSortFieldChange = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder * -1);
    } else {
      setSortField(field);
      setSortOrder(1);
    }
  };

  const sortedTrails = [...trails].sort((a, b) => {
    if (sortField === 'difficulty') {
      const order = ['Easy', 'Medium', 'Difficult'];
      return (order.indexOf(a[sortField]) - order.indexOf(b[sortField])) * sortOrder;
    }
    return (a[sortField] > b[sortField] ? 1 : -1) * sortOrder;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Container fluid style={{ height: 'calc(100vh - 60px)', display: 'flex', flexDirection: 'column' }}>
      <SearchBar setCenter={setCenter} setZoom={setZoom} />
      <ButtonGroup aria-label="Sort trails">
        <Button variant="secondary" onClick={() => handleSortFieldChange('name')}>Sort by Name</Button>
        <Button variant="secondary" onClick={() => handleSortFieldChange('difficulty')}>Sort by Difficulty</Button>
        <Button variant="secondary" onClick={() => handleSortFieldChange('length')}>Sort by Length</Button>
      </ButtonGroup>
      <Row style={{ flex: 1, display: 'flex' }}>
        <Col md={3} className="trail-search-col">
          <div className="trail-search-card-container">
            {sortedTrails.map((trail, index) => (
              <Card key={index} className={`trail-search-card ${trail.name === selectedTrail?.name ? 'selected' : ''}`} onClick={() => { 
                console.log(`Card clicked: ${trail.name}`);
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
                    <SnowQuality location={trail.location} date={new Date().toISOString().split('T')[0]} depthWeight={1} densityWeight={1} temperatureWeight={1} timeSinceSnowfall={0} isSnowing={false} />
                  </Card.Text>
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
