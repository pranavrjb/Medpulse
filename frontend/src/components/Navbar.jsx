import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
  Tooltip,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useScrollTrigger,
  Slide,
  Fade,
  Avatar,
  Divider,
  useMediaQuery,
  ListItemIcon,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import { UserContext } from "../context/UserContext";
import { useTheme } from "@mui/material/styles";
import Toggle from "../context/DarkMode/Toggle";
import NotificationBell from "./NotificationBell";

const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    setAnchorEl(null);
    navigate("/login");
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const isAdmin = user && user.role === "ADMIN";

  const menuItems = [
    { text: "Profile", icon: <AccountCircleIcon />, path: "/profile" },
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
    { text: "Logout", icon: <LogoutIcon />, onClick: handleLogout },
  ];

  const drawer = (
    <Box>
      <Toolbar>
        <Typography variant="h6" noWrap>
          Menu
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem

            key={item.text}
            onClick={() => {
              if (item.onClick) {
                item.onClick();
              } else {
                navigate(item.path);
              }
              handleDrawerClose();
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar
        position="static"
        elevation={trigger ? 4 : 0}
        sx={{
          background:
            theme.palette.mode === "dark"
              ? "rgba(18, 18, 18, 0.8)"
              : "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(8px)",
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: "64px",
            px: { xs: 2, md: 4 },
          }}
        >
          {/* Mobile Menu Button */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              position: "absolute",
              right: 15,
            }}
          >
            <IconButton
              edge="end"
              onClick={handleDrawerOpen}
              sx={{
                color: theme.palette.mode === "dark" ? "white" : "#1a1a1a",
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              fontWeight: 700,
              letterSpacing: "0.5px",
              position: { xs: "absolute", md: "static" },
              left: { xs: "50%", md: "auto" },
              transform: { xs: "translateX(-50%)", md: "none" },
              color: theme.palette.mode === "dark" ? "white" : "#1a1a1a",
              transition: "transform 0.2s",
              "&:hover": {
                transform: {
                  xs: "translateX(-50%) scale(1.05)",
                  md: "scale(1.05)",
                },
              },
            }}
          >
            MedPulse
          </Typography>

          {/* Desktop Navigation */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 2,
            }}
          >
            {/* <Button
              component={Link}
              to="/about"
              sx={{
                textTransform: "none",
                fontWeight: 500,
                color: theme.palette.mode === "dark" ? "white" : "#1a1a1a",
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              About Us
            </Button>*/}
            <Button
              component={Link}
              to="/contact"
              sx={{
                textTransform: "none",
                fontWeight: 500,
                color: theme.palette.mode === "dark" ? "white" : "#1a1a1a",
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              Contact Us
            </Button>
            {user ? (
              <>
                {isAdmin && (
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      component={Link}
                      to="/admin"
                      sx={{
                        textTransform: "none",
                        fontWeight: 500,
                        color:
                          theme.palette.mode === "dark" ? "white" : "#1a1a1a",
                        "&:hover": {
                          backgroundColor: theme.palette.action.hover,
                        },
                      }}
                    >
                      Admin
                    </Button>
                    {/* <Button
                      component={Link}
                      to="/manageusers"
                      sx={{
                        textTransform: "none",
                        fontWeight: 500,
                        color:
                          theme.palette.mode === "dark" ? "white" : "#1a1a1a",
                        "&:hover": {
                          backgroundColor: theme.palette.action.hover,
                        },
                      }}
                    >
                      Manage User
                    </Button>
                    <Button
                      component={Link}
                      to="/form"
                      sx={{
                        textTransform: "none",
                        fontWeight: 500,
                        color:
                          theme.palette.mode === "dark" ? "white" : "#1a1a1a",
                        "&:hover": {
                          backgroundColor: theme.palette.action.hover,
                        },
                      }}
                    >
                      Add Company
                    </Button> */}
                    <Button
                      component={Link}
                      to="/managebookings"
                      sx={{
                        textTransform: "none",
                        fontWeight: 500,
                        color:
                          theme.palette.mode === "dark" ? "white" : "#1a1a1a",
                        "&:hover": {
                          backgroundColor: theme.palette.action.hover,
                        },
                      }}
                    >
                      Manage Bookings
                    </Button>
                  </Box>
                )}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Button
                    component={Link}
                    to="/bookings"
                    variant="outlined"
                    sx={{
                      textTransform: "none",
                      fontWeight: 500,
                      borderRadius: "20px",
                      px: 3,
                      color:
                        theme.palette.mode === "dark" ? "white" : "#1a1a1a",
                      borderColor:
                        theme.palette.mode === "dark" ? "white" : "#1a1a1a",
                      "&:hover": {
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        borderColor: theme.palette.primary.main,
                      },
                    }}
                  >
                    Start Booking
                  </Button>
                  <Tooltip title="View User Profile" arrow>
                    <Avatar
                      onClick={handleMenuOpen}
                      sx={{
                        cursor: "pointer",
                        width: 35,
                        height: 35,
                        backgroundColor: theme.palette.primary.main,
                        transition: "transform 0.2s",
                        "&:hover": {
                          transform: "scale(1.1)",
                        },
                      }}
                    >
                      {user.name ? (
                        user.name[0].toUpperCase()
                      ) : (
                        <AccountCircleIcon />
                      )}
                    </Avatar>
                  </Tooltip>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    TransitionComponent={Fade}
                    PaperProps={{
                      sx: {
                        mt: 1.5,
                        borderRadius: 2,
                        boxShadow: theme.shadows[3],
                        bgcolor:
                          theme.palette.mode === "dark" ? "#2d2d2d" : "#ffffff",
                      },
                    }}
                  >
                    <MenuItem sx={{ py: 2 }}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 600,
                          color:
                            theme.palette.mode === "dark" ? "white" : "#1a1a1a",
                        }}
                      >
                        Welcome, {user.name || "User"}
                      </Typography>
                    </MenuItem>
                    <Divider />
                    {menuItems.map((item) => (
                      <MenuItem
                        key={item.text}
                        onClick={() => {
                          if (item.onClick) {
                            item.onClick();
                          } else {
                            navigate(item.path);
                          }
                          handleMenuClose();
                        }}
                      >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        {item.text}
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </>
            ) : (
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                sx={{
                  textTransform: "none",
                  fontWeight: 500,
                  borderRadius: "20px",
                  px: 3,
                  color: theme.palette.mode === "dark" ? "white" : "#1a1a1a",
                  borderColor:
                    theme.palette.mode === "dark" ? "white" : "#1a1a1a",
                  "&:hover": {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    borderColor: theme.palette.primary.main,
                  },
                }}
              >
                Login
              </Button>
            )}
              <NotificationBell />
            <Toggle />
          </Box>

          {/* Placeholder for alignment */}
          <Box sx={{ display: { xs: "flex", md: "none" }, width: "48px" }} />
        </Toolbar>

        {/* Mobile Drawer */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={handleDrawerClose}
          PaperProps={{
            sx: {
              width: 280,
              borderRadius: "16px 0 0 16px",
              bgcolor: theme.palette.mode === "dark" ? "#2d2d2d" : "#ffffff",
            },
          }}
        >
          {drawer}
        </Drawer>
      </AppBar>
    </Slide>
  );
};

export default Navbar;
