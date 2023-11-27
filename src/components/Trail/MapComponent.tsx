import React, { useEffect, useState, useRef, useMemo } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import "bootstrap/dist/css/bootstrap.css";

import { EventInterface } from "../../Interfaces/event.types";
import WeatherWidget from "./WeatherWidget/WeatherWidget";

export type Trail = {
  name: string;
  description: string;
  location: string;
  latitude: number;
  longitude: number;
  difficulty: string;
  length: number;
  estimatedTime: number;
  typesAllowed: string[];
  [key: string]: any;
};

export const useTrails = () => {
  const [trails, setTrails] = useState<Trail[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:3000/trails")
      .then((response) => response.json())
      .then((data) => {
        setTrails(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  return { trails, isLoading, error };
};

interface MapComponentProps {
  latitude: number | undefined;
  longitude: number | undefined;
  zoom: number;
  setSelectedTrail: (trail: Trail | null) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({
  latitude,
  longitude,
  zoom,
  setSelectedTrail,
}) => {
  const { trails, isLoading, error } = useTrails();
  const apiKey = process.env.REACT_APP_Google_Maps_API_KEY;
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  if (!apiKey) {
    throw new Error(
      "API key is missing. Please check your .env file. (or send Chase your IP address)"
    );
  }

  const mapContainerStyle = {
    width: "100%",
    height: "80vh",
  };

  const center = useMemo(
    () => ({
      lat: latitude || 44.5,
      lng: longitude || -89.5,
    }),
    [latitude, longitude]
  );

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const loader = new Loader({
      apiKey,
      version: "weekly",
      libraries: ["places"],
    });

    loader
      .load()
      .then((google) => {
        if (mapRef.current) {
          const map = new google.maps.Map(mapRef.current, {
            center: center,
            zoom: zoom, // Use the zoom prop here
          });

          if (setSelectedTrail) {
            trails.forEach((trail) => {
              const marker = new google.maps.Marker({
                position: { lat: trail.latitude, lng: trail.longitude },
                map,
              });

              marker.addListener("click", () => {
                console.log(`Marker clicked: ${trail.name}`); // Log the name of the trail when a marker is clicked
                setSelectedTrail(trail);
              });
            });
          }
        } else {
          console.error('Could not find element with ref "mapRef"');
        }
      })
      .catch((e) => {
        // handle error
      });
  }, [
    trails,
    latitude,
    longitude,
    isMounted,
    apiKey,
    center,
    zoom,
    setSelectedTrail,
  ]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <div ref={mapRef} style={mapContainerStyle}>
            {/* Other components here */}
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              margin: "100px",
            }}
          >
            <WeatherWidget lat={latitude || 1} lng={longitude || 2} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
