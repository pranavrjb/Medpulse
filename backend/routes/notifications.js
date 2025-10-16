const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
    getUserNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    getUnreadCount,
    createNotification,
} = require('../controllers/notificationController');

// All routes require authentication
router.use(protect);

// Test endpoint to create a notification
router.post('/test', async (req, res) => {
    try {
        const testNotification = await createNotification({
            recipient: req.user._id,
            type: 'TEST_NOTIFICATION',
            message: 'This is a test notification!',
            booking: null,
            read: false
        });
        res.status(201).json(testNotification);
    } catch (error) {
        console.error('Error creating test notification:', error);
        res.status(500).json({
            message: 'Error creating test notification',
            error: error.message
        });
    }
});

// Get user's notifications
router.get('/', getUserNotifications);

// Get unread notification count
router.get('/unread-count', getUnreadCount);

// Mark notification as read
router.patch('/:id/read', markAsRead);

// Mark all notifications as read
router.patch('/mark-all-read', markAllAsRead);

// Delete notification
router.delete('/:id', deleteNotification);

module.exports = router; 