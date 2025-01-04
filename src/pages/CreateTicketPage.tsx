import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  MenuItem,
  Checkbox,
  Button,
  Box,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../styles/styles";

const CreateTicketPage: React.FC = () => {
  const [ticket, setTicket] = useState({
    title: "",
    description: "",
    assignedUserId: "",
    startLocationId: "",
    endLocationId: "",
    isCompleted: false,
    createdDate: new Date().toISOString().slice(0, 16),
    dueDate: new Date(new Date().setDate(new Date().getDate() + 7))
      .toISOString()
      .slice(0, 16),
  });
  const [users, setUsers] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, locationsResponse] = await Promise.all([
          axios.get("https://localhost:44336/api/Accounts"),
          axios.get("https://localhost:44336/api/Locations"),
        ]);
        setUsers(usersResponse.data);
        setLocations(locationsResponse.data);
      } catch (err) {
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreate = async () => {
    try {
      await axios.post("https://localhost:44336/api/Tickets", ticket);
      alert("Ticket created successfully!");
      navigate("/tickets");
    } catch (err) {
      alert("Failed to create ticket.");
      console.error("Error creating ticket:", err);
    }
  };

  if (loading) {
    return <Typography>Loading data...</Typography>;
  }

  if (error) {
    return <Typography style={styles.errorMessage}>{error}</Typography>;
  }

  return (
    <div style={styles.app}>
      <Box style={styles.glassCard}>
        <Typography variant="h4" align="center" style={styles.title}>
          Create New Ticket
        </Typography>
        <Box mb={3}>
          <Typography style={styles.title}>Title:</Typography>
          <TextField
            fullWidth
            value={ticket.title}
            onChange={(e) => setTicket({ ...ticket, title: e.target.value })}
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
            value={ticket.description}
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
            value={ticket.assignedUserId}
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
          <Typography style={styles.title}>Start Location:</Typography>
          <TextField
            fullWidth
            select
            value={ticket.startLocationId}
            onChange={(e) =>
              setTicket({ ...ticket, startLocationId: e.target.value })
            }
            variant="outlined"
            InputProps={{
              style: styles.inputField,
            }}
          >
            {locations.map((location) => (
              <MenuItem key={location.locationId} value={location.locationId}>
                {location.city}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box mb={3}>
          <Typography style={styles.title}>End Location:</Typography>
          <TextField
            fullWidth
            select
            value={ticket.endLocationId}
            onChange={(e) =>
              setTicket({ ...ticket, endLocationId: e.target.value })
            }
            variant="outlined"
            InputProps={{
              style: styles.inputField,
            }}
          >
            {locations.map((location) => (
              <MenuItem key={location.locationId} value={location.locationId}>
                {location.city}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box mb={3}>
          <Typography style={styles.title}>Creation Date:</Typography>
          <TextField
            fullWidth
            type="datetime-local"
            value={ticket.createdDate}
            onChange={(e) =>
              setTicket({ ...ticket, createdDate: e.target.value })
            }
            variant="outlined"
            InputProps={{
              style: styles.inputField,
            }}
          />
        </Box>
        <Box mb={3}>
          <Typography style={styles.title}>Due Date:</Typography>
          <TextField
            fullWidth
            type="datetime-local"
            value={ticket.dueDate}
            onChange={(e) =>
              setTicket({ ...ticket, dueDate: e.target.value })
            }
            variant="outlined"
            InputProps={{
              style: styles.inputField,
            }}
          />
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
            style={styles.button}
            onClick={handleCreate}
          >
            Create Ticket
          </Button>
          <Button
            variant="contained"
            style={styles.button}
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default CreateTicketPage;
