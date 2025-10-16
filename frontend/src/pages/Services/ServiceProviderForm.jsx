import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  Button,
  useTheme,
  Stepper,
  Step,
  StepLabel,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Business as BusinessIcon } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import BusinessInformation from "../../components/registration/BusinessInformation";
import ContactInformation from "../../components/registration/ContactInformation";
import BusinessImages from "../../components/registration/BusinessImages";
import API from "../../api";

const steps = [
  "Business Information",
  "Contact Information",
  // "Business Images",
];

const ServiceProviderForm = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [formData, setFormData] = useState({
    businessName: "",
    serviceCategory: "",
    description: "",
    address: "",
    phone: "",
    email: "",
    // logo: null,
  });

  const serviceCategories = [
    "Medical Services",
    "Fitness & Wellness",
    "Beauty Services",
    "Consulting Services",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setSelectedFile(file);
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImagePreview(reader.result);
  //       setFormData((prev) => ({
  //         ...prev,
  //         logo: file,
  //       }));
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const validateStep = (step) => {
    switch (step) {
      case 0:
        // Validate Business Information
        return (
          formData.businessName.trim() !== "" &&
          formData.serviceCategory !== "" &&
          formData.description.trim() !== ""
        );
      case 1:
        // Validate Contact Information
        return (
          formData.address.trim() !== "" &&
          formData.phone.trim() !== "" &&
          formData.email.trim() !== "" &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        );
      // case 2:
      //   // Validate Business Images
      //   return selectedFile !== null;
      // default:
      //   return false;
    }
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevStep) => prevStep + 1);
    } else {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields before proceeding.",
        severity: "error",
      });
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(activeStep)) {
      setSnackbar({
        open: true,
        message: "Please complete all required fields before submitting.",
        severity: "error",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await API.post("/serviceProviders/register", formData);

      if (response.status === 201) {
        setSnackbar({
          open: true,
          message: "Service provider registered successfully!",
          severity: "success",
        });

        setTimeout(() => navigate("/"), 2000);
      } else {
        throw new Error(response.data?.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setSnackbar({
        open: true,
        message:
          error.response?.data?.message ||
          "Registration failed. Please try again.",
        severity: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <BusinessInformation
            formData={formData}
            handleInputChange={handleInputChange}
            serviceCategories={serviceCategories}
          />
        );
      case 1:
        return (
          <ContactInformation
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      // case 2:
      //   return (
      //     <BusinessImages
      //       formData={formData}
      //       handleImageChange={handleImageChange}
      //       imagePreview={imagePreview}
      //     />
      //   );
      default:
        return null;
    }
  };

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
              <BusinessIcon sx={{ fontSize: 30, color: "white" }} />
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
              Service Provider Registration
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
              Register your business and start providing services through our
              platform
            </Typography>
          </Box>

          {/* Stepper */}
          <Stepper
            activeStep={activeStep}
            sx={{
              mb: 4,
              "& .MuiStepLabel-label": {
                color: theme.palette.mode === "dark" ? "#b3b3b3" : "#666666",
              },
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Form Content */}
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
            <form onSubmit={handleSubmit}>
              {getStepContent(activeStep)}

              {/* Navigation Buttons */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 4,
                }}
              >
                <Button
                  onClick={handleBack}
                  disabled={activeStep === 0 || isSubmitting}
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                  }}
                >
                  Back
                </Button>
                {activeStep === steps.length - 1 ? (
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting || !validateStep(activeStep)}
                    sx={{
                      borderRadius: 2,
                      textTransform: "none",
                      minWidth: 120,
                    }}
                  >
                    {isSubmitting ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Register"
                    )}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={isSubmitting || !validateStep(activeStep)}
                    sx={{
                      borderRadius: 2,
                      textTransform: "none",
                    }}
                  >
                    Next
                  </Button>
                )}
              </Box>
            </form>
          </Paper>
        </motion.div>
      </Container>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ServiceProviderForm;
