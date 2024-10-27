// controllers/blogs.js

const express = require('express');
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');
const tokenExtractor = require('../middleware/tokenExtractor'); // Import token extractor

const blogsRouter = express.Router();

// Apply tokenExtractor middleware to all routes in this router
blogsRouter.use(tokenExtractor);

// Get all blogs with user information
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

// Add a new blog with authenticated user as creator
blogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body;

  // Verify token and extract user info
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'Token missing or invalid' });
  }

  const user = await User.findById(decodedToken.id);
  if (!user) {
    return response.status(400).json({ error: 'Invalid user' });
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
    user: user._id,
  });

  const savedBlog = await blog.save();

  // Add the blog to the user's list of blogs
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

// Delete a blog by ID
blogsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const deletedBlog = await Blog.findByIdAndDelete(id); 

  if (deletedBlog) {
    response.status(204).end();
  } else {
    response.status(404).json({ error: 'Blog not found' });
  }
});

// Update a blog by ID
blogsRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { title, author, url, likes } = request.body;

  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    { title, author, url, likes },
    { new: true, runValidators: true }
  );

  if (updatedBlog) {
    response.json(updatedBlog);
  } else {
    response.status(404).json({ error: 'Blog not found' });
  }
});

module.exports = blogsRouter;
