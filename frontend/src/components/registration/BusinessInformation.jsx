import React from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  useTheme,
} from "@mui/material";
import {
  Business as BusinessIcon,
  Description as DescriptionIcon,
} from "@mui/icons-material";

const BusinessInformation = ({
  formData,
  handleInputChange,
  serviceCategories,
  businessTypes,
}) => {
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
        Business Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Business Name"
            name="businessName"
            value={formData.businessName}
            onChange={handleInputChange}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BusinessIcon
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
          <FormControl fullWidth required>
            <InputLabel>Service Category</InputLabel>
            <Select
              name="serviceCategory"
              value={formData.serviceCategory}
              onChange={handleInputChange}
              label="Service Category"
            >
              {serviceCategories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Business Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            multiline
            rows={3}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DescriptionIcon
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

export default BusinessInformation;
