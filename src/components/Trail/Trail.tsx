import { GoogleMap, Marker } from '@react-google-maps/api';

const Trail = () => {
  return <p>A trail</p>;
};

function MapComponent() {
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const center = {
    lat: 37.7749,
    lng: -122.4194,
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
export default Trail;
