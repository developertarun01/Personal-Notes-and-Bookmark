require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Import routes with debug checks
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');
const bookmarksRoutes = require('./routes/bookmarks');

// Debug: Verify imports are Router instances
console.log('authRoutes is:', typeof authRoutes); // Should show 'function'
console.log('notesRoutes is:', typeof notesRoutes); // Should show 'function'
console.log('bookmarksRoutes is:', typeof bookmarksRoutes); // Should show 'function'

const app = express();

// Connect to Database
connectDB();

const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? process.env.FRONTEND_URL
    : 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Routes - add error handling
try {
  app.use('/api/auth', authRoutes);
  app.use('/api/notes', notesRoutes);
  app.use('/api/bookmarks', bookmarksRoutes);
} catch (err) {
  console.error('Route mounting error:', err);
  process.exit(1);
}

// Error Handler
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));