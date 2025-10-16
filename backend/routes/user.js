const express = require('express');
const {
    getAllUsers,
    getUserById,
    deleteUser,
    updateUserRole,
} = require('../controllers/userController.js');
const { protect, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/',protect,isAdmin, getAllUsers);
router.get('/:id',protect,isAdmin, getUserById);
router.delete('/:id', protect, isAdmin, deleteUser);
router.put('/:id/role', protect, isAdmin, updateUserRole);

module.exports = router;
