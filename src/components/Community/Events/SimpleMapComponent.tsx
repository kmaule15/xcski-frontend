import React, { useEffect, useState, useRef, useMemo } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import "bootstrap/dist/css/bootstrap.css";
import { TrailInterface } from "../../../Interfaces/trail.types";

interface SimpleMapComponentProps {
  latitude: number;
  longitude: number;
  zoom: number;
  trail?: TrailInterface;
}

const SimpleMapComponent: React.FC<SimpleMapComponentProps> = ({
  latitude,
  longitude,
  zoom,
  trail,
}) => {
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
    height: "50vh",
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
      libraries: ["places", "drawing"],
    });

    loader
      .load()
      .then((google) => {
        if (mapRef.current) {
          const map = new google.maps.Map(mapRef.current, {
            center: center,
            zoom: zoom, // Use the zoom prop here
          });

          if (trail) {
            const marker = new google.maps.Marker({
              position: { lat: trail.latitude, lng: trail.longitude },
              map,
            });
          } else {
            const marker = new google.maps.Marker({
              position: { lat: latitude, lng: longitude },
              map,
            });
          }
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }, [trail, latitude, longitude, isMounted, apiKey, center, zoom]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <div ref={mapRef} style={mapContainerStyle}></div>
          <div
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              margin: "100px",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SimpleMapComponent;
