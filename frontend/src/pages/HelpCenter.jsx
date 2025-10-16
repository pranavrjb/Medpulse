import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
  useTheme,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  Help as HelpIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Chat as ChatIcon,
  AccessTime as AccessTimeIcon,
  LocationOn as LocationIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import FAQsPage from "./FAQsPage";

const HelpCenter = () => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

//   const faqs = [
//     {
//       question: "How do I book a service?",
//       answer:
//         "To book a service, simply browse our service providers, select the service you need, choose your preferred date and time, and follow the booking process. You can pay securely through our platform.",
//     },
//     {
//       question: "Can I cancel or reschedule my booking?",
//       answer:
//         "Yes, you can cancel or reschedule your booking up to 24 hours before the scheduled time. Log into your account, go to your bookings, and select the option to modify or cancel.",
//     },
//     {
//       question: "How do I contact customer support?",
//       answer:
//         "You can reach our customer support team through multiple channels: email, phone, or live chat. Our support team is available Monday through Friday, 9 AM to 6 PM.",
//     },
//     {
//       question: "What payment methods do you accept?",
//       answer:
//         "We accept all major credit cards, debit cards, and digital payment methods. All payments are processed securely through our payment partners.",
//     },
//     {
//       question: "How do I become a service provider?",
//       answer:
//         "To become a service provider, register on our platform, complete your profile, and submit your business documentation. Our team will review your application and get back to you within 2-3 business days.",
//     },
//   ];

  const supportOptions = [
    {
      title: "Email Support",
      description: "Get help via email",
      icon: <EmailIcon sx={{ fontSize: 40 }} />,
      action: "support@example.com",
      link: "mailto:support@example.com",
    },
    {
      title: "Phone Support",
      description: "Call us directly",
      icon: <PhoneIcon sx={{ fontSize: 40 }} />,
      action: "+977 9800800000",
      link: "tel:+9779800800000",
    },
    {
      title: "Live Chat",
      description: "Chat with our support team",
      icon: <ChatIcon sx={{ fontSize: 40 }} />,
      action: "Start Chat",
      link: "#",
    },
  ];

  const businessHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
    { day: "Sunday - Saturday", hours: "Closed" },
  ];

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
                my: 4,
                bgcolor: theme.palette.primary.main,
              }}
            >
              <HelpIcon sx={{ fontSize: 30, color: "white" }} />
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
              Help Center
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.mode === "dark" ? "#b3b3b3" : "#4a4a4a",
                textAlign: "center",
                maxWidth: "600px",
              }}
            >
              Find answers to common questions and get support when you need it.
            </Typography>
          </Box>

          {/* Support Options */}
          <Grid container spacing={3} sx={{ mb: 6 }}>
            {supportOptions.map((option, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    p: 2,
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
                  <Box
                    sx={{
                      color: theme.palette.primary.main,
                      mb: 2,
                    }}
                  >
                    {option.icon}
                  </Box>
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color:
                          theme.palette.mode === "dark" ? "white" : "#1a1a1a",
                        mb: 1,
                      }}
                    >
                      {option.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color:
                          theme.palette.mode === "dark" ? "#b3b3b3" : "#4a4a4a",
                        mb: 2,
                      }}
                    >
                      {option.description}
                    </Typography>
                    <Button
                      variant="outlined"
                      color="primary"
                      href={option.link}
                      sx={{ borderRadius: 2 }}
                    >
                      {option.action}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* FAQs Section */}
          {/* <Paper
            elevation={2}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 2,
              background: theme.palette.mode === "dark" ? "#2d2d2d" : "#ffffff",
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 2px 8px rgba(0,0,0,0.3)"
                  : "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: theme.palette.mode === "dark" ? "white" : "#1a1a1a",
                mb: 3,
              }}
            >
              Frequently Asked Questions
            </Typography>

            {faqs.map((faq, index) => (
              <Accordion
                key={index}
                expanded={expanded === `panel${index}`}
                onChange={handleChange(`panel${index}`)}
                sx={{
                  mb: 1,
                  borderRadius: "8px !important",
                  "&:before": {
                    display: "none",
                  },
                  background:
                    theme.palette.mode === "dark" ? "#3d3d3d" : "#f8f9fa",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    "& .MuiAccordionSummary-content": {
                      my: 1,
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 500,
                      color:
                        theme.palette.mode === "dark" ? "white" : "#1a1a1a",
                    }}
                  >
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    sx={{
                      color:
                        theme.palette.mode === "dark" ? "#b3b3b3" : "#4a4a4a",
                    }}
                  >
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Paper> */}
          <FAQsPage/>
          {/* Business Hours */}
          <Paper
            elevation={2}
            sx={{
              p: { xs: 3, md: 4 },
              mt: 4,
              borderRadius: 2,
              background: theme.palette.mode === "dark" ? "#2d2d2d" : "#ffffff",
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 2px 8px rgba(0,0,0,0.3)"
                  : "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <AccessTimeIcon
                sx={{
                  color: theme.palette.primary.main,
                  mr: 2,
                }}
              />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  color: theme.palette.mode === "dark" ? "white" : "#1a1a1a",
                }}
              >
                Business Hours
              </Typography>
            </Box>
            <Grid container spacing={2}>
              {businessHours.map((schedule, index) => (
                <Grid item xs={12} key={index}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      p: 1,
                      borderRadius: 1,
                      bgcolor:
                        theme.palette.mode === "dark" ? "#3d3d3d" : "#f8f9fa",
                    }}
                  >
                    <Typography
                      sx={{
                        color:
                          theme.palette.mode === "dark" ? "white" : "#1a1a1a",
                      }}
                    >
                      {schedule.day}
                    </Typography>
                    <Typography
                      sx={{
                        color:
                          theme.palette.mode === "dark" ? "#b3b3b3" : "#4a4a4a",
                      }}
                    >
                      {schedule.hours}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default HelpCenter;
