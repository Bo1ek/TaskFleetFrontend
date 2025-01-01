import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../context/useAuth";
import { useForm } from "react-hook-form";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import styles from "../styles/styles"; // Import the styles

type RegisterFormsInputs = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  role: Yup.string().required("Role is required"),
});

const GlassCard = styled(Box)({
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  borderRadius: "16px",
  padding: "32px",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  width: "100%",
  maxWidth: "500px",
});

const RegisterPage = () => {
  const { registerUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormsInputs>({
    resolver: yupResolver(validationSchema),
  });

  const handleRegister = async (form: RegisterFormsInputs) => {
    try {
      await registerUser(
        form.email,
        form.password,
        form.firstName,
        form.lastName,
        form.role
      );
    } catch (error: any) {
      console.error("Registration failed", error);
      alert(error.response?.data || "An unexpected error occurred.");
    }
  };

  return (
    <div style={{ ...styles.app }} className="min-h-screen flex items-center justify-center">
      <GlassCard>
        <Typography variant="h4" align="center" gutterBottom style={{ color: "#fff", fontWeight: "bold" }}>
          Create an Account
        </Typography>
        <form onSubmit={handleSubmit(handleRegister)}>
          <Box mb={3}>
            <TextField
              fullWidth
              variant="outlined"
              label="First Name"
              placeholder="Enter your first name"
              InputProps={{
                style: { color: "#fff" },
              }}
              InputLabelProps={{
                style: { color: "#fff" },
              }}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              {...register("firstName")}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
                  "&:hover fieldset": {
                    borderColor: "#fff",
                  },
                },
              }}
            />
          </Box>
          <Box mb={3}>
            <TextField
              fullWidth
              variant="outlined"
              label="Last Name"
              placeholder="Enter your last name"
              InputProps={{
                style: { color: "#fff" },
              }}
              InputLabelProps={{
                style: { color: "#fff" },
              }}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              {...register("lastName")}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
                  "&:hover fieldset": {
                    borderColor: "#fff",
                  },
                },
              }}
            />
          </Box>
          <Box mb={3}>
            <TextField
              fullWidth
              variant="outlined"
              label="Email"
              placeholder="Enter your email"
              InputProps={{
                style: { color: "#fff" },
              }}
              InputLabelProps={{
                style: { color: "#fff" },
              }}
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register("email")}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
                  "&:hover fieldset": {
                    borderColor: "#fff",
                  },
                },
              }}
            />
          </Box>
          <Box mb={3}>
            <TextField
              fullWidth
              variant="outlined"
              label="Password"
              type="password"
              placeholder="Enter your password"
              InputProps={{
                style: { color: "#fff" },
              }}
              InputLabelProps={{
                style: { color: "#fff" },
              }}
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register("password")}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
                  "&:hover fieldset": {
                    borderColor: "#fff",
                  },
                },
              }}
            />
          </Box>
          <Box mb={3}>
            <TextField
              fullWidth
              select
              variant="outlined"
              label="Role"
              placeholder="Select your role"
              InputProps={{
                style: { color: "#fff" },
              }}
              InputLabelProps={{
                style: { color: "#fff" },
              }}
              error={!!errors.role}
              helperText={errors.role?.message}
              {...register("role")}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
                  "&:hover fieldset": {
                    borderColor: "#fff",
                  },
                },
              }}
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="User">User</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
            </TextField>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{
              backgroundColor: "#fff",
              color: "#000",
              fontWeight: "bold",
              padding: "10px 0",
              borderRadius: "50px",
            }}
          >
            Register
          </Button>
          <Typography
            variant="body2"
            align="center"
            mt={2}
            style={{ color: "#fff" }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#fff",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Login
            </Link>
          </Typography>
        </form>
      </GlassCard>
    </div>
  );
};

export default RegisterPage;
