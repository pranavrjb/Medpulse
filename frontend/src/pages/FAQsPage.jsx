// FAQsPage.js - Separate Page for FAQs
import React from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  Container,
  useMediaQuery,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion } from "framer-motion";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

const FAQsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const faqs = [
    {
      question: "How do I book a service?",
      answer:
        "To book a service, simply browse our service providers, select the service you need, choose your preferred date and time, and follow the booking process. You can pay securely through our platform.",
    },
    {
      question: "Can I cancel or reschedule my booking?",
      answer:
        "Yes, you can cancel or reschedule your booking up to 24 hours before the scheduled time. Log into your account, go to your bookings, and select the option to modify or cancel.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can reach our customer support team through multiple channels: email, phone, or live chat. Our support team is available Monday through Friday, 9 AM to 6 PM.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, debit cards, and digital payment methods. All payments are processed securely through our payment partners.",
    },
    {
      question: "How do I become a service provider?",
      answer:
        "To become a service provider, register on our platform, complete your profile, and submit your business documentation. Our team will review your application and get back to you within 2-3 business days.",
    },
  ];

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 5,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <HelpOutlineIcon
              sx={{
                fontSize: 40,
                color: theme.palette.primary.main,
                mr: 2,
              }}
            />
            <Typography
              variant={isMobile ? "h4" : "h3"}
              sx={{
                fontWeight: 700,
                background: `linear-gradient(45deg, #6396c7, #23a4fa)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textAlign: "center",
              }}
            >
              Frequently Asked Questions
            </Typography>
          </Box>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ textAlign: "center", mb: 4 }}
          >
            Find answers to common questions about our services
          </Typography>
        </motion.div>

        <Box sx={{ width: "100%" }}>
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Accordion
                sx={{
                  mb: 2,
                  borderRadius: "12px !important",
                  overflow: "hidden",
                  border: `1px solid ${theme.palette.divider}`,
                  "&:before": {
                    display: "none",
                  },
                  "&:hover": {
                    boxShadow: theme.shadows[4],
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon
                      sx={{
                        color: theme.palette.primary.main,
                        transition: "transform 0.3s ease",
                      }}
                    />
                  }
                  aria-controls={`panel${index}-content`}
                  id={`panel${index}-header`}
                  sx={{
                    bgcolor: theme.palette.background.paper,
                    "&:hover": {
                      bgcolor: theme.palette.action.hover,
                    },
                    py: 1,
                    px: 3,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <QuestionAnswerIcon
                      sx={{
                        color: theme.palette.primary.main,
                        fontSize: 24,
                      }}
                    />
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: { xs: "1rem", sm: "1.1rem" },
                        fontWeight: 600,
                      }}
                    >
                      {faq.question}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    bgcolor: theme.palette.background.default,
                    py: 3,
                    px: 4,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: "1rem", sm: "1.1rem" },
                      lineHeight: 1.6,
                      color: theme.palette.text.secondary,
                    }}
                  >
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </motion.div>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default FAQsPage;
