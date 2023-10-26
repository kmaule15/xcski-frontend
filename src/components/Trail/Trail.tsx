import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';
import { useEffect, useState } from 'react';

// Defining an interface for the Trail object
interface Trail {
  latitude: number;
  longitude: number;
}

// Custom hook to fetch trails data from the server
const useTrails = () => {
  const [trails, setTrails] = useState<Trail[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:3000/trails')
      .then(response => response.json())
      .then(data => {
        setTrails(data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  return { trails, isLoading, error };
};

const MapComponent = () => {
  const { trails, isLoading, error } = useTrails();
  const apiKey = process.env.REACT_APP_Google_Maps_API_KEY;
  const [selectedTrail, setSelectedTrail] = useState<Trail | null>(null);

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

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
  });

  if (loadError) {
    return <div>Error loading maps: {loadError.message}</div>;
  }

  if (isLoading || !isLoaded) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={7}>
      <Marker position={{ lat: 44.5, lng: -89.5 }} />
      {trails.map((trail, index) => (
        <Marker 
          key={index} 
          position={{ lat: trail.latitude, lng: trail.longitude }}
          onClick={() => setSelectedTrail(trail)}
        />
      ))}
      <Marker position={{ lat: 43.0750, lng: -87.8829 }} label="UWM" />

      {selectedTrail && (
        <InfoWindow 
          position={{ lat: selectedTrail.latitude, lng: selectedTrail.longitude }}
          onCloseClick={() => setSelectedTrail(null)}
        >
          <div>
            <h2>Trail Information</h2>
            <p>Latitude: {selectedTrail.latitude}</p>
            <p>Longitude: {selectedTrail.longitude}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default MapComponent;
