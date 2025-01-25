import React, { useEffect, useState } from 'react';
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
} from '@mui/material';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/styles';
import Loading from '../components/Loading';

const getStatusLabel = (status: number): string => {
  const statuses = [
    "Waiting For Approval",
    "Approved",
    "Rejected",
    "In Progress",
    "Completed",
  ];
  return statuses[status] || "Unknown Status";
};

const TicketPage: React.FC = () => {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchTickets = async () => {
        try {
          const response = await axios.get('https://localhost:44336/api/Tickets');
          console.log("Fetched tickets:", response.data); 
          setTickets(response.data);
        } catch (err: any) {
          setError('Failed to fetch tickets.');
        } finally {
          setLoading(false);
        }
      };

      fetchTickets();
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading text="Loading tickets..." />;
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
                "Vehicle Name", 
                "Start Location",
                "End Location",
                "Created Date",
                "Due Date",
                "Status",
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
                <TableCell style={styles.tableCell}>{ticket.description}</TableCell>
                <TableCell style={styles.tableCell}>
                  {ticket.assignedUserName}                    
                </TableCell>
                <TableCell style={styles.tableCell}>
             {ticket.assignedVehicleName}
                </TableCell>
                <TableCell style={styles.tableCell}>
                  {ticket.startLocationCity}
                </TableCell>
                <TableCell style={styles.tableCell}>
                  {ticket.endLocationCity}
                </TableCell>
                <TableCell style={styles.tableCell}>
                  {new Date(ticket.createdDate).toLocaleString()}
                </TableCell>
                <TableCell style={styles.tableCell}>
                  {new Date(ticket.dueDate).toLocaleString()}
                </TableCell>
                <TableCell style={styles.tableCell}>{getStatusLabel(ticket.status)}</TableCell>

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
        <Button style={{ ...styles.button, backgroundColor: "green" }} onClick={() => navigate("/create-ticket")}>
          Create Ticket
        </Button>
      </div>
    </div>
  );
};

export default TicketPage;
