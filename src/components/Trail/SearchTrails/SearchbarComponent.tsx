import React, { useState, useRef, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const SearchBar = ({ setCenter, setZoom }: { setCenter: (center: { lat: number, lng: number }) => void, setZoom: (zoom: number) => void }) => {
  const apiKey = process.env.REACT_APP_Google_Maps_API_KEY;
  const [address, setAddress] = useState<string>("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  //Google AutoComplete code
  const autocompleteInputRef = useRef<HTMLInputElement | null>(null);

  if (!apiKey) {
    throw new Error(
      "API key is missing. Please check your .env file."
    );
  }

  useEffect(() => {
    const loader = new Loader({
      apiKey,
      version: "weekly",
      libraries: ["places"],
    });

    loader.load().then(() => {
      if (autocompleteInputRef.current) {
        const autocomplete = new window.google.maps.places.Autocomplete(
          autocompleteInputRef.current,
          { types: ['(cities)'] } // Search for cities only
        );

        autocomplete.addListener("place_changed", () => {
          const selectedPlace = autocomplete.getPlace();
          if (selectedPlace.formatted_address) {
            setAddress(selectedPlace.formatted_address);
          }

          if (selectedPlace.geometry?.location) {
            const lat = selectedPlace.geometry.location.lat();
            const lng = selectedPlace.geometry.location.lng();
            setLatitude(lat);
            setLongitude(lng);
            setCenter({ lat, lng }); // Update the center state in the TrailSearch component
            setZoom(9); // Set the zoom level to 9 when a city is selected
          } else {
            console.error(
              "No geometry data available for the selected address"
            );
          }
        });

        return () => {
          window.google.maps.event.clearInstanceListeners(autocomplete);
        };
      }
    });
  }, []);

  return (
    <input ref={autocompleteInputRef} type="text" placeholder="Search For Cities (trails coming soon) ..." />
  );
};

export default SearchBar;