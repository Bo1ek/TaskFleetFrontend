import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  TextField,
  MenuItem,
  Checkbox,
  Box,
} from "@mui/material";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../styles/styles";

const TicketDetailsPage: React.FC = () => {
  const { ticketId } = useParams<{ ticketId: string }>();
  const [ticket, setTicket] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const statuses = [
    { value: 0, label: "Waiting For Approval" },
    { value: 1, label: "Approved" },
    { value: 2, label: "Rejected" },
    { value: 3, label: "In Progress" },
    { value: 4, label: "Completed" },
  ];

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const ticketResponse = await axios.get(
          `https://localhost:44336/api/Tickets/${ticketId}`
        );
        setTicket(ticketResponse.data);

        const usersResponse = await axios.get("https://localhost:44336/api/Accounts");
        setUsers(usersResponse.data);

        const vehiclesResponse = await axios.get("https://localhost:44336/api/Vehicles");
        setVehicles(
          vehiclesResponse.data.filter(
            (v: any) => v.isAvailable || v.vehicleId === ticketResponse.data.assignedVehicleId
          )
        );
      } catch (err) {
        console.error("Error fetching ticket details:", err);
        setError("Failed to load ticket details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [ticketId]);

  const handleAssignVehicle = async (vehicleId: number) => {
    if (ticket.assignedVehicleId === vehicleId) {
      alert("This vehicle is already assigned to the ticket.");
      return;
    }

    try {
      await axios.post(
        `https://localhost:44336/api/Tickets/${ticketId}/assignVehicle/${vehicleId}`
      );
      alert("Vehicle assigned successfully!");
      setTicket({ ...ticket, assignedVehicleId: vehicleId });
    } catch (err) {
      console.error("Failed to assign vehicle:", err);
      alert("Failed to assign vehicle.");
    }
  };

  const handleSave = async () => {
    try {
      if (ticket.assignedUserId) {
        await axios.post(
          `https://localhost:44336/api/Tickets/${ticketId}/assign/${ticket.assignedUserId}`
        );
      }

      await axios.put(`https://localhost:44336/api/Tickets/${ticketId}`, ticket);
      alert("Ticket updated successfully!");
    } catch (err) {
      alert("Failed to update ticket.");
      console.error("Error saving ticket:", err);
    }
  };

  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this ticket?"
      );
      if (confirmDelete) {
        await axios.delete(`https://localhost:44336/api/Tickets/${ticketId}`);
        alert("Ticket deleted successfully!");
        navigate("/tickets");
      }
    } catch (err) {
      alert("Failed to delete ticket.");
      console.error("Error deleting ticket:", err);
    }
  };

  if (loading) {
    return (
      <div style={styles.app}>
        <Box style={styles.glassCard}>
          <Typography variant="h4" align="center" style={styles.title}>
            Loading Ticket Details...
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
          Ticket Details
        </Typography>
        <Box mb={3}>
          <Typography style={styles.title}>Title:</Typography>
          <TextField
            fullWidth
            value={ticket.title || ""}
            onChange={(e) =>
              setTicket({ ...ticket, title: e.target.value })
            }
            variant="outlined"
            InputProps={{
              style: styles.inputField,
            }}
          />
        </Box>
        <Box mb={3}>
          <Typography style={styles.title}>Description:</Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            value={ticket.description || ""}
            onChange={(e) =>
              setTicket({ ...ticket, description: e.target.value })
            }
            variant="outlined"
            InputProps={{
              style: styles.inputField,
            }}
          />
        </Box>
        <Box mb={3}>
          <Typography style={styles.title}>Assigned User:</Typography>
          <TextField
            fullWidth
            select
            value={ticket.assignedUserId || ""}
            onChange={(e) =>
              setTicket({ ...ticket, assignedUserId: e.target.value })
            }
            variant="outlined"
            InputProps={{
              style: styles.inputField,
            }}
          >
            {users.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.firstName} {user.lastName}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box mb={3}>
          <Typography style={styles.title}>Assigned Vehicle:</Typography>
          <TextField
            fullWidth
            select
            value={ticket.assignedVehicleId || ""}
            onChange={(e) =>
              handleAssignVehicle(parseInt(e.target.value))
            }
            variant="outlined"
            InputProps={{
              style: styles.inputField,
            }}
          >
            {vehicles.map((vehicle) => (
              <MenuItem key={vehicle.vehicleId} value={vehicle.vehicleId}>
                {vehicle.name}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box mb={3}>
          <Typography style={styles.title}>Status:</Typography>
          <TextField
            fullWidth
            select
            value={ticket.status || 0}
            onChange={(e) =>
              setTicket({ ...ticket, status: parseInt(e.target.value) })
            }
            variant="outlined"
            InputProps={{
              style: styles.inputField,
            }}
          >
            {statuses.map((status) => (
              <MenuItem key={status.value} value={status.value}>
                {status.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box mb={3} display="flex" alignItems="center" justifyContent="center" gap="10px">
          <Typography style={styles.title}>Completed:</Typography>
          <Checkbox
            checked={ticket.isCompleted}
            onChange={(e) =>
              setTicket({ ...ticket, isCompleted: e.target.checked })
            }
            style={{ color: "#fff", transform: "scale(1.5)" }}
          />
        </Box>
        <Box display="flex" justifyContent="space-between" gap="10px">
          <Button
            variant="contained"
            style={{ ...styles.button, backgroundColor: "red", color: "white" }}
            onClick={handleDelete}
          >
            Delete Ticket
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
            style={{ ...styles.button, backgroundColor: "green", color: "white" }}
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default TicketDetailsPage;
