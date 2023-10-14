import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import { useEffect, useState } from 'react';

interface Trail {
  latitude: number;
  longitude: number;
}

const MapComponent = () => {
  const [trails, setTrails] = useState<Trail[]>([]);

  const apiKey = process.env.REACT_APP_Google_Maps_API_KEY;

  if (!apiKey) {
    throw new Error('API key is missing. Please check your .env file.');
  }

  const mapContainerStyle = {
    width: '100%',
    height: '100vh',
  };

  const center = {
    lat: 44.5,
    lng: -89.5,
  };

  // Fetch trail data from your API endpoint
  useEffect(() => {
    fetch('http://localhost:3000/trails')
      .then(response => response.json())
      .then(data => {
        console.log(data); // Log data to console
        setTrails(data);
      });
  }, []);

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={7}
      >
        {trails.map((trail, index) => (
          <Marker key={index} position={{ lat: trail.latitude, lng: trail.longitude }} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
