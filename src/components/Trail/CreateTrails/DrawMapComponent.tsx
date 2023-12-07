import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

interface DrawMapComponentProps {
    incomingAddress: string;
    onPathSave: (pathArray: { id: number; coordinates: [number, number] }[]) => void;
  }

  const DrawMapComponent: React.FC<DrawMapComponentProps> = ({ incomingAddress, onPathSave }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [drawingManager, setDrawingManager] = useState<google.maps.drawing.DrawingManager | null>(null);
  const [drawnPath, setDrawnPath] = useState<{ id: number; coordinates: [number, number] }[]>([]);
  const [showSavePrompt, setShowSavePrompt] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.REACT_APP_Google_Maps_API_KEY || "",
      version: "weekly",
      libraries: ["places", "drawing"],
    });

    loader.load().then((google) => {
      if (mapContainerRef.current) {
        const mapInstance = new google.maps.Map(mapContainerRef.current, {
          center: { lat: 0, lng: 0 },
          zoom: 3,
          fullscreenControl: false, 
          mapTypeControl: false, 
          streetViewControl: false, 
          zoomControl: false, 
        });

        setMap(mapInstance);

        // Geocode the incoming address to get its coordinates
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: incomingAddress }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK && results && results.length > 0) {
            const location = results[0].geometry.location;
            mapInstance.setCenter(location);
            mapInstance.setZoom(14); // Set an appropriate zoom level
          } 
        });

        const manager = new google.maps.drawing.DrawingManager({
          drawingMode: google.maps.drawing.OverlayType.POLYLINE,
          drawingControl: true,
          drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [google.maps.drawing.OverlayType.POLYLINE],
          },
          polylineOptions: {
            strokeColor: "#0000FF",
            strokeOpacity: 1.0,
            strokeWeight: 2,
          },
        });

        setDrawingManager(manager);

        manager.setMap(mapInstance);

        // Event listener for the path being complete
        google.maps.event.addListener(manager, "overlaycomplete", (event: any) => {
          if (event.type === google.maps.drawing.OverlayType.POLYLINE) {
            const path = event.overlay.getPath();
            const newPathArray: { id: number; coordinates: [number, number] }[] = path
              .getArray()
              .map((latLng: any, index: any) => ({
                id: index + 1,
                coordinates: [latLng.lat(), latLng.lng()],
              }));
            setDrawnPath(newPathArray);
          }
        });

        // Try to get user's current location and update the map
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              mapInstance.setCenter(userLocation);
              mapInstance.setZoom(14); // Set an appropriate zoom level
            },
            (error) => {
              console.error("Error getting user's location:", error);
            }
          );

          // Listen for changes in the user's position and update the map
          navigator.geolocation.watchPosition(
            (position) => {
              const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              mapInstance.setCenter(userLocation);
            },
            (error) => {
              console.error("Error watching user's location:", error);
            }
          );
        }
      }
    });
  }, [incomingAddress]); // Update the map when incomingAddress changes

  const savePath = () => {
    console.log("Drawn Path:", drawnPath);
    onPathSave(drawnPath);
    setShowSavePrompt(true);

    setTimeout(() => {
        setShowSavePrompt(false);
      }, 3000)
  };

  return (
    <div>
        {showSavePrompt && (
        <div style={{ background: "white", borderRadius: "8px", border: "2px solid white"}}>
          Path saved!</div>
      )}
    <div style={{ borderRadius: "10px", border: "2px solid white", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      <div ref={mapContainerRef} style={{ height: "400px", width: "400px", borderRadius: "8px" }}></div>
      
    </div>
    <button onClick={savePath}style={{ borderRadius: "10px"}}>
        Save Path</button>
        
        
    </div>
  );
};

export default DrawMapComponent;
