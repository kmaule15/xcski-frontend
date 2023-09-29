import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

const MapComponent = () => {
  const mapContainerStyle = {
    width: '100%',
    height: '100vh',
  };

  const center = {
    lat: 44.5,
    lng: -89.5,
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyDmP8oo5c41zTyGihTAH0M_dcqxJ76yC7Q">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={12}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

const Trail = () => {
  return <MapComponent />;
};

export default Trail;
