
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
const User = require('../models/user');

const loginRouter = express.Router();

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body;

  // Find user by username
  const user = await User.findOne({ username });
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({ error: 'Invalid username or password' });
  }

  // Create token payload
  const userForToken = {
    username: user.username,
    id: user._id,
  };

  // Generate token (expires in 1 hour)
  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: '1h' });

  response.status(200).json({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
