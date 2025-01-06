import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import RoutingMachine from "../components/RoutingMachine";
import NominatimAutocompleteInput from "../components/AutoCompleteInput";

const MapPage: React.FC = () => {
  const [startLocation, setStartLocation] = useState<[number, number] | null>(null);
  const [endLocation, setEndLocation] = useState<[number, number] | null>(null);

  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          backgroundColor: "white",
          padding: "10px",
          borderRadius: "5px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          zIndex: 1000,
        }}
      >
        <h3>Create a Route</h3>
        <NominatimAutocompleteInput
          label="Start Location"
          placeholder="Search for start location"
          onPlaceSelected={(lat, lng) => setStartLocation([lat, lng])}
        />
        <NominatimAutocompleteInput
          label="End Location"
          placeholder="Search for end location"
          onPlaceSelected={(lat, lng) => setEndLocation([lat, lng])}
        />
      </div>
      <MapContainer
        center={[52.237, 21.017]}
        zoom={10}
        style={{ height: "100vh", width: "100vw" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {startLocation && endLocation && (
          <RoutingMachine start={startLocation} end={endLocation} />
        )}
      </MapContainer>
    </div>
  );
};

export default MapPage;
