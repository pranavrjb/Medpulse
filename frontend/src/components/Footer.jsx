import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { motion } from "framer-motion";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const footerLinks = {
    // company: [
    //   { name: "About Us", path: "/about" },
    //   // { name: "Careers", path: "/careers" },
    //   { name: "Contact", path: "/contact" },
    //   // { name: "Blog", path: "/blog" },
    // ],
    services: [
      { name: "Medical Services", path: "/medicalservices" },
      { name: "Fitness & Wellness", path: "/fitness" },
      { name: "Beauty Services", path: "/beauty" },
      { name: "Consulting", path: "/consulting" },
    ],
    support: [
      { name: "Help Center", path: "/help" },
      // { name: "FAQs", path: "/faqs" },
      { name: "Terms of Service", path: "/terms" },
      { name: "Privacy Policy", path: "/privacy" },
    ],
  };

  const socialLinks = [
    { icon: <FacebookIcon />, url: "https://facebook.com" },
    { icon: <XIcon />, url: "https://x.com" },
    { icon: <InstagramIcon />, url: "https://instagram.com" },
    { icon: <LinkedInIcon />, url: "https://linkedin.com" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: theme.palette.background.paper,
        pt: 6,
        pb: 3,
        mt: "auto",
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  background: `linear-gradient(45deg, #6396c7, #23a4fa)`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                MedPulse
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Your trusted platform for finding and booking professional
                service providers.
              </Typography>
              <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
                {socialLinks.map((social, index) => (
                  <IconButton
                    key={index}
                    component="a"
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: theme.palette.text.secondary,
                      "&:hover": {
                        color: theme.palette.primary.main,
                        backgroundColor: `${theme.palette.primary.main}15`,
                      },
                    }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Box>
            </motion.div>
          </Grid>

          {/* Quick Links */}
          {/* <Grid item xs={12} sm={6} md={2}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Company
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {footerLinks.company.map((link, index) => (
                  <Link
                    key={index}
                    component={RouterLink}
                    to={link.path}
                    sx={{
                      color: "text.secondary",
                      textDecoration: "none",
                      "&:hover": {
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    {link.name}
                  </Link>
                ))}
              </Box>
            </motion.div>
          </Grid> */}

          {/* Services */}
          <Grid item xs={12} sm={6} md={2}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Services
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {footerLinks.services.map((link, index) => (
                  <Link
                    key={index}
                    component={RouterLink}
                    to={link.path}
                    sx={{
                      color: "text.secondary",
                      textDecoration: "none",
                      "&:hover": {
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    {link.name}
                  </Link>
                ))}
              </Box>
            </motion.div>
          </Grid>

          {/* Support */}
          <Grid item xs={12} sm={6} md={2}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Support
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {footerLinks.support.map((link, index) => (
                  <Link
                    key={index}
                    component={RouterLink}
                    to={link.path}
                    sx={{
                      color: "text.secondary",
                      textDecoration: "none",
                      "&:hover": {
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    {link.name}
                  </Link>
                ))}
              </Box>
            </motion.div>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={2}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Contact Us
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <EmailIcon sx={{ color: theme.palette.primary.main }} />
                  <Typography variant="body2" color="text.secondary">
                    support@medpulse.com
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <PhoneIcon sx={{ color: theme.palette.primary.main }} />
                  <Typography variant="body2" color="text.secondary">
                    +977 9800800000
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LocationOnIcon sx={{ color: theme.palette.primary.main }} />
                  <Typography variant="body2" color="text.secondary">
                    Kathmandu, Nepal
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Copyright */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: isMobile ? "column" : "row",
            gap: 1,
          }}
        >
          <Typography variant="body1" color="text.secondary">
            © {new Date().getFullYear()} MedPulse. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
