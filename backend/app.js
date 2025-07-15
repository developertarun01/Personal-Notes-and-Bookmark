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

// Configure allowed origins
const allowedOrigins = [
  'https://personal-notes-and-bookmark.vercel.app',
  'http://localhost:3000' // For local development
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Add this middleware in app.js before your routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://personal-notes-and-bookmark.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

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