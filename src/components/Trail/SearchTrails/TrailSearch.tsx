import React, { useState } from 'react';
import { Container, Row, Col, Card, ButtonGroup, Button } from 'react-bootstrap';
import MapComponent, { useTrails } from "../MapComponent";
import SearchBarComponent from '../../SearchBar/SearchBarComponent';

type Trail = {
  name: string;
  description: string;
  location: string;
  latitude: number;
  longitude: number;
  difficulty: string;
  length: number;
  estimatedTime: number;
  typesAllowed: string[];
  [key: string]: any;
};


const TrailSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { trails, isLoading, error } = useTrails();
  const [sortField, setSortField] = useState('name');
  const [selectedTrail, setSelectedTrail] = useState<Trail | null>(null);

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

  return (
    <Container fluid style={{ height: 'calc(100vh - 60px)', display: 'flex', flexDirection: 'column' }}>
      <SearchBarComponent /> {/* Use the SearchBarComponent here */}
      <ButtonGroup aria-label="Sort trails">
        <Button variant="secondary" onClick={() => setSortField('name')}>Sort by Name</Button>
        <Button variant="secondary" onClick={() => setSortField('difficulty')}>Sort by Difficulty</Button>
        <Button variant="secondary" onClick={() => setSortField('length')}>Sort by Length</Button>
      </ButtonGroup>
      <Row style={{ flex: 1 }}>
        <Col md={3} style={{ overflowY: 'auto', paddingRight: 0 }}>
          {sortedTrails.map((trail, index) => (
            <Card key={index} style={{ width: '100%', marginBottom: '2px' }} onClick={() => setSelectedTrail(trail)}>
              <Card.Body>
                <Card.Title>{trail.name}</Card.Title>
                <Card.Text>
                  <p>{trail.description}</p>
                  <p>Location: {trail.location}</p>
                  <p>Difficulty: {trail.difficulty}</p>
                  <p>Length: {trail.length}</p>
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Col>
        <Col md={9}>
          <MapComponent latitude={selectedTrail?.latitude} longitude={selectedTrail?.longitude} />
        </Col>
      </Row>
    </Container>
  );
};

export default TrailSearch;
