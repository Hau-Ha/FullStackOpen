
const bcrypt = require('bcrypt');
const express = require('express');
const User = require('../models/user');

const usersRouter = express.Router();

// Get all users
usersRouter.get('/', async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

// Create a new user
usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  if (!password || password.length < 3) {
    return response.status(400).json({ error: 'Password must be at least 3 characters long' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

module.exports = usersRouter;
