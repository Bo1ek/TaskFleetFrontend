import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  TextField,
  MenuItem,
  Checkbox,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../styles/styles";

const GlassCard = styled(Box)({
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  borderRadius: "16px",
  padding: "32px",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  width: "100%",
  maxWidth: "400px",
});

const TicketDetailsPage: React.FC = () => {
  const { ticketId } = useParams<{ ticketId: string }>();
  const [ticket, setTicket] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(
          `https://localhost:44336/api/Tickets/${ticketId}`
        );
        setTicket(response.data);

        const usersResponse = await axios.get(
          "https://localhost:44336/api/Accounts"
        );
        setUsers(usersResponse.data);
      } catch (err) {
        console.error("Error fetching ticket details:", err);
        setError("Failed to load ticket details.");
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [ticketId]);

  const handleSave = async () => {
    try {
      await axios.put(`https://localhost:44336/api/Tickets/${ticketId}`, ticket);
      alert("Ticket updated successfully!");
    } catch (err) {
      alert("Failed to update ticket.");
    }
  };

  if (loading) {
    return (
      <div
        style={{ ...styles.app }}
        className="min-h-screen flex items-center justify-center"
      >
        <GlassCard>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            style={{ color: "#fff", fontWeight: "bold" }}
          >
            Loading Ticket Details...
          </Typography>
        </GlassCard>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{ ...styles.app }}
        className="min-h-screen flex items-center justify-center"
      >
        <GlassCard>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            style={{ color: "#fff", fontWeight: "bold" }}
          >
            {error}
          </Typography>
        </GlassCard>
      </div>
    );
  }

  return (
    <div
      style={{ ...styles.app }}
      className="min-h-screen flex items-center justify-center"
    >
      <GlassCard>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          style={{ color: "#fff", fontWeight: "bold" }}
        >
          Ticket Details
        </Typography>
        <Box mb={3}>
          <Typography style={{ color: "#fff", fontWeight: "bold" }}>
            Title:
          </Typography>
          <TextField
            fullWidth
            value={ticket.title || ""}
            onChange={(e) =>
              setTicket({ ...ticket, title: e.target.value })
            }
            variant="outlined"
            InputProps={{
              style: { color: "#fff", background: "rgba(255,255,255,0.1)" },
            }}
          />
        </Box>
        <Box mb={3}>
          <Typography style={{ color: "#fff", fontWeight: "bold" }}>
            Description:
          </Typography>
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
              style: { color: "#fff", background: "rgba(255,255,255,0.1)" },
            }}
          />
        </Box>
        <Box mb={3}>
          <Typography style={{ color: "#fff", fontWeight: "bold" }}>
            Assigned User:
          </Typography>
          <TextField
            fullWidth
            select
            value={ticket.assignedUserId || ""}
            onChange={(e) =>
              setTicket({ ...ticket, assignedUserId: e.target.value })
            }
            variant="outlined"
            InputProps={{
              style: { color: "#fff", background: "rgba(255,255,255,0.1)" },
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
          <Typography style={{ color: "#fff", fontWeight: "bold" }}>
            Completed:
          </Typography>
          <Checkbox
            checked={ticket.isCompleted}
            onChange={(e) =>
              setTicket({ ...ticket, isCompleted: e.target.checked })
            }
            style={{ color: "#fff" }}
          />
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Button
            variant="contained"
            fullWidth
            style={{
              backgroundColor: "#fff",
              color: "#000",
              fontWeight: "bold",
              borderRadius: "50px",
              marginRight: "8px",
            }}
            onClick={handleSave}
          >
            Save Changes
          </Button>
          <Button
            variant="contained"
            fullWidth
            style={{
              backgroundColor: "#fff",
              color: "#000",
              fontWeight: "bold",
              borderRadius: "50px",
            }}
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </Box>
      </GlassCard>
    </div>
  );
};

export default TicketDetailsPage;
