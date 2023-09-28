import { GoogleMap, Marker } from '@react-google-maps/api';
import loadGoogleMapsApi from 'load-google-maps-api';

function MapComponent() {
  const mapContainerStyle = {
    width: '100%',
    height: '100vh',
  };

  const center = {
    lat: 44.5,
    lng: -89.5,
  };

  // Load the Google Maps API
  loadGoogleMapsApi({ key: 'YOUR_API_KEY' }).then(function (googleMaps) {
    const mapElement = document.querySelector('.map') as HTMLElement;
    if (mapElement) {
      new googleMaps.Map(mapElement, {
        center: center,
        zoom: 12
      });
    }
  }).catch(function (error) {
    console.error(error);
  });

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
