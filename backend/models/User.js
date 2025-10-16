const mongoose = require("mongoose");
const { roles } = require("../utils/constants");
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: String,
    confirmPassword: String,
    role: {
        type: String,
        enum: [roles.admin, roles.serviceProvider, roles.client],
        default: roles.client
    },
});

UserSchema.pre('save', async function (next) {
    try {
        if (this.email === process.env.ADMIN_EMAIL) {
            this.role = roles.admin;
        }
        next();
    } catch (error) {
        next(error);
    }
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;