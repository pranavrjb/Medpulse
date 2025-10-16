const User = require('../models/User.js');
const { roles } = require('../utils/constants.js');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.remove();
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete user' });
    }
};

const updateUserRole = async (req, res) => {
    const { role } = req.body;
    try {
        // Validate role against allowed values
        const validRoles = Object.values(roles);
        if (!validRoles.includes(role)) {
            return res.status(400).json({
                message: 'Invalid role. Allowed roles are: ' + validRoles.join(', ')
            });
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { role },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            message: 'User role updated successfully',
            user
        });
    } catch (error) {
        console.error('Role update error:', error);
        res.status(500).json({
            message: 'Failed to update role',
            error: error.message
        });
    }
};

module.exports = { getAllUsers, deleteUser, updateUserRole, getUserById };   
