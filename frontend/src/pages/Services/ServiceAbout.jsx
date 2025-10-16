import React from "react";
import { useLocation } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Link } from "react-router-dom";

const SERVICE_INFO = {
  medical: {
    title: "Medical Services",
    description:
      "Access a comprehensive network of healthcare professionals including doctors, specialists, and medical practitioners. Our medical services providers offer everything from routine check-ups to specialized treatments, ensuring you receive the highest quality medical care.",
    benefits: [
      "Access to qualified medical professionals",
      "Convenient online booking system",
      "Wide range of medical specialties",
      "Verified credentials and reviews",
      "Flexible scheduling options",
      "Direct communication with healthcare providers",
    ],
    color: "#2196f3",
    path: "/medicalservices",
  },
  fitness: {
    title: "Fitness & Wellness",
    description:
      "Transform your life with our fitness and wellness services. Our certified personal trainers, nutritionists, and wellness coaches provide personalized programs to help you achieve your health and fitness goals.",
    benefits: [
      "Certified personal trainers",
      "Customized workout plans",
      "Nutrition consultation",
      "Progress tracking",
      "Group fitness classes",
      "Wellness coaching sessions",
    ],
    color: "#4caf50",
    path: "/fitness",
  },
  beauty: {
    title: "Beauty Services",
    description:
      "Experience top-tier beauty services from skilled professionals. Our beauty experts offer a wide range of services including hair styling, skincare treatments, makeup artistry, and more.",
    benefits: [
      "Professional beauty treatments",
      "Licensed beauty specialists",
      "Modern techniques and equipment",
      "Personalized beauty consultations",
      "Premium beauty products",
      "Flexible appointment scheduling",
    ],
    color: "#f44336",
    path: "/beauty",
  },
  consulting: {
    title: "Consulting Services",
    description:
      "Access professional consulting services for all your needs. Our experienced consultants provide expert guidance in business strategy, personal development, career coaching, and more.",
    benefits: [
      "Expert business consultants",
      "Strategic planning sessions",
      "Career development guidance",
      "Personal coaching",
      "Industry-specific expertise",
      "Customized consulting solutions",
    ],
    color: "#9c27b0",
    path: "/consulting",
  },
};

const ServiceAbout = () => {
  const location = useLocation();
  const getServiceType = () => {
    const path = location.pathname.toLowerCase();
    if (path.includes("medical")) return "medical";
    if (path.includes("fitness")) return "fitness";
    if (path.includes("beauty")) return "beauty";
    if (path.includes("consulting")) return "consulting";
    return null;
  };

  const serviceType = getServiceType();
  const serviceInfo = SERVICE_INFO[serviceType];

  if (!serviceInfo) {
    return (
      <Container>
        <Typography variant="h4" align="center" sx={{ my: 4 }}>
          Service information not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Paper elevation={0} sx={{ p: 4, backgroundColor: "transparent" }}>
        <Typography
          variant="h3"
          gutterBottom
          sx={{ color: serviceInfo.color, fontWeight: "bold", mb: 4 }}
        >
          {serviceInfo.title}
        </Typography>

        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" paragraph sx={{ lineHeight: 1.8 }}>
              {serviceInfo.description}
            </Typography>

            <Box sx={{ mt: 4 }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontWeight: "bold", mb: 3 }}
              >
                Key Benefits
              </Typography>
              <List>
                {serviceInfo.benefits.map((benefit, index) => (
                  <ListItem key={index} sx={{ py: 1 }}>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon
                        sx={{ color: serviceInfo.color }}
                      />
                    </ListItemIcon>
                    <ListItemText primary={benefit} />
                  </ListItem>
                ))}
              </List>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Button
                component={Link}
                to={serviceInfo.path}
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: serviceInfo.color,
                  "&:hover": {
                    backgroundColor: serviceInfo.color,
                    opacity: 0.9,
                  },
                }}
              >
                View Available Providers
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                height: "100%",
                minHeight: 400,
                backgroundColor: `${serviceInfo.color}15`,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 4,
              }}
            >
              <Typography
                variant="h5"
                align="center"
                sx={{ color: serviceInfo.color }}
              >
                [Placeholder for service-specific imagery or additional content]
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ServiceAbout;
