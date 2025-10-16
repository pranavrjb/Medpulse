const express = require('express');
const router = express.Router();
const { protect, isAdmin, isAdminOrServiceProvider } = require('../middleware/auth');
const {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBookingStatus,
    getProviderBookings,
    getClientBookings
} = require('../controllers/bookingController');

// Public routes
router.post('/', createBooking);  // Create a new booking

// Protected routes
router.use(protect);

// Get bookings by specific criteria (these should come before /:id route)
router.get('/provider/:providerId', isAdminOrServiceProvider, getProviderBookings);
router.get('/client/:email', getClientBookings);

// Admin only routes
router.get('/', isAdmin, getAllBookings);  // Get all bookings

// Booking-specific routes (should come last)
router.get('/:id', isAdminOrServiceProvider, getBookingById);
router.patch('/:id/status', isAdminOrServiceProvider, updateBookingStatus);

module.exports = router;
