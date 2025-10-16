import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Alert,
  Snackbar,
  Paper,
  IconButton,
  InputAdornment,
} from "@mui/material";
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Person as PersonIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";
import { motion } from "framer-motion";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

const Register = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      setSeverity("error");
      setOpen(true);
      setLoading(false);
      return;
    }
    try {
      const { data } = await API.post("/auth/register", formData);
      setMessage("Registration Successful!");
      setSeverity("success");
      setOpen(true);
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      setMessage("Registration failed. Please try again.");
      setSeverity("error");
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = (_event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        pt: { xs: 4, md: 0 },
        pb: 4,
        bgcolor: theme.palette.mode === "dark" ? "#1a1a1a" : "#f5f5f5",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          elevation={2}
          sx={{
            p: { xs: 3, md: 6 },
            borderRadius: 2,
            width: { xs: "90%", sm: "450px" },
            background: theme.palette.mode === "dark" ? "#2d2d2d" : "#ffffff",
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 2px 8px rgba(0,0,0,0.3)"
                : "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Box
              sx={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
                bgcolor: theme.palette.primary.main,
              }}
            >
              <LocalHospitalIcon sx={{ fontSize: 25, color: "white" }} />
            </Box>
            <Typography
              variant="h4"
              align="center"
              sx={{
                fontWeight: 600,
                color: theme.palette.mode === "dark" ? "white" : "#1a1a1a",
                mb: 1,
              }}
            >
              Create Account
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.mode === "dark" ? "#b3b3b3" : "#4a4a4a",
                mb: 3,
              }}
              align="center"
            >
              Join MedPulse today
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Full Name"
                  name="name"
                  type="text"
                  fullWidth
                  required
                  value={formData.name}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      backgroundColor:
                        theme.palette.mode === "dark" ? "#3d3d3d" : "#f8f9fa",
                      "& fieldset": {
                        borderColor:
                          theme.palette.mode === "dark" ? "#4d4d4d" : "#e0e0e0",
                      },
                      "&:hover fieldset": {
                        borderColor: theme.palette.primary.main,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: theme.palette.primary.main,
                      },
                      "& input": {
                        color:
                          theme.palette.mode === "dark" ? "white" : "#1a1a1a",
                      },
                      "& label": {
                        color:
                          theme.palette.mode === "dark" ? "#b3b3b3" : "#666666",
                      },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon
                          sx={{
                            color:
                              theme.palette.mode === "dark"
                                ? "#b3b3b3"
                                : "#666666",
                          }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  fullWidth
                  required
                  value={formData.email}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      backgroundColor:
                        theme.palette.mode === "dark" ? "#3d3d3d" : "#f8f9fa",
                      "& fieldset": {
                        borderColor:
                          theme.palette.mode === "dark" ? "#4d4d4d" : "#e0e0e0",
                      },
                      "&:hover fieldset": {
                        borderColor: theme.palette.primary.main,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: theme.palette.primary.main,
                      },
                      "& input": {
                        color:
                          theme.palette.mode === "dark" ? "white" : "#1a1a1a",
                      },
                      "& label": {
                        color:
                          theme.palette.mode === "dark" ? "#b3b3b3" : "#666666",
                      },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon
                          sx={{
                            color:
                              theme.palette.mode === "dark"
                                ? "#b3b3b3"
                                : "#666666",
                          }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  required
                  value={formData.password}
                  onChange={handleChange}
                  variant="outlined"
                  inputProps={{ minLength: 2 }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      backgroundColor:
                        theme.palette.mode === "dark" ? "#3d3d3d" : "#f8f9fa",
                      "& fieldset": {
                        borderColor:
                          theme.palette.mode === "dark" ? "#4d4d4d" : "#e0e0e0",
                      },
                      "&:hover fieldset": {
                        borderColor: theme.palette.primary.main,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: theme.palette.primary.main,
                      },
                      "& input": {
                        color:
                          theme.palette.mode === "dark" ? "white" : "#1a1a1a",
                      },
                      "& label": {
                        color:
                          theme.palette.mode === "dark" ? "#b3b3b3" : "#666666",
                      },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon
                          sx={{
                            color:
                              theme.palette.mode === "dark"
                                ? "#b3b3b3"
                                : "#666666",
                          }}
                        />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => togglePasswordVisibility("password")}
                          edge="end"
                          sx={{
                            color:
                              theme.palette.mode === "dark"
                                ? "#b3b3b3"
                                : "#666666",
                          }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Confirm Password"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  fullWidth
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  variant="outlined"
                  inputProps={{ minLength: 2 }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      backgroundColor:
                        theme.palette.mode === "dark" ? "#3d3d3d" : "#f8f9fa",
                      "& fieldset": {
                        borderColor:
                          theme.palette.mode === "dark" ? "#4d4d4d" : "#e0e0e0",
                      },
                      "&:hover fieldset": {
                        borderColor: theme.palette.primary.main,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: theme.palette.primary.main,
                      },
                      "& input": {
                        color:
                          theme.palette.mode === "dark" ? "white" : "#1a1a1a",
                      },
                      "& label": {
                        color:
                          theme.palette.mode === "dark" ? "#b3b3b3" : "#666666",
                      },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon
                          sx={{
                            color:
                              theme.palette.mode === "dark"
                                ? "#b3b3b3"
                                : "#666666",
                          }}
                        />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => togglePasswordVisibility("confirm")}
                          edge="end"
                          sx={{
                            color:
                              theme.palette.mode === "dark"
                                ? "#b3b3b3"
                                : "#666666",
                          }}
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  disabled={loading}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: "none",
                    fontSize: "1.1rem",
                    boxShadow:
                      theme.palette.mode === "dark"
                        ? "0 4px 14px rgba(0,0,0,0.3)"
                        : "0 4px 14px rgba(0,0,0,0.1)",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow:
                        theme.palette.mode === "dark"
                          ? "0 6px 20px rgba(0,0,0,0.4)"
                          : "0 6px 20px rgba(0,0,0,0.15)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  align="center"
                  sx={{
                    color:
                      theme.palette.mode === "dark" ? "#b3b3b3" : "#4a4a4a",
                  }}
                >
                  Already have an account?{" "}
                  <Button
                    component={Link}
                    to="/login"
                    sx={{
                      color: theme.palette.primary.main,
                      textTransform: "none",
                      p: 0,
                      minWidth: "auto",
                      "&:hover": {
                        background: "transparent",
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Sign In
                  </Button>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </motion.div>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ borderRadius: 2 }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Register;
