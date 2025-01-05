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
import { Link } from 'react-router-dom';
import styles from '../styles/styles';
import Loading from '../components/Loading';
import { useAuth } from '../context/useAuth';

const MyTickets: React.FC = () => {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { getToken } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchTickets = async () => {
        try {
          const token = getToken();
          const response = await axios.get('https://localhost:44336/api/tickets/MyTickets', {
            headers: { Authorization: `Bearer ${token}` },
          });
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
  }, [getToken]);

  if (loading) {
    return <Loading text="Loading your tickets..." />;
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
            style={{ fontWeight: "bold", marginBottom: "20px", color: "#FFF" }}
        >
            My Tickets
        </Typography>
        <TableContainer component={Paper} style={styles.tableContainer}>
            <Table>
                <TableHead>
                    <TableRow>
                        {[
                            "Title",
                            "Description",
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
                                {ticket.description || "No description available"}
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
        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "20px" }}>
            <Button
                style={styles.button}
                onClick={() => (window.location.href = "/")}
            >
                Go Back Home
            </Button>
        </div>
    </div>
);
};

export default MyTickets;
