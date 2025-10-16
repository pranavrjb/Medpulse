import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Snackbar,
  Alert,
  Box,
  Paper,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Message as MessageIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import API from "../api";
import { motion } from "framer-motion";

const Contact = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await API.post("/contacts/userContacts", formData);
      setMessage(
        "Your message has been sent successfully! We will get back to you soon."
      );
      setSeverity("success");
      setOpen(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Failed to send message! Please try again."
      );
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
            width: { xs: "90%", sm: "600px" },
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
              <SendIcon sx={{ fontSize: 25, color: "white" }} />
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
              Contact Us
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.mode === "dark" ? "#b3b3b3" : "#4a4a4a",
                mb: 3,
                textAlign: "center",
              }}
            >
              Have questions? We'd love to hear from you. Send us a message and
              we'll respond as soon as possible.
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                  required
                  placeholder="Enter your full name"
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
                  label="Your Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  required
                  placeholder="Enter your email address"
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
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  fullWidth
                  required
                  placeholder="Enter your phone number"
                  inputProps={{ maxLength: 10, pattern: "[0-9]{10}" }}
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
                        <PhoneIcon
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
                  label="Your Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={4}
                  required
                  placeholder="How can we help you?"
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
                      "& textarea": {
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
                        <MessageIcon
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
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Send Message"
                  )}
                </Button>
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

export default Contact;
