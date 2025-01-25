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
} from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import styles from "../styles/styles";

type LoginFormsInputs = {
  email: string;
  password: string;
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const GlassCard = styled(Box)({
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  borderRadius: "16px",
  padding: "32px",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  width: "100%",
  maxWidth: "400px",
});

const LoginPage = () => {
  const { loginUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormsInputs>({
    resolver: yupResolver(validationSchema),
  });

  const handleLogin = (form: LoginFormsInputs) => {
    loginUser(form.email, form.password);
  };

  return (
    <div style={{ ...styles.app }} className="min-h-screen flex items-center justify-center">
      <GlassCard>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          style={{ color: "#fff", fontWeight: "bold" }}
        >
          Login
        </Typography>
        <form onSubmit={handleSubmit(handleLogin)}>
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
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Link
              to="#"
              style={{
                fontSize: "0.875rem",
                color: "#fff",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
            </Link>
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
            Login
          </Button>
          <Typography
            variant="body2"
            align="center"
            mt={2}
            style={{ color: "#fff" }}
          >
            Don’t have an account?{" "}
            <Link
              to="/register"
              style={{
                color: "#fff",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Register
            </Link>
          </Typography>
        </form>
      </GlassCard>
    </div>
  );
};

export default LoginPage;
