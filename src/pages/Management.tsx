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
  Box,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../styles/styles";
import Loading from "../components/Loading";

const Management: React.FC = () => {
  const [locations, setLocations] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("Locations");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [locationsRes, vehiclesRes, usersRes] = await Promise.all([
          axios.get("https://localhost:44336/api/Locations"),
          axios.get("https://localhost:44336/api/Vehicles"),
          axios.get("https://localhost:44336/api/Accounts"),
        ]);
        setLocations(locationsRes.data);
        setVehicles(vehiclesRes.data);
        setUsers(usersRes.data);
      } catch (err) {
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading text="Loading data..." />;
  }

  if (error) {
    return <Typography style={styles.errorMessage}>{error}</Typography>;
  }

  const renderTable = (data: any[], headers: string[]) => (
    <TableContainer
      component={Paper}
      style={{
        ...styles.tableContainer,
        maxHeight: "400px", // Fixed height for the table container
        overflowY: "auto", // Enable vertical scrolling
      }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell key={header} style={styles.tableHeader}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? (
            data.map((item: any) => (
              <TableRow key={item.vehicleId || item.id || item.locationId}>
                {headers.map((header) => (
                  <TableCell key={header} style={styles.tableCell}>
                    {header === "VehicleId" && item.vehicleId}
                    {header === "Name" && item.name}
                    {header === "Type" &&
                      ["Bus", "Truck", "Van", "Taxi"][item.type]}
                    {header === "Capacity" && item.capacity}
                    {header === "Seats" && item.seats}
                    {header === "IsAvailable" &&
                      (item.isAvailable ? "Yes" : "No")}
                    {header === "First Name" && item.firstName}
                    {header === "Last Name" && item.lastName}
                    {header !== "VehicleId" &&
                      header !== "Name" &&
                      header !== "Type" &&
                      header !== "Capacity" &&
                      header !== "Seats" &&
                      header !== "IsAvailable" &&
                      header !== "First Name" &&
                      header !== "Last Name" &&
                      (item[header.toLowerCase()] ?? "N/A")}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={headers.length} align="center">
                No data available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box
      style={{
        ...styles.app,
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // Align content horizontally
        minHeight: "100vh", // Allow page to grow beyond viewport height
        overflow: "auto", // Enable scrolling when necessary
      }}
    >
      {/* Centralized Header */}
      <Box
        style={{
          textAlign: "center",
          padding: "20px", // Padding applied to the header section
          boxSizing: "border-box",
        }}
      >
        <Typography
          variant="h4"
          style={{
            fontWeight: "bold",
            marginBottom: "16px", // Spacing between title and tabs
          }}
        >
          Management Dashboard
        </Typography>
        <Box display="flex" justifyContent="center" gap="16px" mb={3}>
          <Button
            variant="contained"
            onClick={() => setActiveTab("Locations")}
            style={{
              backgroundColor: activeTab === "Locations" ? "#1976d2" : "#fff",
              color: activeTab === "Locations" ? "#fff" : "#000",
            }}
          >
            Locations
          </Button>
          <Button
            variant="contained"
            onClick={() => setActiveTab("Vehicles")}
            style={{
              backgroundColor: activeTab === "Vehicles" ? "#1976d2" : "#fff",
              color: activeTab === "Vehicles" ? "#fff" : "#000",
            }}
          >
            Vehicles
          </Button>
          <Button
            variant="contained"
            onClick={() => setActiveTab("Users")}
            style={{
              backgroundColor: activeTab === "Users" ? "#1976d2" : "#fff",
              color: activeTab === "Users" ? "#fff" : "#000",
            }}
          >
            Users
          </Button>
        </Box>
      </Box>

      {/* Render Content */}
      <Box
        style={{
          width: "100%",
          maxWidth: "800px",
          paddingBottom: "20px", // Avoid spacing that causes scrollbars
        }}
      >
        {activeTab === "Locations" && (
          <>
            <Typography variant="h5" align="center" gutterBottom>
              Manage Locations
            </Typography>
            {renderTable(locations, ["LocationId", "City", "Latitude", "Longitude"])}
            <Box display="flex" justifyContent="center" marginTop="16px">
              <Button
                variant="contained"
                style={styles.button}
                onClick={() => navigate("/create-location")}
              >
                Add Location
              </Button>
            </Box>
          </>
        )}
        {activeTab === "Vehicles" && (
          <>
            <Typography variant="h5" align="center" gutterBottom>
              Manage Vehicles
            </Typography>
            {renderTable(
              vehicles,
              ["VehicleId", "Name", "Type", "Capacity", "Seats", "IsAvailable"]
            )}
            <Box display="flex" justifyContent="center" marginTop="16px">
              <Button
                variant="contained"
                style={styles.button}
                onClick={() => navigate("/create-vehicle")}
              >
                Add Vehicle
              </Button>
            </Box>
          </>
        )}
        {activeTab === "Users" && (
          <>
            <Typography variant="h5" align="center" gutterBottom>
              Manage Users
            </Typography>
            {renderTable(users, ["Email", "First Name", "Last Name"])}
            <Box display="flex" justifyContent="center" marginTop="16px">
              <Button
                variant="contained"
                style={styles.button}
                onClick={() => navigate("/create-user")}
              >
                Add User
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Management;
