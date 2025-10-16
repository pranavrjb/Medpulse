import React from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  useTheme,
} from "@mui/material";
import {
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
} from "@mui/icons-material";

const ContactInformation = ({ formData, handleInputChange }) => {
  const theme = useTheme();

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          color: theme.palette.mode === "dark" ? "white" : "#1a1a1a",
        }}
      >
        Contact Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationIcon
                    sx={{
                      color:
                        theme.palette.mode === "dark" ? "#b3b3b3" : "#666666",
                    }}
                  />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon
                    sx={{
                      color:
                        theme.palette.mode === "dark" ? "#b3b3b3" : "#666666",
                    }}
                  />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon
                    sx={{
                      color:
                        theme.palette.mode === "dark" ? "#b3b3b3" : "#666666",
                    }}
                  />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactInformation;
