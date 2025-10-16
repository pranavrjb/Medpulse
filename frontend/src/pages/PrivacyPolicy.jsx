import React from "react";
import { Container, Typography, Box, Paper, Divider } from "@mui/material";

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md" sx={{ py: 6, minHeight: "100vh" }}>
      <Paper elevation={2} sx={{ p: { xs: 3, md: 6 }, borderRadius: 2 }}>
        {/* Title */}
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 700,
            background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
            backgroundClip: "text",
            textFillColor: "transparent",
            mb: 4,
          }}
        >
          Privacy Policy
        </Typography>

        {/* Introduction */}
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h5"
            fontWeight={600}
            gutterBottom
            color="primary"
          >
            Introduction
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>
            Welcome to <strong>My-App</strong>. Your privacy is important to us.
            This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information when you use our healthcare appointment
            booking platform. Please read this policy carefully. If you do not
            agree with the terms of this policy, please do not use our services.
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Information Collection */}
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h5"
            fontWeight={600}
            gutterBottom
            color="primary"
          >
            Information We Collect
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ fontSize: "1.1rem" }}>
            When you use our platform, we may collect the following types of
            information:
          </Typography>
          <Box component="ul" sx={{ pl: 4, "& li": { mb: 1 } }}>
            <Typography variant="body1" component="li">
              Personal Information: Your name, email address, phone number, and
              other details provided during account registration.
            </Typography>
            <Typography variant="body1" component="li">
              Health Information: Any medical details you voluntarily provide to
              schedule appointments.
            </Typography>
            <Typography variant="body1" component="li">
              Device Information: IP address, browser type, and device details
              to improve user experience.
            </Typography>
            <Typography variant="body1" component="li">
              Usage Data: Information about your interactions with our website,
              such as pages visited and actions taken.
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Information Usage */}
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h5"
            fontWeight={600}
            gutterBottom
            color="primary"
          >
            How We Use Your Information
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ fontSize: "1.1rem" }}>
            We use the information we collect for the following purposes:
          </Typography>
          <Box component="ul" sx={{ pl: 4, "& li": { mb: 1 } }}>
            <Typography variant="body1" component="li">
              To facilitate appointment bookings and manage your interactions
              with healthcare providers.
            </Typography>
            <Typography variant="body1" component="li">
              To send appointment confirmations, reminders, and updates.
            </Typography>
            <Typography variant="body1" component="li">
              To enhance the performance and usability of our platform.
            </Typography>
            <Typography variant="body1" component="li">
              To comply with legal and regulatory requirements.
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Data Security */}
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h5"
            fontWeight={600}
            gutterBottom
            color="primary"
          >
            Data Security
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>
            We implement technical and organizational measures to protect your
            personal information. However, no system is completely secure, and
            we cannot guarantee the absolute security of your data.
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Contact Information */}
        <Box>
          <Typography
            variant="h5"
            fontWeight={600}
            gutterBottom
            color="primary"
          >
            Contact Us
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ fontSize: "1.1rem" }}>
            If you have any questions or concerns about this Privacy Policy or
            your personal data, please contact us:
          </Typography>
          <Box sx={{ mt: 2, pl: 2 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Email:</strong> myappsupport@gmail.com
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Phone:</strong> +977 9812312345
            </Typography>
            <Typography variant="body1">
              <strong>Address:</strong> 123 Healthcare, Kathmandu, Nepal
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default PrivacyPolicy;
