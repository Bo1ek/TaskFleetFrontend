import React, { useEffect, useState } from "react";
import { Typography, TextField, Button, Box } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../styles/styles";

const LocationDetailsPage: React.FC = () => {
  const { locationId } = useParams<{ locationId: string }>();
  const [location, setLocation] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get(
          `https://localhost:44336/api/Locations/${locationId}`
        );
        setLocation(response.data);
      } catch (err) {
        setError("Failed to fetch location details.");
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, [locationId]);

  const handleSave = async () => {
    try {
      await axios.put(
        `https://localhost:44336/api/Locations/${locationId}`,
        location
      );
      alert("Location updated successfully!");
    } catch (err) {
      alert("Failed to update location.");
    }
  };

  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this location?"
      );
      if (confirmDelete) {
        await axios.delete(`https://localhost:44336/api/Locations/${locationId}`);
        alert("Location deleted successfully!");
        navigate("/management");
      }
    } catch (err) {
      alert("Failed to delete location.");
    }
  };

  if (loading) {
    return (
      <div style={styles.app}>
        <Box style={styles.glassCard}>
          <Typography variant="h4" align="center" style={styles.title}>
            Loading Location Details...
          </Typography>
        </Box>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.app}>
        <Box style={styles.glassCard}>
          <Typography variant="h4" align="center" style={styles.title}>
            {error}
          </Typography>
        </Box>
      </div>
    );
  }

  return (
    <div style={styles.app}>
      <Box style={styles.glassCard}>
        <Typography variant="h4" align="center" style={styles.title}>
          Location Details
        </Typography>
        <Box mb={3}>
          <Typography style={styles.title}>City:</Typography>
          <TextField
            fullWidth
            value={location.city || "Unknown"}
            onChange={(e) =>
              setLocation({ ...location, city: e.target.value })
            }
            variant="outlined"
            InputProps={{
              style: styles.inputField,
            }}
          />
        </Box>
        <Box mb={3}>
          <Typography style={styles.title}>Address:</Typography>
          <TextField
            fullWidth
            multiline
            rows={4} 
            value={location.address || ""}
            onChange={(e) =>
              setLocation({ ...location, address: e.target.value })
            }
            variant="outlined"
            InputProps={{
              style: styles.inputField,
            }}
          />
        </Box>
        <Box mb={3}>
          <Typography style={styles.title}>Latitude:</Typography>
          <TextField
            fullWidth
            value={location.latitude || ""}
            onChange={(e) =>
              setLocation({ ...location, latitude: parseFloat(e.target.value) })
            }
            variant="outlined"
            InputProps={{
              style: styles.inputField,
            }}
          />
        </Box>
        <Box mb={3}>
          <Typography style={styles.title}>Longitude:</Typography>
          <TextField
            fullWidth
            value={location.longitude || ""}
            onChange={(e) =>
              setLocation({ ...location, longitude: parseFloat(e.target.value) })
            }
            variant="outlined"
            InputProps={{
              style: styles.inputField,
            }}
          />
        </Box>
        <Box display="flex" justifyContent="space-between" gap="10px">
          <Button
            variant="contained"
            style={{ ...styles.button, backgroundColor: "red", color: "white" }}
            onClick={handleDelete}
          >
            Delete Location
          </Button>
          <Button
            variant="contained"
            style={styles.button}
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
          <Button
            variant="contained"
            style={{
              ...styles.button,
              backgroundColor: "green",
              color: "white",
            }}
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default LocationDetailsPage;
