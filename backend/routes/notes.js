const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const notesController = require('../controllers/notesController');
const authenticate = require('../middlewares/auth');

// Apply authentication middleware to all note routes
router.use(authenticate);

router.post(
  '/',
  [
    check('title', 'Title is required').notEmpty(),
    check('content', 'Content is required').notEmpty()
  ],
  notesController.createNote
);

router.get('/', notesController.getNotes);
router.get('/:id', notesController.getNoteById);
router.put('/:id', notesController.updateNote);
router.delete('/:id', notesController.deleteNote);

module.exports = router;