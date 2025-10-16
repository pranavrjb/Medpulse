import React, { useEffect, useState } from "react";
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
  CircularProgress,
  Snackbar,
  Alert,
  TextField,
  MenuItem,
  IconButton,
  Chip,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FilterListIcon from "@mui/icons-material/FilterList";
import VisibilityIcon from "@mui/icons-material/Visibility";
import API from "../../api";

const ITEMS_PER_PAGE = 10;

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    filterBookings();
  }, [searchTerm, statusFilter, bookings]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await API.get("/bookings");
      setBookings(response.data);
      setFilteredBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setError("Failed to fetch bookings. Please try again later.");
      showNotification("Failed to fetch bookings", "error");
    } finally {
      setLoading(false);
    }
  };

  const filterBookings = () => {
    let filtered = [...bookings];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (booking) =>
          booking.clientName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          booking.clientEmail
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          booking.serviceProvider?.name
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((booking) => booking.status === statusFilter);
    }

    setFilteredBookings(filtered);
    setPage(0); // Reset to first page when filtering
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/bookings/${id}`);
      setBookings(bookings.filter((booking) => booking._id !== id));
      showNotification("Booking deleted successfully", "success");
    } catch (error) {
      console.error("Failed to delete booking:", error);
      showNotification("Failed to delete booking", "error");
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await API.patch(`/bookings/${bookingId}`, { status: newStatus });
      const updatedBookings = bookings.map((booking) =>
        booking._id === bookingId ? { ...booking, status: newStatus } : booking
      );
      setBookings(updatedBookings);
      showNotification("Booking status updated successfully", "success");
    } catch (error) {
      console.error("Failed to update booking status:", error);
      showNotification("Failed to update booking status", "error");
    }
  };

  const showNotification = (msg, sev) => {
    setMessage(msg);
    setSeverity(sev);
    setOpenSnackbar(true);
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setOpenDialog(true);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "success";
      case "pending":
        return "warning";
      case "cancelled":
        return "error";
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
        <Button variant="contained" onClick={fetchBookings} sx={{ mt: 2 }}>
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", p: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
        Manage Bookings
      </Typography>

      {/* Filters */}
      <Box sx={{ mb: 4, display: "flex", gap: 2, alignItems: "center" }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: 250 }}
        />
        <TextField
          select
          label="Status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          size="small"
          sx={{ width: 150 }}
        >
          <MenuItem value="all">All Status</MenuItem>
          <MenuItem value="confirmed">Confirmed</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="cancelled">Cancelled</MenuItem>
        </TextField>
        <IconButton onClick={fetchBookings} title="Refresh">
          <FilterListIcon />
        </IconButton>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : filteredBookings.length > 0 ? (
        <>
          <TableContainer component={Paper} sx={{ mb: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Client</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>
                    Service Provider
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Service Type</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Date & Time</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredBookings
                  .slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE)
                  .map((booking) => (
                    <TableRow key={booking._id}>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {booking.clientName}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {booking.clientEmail}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {booking.serviceProvider?.name || "N/A"}
                      </TableCell>
                      <TableCell>{booking.serviceType || "N/A"}</TableCell>
                      <TableCell>
                        {new Date(booking.slot).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={booking.status || "pending"}
                          color={getStatusColor(booking.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => handleViewDetails(booking)}
                          size="small"
                          title="View Details"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDelete(booking._id)}
                          color="error"
                          size="small"
                          title="Delete Booking"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={filteredBookings.length}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            rowsPerPage={ITEMS_PER_PAGE}
            rowsPerPageOptions={[ITEMS_PER_PAGE]}
          />
        </>
      ) : (
        <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
          No bookings found.
        </Typography>
      )}

      {/* Booking Details Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Booking Details</DialogTitle>
        <DialogContent dividers>
          {selectedBooking && (
            <Box sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Client:</strong> {selectedBooking.clientName}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Email:</strong> {selectedBooking.clientEmail}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Phone:</strong> {selectedBooking.clientPhone || "N/A"}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Service Provider:</strong>{" "}
                {selectedBooking.serviceProvider?.name || "N/A"}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Service Type:</strong>{" "}
                {selectedBooking.serviceType || "N/A"}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Booking Time:</strong>{" "}
                {new Date(selectedBooking.slot).toLocaleString()}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Status:</strong> {selectedBooking.status || "pending"}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Notes:</strong>{" "}
                {selectedBooking.notes || "No notes provided"}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          {selectedBooking && (
            <>
              <Button
                onClick={() =>
                  handleStatusChange(selectedBooking._id, "confirmed")
                }
                color="success"
                variant="contained"
                disabled={selectedBooking.status === "confirmed"}
              >
                Confirm
              </Button>
              <Button
                onClick={() =>
                  handleStatusChange(selectedBooking._id, "cancelled")
                }
                color="error"
                variant="contained"
                disabled={selectedBooking.status === "cancelled"}
              >
                Cancel
              </Button>
            </>
          )}
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

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

export default ManageBookings;
