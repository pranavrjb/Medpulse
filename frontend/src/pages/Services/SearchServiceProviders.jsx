import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  InputAdornment,
  Chip,
  CircularProgress,
  Container,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useLocation } from "react-router-dom";
import API from "../../api";

const SERVICE_CATEGORIES = {
  MEDICAL: {
    title: "Medical Services",
    description:
      "Find and connect with qualified healthcare professionals. Our platform offers access to experienced doctors, specialists, and medical practitioners who provide comprehensive healthcare services tailored to your needs.",
    color: "#ff4d4d",
  },
  FITNESS: {
    title: "Fitness & Wellness",
    description:
      "Transform your health with our expert fitness and wellness providers. From personal trainers to nutrition specialists, discover professionals who can help you achieve your wellness goals.",
    color: "#4CAF50",
  },
  BEAUTY: {
    title: "Beauty Services",
    description:
      "Experience premium beauty services from skilled professionals. Our beauty experts offer a wide range of services including hair styling, skincare treatments, and cosmetic procedures.",
    color: "#9c27b0",
  },
  CONSULTING: {
    title: "Consulting Services",
    description:
      "Get expert guidance from our professional consultants. Whether you need business advice, personal coaching, or specialized consulting services, our professionals are here to help.",
    color: "#2196f3",
  },
};

const SearchServiceProviders = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [serviceProviders, setServiceProviders] = useState([]);
  const [filteredServiceProviders, setFilteredServiceProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get current category and its details
  const getCurrentCategory = () => {
    const path = location.pathname.toLowerCase();
    if (path.includes("medical"))
      return { ...SERVICE_CATEGORIES.MEDICAL, key: "MEDICAL" };
    if (path.includes("fitness"))
      return { ...SERVICE_CATEGORIES.FITNESS, key: "FITNESS" };
    if (path.includes("beauty"))
      return { ...SERVICE_CATEGORIES.BEAUTY, key: "BEAUTY" };
    if (path.includes("consulting"))
      return { ...SERVICE_CATEGORIES.CONSULTING, key: "CONSULTING" };
    return null;
  };

  const currentCategory = getCurrentCategory();

  useEffect(() => {
    const fetchServiceProviders = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await API.get("/service");
        const providers = Array.isArray(response.data) ? response.data : [];

        // If we're on a category page, filter for that category
        if (currentCategory) {
          const categoryProviders = providers.filter(
            (provider) =>
              provider.serviceType?.toLowerCase() ===
              currentCategory.key.toLowerCase()
          );
          setServiceProviders(categoryProviders);
          setFilteredServiceProviders(categoryProviders);
        } else {
          setServiceProviders(providers);
          setFilteredServiceProviders(providers);
        }
      } catch (error) {
        console.error("Error fetching service providers:", error);
        setError("Failed to load service providers");
        setServiceProviders([]);
        setFilteredServiceProviders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceProviders();
  }, [currentCategory]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    let filtered = serviceProviders.filter(
      (provider) =>
        provider?.name?.toLowerCase().includes(value) ||
        provider?.serviceType?.toLowerCase().includes(value) ||
        provider?.location?.toLowerCase().includes(value) ||
        provider?.specialty?.toLowerCase().includes(value)
    );

    if (currentCategory) {
      filtered = filtered.filter(
        (provider) =>
          provider.serviceType?.toLowerCase() ===
          currentCategory.key.toLowerCase()
      );
    }

    setFilteredServiceProviders(filtered);
  };

  function getImagePath(path) {
    if (!path) return "/default-avatar.png";
    if (path.startsWith("http")) return path;
    return path.includes("\\")
      ? `/images/${path.substring(26)}`
      : `/images/${path}`;
  }

  const getCategoryColor = (serviceType) => {
    switch (serviceType) {
      case SERVICE_CATEGORIES.MEDICAL.key:
        return SERVICE_CATEGORIES.MEDICAL.color;
      case SERVICE_CATEGORIES.FITNESS.key:
        return SERVICE_CATEGORIES.FITNESS.color;
      case SERVICE_CATEGORIES.BEAUTY.key:
        return SERVICE_CATEGORIES.BEAUTY.color;
      case SERVICE_CATEGORIES.CONSULTING.key:
        return SERVICE_CATEGORIES.CONSULTING.color;
      default:
        return "#757575"; // Grey shade
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" align="center" sx={{ p: 4 }}>
        {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      {currentCategory && (
        <Container maxWidth="lg" sx={{ mb: 6 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ color: currentCategory.color, fontWeight: "bold" }}
          >
            {currentCategory.title}
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, maxWidth: "800px" }}>
            {currentCategory.description}
          </Typography>
        </Container>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 4,
          width: "100%",
          maxWidth: "90%",
          mx: "auto",
        }}
      >
        <TextField
          label={`Search ${
            currentCategory ? currentCategory.title : "all services"
          }`}
          variant="outlined"
          style={{ width: "100%", maxWidth: "700px" }}
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon style={{ cursor: "pointer" }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {filteredServiceProviders.map((provider) => (
          <Grid item xs={12} sm={6} md={4} key={provider._id || provider.id}>
            <Link
              to={`/service/${provider._id || provider.id}`}
              style={{ textDecoration: "none" }}
            >
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: { xs: "100%", sm: "370px" },
                  height: "300px",
                  textAlign: "center",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
                    transform: "translateY(-4px)",
                  },
                  mx: "auto",
                  borderRadius: "10px",
                  position: "relative",
                  overflow: "visible",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    zIndex: 1,
                  }}
                >
                  <Chip
                    label={provider.serviceType}
                    sx={{
                      bgcolor: getCategoryColor(provider.serviceType),
                      color: "white",
                      fontWeight: "bold",
                    }}
                  />
                </Box>
                <Avatar
                  src={getImagePath(provider.avatar)}
                  alt={provider.name}
                  sx={{
                    width: 120,
                    height: 120,
                    mb: 2,
                    border: "4px solid white",
                    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/default-avatar.png";
                  }}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {provider.name}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    gutterBottom
                  >
                    {provider.specialty || provider.serviceType}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 0.5,
                    }}
                  >
                    📍 {provider.location}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>

      {filteredServiceProviders.length === 0 && (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No service providers found
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {searchTerm
              ? "Try adjusting your search terms"
              : "No service providers available in this category at the moment."}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default SearchServiceProviders;
