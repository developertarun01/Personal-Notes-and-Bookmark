module.exports = (err, req, res, next) => {
  console.error(err.stack);
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({ 
      msg: 'Validation error', 
      errors: Object.values(err.errors).map(e => e.message) 
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ msg: 'Invalid ID format' });
  }

  res.status(500).json({ msg: 'Server Error' });
};