import React from "react";
import {
  Typography,
  useTheme,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  useMediaQuery,
} from "@mui/material";
import FAQsPage from "./FAQsPage";
import { motion } from "framer-motion";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import PsychologyIcon from "@mui/icons-material/Psychology";
import { Link } from "react-router-dom";

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const services = [
    {
      icon: <LocalHospitalIcon sx={{ fontSize: 40 }} />,
      title: "Medical Services",
      description: "Find qualified doctors and medical specialists",
      longDescription:
        "Access a comprehensive network of healthcare professionals including doctors, specialists, and medical practitioners. Our medical services providers offer everything from routine check-ups to specialized treatments, ensuring you receive the highest quality medical care.",
      color: "#2196f3",
      path: "/medicalservices",
      learnMorePath: "/medicalservices/about",
    },
    {
      icon: <FitnessCenterIcon sx={{ fontSize: 40 }} />,
      title: "Fitness & Wellness",
      description: "Connect with personal trainers and wellness experts",
      longDescription:
        "Transform your life with our fitness and wellness services. Our certified personal trainers, nutritionists, and wellness coaches provide personalized programs to help you achieve your health and fitness goals. From workout plans to dietary advice, we've got you covered.",
      color: "#4caf50",
      path: "/fitness",
      learnMorePath: "/fitness/about",
    },
    {
      icon: <ContentCutIcon sx={{ fontSize: 40 }} />,
      title: "Beauty Services",
      description: "Book appointments with beauty professionals",
      longDescription:
        "Experience top-tier beauty services from skilled professionals. Our beauty experts offer a wide range of services including hair styling, skincare treatments, makeup artistry, and more. Let our professionals help you look and feel your best.",
      color: "#f44336",
      path: "/beauty",
      learnMorePath: "/beauty/about",
    },
    {
      icon: <PsychologyIcon sx={{ fontSize: 40 }} />,
      title: "Consulting",
      description: "Get expert advice from various consultants",
      longDescription:
        "Access professional consulting services for all your needs. Our experienced consultants provide expert guidance in business strategy, personal development, career coaching, and more. Get the insights you need to make informed decisions and achieve your goals.",
      color: "#9c27b0",
      path: "/consulting",
      learnMorePath: "/consulting/about",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: { xs: 8, md: 10 },
        overflow: "hidden",
        bgcolor: theme.palette.background.default,
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          width: "100%",
          textAlign: "center",
          mb: 8,
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, #2C3E50 0%, #3498DB 100%)"
              : "linear-gradient(135deg, #E3F2FD 0%, #92c9f7 100%)",
          color: theme.palette.mode === "dark" ? "white" : "#1a1a1a",
          py: { xs: 4, md: 8 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Container maxWidth="lg">
            <Typography
              variant={isMobile ? "h3" : "h2"}
              fontWeight="bold"
              sx={{
                mb: 2,
                textShadow:
                  theme.palette.mode === "dark"
                    ? "2px 2px 4px rgba(0,0,0,0.2)"
                    : "none",
                color: theme.palette.mode === "dark" ? "white" : "#1a1a1a",
              }}
            >
              Find & Book Service Providers Easily
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mb: 4,
                opacity: theme.palette.mode === "dark" ? 0.9 : 0.8,
                maxWidth: "800px",
                mx: "auto",
                color: theme.palette.mode === "dark" ? "white" : "#4a4a4a",
              }}
            >
              Connect with trusted professionals for all your service needs
            </Typography>
            <Button
              component={Link}
              to="/bookings"
              variant="contained"
              color="primary"
              size="large"
              sx={{
                mt: 2,
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                borderRadius: "30px",
                textTransform: "none",
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
              Get Started
            </Button>
          </Container>
        </motion.div>
      </Box>

      {/* Services Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{ mb: 4, fontWeight: 600 }}
          >
            Our Services
          </Typography>
          <Grid container spacing={3}>
            {services.map((service, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    p: 2,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: theme.shadows[8],
                    },
                  }}
                >
                  <Box
                    component={Link}
                    to={service.path}
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 2,
                        backgroundColor: `${service.color}15`,
                      }}
                    >
                      <Box sx={{ color: service.color }}>{service.icon}</Box>
                    </Box>
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                        {service.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        {service.description}
                      </Typography>
                    </CardContent>
                  </Box>
                  <Button
                    component={Link}
                    to={service.learnMorePath}
                    variant="outlined"
                    size="small"
                    sx={{
                      borderRadius: "20px",
                      textTransform: "none",
                      borderColor: service.color,
                      color: service.color,
                      mt: "auto",
                      "&:hover": {
                        borderColor: service.color,
                        backgroundColor: `${service.color}15`,
                      },
                    }}
                  >
                    Learn More
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      {/* FAQs Section */}
      <FAQsPage />

      {/* CTA Section */}
      {/* <Box
        sx={{
          width: "100%",
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          color: "white",
          py: 6,
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
              Ready to Get Started?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Join thousands of satisfied customers who found their perfect
              service provider
            </Typography>
            <Button
              component={Link}
              to="/bookings"
              variant="contained"
              color="secondary"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                borderRadius: "30px",
                textTransform: "none",
                boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Start Booking Now
            </Button>
          </motion.div>
        </Container>
      </Box> */}
    </Box>
  );
};

export default HomePage;
