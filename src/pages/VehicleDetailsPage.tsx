import React, { useEffect, useState } from "react";
import { Typography, TextField, Button, Box, MenuItem } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../styles/styles";

const VehicleDetailsPage: React.FC = () => {
  const { vehicleId } = useParams<{ vehicleId: string }>();
  const [vehicle, setVehicle] = useState<any>(null);
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await axios.get(
          `https://localhost:44336/api/Vehicles/${vehicleId}`
        );
        setVehicle(response.data);

        const ticketsResponse = await axios.get("https://localhost:44336/api/Tickets");
        setTickets(ticketsResponse.data);
      } catch (err) {
        setError("Failed to fetch vehicle details.");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [vehicleId]);

  const handleSave = async () => {
    try {
      await axios.put(
        `https://localhost:44336/api/Vehicles/${vehicleId}`,
        vehicle
      );
      alert("Vehicle updated successfully!");
    } catch (err) {
      alert("Failed to update vehicle.");
    }
  };

  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this vehicle?"
      );
      if (confirmDelete) {
        await axios.delete(`https://localhost:44336/api/Vehicles/${vehicleId}`);
        alert("Vehicle deleted successfully!");
        navigate("/management");
      }
    } catch (err) {
      alert("Failed to delete vehicle.");
    }
  };

  const handleAssignTicket = (ticketId: string) => {
    setVehicle({
      ...vehicle,
      assignedTicketId: ticketId || null, 
      isAvailable: !ticketId, 
    });
  };

  if (loading) {
    return (
      <div style={styles.app}>
        <Box style={styles.glassCard}>
          <Typography variant="h4" align="center" style={styles.title}>
            Loading Vehicle Details...
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
          Vehicle Details
        </Typography>
        <Box mb={3}>
          <Typography style={styles.title}>Name:</Typography>
          <TextField
            fullWidth
            value={vehicle.name || ""}
            onChange={(e) => setVehicle({ ...vehicle, name: e.target.value })}
            variant="outlined"
            InputProps={{
              style: styles.inputField,
            }}
          />
        </Box>
        <Box mb={3}>
          <Typography style={styles.title}>Assigned Ticket:</Typography>
          <TextField
            select
            fullWidth
            value={vehicle.assignedTicketId || ""}
            onChange={(e) => handleAssignTicket(e.target.value)}
            variant="outlined"
            InputProps={{
              style: styles.inputField,
            }}
          >
            <MenuItem value="">None</MenuItem>
            {tickets.map((ticket) => (
              <MenuItem key={ticket.ticketId} value={ticket.ticketId}>
                {ticket.title}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box display="flex" justifyContent="space-between" gap="10px">
          <Button
            variant="contained"
            style={{ ...styles.button, backgroundColor: "red", color: "white" }}
            onClick={handleDelete}
          >
            Delete Vehicle
          </Button>
          <Button variant="contained" style={styles.button} onClick={() => navigate(-1)}>
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

export default VehicleDetailsPage;
