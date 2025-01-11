import React, { useEffect, useState } from "react";
import { Typography, TextField, Button, Box } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../styles/styles";

const UserDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://localhost:44336/api/Accounts/${id}`
        );
        setUser(response.data);
      } catch (err) {
        setError("Failed to fetch user details.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleSave = async () => {
    try {
      await axios.put(`https://localhost:44336/api/Accounts/${id}`, user);
      alert("User updated successfully!");
    } catch (err) {
      alert("Failed to update user.");
    }
  };

  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this user?"
      );
      if (confirmDelete) {
        await axios.delete(`https://localhost:44336/api/Accounts/${id}`);
        alert("User deleted successfully!");
        navigate("/management");
      }
    } catch (err) {
      alert("Failed to delete user.");
    }
  };

  if (loading) {
    return (
      <div style={styles.app}>
        <Box style={styles.glassCard}>
          <Typography variant="h4" align="center" style={styles.title}>
            Loading User Details...
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
          User Details
        </Typography>
        <Box mb={3}>
          <Typography style={styles.title}>First Name:</Typography>
          <TextField
            fullWidth
            value={user.firstName || ""}
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            variant="outlined"
            InputProps={{
              style: styles.inputField,
            }}
          />
        </Box>
        <Box mb={3}>
          <Typography style={styles.title}>Last Name:</Typography>
          <TextField
            fullWidth
            value={user.lastName || ""}
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            variant="outlined"
            InputProps={{
              style: styles.inputField,
            }}
          />
        </Box>
        <Box mb={3}>
          <Typography style={styles.title}>Email:</Typography>
          <TextField
            fullWidth
            value={user.email || ""}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
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
            Delete User
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

export default UserDetailsPage;
