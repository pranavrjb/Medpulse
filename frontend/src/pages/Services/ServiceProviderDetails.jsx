import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Card,
  Chip,
  Button,
  Grid,
  Avatar,
} from "@mui/material";
import {
  LocationOn,
  ArrowBack,
  CalendarToday,
  WorkOutline,
} from "@mui/icons-material";
import API from "../../api";

const ServiceProviderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [serviceProvider, setServiceProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceProvider = async () => {
      try {
        setLoading(true);
        const response = await API.get(`/serviceProviders/${id}`);
        if (response.data) {
          setServiceProvider(response.data);
        } else {
          setError("Service provider not found");
        }
      } catch (error) {
        console.error("Error fetching service provider details:", error);
        setError(
          error.response?.data?.message ||
            "Error loading service provider details"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchServiceProvider();
    }
  }, [id]);

  const getCategoryColor = (serviceType) => {
    switch (serviceType) {
      case "Medical Services":
        return "#ff4d4d";
      case "Fitness & Wellness":
        return "#4CAF50";
      case "Beauty Services":
        return "#9c27b0";
      case "Consulting Services":
        return "#2196f3";
      default:
        return "#757575";
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !serviceProvider) {
    return (
      <Container>
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" color="error" gutterBottom>
            {error || "Service provider not found"}
          </Typography>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
            variant="contained"
            sx={{ mt: 2 }}
          >
            Go Back
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          variant="outlined"
          sx={{ mb: 4 }}
        >
          Back to Services
        </Button>

        <Card sx={{ p: 4, borderRadius: 2 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
              <Avatar
                src={
                  serviceProvider.avatar
                    ? `/images/${serviceProvider.avatar}`
                    : "/default-avatar.png"
                }
                alt={serviceProvider.name}
                sx={{
                  width: 200,
                  height: 200,
                  mx: "auto",
                  mb: 2,
                  border: "4px solid white",
                  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Chip
                label={serviceProvider.serviceType}
                sx={{
                  bgcolor: getCategoryColor(serviceProvider.serviceType),
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  py: 1,
                }}
              />
            </Grid>

            <Grid item xs={12} md={8}>
              <Typography variant="h4" gutterBottom fontWeight="bold">
                {serviceProvider.name}
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" color="primary" gutterBottom>
                  Specialty
                </Typography>
                <Typography variant="body1">
                  {serviceProvider.specialty || serviceProvider.serviceType}
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" color="primary" gutterBottom>
                  Location
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LocationOn color="action" />
                  <Typography>{serviceProvider.location}</Typography>
                </Box>
              </Box>

              {serviceProvider.experience && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" color="primary" gutterBottom>
                    Experience
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <WorkOutline color="action" />
                    <Typography>{serviceProvider.experience} years</Typography>
                  </Box>
                </Box>
              )}

              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" color="primary" gutterBottom>
                  Available Slots
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CalendarToday color="action" />
                  <Typography>
                    {serviceProvider.availableSlots
                      ? `${serviceProvider.availableSlots} slots available`
                      : "No slots available"}
                  </Typography>
                </Box>
              </Box>

              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                onClick={() => navigate(`/booking/${id}`)}
                sx={{ mt: 2 }}
              >
                Book Appointment
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </Container>
  );
};

export default ServiceProviderDetails;
