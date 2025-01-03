import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import axios from "axios";
import styles from "../styles/styles";

const TicketPage: React.FC = () => {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(
          "https://localhost:44336/api/tickets/getalltickets"
        );
        setTickets(response.data);
      } catch (err: any) {
        setError("Failed to fetch tickets.");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) {
    return <Typography>Loading tickets...</Typography>;
  }

  if (error) {
    return <Typography style={{ color: "red" }}>{error}</Typography>;
  }

  return (
    <div style={{ ...styles.app, padding: "10px", marginTop: "0px" }}>
      <Typography variant="h4" align="center" gutterBottom style={{ color: "#fff" }}>
        Tickets
      </Typography>
      <TableContainer component={Paper} style={{ backgroundColor: "#2c2c2c", marginTop: "10px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: "#fff" }}>Title</TableCell>
              <TableCell style={{ color: "#fff" }}>Description</TableCell>
              <TableCell style={{ color: "#fff" }}>Assigned User</TableCell>
              <TableCell style={{ color: "#fff" }}>Start Location</TableCell>
              <TableCell style={{ color: "#fff" }}>End Location</TableCell>
              <TableCell style={{ color: "#fff" }}>Created Date</TableCell>
              <TableCell style={{ color: "#fff" }}>Due Date</TableCell>
              <TableCell style={{ color: "#fff" }}>Completed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.ticketId}>
                <TableCell style={{ color: "#ddd" }}>{ticket.title}</TableCell>
                <TableCell style={{ color: "#ddd" }}>{ticket.description}</TableCell>
                <TableCell style={{ color: "#ddd" }}>{ticket.assignedUser ? `${ticket.assignedUser.firstName} ${ticket.assignedUser.lastName}` : "Unassigned"}</TableCell>
                <TableCell style={{ color: "#ddd" }}>{ticket.startLocation?.name || "N/A"}</TableCell>
                <TableCell style={{ color: "#ddd" }}>{ticket.endLocation?.name || "N/A"}</TableCell>
                <TableCell style={{ color: "#ddd" }}>{new Date(ticket.createdDate).toLocaleString()}</TableCell>
                <TableCell style={{ color: "#ddd" }}>{new Date(ticket.dueDate).toLocaleString()}</TableCell>
                <TableCell style={{ color: "#ddd" }}>{ticket.isCompleted ? "Yes" : "No"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        style={{
          backgroundColor: "#fff",
          color: "#000",
          fontWeight: "bold",
          marginTop: "20px",
        }}
        onClick={() => window.location.href = "/"}
      >
        Go Back Home
      </Button>
    </div>
  );
};

export default TicketPage;
