import React, { useEffect, useState } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
} from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/styles";

const TicketPage: React.FC = () => {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get("https://localhost:44336/api/Tickets");
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
    return <Typography style={styles.errorMessage}>{error}</Typography>;
  }

  return (
    <div style={styles.app}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        style={{ fontWeight: "bold", marginBottom: "20px" }}
      >
        Tickets
      </Typography>
      <TableContainer component={Paper} style={styles.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              {[
                "Title",
                "Description",
                "Assigned User",
                "Start Location",
                "End Location",
                "Created Date",
                "Due Date",
                "Completed",
              ].map((header) => (
                <TableCell key={header} style={styles.tableHeader}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.ticketId}>
                <TableCell style={styles.tableCell}>
                  <Link to={`/tickets/${ticket.ticketId}`} style={styles.link}>
                    {ticket.title}
                  </Link>
                </TableCell>
                <TableCell style={styles.tableCell}>
                  {ticket.description}
                </TableCell>
                <TableCell style={styles.tableCell}>
                  {ticket.assignedUser
                    ? `${ticket.assignedUser.firstName} ${ticket.assignedUser.lastName}`
                    : "Unassigned"}
                </TableCell>
                <TableCell style={styles.tableCell}>
                  {ticket.startLocation?.city || "N/A"}
                </TableCell>
                <TableCell style={styles.tableCell}>
                  {ticket.endLocation?.city || "N/A"}
                </TableCell>
                <TableCell style={styles.tableCell}>
                  {new Date(ticket.createdDate).toLocaleString()}
                </TableCell>
                <TableCell style={styles.tableCell}>
                  {new Date(ticket.dueDate).toLocaleString()}
                </TableCell>
                <TableCell style={styles.tableCell}>
                  {ticket.isCompleted ? "Yes" : "No"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <Button
          style={styles.button}
          onClick={() => (window.location.href = "/")}
        >
          Go Back Home
        </Button>
        <Button style={styles.button} onClick={() => navigate("/create-ticket")}>
          Create Ticket
        </Button>
      </div>
    </div>
  );
};

export default TicketPage;
