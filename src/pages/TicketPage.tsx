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
import { Link } from "react-router-dom";
import styles from "../styles/styles";

const TicketPage: React.FC = () => {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(
          "https://localhost:44336/api/Tickets"
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
    <div style={{ ...styles.app }} className="min-h-screen flex flex-col items-center">
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        style={{ color: "#fff", fontWeight: "bold", marginBottom: "20px" }}
      >
        Tickets
      </Typography>
      <TableContainer
        component={Paper}
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          width: "95%",
          maxWidth: "1400px", 
        }}
      >
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
                <TableCell
                  key={header}
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.ticketId}>
                <TableCell style={{ color: "#fff" }}>
                  <Link
                    to={`/tickets/${ticket.ticketId}`}
                    style={{
                      color: "#00bfff",
                      textDecoration: "none",
                      fontWeight: "bold",
                    }}
                  >
                    {ticket.title}
                  </Link>
                </TableCell>
                <TableCell style={{ color: "#fff" }}>
                  {ticket.description}
                </TableCell>
                <TableCell style={{ color: "#fff" }}>
                  {ticket.assignedUser
                    ? `${ticket.assignedUser.firstName} ${ticket.assignedUser.lastName}`
                    : "Unassigned"}
                </TableCell>
                <TableCell style={{ color: "#fff" }}>
                  {ticket.startLocation?.city || "N/A"}
                </TableCell>
                <TableCell style={{ color: "#fff" }}>
                  {ticket.endLocation?.city || "N/A"}
                </TableCell>
                <TableCell style={{ color: "#fff" }}>
                  {new Date(ticket.createdDate).toLocaleString()}
                </TableCell>
                <TableCell style={{ color: "#fff" }}>
                  {new Date(ticket.dueDate).toLocaleString()}
                </TableCell>
                <TableCell style={{ color: "#fff" }}>
                  {ticket.isCompleted ? "Yes" : "No"}
                </TableCell>
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
          borderRadius: "50px",
          padding: "10px 20px",
        }}
        onClick={() => (window.location.href = "/")}
      >
        Go Back Home
      </Button>
    </div>
  );
};

export default TicketPage;
