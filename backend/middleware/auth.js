const jwt = require('jsonwebtoken');
const User = require('../models/User');
const createHttpError = require('http-errors');
const { roles } = require('../utils/constants');

// Protect routes
const protect = async (req, res, next) => {
    try {
        let token;

        // Check if token exists in headers
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return next(createHttpError(401, 'Please login to access this route'));
        }

        try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from token
            const user = await User.findById(decoded.id).select('-password');

            if (!user) {
                return next(createHttpError(401, 'User no longer exists'));
            }

            req.user = user;
            next();
        } catch (error) {
            return next(createHttpError(401, 'Invalid token, please login again'));
        }
    } catch (error) {
        next(error);
    }
};

// Grant access to specific roles
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return next(createHttpError(401, 'Please login to access this route'));
        }

        if (!roles.includes(req.user.role)) {
            return next(createHttpError(403, `User role ${req.user.role} is not authorized to access this route`));
        }

        next();
    };
};

// Check if user is admin
const isAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== roles.admin) {
        return next(createHttpError(403, 'Access restricted to admin users'));
    }
    next();
};

// Check if user is service provider
const isServiceProvider = (req, res, next) => {
    if (!req.user || req.user.role !== roles.serviceProvider) {
        return next(createHttpError(403, 'Access restricted to service providers'));
    }
    next();
};

// Check if user is admin or service provider
const isAdminOrServiceProvider = (req, res, next) => {
    if (!req.user || (req.user.role !== roles.admin && req.user.role !== roles.serviceProvider)) {
        return next(createHttpError(403, 'Access restricted to admins and service providers'));
    }
    next();
};

module.exports = {
    protect,
    authorize,
    isAdmin,
    isServiceProvider,
    isAdminOrServiceProvider
}; 