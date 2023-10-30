import React, { useEffect, useState, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

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
  console.log('Rendering MapComponent');

  // Create a ref for the div
  const mapRef = useRef<HTMLDivElement | null>(null);

  if (!apiKey) {
    throw new Error('API key is missing. Please check your .env file. (or send Chase your IP address)');
  }

  const mapContainerStyle = {
    width: '100%',
    height: '100vh',
  };

  const center = {
    lat: 44.5,
    lng: -89.5,
  };

  useEffect(() => {
    const loader = new Loader({
      apiKey,
      version: 'weekly',
      libraries: ['places']
    });

    loader.load().then((google) => {
      // Check if mapRef.current is not null
      if (mapRef.current) {
        const map = new google.maps.Map(mapRef.current, {
          center,
          zoom: 7
        });

        trails.forEach((trail) => {
          const marker = new google.maps.Marker({
            position: { lat: trail.latitude, lng: trail.longitude },
            map,
          });

          marker.addListener('click', () => {
            setSelectedTrail(trail);
          });
        });
      } else {
        console.error('Could not find element with ref "mapRef"');
      }
    }).catch(e => {
      // handle error
    });
  }, [trails]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Attach the ref to the div
  return (
    <div ref={mapRef} style={mapContainerStyle}>
      {/* Your other components here */}
    </div>
  );
};

export default MapComponent;
