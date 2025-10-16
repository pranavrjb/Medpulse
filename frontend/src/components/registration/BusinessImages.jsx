import React from "react";
import { Box, Typography, Grid, useTheme, IconButton } from "@mui/material";
import { Image as ImageIcon, Delete as DeleteIcon } from "@mui/icons-material";

const BusinessImages = ({
  formData,
  handleImageChange,
  imagePreview,
  setImagePreview,
}) => {
  const theme = useTheme();

  const handleDeleteImage = () => {
    setImagePreview(null);
    // Reset the file input
    const fileInput = document.getElementById("business-logo-upload");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          color: theme.palette.mode === "dark" ? "white" : "#1a1a1a",
        }}
      >
        Business Images
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {!imagePreview ? (
            <Box
              sx={{
                border: `2px dashed ${
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.2)"
                    : "rgba(0,0,0,0.2)"
                }`,
                borderRadius: 2,
                p: 3,
                textAlign: "center",
                cursor: "pointer",
                "&:hover": {
                  borderColor: theme.palette.primary.main,
                },
              }}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
                id="business-logo-upload"
              />
              <label htmlFor="business-logo-upload">
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <ImageIcon
                    sx={{
                      fontSize: 40,
                      color:
                        theme.palette.mode === "dark" ? "#b3b3b3" : "#666666",
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      color:
                        theme.palette.mode === "dark" ? "#b3b3b3" : "#666666",
                    }}
                  >
                    Click to upload your business images
                  </Typography>
                </Box>
              </label>
            </Box>
          ) : (
            <Box sx={{ position: "relative" }}>
              <Box
                component="img"
                src={imagePreview}
                alt="Business Image"
                sx={{
                  width: "100%",
                  maxHeight: 300,
                  objectFit: "cover",
                  borderRadius: 2,
                }}
              />
              <IconButton
                onClick={handleDeleteImage}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  bgcolor: "rgba(0, 0, 0, 0.5)",
                  "&:hover": {
                    bgcolor: "rgba(0, 0, 0, 0.7)",
                  },
                }}
              >
                <DeleteIcon sx={{ color: "white" }} />
              </IconButton>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default BusinessImages;
