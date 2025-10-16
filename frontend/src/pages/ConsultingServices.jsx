import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  useTheme,
} from "@mui/material";
import {
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import API from "../api";

const ConsultingServices = () => {
  const theme = useTheme();
  const [serviceProviders, setServiceProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceProviders = async () => {
      try {
        const response = await API.get(
          "/serviceProviders?category=Consulting Services"
        );
        // Ensure we have an array of providers
        const providers = response.data?.providers || response.data || [];
        console.log("Consulting Services providers:", providers); // For debugging
        setServiceProviders(Array.isArray(providers) ? providers : []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching service providers:", err);
        setError("Failed to load service providers");
        setLoading(false);
        setServiceProviders([]); // Ensure we set an empty array on error
      }
    };

    fetchServiceProviders();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: { xs: 4, md: 6 },
        bgcolor: theme.palette.mode === "dark" ? "#1a1a1a" : "#f5f5f5",
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header Section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 6,
            }}
          >
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
                bgcolor: theme.palette.primary.main,
              }}
            >
              <BusinessIcon sx={{ fontSize: 30, color: "white" }} />
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
              Consulting Services
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.mode === "dark" ? "#b3b3b3" : "#4a4a4a",
                textAlign: "center",
                maxWidth: "600px",
                mb: 4,
              }}
            >
              Browse through our trusted consulting service providers
            </Typography>
          </Box>

          {/* Service Providers Grid */}
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography color="error" align="center">
              {error}
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {serviceProviders.map((provider) => (
                <Grid item xs={12} md={4} key={provider._id}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: 2,
                      background:
                        theme.palette.mode === "dark" ? "#2d2d2d" : "#ffffff",
                      boxShadow:
                        theme.palette.mode === "dark"
                          ? "0 2px 8px rgba(0,0,0,0.3)"
                          : "0 2px 8px rgba(0,0,0,0.1)",
                      transition: "transform 0.2s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={
                        provider.logo ||
                        "https://source.unsplash.com/random/800x600?consulting"
                      }
                      alt={provider.businessName}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{ fontWeight: 600 }}
                      >
                        {provider.businessName}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        {provider.description}
                      </Typography>
                      <Box sx={{ mt: 2 }}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 1 }}
                        >
                          <LocationIcon sx={{ mr: 1, fontSize: 20 }} />
                          <Typography variant="body2">
                            {provider.address}
                          </Typography>
                        </Box>
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 1 }}
                        >
                          <PhoneIcon sx={{ mr: 1, fontSize: 20 }} />
                          <Typography variant="body2">
                            {provider.phone}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <EmailIcon sx={{ mr: 1, fontSize: 20 }} />
                          <Typography variant="body2">
                            {provider.email}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </motion.div>
      </Container>
    </Box>
  );
};

export default ConsultingServices;
