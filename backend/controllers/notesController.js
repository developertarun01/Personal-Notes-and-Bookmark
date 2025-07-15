const Note = require('../models/Note');

exports.createNote = async (req, res, next) => {
  try {
    const { title, content, tags } = req.body;

    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: req.user.userId
    });

    await note.save();
    res.status(201).json(note);
  } catch (err) {
    next(err);
  }
};  

exports.getNotes = async (req, res, next) => {
  try {
    const { q, tags } = req.query;
    const query = { userId: req.user.userId };

    if (q) {
      query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { content: { $regex: q, $options: 'i' } }
      ];
    }

    if (tags) {
      query.tags = { $all: tags.split(',') };
    }

    const notes = await Note.find(query).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    next(err);
  }
};

exports.getNoteById = async (req, res, next) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      userId: req.user.userId
    });

    if (!note) {
      return res.status(404).json({ msg: 'Note not found' });
    }

    res.json(note);
  } catch (err) {
    next(err);
  }
};

exports.updateNote = async (req, res, next) => {
  try {
    const { title, content, tags, isFavorite } = req.body;

    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { title, content, tags, isFavorite },
      { new: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).json({ msg: 'Note not found' });
    }

    res.json(note);
  } catch (err) {
    next(err);
  }
};

exports.deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId
    });

    if (!note) {
      return res.status(404).json({ msg: 'Note not found' });
    }

    res.json({ msg: 'Note removed' });
  } catch (err) {
    next(err);
  }
};