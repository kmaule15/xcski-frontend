import { useState } from 'react';
import Geocode from "react-geocode";

const apiKey = process.env.REACT_APP_Google_Maps_API_KEY;

if (!apiKey) {
  throw new Error('REACT_APP_Google_Maps_API_KEY is not defined');
}

Geocode.setKey(apiKey);
Geocode.setLanguage("en");

export const useGeocode = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const geocodeAddress = async (address: string) => {
    setLoading(true);
    try {
      const response = await Geocode.fromAddress(address);
      const { lat, lng } = response.results[0].geometry.location;
      setLocation({ lat, lng });
      setError(null);
    } catch (error) {
      setError((error as Error).message);
    }
    setLoading(false);
  };

  return { location, geocodeAddress, loading, error };
};
