import React from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import {
  MedicalServices as MedicalIcon,
  Spa as WellnessIcon,
  Psychology as MentalHealthIcon,
  Business as ConsultingIcon,
  Speed as EfficiencyIcon,
  Security as TrustIcon,
  Support as SupportIcon,
  CalendarToday as BookingIcon,
} from "@mui/icons-material";

const About = () => {
  const services = [
    {
      icon: <MedicalIcon fontSize="large" color="primary" />,
      title: "Medical Services",
      description:
        "Access qualified healthcare professionals for your medical needs, from general practitioners to specialists.",
    },
    {
      icon: <WellnessIcon fontSize="large" color="primary" />,
      title: "Wellness Services",
      description:
        "Connect with wellness experts including fitness trainers, nutritionists, and wellness coaches.",
    },
    {
      icon: <MentalHealthIcon fontSize="large" color="primary" />,
      title: "Mental Health Services",
      description:
        "Find professional counselors, therapists, and mental health specialists for your well-being.",
    },
    {
      icon: <ConsultingIcon fontSize="large" color="primary" />,
      title: "Consulting Services",
      description:
        "Book appointments with business consultants, career coaches, and professional advisors.",
    },
  ];

  const features = [
    {
      icon: <BookingIcon fontSize="large" color="secondary" />,
      title: "Easy Booking",
      description:
        "Schedule appointments with just a few clicks through our intuitive booking system.",
    },
    {
      icon: <EfficiencyIcon fontSize="large" color="secondary" />,
      title: "Quick Access",
      description:
        "Find and connect with service providers instantly based on your specific needs.",
    },
    {
      icon: <TrustIcon fontSize="large" color="secondary" />,
      title: "Verified Providers",
      description:
        "All service providers are verified and vetted to ensure quality service.",
    },
    {
      icon: <SupportIcon fontSize="large" color="secondary" />,
      title: "24/7 Support",
      description:
        "Get assistance anytime with our dedicated customer support team.",
    },
  ];

  return (
    <Container>
      <Box sx={{ my: 4, minHeight: "100vh" }}>
        {/* Hero Section */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: "bold",
              background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
              backgroundClip: "text",
              textFillColor: "transparent",
              mb: 2,
            }}
          >
            About Us
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
            Your One-Stop Platform for Professional Services
          </Typography>
        </Box>

        {/* Introduction Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem" }}>
            Welcome to our comprehensive booking platform, where we connect you
            with qualified professionals across various service categories. Our
            platform streamlines the process of finding and booking appointments
            with the right service providers for your specific needs.
          </Typography>
        </Box>

        {/* Services Section */}
        <Typography
          variant="h4"
          component="h2"
          sx={{ mb: 4, textAlign: "center", fontWeight: "bold" }}
        >
          Our Services
        </Typography>
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: "100%",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                  },
                }}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <Box sx={{ mb: 2 }}>{service.icon}</Box>
                  <Typography variant="h6" gutterBottom>
                    {service.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {service.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 6 }} />

        {/* Features Section */}
        <Typography
          variant="h4"
          component="h2"
          sx={{ mb: 4, textAlign: "center", fontWeight: "bold" }}
        >
          Why Choose Us
        </Typography>
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: "100%",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                  },
                }}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h6" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Mission Section */}
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{ mb: 3, fontWeight: "bold" }}
          >
            Our Mission
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>
            We strive to revolutionize the way people connect with professional
            service providers. Our mission is to make quality services
            accessible to everyone through a seamless, efficient, and reliable
            booking platform.
          </Typography>
        </Box>

        {/* Call to Action Section */}
        <Box
          sx={{
            textAlign: "center",
            py: 6,
            background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
            borderRadius: 2,
            color: "white",
          }}
        >
          <Typography variant="h5" sx={{ mb: 3 }}>
            Ready to Book Your Next Appointment?
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: "white",
              color: "primary.main",
              "&:hover": {
                bgcolor: "grey.100",
              },
            }}
            href="/bookings"
          >
            Book Now
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default About;
