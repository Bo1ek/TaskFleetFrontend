import React, { useEffect, useState } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "../styles/styles";
import Loading from "../components/Loading";

const Management: React.FC = () => {
  const [locations, setLocations] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("Locations");

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

  const renderTable = (data: any[], headers: string[], rowLink: (item: any) => string) => (
    <TableContainer component={Paper} style={styles.tableContainer}>
      <Table>
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
              <TableRow
                key={item.id || item.vehicleId || item.locationId}
                hover
                style={{ cursor: "pointer" }}
                onClick={() => (window.location.href = rowLink(item))}
              >
                {headers.map((header) => (
                  <TableCell key={header} style={styles.tableCell}>
                    {header === "LocationId" && item.locationId}
                    {header === "City" && item.city}
                    {header === "Address" && item.address}
                    {header === "VehicleId" && item.vehicleId}
                    {header === "Name" && item.name}
                    {header === "Type" && ["Bus", "Truck", "Van", "Taxi"][item.type]}
                    {header === "Capacity" && item.capacity}
                    {header === "Seats" && item.seats}
                    {header === "IsAvailable" && (item.isAvailable ? "Yes" : "No")}
                    {header === "UserId" && item.email}
                    {header === "First Name" && item.firstName}
                    {header === "Last Name" && item.lastName}
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
    <Box style={styles.app}>
      <Box style={{ textAlign: "center", marginBottom: "20px" }}>
        <Typography variant="h4" style={{ fontWeight: "bold" }}>
          Management Dashboard
        </Typography>
        <Box display="flex" justifyContent="center" gap="16px">
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

      <Box style={{ width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
        {activeTab === "Locations" && (
          <>
            {renderTable(
              locations,
              ["LocationId", "City", "Address"],
              (item) => `/locations/${item.locationId}`
            )}
            <Box display="flex" justifyContent="center" marginTop="16px">
              <Button
                variant="contained"
                style={styles.button}
                onClick={() => (window.location.href = "/create-location")}
              >
                Add Location
              </Button>
            </Box>
          </>
        )}
        {activeTab === "Vehicles" && (
          <>
            {renderTable(
              vehicles,
              ["VehicleId", "Name", "Type", "Capacity", "Seats", "IsAvailable"],
              (item) => `/vehicles/${item.vehicleId}`
            )}
            <Box display="flex" justifyContent="center" marginTop="16px">
              <Button
                variant="contained"
                style={styles.button}
                onClick={() => (window.location.href = "/create-vehicle")}
              >
                Add Vehicle
              </Button>
            </Box>
          </>
        )}
        {activeTab === "Users" && (
          <>
            {renderTable(
              users,
              ["UserId", "First Name", "Last Name"],
              (item) => `/users/${item.id}`
            )}
            <Box display="flex" justifyContent="center" marginTop="16px">
              <Button
                variant="contained"
                style={styles.button}
                onClick={() => (window.location.href = "/create-user")}
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
