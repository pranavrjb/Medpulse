import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Chip,
  useTheme,
  CircularProgress,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  LocalHospital as HospitalIcon,
  AccessTime as TimeIcon,
  AttachMoney as MoneyIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import API from "../api";

const MedicalServices = () => {
  const theme = useTheme();
  const [services, setServices] = useState([]);
  const [serviceProviders, setServiceProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    duration: "",
    price: "",
    image: "",
  });


  useEffect(() => {
    const fetchServiceProviders = async () => {
      try {
        const response = await API.get(
          "/serviceProviders?category=Medical Services"
        );
        // Ensure we have an array of providers
        const providers = response.data?.providers || response.data || [];
        console.log("Medical Services providers:", providers); // For debugging
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
              <HospitalIcon sx={{ fontSize: 30, color: "white" }} />
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
              Medical Services
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
              Browse through our trusted medical service providers
            </Typography>
          </Box>

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
                        "https://source.unsplash.com/random/800x600?medical"
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

          {/* Services Grid */}
          <Grid container spacing={3}>
            {services.map((service) => (
              <Grid item xs={12} md={4} key={service.id}>
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
                    image={service.image}
                    alt={service.name}
                  />
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 2,
                      }}
                    >
                      <Chip
                        label={service.category}
                        size="small"
                        sx={{
                          backgroundColor: theme.palette.primary.main,
                          color: "white",
                        }}
                      />
                      <Box>
                        <IconButton
                          size="small"
                          sx={{
                            color:
                              theme.palette.mode === "dark"
                                ? "#b3b3b3"
                                : "#666666",
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(service.id)}
                          sx={{
                            color:
                              theme.palette.mode === "dark"
                                ? "#b3b3b3"
                                : "#666666",
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color:
                          theme.palette.mode === "dark" ? "white" : "#1a1a1a",
                        mb: 1,
                      }}
                    >
                      {service.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color:
                          theme.palette.mode === "dark" ? "#b3b3b3" : "#4a4a4a",
                        mb: 2,
                      }}
                    >
                      {service.description}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mt: "auto",
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <TimeIcon
                          sx={{
                            fontSize: 16,
                            color:
                              theme.palette.mode === "dark"
                                ? "#b3b3b3"
                                : "#666666",
                          }}
                        />
                        <Typography
                          variant="body2"
                          sx={{
                            color:
                              theme.palette.mode === "dark"
                                ? "#b3b3b3"
                                : "#666666",
                          }}
                        >
                          {service.duration}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }} >
                        <MoneyIcon sx={{fontSize: 16,color:theme.palette.mode === "dark"? "#b3b3b3" : "#666666"}}/>
                        <Typography
                          variant="body2"
                          sx={{
                            color:
                              theme.palette.mode === "dark"
                                ? "#b3b3b3"
                                : "#666666",
                          }}>
                          ${service.price}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default MedicalServices;
