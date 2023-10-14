// Importing necessary modules and hooks from react and react-google-maps/api
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import { useEffect, useState } from 'react';

// Defining an interface for the Trail object
interface Trail {
  latitude: number;
  longitude: number;
}

// Custom hook to fetch trails data from the server
const useTrails = () => {
  // State variables for storing the trails data, loading status, and any error that occurs
  const [trails, setTrails] = useState<Trail[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // useEffect hook to fetch the trails data when the component mounts
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

// Main MapComponent that uses the Google Maps API
const MapComponent = () => {
  // Using the custom hook to get the trails data
  const { trails, isLoading, error } = useTrails();

  // Getting the API key from environment variables
  const apiKey = process.env.REACT_APP_Google_Maps_API_KEY;

  // Checking if the API key is available
  if (!apiKey) {
    throw new Error('API key is missing. Please check your .env file.');
  }

  // Defining the style for the map container
  const mapContainerStyle = {
    width: '100%',
    height: '100vh',
  };

  // Defining the center coordinates for the map
  const center = {
    lat: 44.5,
    lng: -89.5,
  };

  // If data is still loading, display a loading message
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If there was an error in fetching data, display an error message
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Render the Google Map with markers at each trail location
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

// Exporting the MapComponent as default export
export default MapComponent;
