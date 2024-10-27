const express = require('express');
const Blog = require('../models/blog');
const User = require('../models/user'); // Import the User model
const blogsRouter = express.Router();

// Get all blogs with user information
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

// Add a new blog with assigned user as creator
blogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body;

  // Find a user to assign as creator
  const user = await User.findOne(); // Assign the first user in the database

  if (!user) {
    return response.status(400).json({ error: 'No user found to assign as creator' });
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
