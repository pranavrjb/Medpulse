const express = require('express');
const { protect, isAdmin } = require('../middleware/auth');
const User = require('../models/User.js');
// import Booking from '../models/Booking.js';

const router = express.Router();

// GET all users (Admin Only)
router.get('/users', protect, isAdmin, async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users' });
    }
});

// DELETE user by ID (Admin Only)
router.delete('/users/:id', protect, isAdmin, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (user) {
            // await user.remove();
            res.json({ message: 'User removed successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete user' });
    }
});

// GET all bookings (Admin Only)
// router.get('/bookings', protect, isAdmin, async (req, res) => {
//     try {
//         const bookings = await Booking.find({}).populate('doctorId patientId', 'name email');
//         res.json(bookings);
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to fetch bookings' });
//     }
// });

// // UPDATE booking status (Admin Only)
// router.put('/bookings/:id', protect, isAdmin, async (req, res) => {
//     const { status } = req.body;
//     try {
//         const booking = await Booking.findById(req.params.id);

//         if (booking) {
//             booking.status = status;
//             await booking.save();
//             res.json({ message: 'Booking updated successfully' });
//         } else {
//             res.status(404).json({ message: 'Booking not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to update booking' });
//     }
// });

module.exports = router;
