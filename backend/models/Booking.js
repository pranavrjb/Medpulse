const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    providerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServiceProvider',
        required: true
    },
    serviceType: {
        type: String,
        required: true,
        enum: ['MEDICAL', 'FITNESS', 'BEAUTY', 'CONSULTING']
    },
    date: {
        type: Date,
        required: true
    },
    slot: {
        type: String,
        required: true
    },
    clientName: {
        type: String,
        required: true
    },
    clientEmail: {
        type: String,
        required: true
    },
    clientPhone: {
        type: String,
        required: true
    },
    location: {
        type: String
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Add indexes for better query performance
bookingSchema.index({ providerId: 1 });
bookingSchema.index({ date: 1 });
bookingSchema.index({ status: 1 });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
