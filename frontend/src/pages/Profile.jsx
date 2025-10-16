import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Avatar,
  Grid,
  Card,
  CardContent,
  Divider,
  Chip,
  CircularProgress,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Badge as BadgeIcon,
  Security as SecurityIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon,
  Edit as EditIcon,
  Notifications as NotificationsIcon,
  Language as LanguageIcon,
  AccessTime as AccessTimeIcon,
} from "@mui/icons-material";
import { jwtDecode } from "jwt-decode";
import TestNotification from "../components/TestNotification";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, []);

  const getRoleIcon = (role) => {
    switch (role) {
      case "ADMIN":
        return <SecurityIcon />;
      case "SERVICE-PROVIDER":
        return <BadgeIcon />;
      default:
        return <PersonIcon />;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "ADMIN":
        return "error";
      case "SERVICE-PROVIDER":
        return "primary";
      default:
        return "default";
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ minHeight: "100vh", py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <TestNotification />
          {/* Profile Header */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
            <Avatar
              sx={{ width: 100, height: 100, mr: 3, bgcolor: "primary.main" }}
            >
              {user?.name?.charAt(0) || "G"}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" gutterBottom>
                Welcome, {user?.name.toUpperCase() || "GUEST"}!
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Chip
                  icon={getRoleIcon(user?.role)}
                  label={user?.role?.toUpperCase() || "N/A"}
                  color={getRoleColor(user?.role)}
                  size="small"
                />
                <Button
                  startIcon={<EditIcon />}
                  variant="outlined"
                  size="small"
                >
                  Edit Profile
                </Button>
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                <CardContent>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <EmailIcon color="action" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Email"
                        secondary={user?.email || "N/A"}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                <CardContent>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <SecurityIcon color="action" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Role"
                        secondary={user?.role?.toUpperCase() || "N/A"}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* Additional Information */}
            <Grid item xs={12}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary">
                    Preferences & Settings
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <List>
                        <ListItem>
                          <ListItemIcon>
                            <NotificationsIcon color="action" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Notifications"
                            secondary="Email notifications enabled"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <LanguageIcon color="action" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Language"
                            secondary="English (US)"
                          />
                        </ListItem>
                      </List>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ p: 2, textAlign: "center" }}>
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<EditIcon />}
                          fullWidth
                          sx={{ mb: 2 }}
                        >
                          Update Profile
                        </Button>
                        <Button
                          variant="outlined"
                          color="primary"
                          startIcon={<SecurityIcon />}
                          fullWidth
                        >
                          Change Password
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default Profile;
