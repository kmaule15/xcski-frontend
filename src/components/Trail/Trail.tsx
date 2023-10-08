import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import TrailSearch from './SearchTrails/TrailSearch';
import SearchBarComponent from '../SearchBar/SearchBarComponent';

const MapComponent = () => {
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
