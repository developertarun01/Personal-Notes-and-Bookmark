const mongoose = require('mongoose');
const { isURL } = require('validator');

const bookmarkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    default: 'Untitled'
  },
  url: {
    type: String,
    required: [true, 'URL is required'],
    validate: [isURL, 'Please enter a valid URL'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  tags: {
    type: [String],
    default: []
  },
  isFavorite: {
    type: Boolean,
    default: false
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Bookmark', bookmarkSchema);