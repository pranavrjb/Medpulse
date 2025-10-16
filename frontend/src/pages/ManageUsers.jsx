import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Tooltip,
  CircularProgress,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  TablePagination,
  Alert,
  Snackbar,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FilterListIcon from "@mui/icons-material/FilterList";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import BusinessIcon from "@mui/icons-material/Business";
import API from "../api";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 10;

const ManageUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [openDialog, setOpenDialog] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [searchTerm, roleFilter, users]);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await API.get("/admin/users");
      if (response.data) {
        setUsers(response.data);
        setFilteredUsers(response.data);
      } else {
        throw new Error("No data received from server");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      if (error.response?.status === 403 || error.response?.status === 401) {
        setError("Access denied. Please make sure you have admin privileges.");
        localStorage.removeItem("token");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        setError(
          error.response?.data?.message ||
            error.message ||
            "Failed to fetch users. Please try again later."
        );
      }
      showNotification(
        error.response?.data?.message || "Error fetching users",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = [...users];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply role filter
    if (roleFilter !== "all") {
      filtered = filtered.filter((user) => user.role === roleFilter);
    }

    setFilteredUsers(filtered);
    setPage(0);
  };

  const handleMenuOpen = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const handleDelete = async (id) => {
    try {
      const response = await API.delete(`/admin/users/${id}`);
      if (response.status === 200 || response.status === 204) {
        setUsers(users.filter((user) => user._id !== id));
        showNotification("User deleted successfully", "success");
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
      if (error.response?.status === 403 || error.response?.status === 401) {
        showNotification(
          "Access denied. Please make sure you have admin privileges.",
          "error"
        );
        localStorage.removeItem("token");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        showNotification(
          error.response?.data?.message || "Failed to delete user",
          "error"
        );
      }
    }
  };

  const updateRole = async (newRole) => {
    if (selectedUser) {
      try {
        const response = await API.put(`/users/${selectedUser._id}/role`, {
          role: newRole,
        });

        if (response.status === 200) {
          const updatedUsers = users.map((user) =>
            user._id === selectedUser._id ? { ...user, role: newRole } : user
          );
          setUsers(updatedUsers);
          showNotification("User role updated successfully", "success");
        }
      } catch (error) {
        console.error("Failed to update role:", error);
        if (error.response?.status === 403 || error.response?.status === 401) {
          showNotification(
            "Access denied. Please make sure you have admin privileges.",
            "error"
          );
          localStorage.removeItem("token");
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          showNotification(
            error.response?.data?.message || "Failed to update role",
            "error"
          );
        }
      }
      handleMenuClose();
    }
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const showNotification = (msg, sev) => {
    setMessage(msg);
    setSeverity(sev);
    setOpenSnackbar(true);
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "ADMIN":
        return <AdminPanelSettingsIcon />;
      case "SERVICE-PROVIDER":
        return <BusinessIcon />;
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

  if (error) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography color="error" variant="h6">
          {error}
        </Typography>
        <Button variant="contained" onClick={fetchUsers} sx={{ mt: 2 }}>
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", p: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
        Manage Users
      </Typography>

      {/* Filters */}
      <Box sx={{ mb: 4, display: "flex", gap: 2, alignItems: "center" }}>
        <TextField
          label="Search users"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: 250 }}
        />
        <TextField
          select
          label="Role"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          size="small"
          sx={{ width: 150 }}
        >
          <MenuItem value="all">All Roles</MenuItem>
          <MenuItem value="ADMIN">Admin</MenuItem>
          <MenuItem value="SERVICE-PROVIDER">Service Provider</MenuItem>
          <MenuItem value="USER">User</MenuItem>
        </TextField>
        <IconButton onClick={fetchUsers} title="Refresh">
          <FilterListIcon />
        </IconButton>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : filteredUsers.length > 0 ? (
        <>
          <TableContainer component={Paper} sx={{ mb: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>User</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Role</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Created At</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers
                  .slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE)
                  .map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <Avatar src={user.avatar}>
                            {user.name?.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 500 }}
                            >
                              {user.name}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              {user.email}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          icon={getRoleIcon(user.role)}
                          label={user.role}
                          color={getRoleColor(user.role)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {new Date(user.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => handleViewDetails(user)}
                          size="small"
                          title="View Details"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDelete(user._id)}
                          color="error"
                          size="small"
                          title="Delete User"
                        >
                          <DeleteIcon />
                        </IconButton>
                        <IconButton
                          onClick={(e) => handleMenuOpen(e, user)}
                          size="small"
                          title="Change Role"
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={filteredUsers.length}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            rowsPerPage={ITEMS_PER_PAGE}
            rowsPerPageOptions={[ITEMS_PER_PAGE]}
          />
        </>
      ) : (
        <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
          No users found.
        </Typography>
      )}

      {/* Role Change Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => updateRole("ADMIN")}>
          <AdminPanelSettingsIcon sx={{ mr: 1 }} /> Set as Admin
        </MenuItem>
        <MenuItem onClick={() => updateRole("SERVICE-PROVIDER")}>
          <BusinessIcon sx={{ mr: 1 }} /> Set as Service Provider
        </MenuItem>
        <MenuItem onClick={() => updateRole("USER")}>
          <PersonIcon sx={{ mr: 1 }} /> Set as User
        </MenuItem>
      </Menu>

      {/* User Details Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>User Details</DialogTitle>
        <DialogContent dividers>
          {selectedUser && (
            <Box sx={{ p: 2 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
              >
                <Avatar
                  src={selectedUser.avatar}
                  sx={{ width: 64, height: 64 }}
                >
                  {selectedUser.name?.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="h6">{selectedUser.name}</Typography>
                  <Chip
                    icon={getRoleIcon(selectedUser.role)}
                    label={selectedUser.role}
                    color={getRoleColor(selectedUser.role)}
                    size="small"
                  />
                </Box>
              </Box>
              <Typography variant="body2" gutterBottom>
                <strong>Email:</strong> {selectedUser.email}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Created:</strong>{" "}
                {new Date(selectedUser.createdAt).toLocaleString()}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Last Updated:</strong>{" "}
                {new Date(selectedUser.updatedAt).toLocaleString()}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ManageUsers;
