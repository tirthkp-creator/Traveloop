const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const { errorHandler } = require('./middleware/errorMiddleware');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());

// Routes (will be enabled in later phases)
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/trips', require('./routes/tripRoutes'));
app.use('/api/cities', require('./routes/cityRoutes'));
app.use('/api/activities', require('./routes/activityRoutes'));
app.use('/api/trips', require('./routes/budgetRoutes')); // Handles /api/trips/:tripId/budget
app.use('/api/trips', require('./routes/checklistRoutes')); // Handles /api/trips/:tripId/checklist
app.use('/api/trips', require('./routes/notesRoutes'));
app.use('/api/saved-destinations', require('./routes/savedDestinationsRoutes'));
app.use('/api/share', require('./routes/shareRoutes'));
app.use('/api/trips', require('./routes/shareRoutes')); // For the POST /api/trips/:tripId/share part
app.use('/api/admin', require('./routes/adminRoutes'));

// Basic health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'Traveloop API is running' });
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
