import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import { useRef, useState, useEffect } from 'react';
import TrailSearch from './SearchTrails/TrailSearch';
import SearchBarComponent from '../SearchBar/SearchBarComponent';
import { StandaloneSearchBox } from '@react-google-maps/api';

const searchBox = useRef<StandaloneSearchBox | null>(null);

const MapComponent = () => {
  const apiKey = process.env.REACT_APP_Google_Maps_API_KEY;
  const searchBox = useRef(null);
  const [service, setService] = useState<google.maps.places.PlacesService | null>(null);

  useEffect(() => {
    if (window.google) {
      setService(new window.google.maps.places.PlacesService(document.createElement('div')));
    }
  }, []);

  const onPlacesChanged = () => {
    // Handle place changes here
    if (searchBox.current) {

      console.log(searchBox.current.getPlaces());
    }
  };

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

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={["places"]}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={7}
      >
        <Marker position={center} />
        <SearchBarComponent />
      </GoogleMap>
    </LoadScript>
  );
};

const Trail = () => {
  return <MapComponent />;
};

export default Trail;
