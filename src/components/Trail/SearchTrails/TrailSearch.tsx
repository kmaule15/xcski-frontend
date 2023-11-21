import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Card, ButtonGroup, Button } from 'react-bootstrap';
import MapComponent, { Trail, useTrails } from "../MapComponent";
import SearchBar from './SearchbarComponent';
import './TrailSearch.css';
import SnowQuality from "../../refactor me/Snow";
import WeatherWidget from "../WeatherWidget/WeatherWidget";

function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg: number) {
  return deg * (Math.PI/180)
}

const TrailSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { trails, isLoading, error } = useTrails();
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState(1); // 1 for ascending, -1 for descending
  const [selectedTrail, setSelectedTrail] = useState<Trail | null>(null);
  const [center, setCenter] = useState<{ lat: number, lng: number }>({ lat: 44.5, lng: -89.5 });
  const [zoom, setZoom] = useState(7);
  const [sortedTrails, setSortedTrails] = useState<Array<Trail>>([]);

  useEffect(() => {
    const newSortedTrails = [...trails].sort((a, b) => {
      if (sortField === 'difficulty') {
        const order = ['Easy', 'Medium', 'Difficult'];
        return (order.indexOf(a[sortField]) - order.indexOf(b[sortField])) * sortOrder;
      } else if (sortField === 'distance') {
        return (a.distance - b.distance) * sortOrder;
      }
      return (a[sortField] > b[sortField] ? 1 : -1) * sortOrder;
    });
    setSortedTrails(newSortedTrails);
  }, [trails, sortField, sortOrder]);

  useEffect(() => {
    if (center) {
      const newSortedTrails = [...trails];
      newSortedTrails.forEach(trail => {
        trail.distance = getDistanceFromLatLonInKm(center.lat, center.lng, trail.latitude, trail.longitude);
      });
  
      newSortedTrails.sort((a, b) => (a.distance - b.distance) * sortOrder);
      setSortedTrails(newSortedTrails);
      setSortField('distance');
    }
  }, [center, sortOrder]);

  const handleSortFieldChange = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder * -1); // reverse the sort order
    } else {
      setSortField(field);
      setSortOrder(1); // reset the sort order to ascending
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Container fluid className="trail-search-container">
      <SearchBar setCenter={setCenter} setZoom={setZoom} />
      <ButtonGroup aria-label="Sort trails" className="sort-trails">
        <Button variant="secondary" onClick={() => handleSortFieldChange('name')}>Sort by Name</Button>
        <Button variant="secondary" onClick={() => handleSortFieldChange('difficulty')}>Sort by Difficulty</Button>
        <Button variant="secondary" onClick={() => handleSortFieldChange('length')}>Sort by Length</Button>
      </ButtonGroup>
      <Row className="trail-search-row">
        <Col md={3} className="trail-search-col">
          <div className="trail-card-container">
            <div className="weather-widget">
              {selectedTrail && <WeatherWidget lat={selectedTrail.latitude} lng={selectedTrail.longitude} display='minimal' />}
            </div>
            <div className="trail-search-card-container">
              {sortedTrails.map((trail, index) => (
                <div className="trail-card-container" key={index}>
                  <Card 
                    className={`trail-search-card ${trail.name === selectedTrail?.name ? 'selected' : ''}`} 
                    onClick={() => { 
                      console.log(`Card clicked: ${trail.name}`); // Log the name of the trail when a card is clicked
                      setSelectedTrail(trail); 
                      setCenter({ lat: trail.latitude, lng: trail.longitude }); 
                      setZoom(12); 
                    }}
                  >
                    <Card.Body className="trail-search-card-body d-flex flex-row justify-content-between">
                      <div>
                        <Card.Title>{trail.name}</Card.Title>
                        <Card.Text className="trail-search-card-text">
                          <div>{trail.description}</div>
                          <div>Location: {trail.location}</div>
                          <div>Difficulty: {trail.difficulty}</div>
                          <div>Length: {trail.length}</div>
                          <SnowQuality 
                            location={trail.location} 
                            date={new Date().toISOString().split('T')[0]} 
                            depthWeight={1} 
                            densityWeight={1} 
                            temperatureWeight={1} 
                            timeSinceSnowfall={0} 
                            isSnowing={false} 
                          />
                        </Card.Text>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
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
  
  
