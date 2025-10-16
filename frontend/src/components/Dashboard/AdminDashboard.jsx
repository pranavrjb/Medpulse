import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import API from "../../api";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchUsers();
  }, [user, navigate]);

  useEffect(() => {
    fetchBookings();
    // fetchDoctors();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await API.get("/admin/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await API.get("/bookings");
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };
  // const fetchDoctors = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await API.get("/doctors");
  //     setDoctors(response.data);
  //   } catch (error) {
  //     console.error("Error fetching doctors:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <Box sx={{ minHeight: "100vh", p: 4 }}>
      <Typography variant="h3" textAlign={"center"} gutterBottom>
        Admin Dashboard
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h4" textAlign={"center"} gutterBottom>
                Users Details
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      {/* <TableCell sx={{ fontWeight: 700, fontSize: 20 }}>
                        Avatar
                      </TableCell> */}
                      <TableCell sx={{ fontWeight: 700, fontSize: 20 }}>
                        Name
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: 20 }}>
                        Email
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: 20 }}>
                        Role
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user._id}>
                        {/* <TableCell>
                          <Avatar src={user.avatar} alt={user.name} />
                        </TableCell> */}
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>


          {/* <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h4" textAlign={"center"} gutterBottom>
                Doctor Details
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700, fontSize: 20 }}>
                        Avatar
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: 20 }}>
                        Name
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: 20 }}>
                        Specialization
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: 20 }}>
                        Location
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: 20 }}>
                        Experience
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {doctors.map((doctor) => (
                      <TableRow key={doctor._id}>
                        <TableCell>
                          <Avatar src={doctor.image} alt={doctor.name} />
                        </TableCell>
                        <TableCell>{doctor.name}</TableCell>
                        <TableCell>{doctor.specialization}</TableCell>
                        <TableCell>{doctor.location}</TableCell>
                        <TableCell>{doctor.experience}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid> */}

          {/* <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h4" textAlign={"center"} gutterBottom>
                Booking Details
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700, fontSize: 20 }}>
                        Doctor
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: 20 }}>
                        Patient
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: 20 }}>
                        Symptoms
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: 20 }}>
                        Date & Time
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: 20 }}>
                        Status
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking._id}>
                        <TableCell>{booking.doctor.name}</TableCell>
                        <TableCell>{booking.patient.name}</TableCell>
                        <TableCell>{booking.symptoms}</TableCell>
                        <TableCell>
                          {new Date(booking.time).toLocaleString()}
                        </TableCell>
                        <TableCell>{booking.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid> */}
        </Grid>
      )}
    </Box>
  );
};

export default AdminDashboard;
