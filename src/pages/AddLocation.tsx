import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet/dist/leaflet.css";
import styles from "../styles/styles";
import axios from "axios";

type AddLocationFormInputs = {
  city: string;
  latitude: number;
  longitude: number;
  address: string;
};

const AddLocation: React.FC = () => {
  const [form, setForm] = useState<AddLocationFormInputs>({
    city: "Warsaw",
    latitude: 52.252,
    longitude: 20.904,
    address: "WAT",
  });

  const parseCity = (displayName: string): string => {
    const parts = displayName.split(",").map((part) => part.trim());
    if (parts.length > 4) {
      return parts[4];
    }
    return "Unknown";
  };

  const handleMapClick = async (lat: number, lng: number) => {
    setForm({ ...form, latitude: lat, longitude: lng });

    try {
      const provider = new OpenStreetMapProvider();
      const results = await provider.search({ query: `${lat}, ${lng}` });

      if (results && results.length > 0) {
        const result = results[0];
        const city = parseCity(result.raw.display_name || "Unknown");

        setForm({
          ...form,
          latitude: lat,
          longitude: lng,
          address: result.label || "Unknown Address",
          city: city,
        });
      }
    } catch (err) {
      console.error("Error fetching address:", err);
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post("https://localhost:44336/api/Locations", form);
      alert("Location added successfully!");
    } catch (error) {
      console.error("Error adding location:", error);
    }
  };

  return (
    <div style={styles.app}>
      <h2 style={styles.title}>Add Location</h2>
      <table style={{ ...styles.tableContainer, marginBottom: "20px" }}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>City</th>
            <th style={styles.tableHeader}>Address</th>
            <th style={styles.tableHeader}>Latitude</th>
            <th style={styles.tableHeader}>Longitude</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={styles.tableCell}>
              <input
                type="text"
                value={form.city}
                readOnly
                style={{ ...styles.input, cursor: "not-allowed" }}
              />
            </td>
            <td style={styles.tableCell}>
              <input
                type="text"
                value={form.address}
                readOnly
                style={{ ...styles.input, cursor: "not-allowed" }}
              />
            </td>
            <td style={styles.tableCell}>
              <input
                type="text"
                value={form.latitude}
                readOnly
                style={{ ...styles.input, cursor: "not-allowed" }}
              />
            </td>
            <td style={styles.tableCell}>
              <input
                type="text"
                value={form.longitude}
                readOnly
                style={{ ...styles.input, cursor: "not-allowed" }}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <MapContainer
        center={[form.latitude, form.longitude]}
        zoom={13}
        style={{ height: "1200px", width: "100%", marginBottom: "20px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Marker position={[form.latitude, form.longitude]} />
        <MapEvents onClick={handleMapClick} />
      </MapContainer>
      <div style={{ textAlign: "center" }}>
        <button onClick={handleSubmit} style={styles.button}>
          Add Location
        </button>
      </div>
    </div>
  );
};

const MapEvents = ({
  onClick,
}: {
  onClick: (lat: number, lng: number) => void;
}) => {
  useMapEvents({
    click(e) {
      onClick(e.latlng.lat, e.latlng.lng);
    },
  });

  return null;
};

export default AddLocation;
