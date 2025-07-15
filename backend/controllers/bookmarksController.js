const Bookmark = require('../models/Bookmark');
const { fetchMetadata } = require('../utils/fetchMetadata');

exports.createBookmark = async (req, res, next) => {
  try {
    let { title, url, description, tags } = req.body;
    
    if (!title) {
      try {
        const metadata = await fetchMetadata(url);
        title = metadata.title || 'Untitled';
        description = description || metadata.description;
      } catch (err) {
        title = 'Untitled';
      }
    }

    const bookmark = new Bookmark({
      title,
      url,
      description,
      tags: tags || [],
      userId: req.user.userId
    });

    await bookmark.save();
    res.status(201).json(bookmark);
  } catch (err) {
    next(err);
  }
};

exports.getBookmarks = async (req, res, next) => {
  try {
    const { q, tags } = req.query;
    const query = { userId: req.user.userId };

    if (q) {
      query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { url: { $regex: q, $options: 'i' } }
      ];
    }

    if (tags) {
      query.tags = { $all: tags.split(',') };
    }

    const bookmarks = await Bookmark.find(query).sort({ createdAt: -1 });
    res.json(bookmarks);
  } catch (err) {
    next(err);
  }
};

exports.getBookmarkById = async (req, res, next) => {
  try {
    const bookmark = await Bookmark.findOne({
      _id: req.params.id,
      userId: req.user.userId
    });

    if (!bookmark) {
      return res.status(404).json({ msg: 'Bookmark not found' });
    }

    res.json(bookmark);
  } catch (err) {
    next(err);
  }
};

exports.updateBookmark = async (req, res, next) => {
  try {
    const { title, url, description, tags, isFavorite } = req.body;
    
    const bookmark = await Bookmark.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { title, url, description, tags, isFavorite },
      { new: true, runValidators: true }
    );

    if (!bookmark) {
      return res.status(404).json({ msg: 'Bookmark not found' });
    }

    res.json(bookmark);
  } catch (err) {
    next(err);
  }
};

exports.deleteBookmark = async (req, res, next) => {
  try {
    const bookmark = await Bookmark.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId
    });

    if (!bookmark) {
      return res.status(404).json({ msg: 'Bookmark not found' });
    }

    res.json({ msg: 'Bookmark removed' });
  } catch (err) {
    next(err);
  }
};