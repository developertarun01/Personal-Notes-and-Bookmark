exports.register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Check database connection first
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database not connected');
    }

    let user = await User.findOne({ email }).maxTimeMS(30000); // 30s timeout
    
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({ email, password });
    await user.save();

    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (err) {
    console.error('Registration error:', err.message);
    
    // Specific error handling
    if (err.message.includes('timed out')) {
      return res.status(503).json({ msg: 'Database timeout' });
    }
    if (err.message.includes('not connected')) {
      return res.status(503).json({ msg: 'Database unavailable' });
    }
    
    res.status(500).json({ msg: 'Server error' });
  }
};