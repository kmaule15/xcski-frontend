import { GoogleMap, Marker, LoadScript, StandaloneSearchBox } from '@react-google-maps/api';
import { useRef } from 'react';
import TrailSearch from './SearchTrails/TrailSearch';
import SearchBar from '../SearchBar/SearchBar';
import SearchBarComponent from '../SearchBar/SearchBarComponent';

const MapComponent = () => {
  const apiKey = process.env.REACT_APP_Google_Maps_API_KEY;
  const searchBox = useRef(null);
  const onPlacesChanged = () => {
    // Handle place changes here
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
        <StandaloneSearchBox onLoad={ref => (SearchBarComponent.current = ref)} onPlacesChanged={onPlacesChanged}>
          <input type="text" placeholder="Search Box" />
        </StandaloneSearchBox>
      </GoogleMap>
    </LoadScript>
  );
};

const Trail = () => {
  return <MapComponent />;
};

export default Trail;
