const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const createHttpError = require('http-errors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const client = require('prom-client');

const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');
const contactRoutes = require('./routes/contacts');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const serviceProviderRoutes = require('./routes/serviceProvider');
const notificationRoutes = require('./routes/notifications');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Create uploads directory if it doesn't exist
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
}));
app.use(morgan('dev'));

// Serve static files
app.use('/images', express.static(path.join(__dirname, '../../frontend/public/images')));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB is connected!'))
  .catch((err) => console.error('MongoDB Connection Failed!', err.message));

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to appointment booking API!');
});

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});
// API Routes
app.use('/auth', authRoutes);
app.use('/contacts', contactRoutes);
app.use('/bookings', bookingRoutes);
app.use('/admin', adminRoutes);
app.use('/users', userRoutes);
app.use('/serviceProviders', serviceProviderRoutes);
app.use('/notifications', notificationRoutes);

// Error handling for not found routes
app.use((req, res, next) => {
  next(createHttpError.NotFound());
});

// Error handling middleware
app.use((error, req, res, next) => {
  error.status = error.status || 500;
  res.status(error.status).json({
    success: false,
    message: error.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? error : {}
  });
});


// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
