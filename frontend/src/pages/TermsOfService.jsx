import React from "react";
import {
  Box,
  Typography,
  Paper,
  Container,
  Divider,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { Gavel as GavelIcon } from "@mui/icons-material";

const TermsOfService = () => {
  const theme = useTheme();

  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: `By accessing and using this website, you accept and agree to be bound by the terms and conditions of this agreement. If you do not agree to these terms, please do not use our services.`,
    },
    {
      title: "2. Use License",
      content: `Permission is granted to temporarily download one copy of the materials (information or software) on our website for personal, non-commercial transitory viewing only.`,
    },
    {
      title: "3. Service Description",
      content: `Our platform provides a service booking system that connects users with service providers. We act as an intermediary and are not responsible for the quality of services provided by third parties.`,
    },
    {
      title: "4. User Responsibilities",
      content: `Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account. Users must provide accurate and complete information when creating an account.`,
    },
    {
      title: "5. Booking and Cancellation",
      content: `All bookings are subject to availability. Users may cancel or reschedule appointments according to our cancellation policy. Service providers reserve the right to refuse service to anyone.`,
    },
    {
      title: "6. Payment Terms",
      content: `Payment processing is handled through secure third-party payment processors. We are not responsible for any issues arising from payment processing. All prices are subject to change without notice.`,
    },
    {
      title: "7. Privacy Policy",
      content: `Your privacy is important to us. We collect and process personal information in accordance with our Privacy Policy. By using our services, you consent to such processing.`,
    },
    {
      title: "8. Intellectual Property",
      content: `All content on this website, including text, graphics, logos, and software, is the property of our company and is protected by intellectual property laws.`,
    },
    {
      title: "9. Limitation of Liability",
      content: `We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services.`,
    },
    {
      title: "10. Changes to Terms",
      content: `We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through our website.`,
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: { xs: 4, md: 6 },
        bgcolor: theme.palette.mode === "dark" ? "#1a1a1a" : "#f5f5f5",
      }}
    >
      <Container maxWidth="md">
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
                <GavelIcon sx={{ fontSize: 30, color: "white" }} />
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
                Terms of Service
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: theme.palette.mode === "dark" ? "#b3b3b3" : "#4a4a4a",
                  textAlign: "center",
                }}
              >
                Last updated: {new Date().toLocaleDateString()}
              </Typography>
            </Box>

            <Divider sx={{ mb: 4 }} />

            {sections.map((section, index) => (
              <Box key={index} sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.mode === "dark" ? "white" : "#1a1a1a",
                    mb: 2,
                  }}
                >
                  {section.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color:
                      theme.palette.mode === "dark" ? "#b3b3b3" : "#4a4a4a",
                    lineHeight: 1.8,
                  }}
                >
                  {section.content}
                </Typography>
              </Box>
            ))}

            <Divider sx={{ my: 4 }} />

            <Typography
              variant="body2"
              sx={{
                color: theme.palette.mode === "dark" ? "#b3b3b3" : "#4a4a4a",
                textAlign: "center",
                fontStyle: "italic",
              }}
            >
              By using our services, you agree to these terms and conditions. If
              you have any questions, please contact us.
            </Typography>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default TermsOfService;
