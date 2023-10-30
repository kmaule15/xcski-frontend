import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import WeatherWidget from './WeatherWidget/WeatherWidget'

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



  const weatherData = {
    latitude:41.8781,
    longitude:  -87.6298,
   
  };



  return (
    <div>
     <WeatherWidget {...weatherData} />
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={7}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
    </div>
  );
};

const Trail = () => {
  return <MapComponent />;
};

export default Trail;
