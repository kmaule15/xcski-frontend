import { GoogleMap, Marker } from '@react-google-maps/api';

function MapComponent() {
  const mapContainerStyle = {
    width: '100%',
    height: '100vh',
  };

  const center = {
    lat: 44.5,
    lng: -89.5,
  };

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={12}
    >
      <Marker position={center} />
    </GoogleMap>
  );
}

const Trail = () => {
  return <MapComponent />;
};

export default Trail;
