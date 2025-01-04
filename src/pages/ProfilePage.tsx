import React, { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import styles from "../styles/styles";
import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";

const GlassCard = styled(Box)({
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  borderRadius: "16px",
  padding: "32px",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  width: "100%",
  maxWidth: "400px",
});

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (user?.email) {
          const response = await axios.get(
            `https://localhost:44336/api/accounts/details?email=${user.email}`
          );
          setUserProfile(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch user profile", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  if (loading) {
    return (
      <div style={{ ...styles.app }} className="min-h-screen flex items-center justify-center">
        <GlassCard>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            style={{ color: "#fff", fontWeight: "bold" }}
          >
            Loading Profile...
          </Typography>
        </GlassCard>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div style={{ ...styles.app }} className="min-h-screen flex items-center justify-center">
        <GlassCard>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            style={{ color: "#fff", fontWeight: "bold" }}
          >
            No Profile Found
          </Typography>
        </GlassCard>
      </div>
    );
  }

  return (
    <div style={{ ...styles.app }} className="min-h-screen flex items-center justify-center">
      <GlassCard>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          style={{ color: "#fff", fontWeight: "bold" }}
        >
          User Profile
        </Typography>
        <Box mb={3}>
          <Typography style={{ color: "#fff", fontWeight: "bold" }}>First Name:</Typography>
          <Typography style={{ color: "#fff" }}>{userProfile.firstName || ""}</Typography>
        </Box>
        <Box mb={3}>
          <Typography style={{ color: "#fff", fontWeight: "bold" }}>Last Name:</Typography>
          <Typography style={{ color: "#fff" }}>{userProfile.lastName || ""}</Typography>
        </Box>
        <Box mb={3}>
          <Typography style={{ color: "#fff", fontWeight: "bold" }}>Email:</Typography>
          <Typography style={{ color: "#fff" }}>{userProfile.email || ""}</Typography>
        </Box>
        <Box mb={3}>
          <Typography style={{ color: "#fff", fontWeight: "bold" }}>Role:</Typography>
          <Typography style={{ color: "#fff" }}>{userProfile.role || ""}</Typography>
        </Box>
        <Button style = {styles.button} onClick={() => (window.location.href = "/")}>
          Go Back Home
        </Button>
      </GlassCard>
    </div>
  );
};

export default ProfilePage;
