import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Typography,
  Grid,
  Box,
  Snackbar,
  Alert,
  Paper,
  InputAdornment,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Avatar,
  Container,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Description as DescriptionIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  MedicalServices as MedicalIcon,
  ContentCut as ContentCutIcon,
  Psychology as PsychologyIcon,
  FitnessCenter as FitnessCenterIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import API from "../../api";
import { useNavigate } from "react-router-dom";

const steps = ["Select Service", "Choose Provider", "Book Appointment"];

const serviceTypes = [
  { value: "medicalservices", label: "Medical Service", icon: <MedicalIcon /> },
  { value: "FITNESS", label: "Fitness & Wellness Service", icon: <FitnessCenterIcon /> },
  {
    value: "BEAUTY",
    label: "Beauty Service",
    icon: <ContentCutIcon />,
  },
  { value: "CONSULTANT", label: "Consulting Service", icon: <PsychologyIcon /> },
];

const BookingForm = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [providers, setProviders] = useState([]);
  const [selectedServiceType, setSelectedServiceType] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    description: "",
  });
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedServiceType) {
      fetchProviders();
    }
  }, [selectedServiceType]);

  const fetchProviders = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/serviceProviders/${selectedServiceType}`);
      setProviders(res.data);
    } catch (error) {
      console.error("Error fetching providers:", error);
      showNotification("Failed to load service providers", "error");
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (msg, sev) => {
    setMessage(msg);
    setSeverity(sev);
    setOpen(true);
  };

  const handleNext = () => {
    if (activeStep === 0 && !selectedServiceType) {
      showNotification("Please select a service type", "error");
      return;
    }
    if (activeStep === 1 && !selectedProvider) {
      showNotification("Please select a service provider", "error");
      return;
    }
    if (activeStep === 2) {
      handleSubmit();
      return;
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    if (
      !selectedDate ||
      !selectedSlot ||
      !formData.name ||
      !formData.email ||
      !formData.phone
    ) {
      showNotification("Please fill all required fields", "error");
      return;
    }

    try {
      setLoading(true);
      await API.post("/bookings/book", {
        providerId: selectedProvider,
        serviceType: selectedServiceType,
        date: selectedDate.format("YYYY-MM-DD"),
        slot: selectedSlot,
        ...formData,
      });

      showNotification(
        "Booking successful! We'll send you a confirmation email shortly.",
        "success"
      );
      setTimeout(() => {
        navigate("/bookings");
      }, 2000);
    } catch (error) {
      showNotification(
        error.response?.data?.message || "Booking failed",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Select Service Type
              </Typography>
              <Grid container spacing={2}>
                {serviceTypes.map((service) => (
                  <Grid item xs={12} sm={4} key={service.value}>
                    <Card
                      variant="outlined"
                      sx={{
                        cursor: "pointer",
                        bgcolor:
                          selectedServiceType === service.value
                            ? "primary.light"
                            : "background.paper",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: 4,
                        },
                      }}
                      onClick={() => setSelectedServiceType(service.value)}
                    >
                      <CardContent sx={{ textAlign: "center" }}>
                        <Box sx={{ mb: 2 }}>{service.icon}</Box>
                        <Typography>{service.label}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Select Service Provider
              </Typography>
              {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
                  <CircularProgress />
                </Box>
              ) : (
                <Grid container spacing={2}>
                  {providers.map((provider) => (
                    <Grid item xs={12} sm={6} key={provider._id}>
                      <Card
                        variant="outlined"
                        sx={{
                          cursor: "pointer",
                          bgcolor:
                            selectedProvider === provider._id
                              ? "primary.light"
                              : "background.paper",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-4px)",
                            boxShadow: 4,
                          },
                        }}
                        onClick={() => setSelectedProvider(provider._id)}
                      >
                        <CardContent>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 2,
                            }}
                          >
                            <Avatar sx={{ mr: 2 }}>{provider.name[0]}</Avatar>
                            <Typography variant="h6">
                              {provider.name}
                            </Typography>
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            {provider.specialization}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Select Date"
                  value={selectedDate}
                  onChange={setSelectedDate}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                  disablePast
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Select Time Slot"
                fullWidth
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(e.target.value)}
                required
              >
                {[
                  "09:00 AM",
                  "10:00 AM",
                  "11:00 AM",
                  "02:00 PM",
                  "03:00 PM",
                  "04:00 PM",
                ].map((slot) => (
                  <MenuItem key={slot} value={slot}>
                    {slot}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Your Name"
                fullWidth
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                fullWidth
                required
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone"
                fullWidth
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Location"
                fullWidth
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Additional Notes"
                fullWidth
                multiline
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DescriptionIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 4,
        bgcolor: theme.palette.background.default,
      }}
    >
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
            Book an Appointment
          </Typography>

          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {renderStepContent(activeStep)}

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="outlined"
            >
              Back
            </Button>
            <Button variant="contained" onClick={handleNext} disabled={loading}>
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : activeStep === steps.length - 1 ? (
                "Confirm Booking"
              ) : (
                "Next"
              )}
            </Button>
          </Box>
        </Paper>
      </Container>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BookingForm;
