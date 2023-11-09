import React, { useState } from 'react';
import { Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import Trail from "../Trail";

const TrailSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // This is a placeholder for the list of trails from the database.
  // Replace this with the actual data.
  const trails = ['Trail 1', 'Trail 2', 'Trail 3'];

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
      <Row style={{ flex: 1 }}>
        <Col md={3} style={{ overflowY: 'auto' }}>
          {trails.map((trail, index) => (
            <p key={index}>{trail}</p>
          ))}
        </Col>
        <Col md={9}>
          <Trail />
        </Col>
      </Row>
    </Container>
  );
};

export default TrailSearch;
