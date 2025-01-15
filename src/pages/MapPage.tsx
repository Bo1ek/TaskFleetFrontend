import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import RoutingMachine from "../components/RoutingMachine";
import Loading from "../components/Loading";
import tokml from "tokml";

type Location = {
  locationId: number;
  city: string;
  latitude: number;
  longitude: number;
  address: string;
};

const MapPage: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [startLocation, setStartLocation] = useState<[number, number] | null>(null);
  const [endLocation, setEndLocation] = useState<[number, number] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [kmlData, setKmlData] = useState<string | null>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<[number, number][]>([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("https://localhost:44336/api/Locations");
        if (!response.ok) {
          throw new Error("Failed to fetch locations");
        }
        const data: Location[] = await response.json();
        setLocations(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    setTimeout(fetchLocations, 2500);
  }, []);

  useEffect(() => {
    if (routeCoordinates.length > 0) {
      const kml = tokml({
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: routeCoordinates.map(([lat, lng]) => [lng, lat]),
            },
            properties: { name: "Route" },
          },
        ],
      });
      setKmlData(kml);
    }
  }, [routeCoordinates]);

  const handleStartLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(e.target.value, 10);
    const selectedLocation = locations.find((loc) => loc.locationId === selectedId);
    if (selectedLocation) {
      setStartLocation([selectedLocation.latitude, selectedLocation.longitude]);
    }
  };

  const handleEndLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(e.target.value, 10);
    const selectedLocation = locations.find((loc) => loc.locationId === selectedId);
    if (selectedLocation) {
      setEndLocation([selectedLocation.latitude, selectedLocation.longitude]);
    }
  };

  if (loading) {
    return <Loading text="Loading Map Page..." />;
  }

  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: "90%",
          left: "15px",
          transform: "translateY(-50%)",
          backgroundColor: "white",
          padding: "10px",
          borderRadius: "5px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          zIndex: 1000,
        }}
      >
        <h3>Create a Route</h3>
        <div>
          <label>
            Start Location:
            <select onChange={handleStartLocationChange}>
              <option value="">Select Start Location</option>
              {locations.map((loc) => (
                <option key={loc.locationId} value={loc.locationId}>
                  {loc.city} - {loc.address}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            End Location:
            <select onChange={handleEndLocationChange}>
              <option value="">Select End Location</option>
              {locations.map((loc) => (
                <option key={loc.locationId} value={loc.locationId}>
                  {loc.city} - {loc.address}
                </option>
              ))}
            </select>
          </label>
        </div>
        {kmlData && (
          <a
            href={`data:text/xml;charset=utf-8,${encodeURIComponent(kmlData)}`}
            download="route.kml"
            style={{
              display: "inline-block",
              marginTop: "10px",
              padding: "10px",
              backgroundColor: "#007BFF",
              color: "#FFF",
              borderRadius: "5px",
              textDecoration: "none",
            }}
          >
            Download KML
          </a>
        )}
      </div>
      <MapContainer center={[52.237, 21.017]} zoom={10} style={{ height: "100vh", width: "100vw" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
        {startLocation && endLocation && (
          <RoutingMachine
            start={startLocation}
            end={endLocation}
            onRouteGenerated={(coords) => setRouteCoordinates(coords)}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default MapPage;
