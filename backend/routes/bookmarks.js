const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const bookmarksController = require('../controllers/bookmarksController');
const authenticate = require('../middlewares/auth');

router.use(authenticate);

router.post(
  '/',
  [
    check('url', 'URL is required').notEmpty(),
    check('url', 'Please enter a valid URL').isURL()
  ],
  bookmarksController.createBookmark
);

router.get('/', bookmarksController.getBookmarks);
router.get('/:id', bookmarksController.getBookmarkById);
router.put('/:id', bookmarksController.updateBookmark);
router.delete('/:id', bookmarksController.deleteBookmark);

module.exports = router;